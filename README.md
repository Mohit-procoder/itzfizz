<div align="center">
  <img src="https://itzfizz.com/wp-content/uploads/2024/06/itzfizz_newlogo-e1722418257825.png" alt="ItzFizz Logo" width="200" style="margin-bottom: 20px" />
  
  # ItzFizz Premium Landing Page
  
  **An interactive, cinematic landing page featuring advanced GSAP scroll physics.**
  
  ![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
  ![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)
  ![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
  ![GSAP](https://img.shields.io/badge/GSAP-88CE02?style=for-the-badge&logo=greensock&logoColor=white)
</div>

<br />

## 🚀 About The Project

This is a high-end conceptual landing page developed for **ItzFizz**, created primarily as a technical assignment. The core focus of this project is on delivering a premium, award-winning user experience driven by complex scroll animations.

### 🧠 Architecture & Design Decisions

Initially, the project was conceptualized with a heavily modular, multi-component architecture. However, to maintain absolute precision over the interconnected GSAP animation timelines—such as the hero-to-header morphing and the pinned footer sequence—it was intentionally streamlined into a unified `App.tsx` file. This eliminates prop-drilling for refs, prevents timeline desynchronization, and keeps the core animation pipeline centralized.

- **Animation Engine**: Driven entirely by **GSAP** and **ScrollTrigger** for high-performance scrubbed physics.
- **Styling & Layout**: Built with **Tailwind CSS** to ensure the complex layouts remain responsive across mobile, tablet, and desktop without sacrificing visual quality.

---

## ⚡ Key Features

- **Hero-to-Logo Morph**: The massive "WELCOME ITZFIZZ" header text smoothly follows a curved path to shrink and lock into the top-left corner as a functional home button on scroll.
- **3D Physics Tilt Cards**: Interactive statistics cards that react physically to user mouse hover positions using custom 3D perspective math.
- **Staggered Zig-Zag Reveal**: Content boxes that slide in diagonally from opposing sides of the screen tied directly to user scroll speed.
- **Cinematic Footer Sequence**: A pinned scroll trigger that locks the viewport in place, allowing the contact details to gracefully expand in slow motion as the user continues to scroll.

---

## 🛠️ Getting Started

To run this project locally, simply follow these steps:

1. **Clone the repository** and navigate into the project directory.
2. **Install the dependencies**:
   ```bash
   npm install
   ```
3. **Start the local development server**:
   ```bash
   npm run dev
   ```

---

<div align="center">
  <i>Developed by <b>Mohit Dubey</b></i>
</div>
