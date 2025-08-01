import { I18nContext } from 'nestjs-i18n';

export function translate(key: string, args?: Record<string, any>): string {
  const ctx = I18nContext.current();

  console.log(ctx?.lang);
  if (!ctx) {
    return key; // fallback if no context (not in request)
  }
  return ctx.t(key, { args });
}
