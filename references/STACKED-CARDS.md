# Stacked Cards — Portfolio Section Reference

## Pattern
Dark glassmorphic cards stacked in perspective, fanning out like a hand of cards. Labels visible on the fanned-back cards (Revenue, Active Users, Conversion, Avg. Order, Churn Rate, LTV, NPS Score). The frontmost card is pulled forward and fully visible, showing:

- Domain title (e.g. "CONVERSION")
- Key metric with change badge (e.g. "3.8%" with "-0.4%")
- Sparkline/trend chart
- Monthly breakdown bars with values
- Target progress bar
- Last updated timestamp

## Visual Properties
- Dark background (#0a0a0a or similar)
- Cards have subtle glass borders (rgba(255,255,255,0.05-0.1))
- Slight rounded corners (12-16px)
- Cards fan with rotateY and translateZ transforms
- Back cards have reduced opacity labels
- Front card has full data visualization
- Subtle inner glow or border highlight on active card

## For Trellis Adaptation
Each card = a strategic domain (Checkout friction, Activation drop-off, Mid-market churn, Pricing elasticity). Instead of revenue metrics, show:
- Evidence count
- Method diversity (experiment, qualitative, quantitative, operational)
- Active contradictions
- Freshness heatmap
- Confidence level (Solid / Early / Thin)
- Last updated

Animation: data loads in sequentially when card comes to front — count ticks up, bars fill, confidence badge fades in.
