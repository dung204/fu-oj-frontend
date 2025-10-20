import { z } from 'zod';

// Only pick the keys we care about from import.meta.env
const raw = {
  VITE_API_URL: import.meta.env.VITE_API_URL,
  VITE_WS_URL: import.meta.env.VITE_WS_URL,
  VITE_TURNSTILE_SITE_KEY: import.meta.env.VITE_TURNSTILE_SITE_KEY,
};

const envSchema = z.object({
  VITE_API_URL: z.url(),
  VITE_WS_URL: z
    .string()
    .refine((v) => /^wss?:\/\//.test(v), { message: 'Invalid WS URL (expected ws:// or wss://)' }),
  VITE_TURNSTILE_SITE_KEY: z.string().nonempty(),
});

const parsed = envSchema.safeParse(raw);
if (!parsed.success) {
  // Surface useful messages early during startup/SSR
  const issues = parsed.error.issues.map((i) => `${i.path.join('.')}: ${i.message}`).join('; ');
  throw new Error(`[ENV] Invalid environment configuration: ${issues}`);
}

export const env = parsed.data;
export type Env = z.infer<typeof envSchema>;
