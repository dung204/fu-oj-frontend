import { Client, IMessage, StompSubscription } from '@stomp/stompjs';

import { env } from '@/base/lib';

type MessageHandler = (msg: IMessage) => void;

type SubscribeOptions = {
  destination: string;
  onMessage: MessageHandler;
  headers?: Record<string, string>;
};

type Subscription = { unsubscribe: () => void };

/**
 * A wrapper around the `@stomp/stompjs` client to manage a single, shared WebSocket
 * connection and multiplex subscriptions.
 *
 * @description
 * This class provides a higher-level API for STOMP communication. It is designed to
 * be instantiated as a singleton to maintain a single WebSocket connection for the
 * entire application.
 *
 * Key features include:
 * - **Connection Management**: Handles connection activation, deactivation, and automatic
 *   reconnection with configurable delays.
 * - **Subscription Multiplexing**: Manages a single underlying STOMP subscription per
 *   unique destination and header combination. Multiple calls to `subscribe` for the
 *   same channel will share this subscription, improving performance and reducing
 *   network overhead.
 * - **Message Fan-out**: When a message is received on a channel, it is fanned out to all
 *   registered handlers for that channel.
 * - **Resilience**: Automatically re-establishes all subscriptions upon a successful
 *   reconnection.
 *
 * @example
 * ```typescript
 * // Typically, you would have a single instance exported from a module.
 * const stompClient = new StompClient();
 *
 * // Component A subscribes
 * const subscriptionA = stompClient.subscribe({
 *   destination: '/topic/updates',
 *   onMessage: (message) => console.log('Component A received:', message.body),
 * });
 *
 * // Component B subscribes to the same topic
 * const subscriptionB = stompClient.subscribe({
 *   destination: '/topic/updates',
 *   onMessage: (message) => console.log('Component B received:', message.body),
 * });
 *
 * // To send a message
 * stompClient.publish('/app/action', JSON.stringify({ payload: 'data' }));
 *
 * // To unsubscribe a specific handler
 * subscriptionA.unsubscribe();
 * ```
 */
class StompClient {
  private client: Client;
  private connected = false;

  // one underlying STOMP subscription per (destination + headers)
  private channels = new Map<
    string,
    {
      destination: string;
      headers?: Record<string, string>;
      handlers: Set<MessageHandler>;
      stompSub?: StompSubscription;
    }
  >();

  constructor() {
    this.client = new Client({
      brokerURL: env.VITE_WS_URL,
      reconnectDelay: 2000,
      heartbeatIncoming: 10000,
      heartbeatOutgoing: 10000,
      debug: () => {},
      onConnect: (frame) => {
        console.log('STOMP connection successful!', frame);
        this.connected = true;
        // resubscribe all channels once connected (no implicit returns in forEach)
        this.channels.forEach((entry, key) => {
          if (!entry.stompSub) {
            entry.stompSub = this.client.subscribe(
              entry.destination,
              (msg) => {
                // fan-out to all handlers for this channel
                const current = this.channels.get(key);
                if (!current) return;
                current.handlers.forEach((h) => {
                  try {
                    h(msg);
                  } catch (err) {
                    console.error('[STOMP] handler error', err);
                  }
                });
              },
              entry.headers
            );
          }
        });
      },
      onStompError: (frame) => {
        console.error('[STOMP] Broker error', frame.headers.message, frame.body);
      },
      onWebSocketClose: () => {
        this.connected = false;
        // keep handlers; stompSub will be recreated on reconnect
        this.channels.forEach((entry) => {
          entry.stompSub = undefined;
        });
      },
    });
  }

  private keyOf(destination: string, headers?: Record<string, string>) {
    if (!headers) return destination;
    // stable stringify headers (order-independent)
    const sorted = Object.keys(headers)
      .sort()
      .reduce<Record<string, string>>((acc, k) => {
        acc[k] = headers[k];
        return acc;
      }, {});
    return `${destination}::${JSON.stringify(sorted)}`;
  }

  activate() {
    if (!this.client.active) this.client.activate();
  }

  deactivate() {
    if (this.client.active) this.client.deactivate();
    this.connected = false;
    // clean up underlying subscriptions (handlers remain)
    this.channels.forEach((entry) => {
      entry.stompSub?.unsubscribe();
      entry.stompSub = undefined;
    });
  }

  subscribe({ destination, onMessage, headers }: SubscribeOptions): Subscription {
    const key = this.keyOf(destination, headers);
    let entry = this.channels.get(key);
    if (!entry) {
      entry = { destination, headers, handlers: new Set<MessageHandler>() };
      this.channels.set(key, entry);
    }
    entry.handlers.add(onMessage);

    // ensure underlying STOMP subscription exists if connected
    if (this.connected && !entry.stompSub) {
      entry.stompSub = this.client.subscribe(
        destination,
        (msg) => {
          const current = this.channels.get(key);
          if (!current) return;
          current.handlers.forEach((h) => {
            try {
              h(msg);
            } catch (err) {
              console.error('[STOMP] handler error', err);
            }
          });
        },
        headers
      );
    } else if (!this.connected) {
      this.activate();
    }

    // return a handler-level subscription
    return {
      unsubscribe: () => {
        const e = this.channels.get(key);
        if (!e) return;
        e.handlers.delete(onMessage);
        if (e.handlers.size === 0) {
          e.stompSub?.unsubscribe();
          this.channels.delete(key);
        }
      },
    };
  }

  publish(destination: string, body: string, headers?: Record<string, string>) {
    this.client.publish({ destination, body, headers });
  }
}

export const stompClient = new StompClient();
