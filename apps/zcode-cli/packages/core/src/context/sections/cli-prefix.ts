// ============================================================
// CLI Prefix Section Builder
// ============================================================

import { resolveProductName } from "@zcode/shared";

import type { ContextSection } from "../types.js";
import { estimateTokens } from "../utils.js";

export function buildCliPrefixSection(): ContextSection {
  const content = `You are ${resolveProductName()}, an interactive coding agent`;

  return {
    name: "CLI Prefix",
    source: "cli_prefix",
    injectionTarget: "system",
    cacheHint: "stable",
    chars: content.length,
    tokens: estimateTokens(content),
    content,
    preview: content.slice(0, 100),
  };
}
