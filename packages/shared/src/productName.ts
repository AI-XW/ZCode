/**
 * Product name used in provider-visible prompts and product copy.
 *
 * The upstream product is "ZCode". Embedders that ship this execution layer under
 * their own brand (for example a workbench that embeds the agent runtime) override
 * it with `ZCODE_PRODUCT_NAME`, so the identity the model reports matches the
 * product the user is actually talking to — without patching prompt strings.
 */

/** Runtime env key that overrides the product name. */
export const ZCODE_PRODUCT_NAME_ENV_KEY = "ZCODE_PRODUCT_NAME";

/** Product name used when no override is present. */
export const DEFAULT_PRODUCT_NAME = "ZCode";

type EnvRecord = Record<string, string | undefined>;

/**
 * Normalizes a raw product name override: trimmed, and empty values fall back to
 * the default product name.
 */
export function normalizeProductName(value: string | undefined): string {
  const trimmed = value?.trim();
  return trimmed ? trimmed : DEFAULT_PRODUCT_NAME;
}

/**
 * Resolves the effective product name from the given environment (defaults to
 * `process.env`). Read at call time so a host can set the env var before the
 * first prompt is assembled.
 */
export function resolveProductName(env: EnvRecord = process.env): string {
  return normalizeProductName(env[ZCODE_PRODUCT_NAME_ENV_KEY]);
}

/**
 * Rewrites the upstream product name inside static copy (skill descriptions,
 * plugin blurbs, docs written by hand) so an embedder's product name is used
 * instead. Only the exact upstream name is touched — lower-case spellings such
 * as file names (`zcode.cjs`) are left alone.
 */
export function applyProductName(text: string, env: EnvRecord = process.env): string {
  const productName = resolveProductName(env);
  if (productName === DEFAULT_PRODUCT_NAME) return text;
  return text.replaceAll(DEFAULT_PRODUCT_NAME, productName);
}
