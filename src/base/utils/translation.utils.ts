import { m } from '@/i18n/messages';
import { getLocale } from '@/i18n/runtime';

type MessageKey = keyof typeof m | (string & {});

/**
 * Retrieves a translated message for the given key, optionally formatting it with provided inputs and locale options.
 *
 * @param key - The message key to translate.
 * @param inputs - Optional parameters to interpolate into the message.
 * @param options - Optional configuration, including the locale to use for translation.
 * @returns The translated message if the key exists, otherwise returns the key itself.
 */
export function getTranslation(
  key: MessageKey,
  inputs?: Record<string, unknown>,
  options?: { locale?: ReturnType<typeof getLocale> }
) {
  return key in m ? m[key](inputs, options) : key;
}

/**
 * Alias for the `getTranslation` function.
 *
 * @see getTranslation
 */
export const t = getTranslation;

/**
 * Checks if the provided key exists in the translation messages object.
 *
 * @param key - The translation key to check.
 * @returns `true` if the key exists in the messages object and is a valid `MessageKey`, otherwise `false`.
 */
export function hasTranslationKey(key: string): key is MessageKey {
  return key in m;
}
