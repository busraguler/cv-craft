const DEFAULT_SITE_URL = "http://localhost:3000";

function normalizeUrl(value: string): string {
  const withProtocol = /^https?:\/\//.test(value) ? value : `https://${value}`;

  return withProtocol.replace(/\/+$/, "");
}

export function getSiteUrl(): string {
  const configuredUrl =
    process.env.NEXT_PUBLIC_SITE_URL ??
    process.env.VERCEL_PROJECT_PRODUCTION_URL ??
    process.env.VERCEL_URL;

  return normalizeUrl(configuredUrl ?? DEFAULT_SITE_URL);
}

