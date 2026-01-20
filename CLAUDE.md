# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Portfolio Futuriste is a cyberpunk-themed portfolio website for Steven, a Full-Stack Web Developer. It's a modern, animated single-page application with a futuristic design featuring particles, glassmorphism effects, and neon aesthetics.

## Project Structure

- `index.html` - Single-page portfolio with sections: About/Hero, Skills, Projects, and Contact
- `styles.css` - Complete cyberpunk styling with CSS custom properties, animations, glassmorphism, and neon effects
- `script.js` - Advanced JavaScript for particles system, animations, parallax effects, and interactive elements

## Development

Open `index.html` directly in a browser - no build step or server required.

## Architecture Notes

**CSS Design System**: The project uses CSS custom properties defined in `:root` for cyberpunk theming:
- Colors: `--neon-cyan`, `--neon-magenta`, `--neon-purple`, `--cyber-dark`, `--cyber-darker`
- Glassmorphism: `--glass-bg`, `--glass-border`
- Glows: `--glow-cyan`, `--glow-magenta`, `--glow-purple`
- Typography: Space Grotesk (display) and JetBrains Mono (monospace)

**Key Features**:
- Animated particles system with Canvas API
- Glassmorphism cards with 3D tilt effects
- Glitch text effects
- Gradient animations
- Parallax mouse movement
- Scroll-triggered animations
- Smooth scrolling navigation
- Responsive mobile menu
- Contact form with success animations
- Cursor trail effect
- Floating particles background

**JavaScript Architecture**:
- ParticlesSystem class for canvas-based particle animation
- Intersection Observer for scroll animations
- Event delegation for mobile menu
- 3D tilt effects using mouse position
- Dynamic style injection for animations
- Performance-optimized with passive listeners

**Sections**:
1. **Hero/About**: Animated greeting, code window with syntax highlighting, floating elements
2. **Skills**: Categorized tech stack (Frontend, Backend, Database, Languages, Tools)
3. **Projects**: Youtube Reload, Dev-js, PayApi with links to GitHub and live demos
4. **Contact**: Form with glassmorphism design

**Responsive Breakpoints**: 1024px (tablet), 768px (mobile), 480px (small mobile)

## Language

All content is in French. Maintain French text when editing content.

## Technologies Showcased

The portfolio displays expertise in:
- **Frontend**: HTML, CSS, Sass, JavaScript, TypeScript, React.js, Next.js, TailwindCSS, Shadcn-ui
- **Backend**: Node.js, Express.js, Symfony, PHP, Python
- **Database**: SQL, MySQL, PostgreSQL, Prisma
- **Tools**: Git, GitHub, Vite, Webpack

## Claude Code Behavior

**Context7 Usage**: Utilise toujours Context7 lorsque j'ai besoin de génération de code, d'étapes de configuration ou d'installation, ou de documentation de bibliothèque/API. Cela signifie que tu dois automatiquement utiliser les outils MCP Context7 pour résoudre l'identifiant de bibliothèque et obtenir la documentation de bibliothèque sans que j'aie à le demander explicitement.
