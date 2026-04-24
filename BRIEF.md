# Trellis Marketing Landing Page — Design Brief

## Product
**Trellis** — The decision evidence layer. Transforms scattered business context into structured, scoped, traceable evidence for humans and AI.

## Tagline Direction
"Build business cases on what you actually know"

## Design Identity

### Visual Language
- **Graph/interconnected feel** — the product is fundamentally about relationships between evidence, so the visual language should express networks, nodes, connections
- **Dither/halftone aesthetic** — B&W PixelBlast shader in the hero creates a textured, non-generic feel. Not polished SaaS gradient. Feels like something being revealed, emerging from noise into signal.
- **Restrained palette** — Near-black and warm whites as primary. Green accent (#1a6437) for confidence/strength. Red for contradictions. Amber for aging/caution. Monospace for metadata.

### Key Visual Effects
1. **Hero**: PixelBlast dither shader (B&W, transparent, edge-faded) as background. Headline overlaid.
2. **Scroll-progress stroke**: A graph/network-shaped SVG path that begins partially visible in the hero and draws progressively as user scrolls. Should feel like an evidence network being revealed — nodes and branching connections, not a decorative squiggle.
3. **Portfolio cards**: Dark glassmorphic cards stacked in perspective (fanned, like a hand of cards). Each card represents a strategic domain. The frontmost card animates data loading — evidence count ticking up, bars filling, confidence badge appearing.

### Sections (from prototype)
1. Hero — tagline + dither bg + scroll stroke
2. Problem stats — 6-stat grid (72%, 25%, 47%, 22.5%, 51%, 6x)
3. Product layers — Explore (semantic zoom), Stay current (live feed), Portfolio (stacked cards)
4. How it works — 3-step (Connect → Extract → Review)
5. Agent API — query/response JSON blocks
6. CTA — "Stop rebuilding context every planning cycle"

### Typography
- DM Sans (body) + DM Mono (metadata, labels)
- Headline: clamp(40px, 5vw, 60px), weight 400, tight tracking
- Italic weight 300 for emphasis words

### Reference Components
- `references/prototype.html` — Original HTML prototype
- `references/ScrollStroke.tsx` — Skiper19 scroll-progress SVG reference
- `references/STACKED-CARDS.md` — Portfolio card stack pattern
