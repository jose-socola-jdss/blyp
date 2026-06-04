# Design System Document: Fluid Precision

## 1. Overview & Creative North Star
**Creative North Star: "Fluid Precision"**

This design system is built to transcend the "utility-first" look of standard SaaS platforms. We are creating an experience for **Blyp** that feels like a high-end digital editorial—where high-tech innovation meets approachable human design. 

The "Fluid Precision" philosophy balances the rigid accuracy of a tech product with the organic, soft movement of modern lifestyle brands. To break the "template" feel, we utilize:
*   **Intentional Asymmetry:** Hero elements and layouts should breathe, often utilizing off-center alignments to guide the eye.
*   **Layered Translucency:** Using glassmorphism to suggest depth and sophisticated software architecture.
*   **Typographic Authority:** A dramatic contrast between massive, geometric headlines and hyper-legible, functional body copy.

---

## 2. Colors: The Tonal Palette
The color strategy avoids harsh contrasts. We use a sophisticated range of blues and grays to create a "vibe" rather than just a UI.

### The "No-Line" Rule
**Explicit Instruction:** Designers are prohibited from using 1px solid borders to define sections. Traditional "boxes" make an interface feel dated and cluttered. Instead, boundaries must be defined through:
*   **Background Shifts:** Place a `surface-container-lowest` card on a `surface-container-low` background.
*   **Subtle Tonal Transitions:** Use soft, wide gradients to signal a shift in content priority.

### Surface Hierarchy & Nesting
Treat the UI as a physical stack of premium materials.
*   **Base Level:** `surface` (#f5f6f7) for the main page background.
*   **Section Level:** `surface-container-low` (#eff1f2) to group related content.
*   **Interactive Level:** `surface-container-lowest` (#ffffff) for primary cards and interaction points.

### The "Glass & Gradient" Rule
To inject "soul" into the tech-heavy Blyp brand:
*   **Signature Textures:** Use a gradient transition from `primary` (#0050d4) to `tertiary-container` (#c0a0ff) for high-impact CTAs.
*   **Glassmorphism:** For floating navigation or modals, use `surface` at 70% opacity with a `20px` backdrop-blur. This ensures the UI feels integrated into the environment.

---

## 3. Typography: Editorial Authority
We use two distinct typefaces to balance the "Innovative" and "Approachable" pillars of the brand.

*   **Display & Headlines (Plus Jakarta Sans):** These are our "Impact" moments. Use `display-lg` for hero sections to establish an authoritative, high-tech voice. Tighten letter-spacing slightly (-2%) on headlines for a more "custom" feel.
*   **Body & Labels (Be Vietnam Pro):** This is our "Friendly" voice. It provides exceptional legibility at small scales. Maintain generous line-heights (1.6x) for `body-md` to ensure the "approachable" feel.

**Hierarchy Strategy:** 
The jump from `headline-lg` (2rem) to `body-md` (0.875rem) should be sharp. This "High-Contrast Scale" mimics premium print magazines, making the content feel curated rather than generated.

---

## 4. Elevation & Depth
Depth in this system is achieved through **Tonal Layering** rather than traditional drop shadows.

*   **The Layering Principle:** Instead of a shadow, place a `surface-container-lowest` object on top of a `surface-container-low` background. The subtle shift in lightness creates a natural "lift."
*   **Ambient Shadows:** If a card must float, use a "Cloud Shadow." Use `on-surface` color at 4% opacity with a `40px` blur and `10px` Y-offset. It should feel like natural light, not a digital effect.
*   **The "Ghost Border" Fallback:** If a border is required for accessibility, use the `outline-variant` token at **15% opacity**. Never use a 100% opaque border.
*   **Motion Depth:** On hover, objects should scale slightly (1.02x) and the shadow should increase in blur—never in opacity—to simulate the object physically moving closer to the user.

---

## 5. Components

### Buttons
*   **Primary:** A gradient from `primary` to `primary-dim`. Roundedness: `full`. Padding: `1.4rem` (horizontal).
*   **Secondary:** `surface-container-highest` background with `primary` text. No border.
*   **Micro-interaction:** On hover, the gradient should shift slightly in angle (from 135° to 180°).

### Cards & Lists
*   **Structure:** No dividers. Use `Spacing-8` (2.75rem) to separate list items.
*   **Background:** Use `surface-container-lowest` for all interactive cards.
*   **Visual Cue:** Use a small 4px vertical accent of `primary` on the left side of an active list item instead of a full background highlight.

### Input Fields
*   **State:** Default state is `surface-container-low`. 
*   **Focus:** Transitions to `surface-container-lowest` with a `Ghost Border` of `primary` at 40% opacity. 
*   **Typography:** Labels use `label-md` in `on-surface-variant`.

### Chips
*   **Design:** Pill-shaped (`full` roundedness). Use `secondary-container` for active states to keep the palette soft and approachable.

---

## 6. Do's and Don'ts

### Do
*   **Do** use the `24` (8.5rem) spacing token for hero section margins. Ample whitespace is a luxury.
*   **Do** use Spanish (ES-ES/ES-MX) terminology that is professional yet warm (e.g., "Comenzar" instead of "Click aquí").
*   **Do** use "Surface Nesting" to create hierarchy within dashboards.

### Don't
*   **Don't** use 1px solid #CCCCCC lines. Ever. Use space or background tone.
*   **Don't** use pure black (#000000) for text. Use `on-surface` (#2c2f30) to maintain a soft, premium feel.
*   **Don't** crowd the edges. If a component feels "stuck" to the side of a container, increase the padding by two steps on the spacing scale.
*   **Don't** use standard "Blue" links. Use `primary` with a 2px underline offset by 4px to maintain an editorial look.

---
*Director's Note: Every pixel must feel intentional. If an element exists, it must have a purpose. If it doesn't add to the brand's 'Fluid Precision,' remove it.*
