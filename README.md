# Portafolio Web Personal — Full Stack Developer

Portafolio profesional desarrollado con **Next.js 14 (App Router)**, **Tailwind CSS** y **TypeScript**, diseñado para un estudiante de 9.º ciclo de Ingeniería de Sistemas e Informática en búsqueda de prácticas preprofesionales o empleo Junior como Full Stack Developer.

## Stack Tecnológico

- **Framework:** Next.js 14 (App Router, Server Components, SSG con `generateStaticParams`)
- **Estilos:** Tailwind CSS (Tema oscuro moderno con acentos en azul/cian y animaciones fade-in al scroll)
- **Lenguaje:** TypeScript estricto
- **Iconografía:** `lucide-react` + íconos vectoriales SVG propios por tecnología

## Estructura de Páginas

1. **Inicio (`/`)**: Hero con nombre, rol, bio de 2 líneas, botones de acción ("Ver proyectos" y "Contacto"), sección de Skills con íconos/badges (`Java`, `Next.js`, `React`, `PHP`, `Python`, `MySQL`, `PostgreSQL`, `Prisma`, `Angular`), proyectos destacados y footer social.
2. **Proyectos (`/proyectos`)**: Grid de 4 proyectos (`Axioma`, `Nexo V`, `Mi Ferretería Personal`, `DataPulse API`) con descripción corta de 1 línea, tags y enlaces a repositorio y demo.
3. **Detalle de Proyecto (`/proyectos/[slug]`)**: Página estática generada desde `src/data/portfolio.ts` con título, descripción larga, stack, "Mi rol", "Retos técnicos" y enlaces a GitHub/Demo.
4. **Sobre mí (`/sobre-mi`)**: Trayectoria académica (9.º ciclo), tecnologías categorizadas e intereses profesionales.
5. **Contacto (`/contacto`)**: Formulario interactivo sin backend (`mailto:` o Formspree opcional) y enlaces directos a GitHub, LinkedIn y correo electrónico.

## Instalación y Ejecución

```bash
npm install
npm run dev
```

Abre `http://localhost:3000` en tu navegador.

## Cómo personalizar tus datos

Toda la información personal, enlaces y proyectos están centralizados en un único archivo:
- `src/data/portfolio.ts`
