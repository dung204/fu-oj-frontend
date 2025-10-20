/** biome-ignore-all lint/suspicious/noExplicitAny: need to assume window as any */

import { useEffect, useId } from 'react';

import { env } from '@/base/lib';

declare global {
  interface Window {
    turnstile: {
      render: (selector: string, options: any) => void;
    };
  }
}

interface TurnstileProps {
  onSuccess?: (token: string) => void;
  onError?: (errorCode: number) => void;
}

export function Turnstile({ onSuccess, onError }: TurnstileProps) {
  const id = useId();

  // biome-ignore lint/correctness/useExhaustiveDependencies: should run only once
  useEffect(() => {
    if (window.turnstile && typeof window.turnstile.render === 'function') {
      window.turnstile.render(`.turnstile-${id}`, {
        sitekey: env.VITE_TURNSTILE_SITE_KEY,
        callback: onSuccess,
        'error-callback': onError,
      });
    }
  }, []);

  return <div className={`turnstile-${id}`} />;
}
