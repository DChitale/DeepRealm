# DeepRealm

DeepRealm is a high-fidelity, immersive oceanic exploration web experience. Built with a focus on cinematic storytelling and fluid interactions, it takes users on a scientific descent from the shimmering surface of the Sunlight Zone to the crushing depths of the Hadal trenches.

![DeepRealm Preview](https://github.com/DChitale/DeepRealm/blob/main/public/Images/preview.png) 

## Project Structure

```text
DeepRealm/
├── src/
│   ├── Sections/           # Narrative chapters (Oceanic Zones)
│   │   ├── MainSec.jsx     # Hero / Surface
│   │   ├── SunLightZone.jsx
│   │   ├── TwilightZone.jsx
│   │   ├── MidnightZone.jsx
│   │   ├── AbyssalZone.jsx
│   │   └── HadalZone.jsx
│   ├── components/         # Global UI & Interactive Elements
│   │   ├── OceanScene.jsx  # Three.js Background
│   │   ├── SubmarineHUD.jsx# Overlay Navigation
│   │   ├── SonarScan.jsx   # Mouse-interactive effects
│   │   ├── DepthMeter.jsx  # Real-time scroll tracking
│   │   └── LoadingScreen.jsx
│   ├── data/               # Educational content & Fact archives
│   └── App.jsx             # Root layout & State management
├── public/                 # Static assets (3D models, textures)
└── tailwind.config.js      # Design system tokens
```

## Technologies

- **Frontend**: [React 19](https://react.dev/) + [Vite](https://vitejs.dev/)
- **3D Engine**: [Three.js](https://threejs.org/) (Custom shaders & volumetric lighting)
- **Animation**: [GSAP](https://gsap.com/) (ScrollTrigger, Draggable, & Context API)
- **Styling**: [Tailwind CSS 4](https://tailwindcss.com/) + Vanilla CSS
- **Icons**: [Lucide React](https://lucide.dev/)

---

## Key Features and Requirements

### 1. Story Structure
DeepRealm is built around a 5-stage narrative journey, reflecting the physical reality of oceanic descent:
*   **Hero (The Departure)**: `MainSec` introduces the mission and the vastness of the surface.
*   **Introduction (The Entry)**: `SunLightZone` (0-200m) showcases the vibrancy of marine life.
*   **Exploration (The Descent)**: `TwilightZone` and `MidnightZone` transition into the "Shadow Realm," where light vanishes.
*   **Insight (The Discovery)**: `AbyssalZone` reveals the bioluminescent wonders and extreme biology of the deep.
*   **Conclusion (The Abyss)**: `HadalZone` reaches the final frontier, the deepest trenches on Earth.

### 2. Scroll-Based Interaction
*   **GSAP ScrollTrigger Reveal**: Content elements fade and slide into view based on the user's scroll position, creating a paced reading experience.
*   **Sticky UI Tracking**: The **Depth Meter** and **Submarine HUD** use sticky positioning to remain fixed as "instrumentation," providing constant feedback on the descent depth.
*   **Zone Transitions**: Smooth background color and lighting gradients shift dynamically as the user scrolls through different depth thresholds.

### 3. Interactive Elements
*   **Stacked Discovery Cards**: An interactive "deck" of facts in the Sunlight and Twilight zones. Users can **drag and swipe** cards away using GSAP Draggable to reveal the next archive entry.
*   **Submarine HUD**: A glassmorphic control panel providing interactive links and navigation, simulating the view from a deep-sea submersible.
*   **Sonar Scan Overlay**: A global mouse-following effect that creates a "sonar pulse" visual, reactivating interest as the user explores the dark sections of the site.

### 4. High-Fidelity Animation
*   **Three.js Ocean Scene**: A custom-shaded water surface and underwater environment that reacts to scroll speed and ambient lighting changes.
*   **Holographic Transitions**: Content sections utilize smooth `expo.out` easing and staggered animations to feel like futuristic data projections.
*   **Particle Systems**: Dynamic `ParticleEffect` components generate "marine snow" and bubbles that move at varying speeds, enhancing the sense of 3D depth and volume.

### 5. Responsive Design
DeepRealm is engineered to be **fully responsive**:
*   **Desktop**: Immersive wide-screen layout with side-by-side interactive elements.
*   **Tablet**: Optimized touch targets for dragging cards and navigating the HUD.
*   **Mobile**: A vertical-first narrative stack that maintains cinematic impact through adjusted typography scales and fluid gradient backgrounds.

---

## Getting Started

1. **Clone the repository**:
   ```bash
   git clone https://github.com/DChitale/DeepRealm.git
   ```
2. **Install dependencies**:
   ```bash
   npm install
   ```
3. **Run development server**:
   ```bash
   npm run dev
   ```

---

© 2026 DeepRealm Project. Exploring the final frontier.
