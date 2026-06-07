#!/usr/bin/env bash
#
# Guard against inline `style={{ gridTemplateColumns: ... }}`.
#
# Why: an inline gridTemplateColumns style ALWAYS overrides Tailwind's responsive
# utility classes (max-md:grid-cols-1, md:[grid-template-columns:...], etc.), so the
# grid never collapses on mobile and the page overflows horizontally. This has
# regressed the mobile layout repeatedly. Use responsive utility classes instead, e.g.
#   className="grid grid-cols-1 md:[grid-template-columns:1fr_0.85fr]"
#
# Allowed exception: dynamic grids that use minmax(0, 1fr), whose tracks shrink and
# therefore cannot overflow (e.g. the computed sponsor grid on /partners).
#
set -euo pipefail

# `gridTemplateColumns` (camelCase) only appears in inline React styles. Tailwind
# arbitrary classes use kebab-case `grid-template-columns`, so they won't match here.
matches="$(grep -rn 'gridTemplateColumns' app --include='*.tsx' | grep -v 'minmax' || true)"

if [ -n "$matches" ]; then
  echo "❌ Inline gridTemplateColumns found — this overrides responsive classes and breaks mobile layout."
  echo ""
  echo "   Fix: move the column template to a responsive utility class, e.g."
  echo "        className=\"grid grid-cols-1 md:[grid-template-columns:1fr_0.85fr]\""
  echo "   (Dynamic grids may keep an inline style ONLY if they use minmax(0, 1fr).)"
  echo ""
  echo "   Offending lines:"
  echo "$matches"
  exit 1
fi

echo "✅ No fragile inline gridTemplateColumns found."
