# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

- **Usuarios principales:** Reclutadores TI, líderes técnicos, arquitectos de software y gerentes de ingeniería en Perú y modalidad remota que evalúan candidatos para **prácticas preprofesionales o posiciones Junior Full Stack Developer**.
- **Situación y trabajo a realizar:** Disponen de pocos minutos para validar si el candidato tiene fundamentos reales de ingeniería de software, capacidad de construir sistemas completos de extremo a extremo (frontend, backend y base de datos relacional), criterio técnico ante problemas reales (transacciones, concurrencia, seguridad, reglas de negocio) y facilidad para ser contactado para una entrevista.

## Product Purpose

Portafolio web personal de **Sebastián Reyes**, estudiante de **9.º ciclo de Ingeniería de Sistemas e Informática**, diseñado para presentar evidencia técnica verificable a través de casos de estudio reales y convertir visitas de reclutadores y líderes técnicos en entrevistas laborales o de prácticas.

## Positioning

A diferencia de un portafolio estudiantil genérico basado en tutoriales CRUD, este portafolio demuestra ingeniería de sistemas aplicada a dominios con reglas de negocio exigentes en múltiples stacks:
- **Axioma:** Gestión clínica y teleterapia con deducción atómica de sesiones en Prisma/PostgreSQL, arquitectura Next.js 15 + NestJS 10 con JWT/RBAC y predicción de inasistencias (No-Show) en tiempo real con Machine Learning (regresión logística).
- **Nexo V:** Plataforma de gestión de voluntariado alineada a la Ley N° 32396 en Perú con gamificación, canje de recompensas, tres roles diferenciados y certificación automatizada en Java (Spring Boot 3.5.5), Angular y MySQL.
- **Ferre-CRM:** ERP ferretero adaptado al mercado peruano con facturación en Soles (S/) e IGV (18%), control de stock con bloqueo pesimista (`lockForUpdate()`) y gestión de cuentas por cobrar (fiados y abonos parciales) sobre el stack TALL (PHP 8.3, Laravel 13, Livewire 4, Flux UI).

## Operating Context

- Evaluado principalmente desde navegadores de escritorio y móviles cuando un reclutador revisa un CV, perfil de LinkedIn o postulación.
- Navegación directa desde la vista general (`/`) hacia el listado de proyectos (`/proyectos`), lectura profunda de casos de estudio (`/proyectos/[slug]`), validación de formación académica (`/sobre-mi`) y contacto rápido sin fricción (`/contacto` vía `mailto:` o enlaces directos).

## Capabilities and Constraints

- **Stack de la aplicación:** Next.js 14 (App Router), TypeScript estricto y Tailwind CSS.
- **Arquitectura estática:** Sin base de datos propia, sin login ni CMS; toda la fuente de verdad del contenido reside en `src/data/portfolio.ts` con generación estática (`generateStaticParams`) para los casos de estudio.
- **Idioma:** Español (orientado al mercado peruano y latinoamericano).
- **Política de enlaces a repositorios:** Cuando un proyecto tiene repositorio privado por motivos académicos o de desarrollo local (`Axioma`, `Ferre-CRM`), la interfaz no debe mostrar enlaces rotos ni inventar URLs públicas; solo se enlazan como `<a>` las URLs que comienzan con `http`.

## Brand Commitments

- **Identidad:** Sebastián Reyes — *Full Stack Developer en formación* (Ingeniería de Sistemas e Informática, 9.º ciclo).
- **Voz:** Técnica, clara, honesta y orientada a resultados de ingeniería (describe el rol exacto desempeñado, decisiones arquitectónicas y soluciones a retos técnicos reales).

## Evidence on Hand

- **Casos de estudio confirmados en `src/data/portfolio.ts`:**
  1. `axioma` (*Axioma — Sistema Integral de Gestión Clínica & Teleterapia*): Coautor junto a Hector Sebastian Reyes Fatama (Curso Integrador II). Repositorio privado por fines académicos.
  2. `nexo-v` (*Nexo V — Plataforma de Gestión de Voluntariado*): Sub-líder de equipo (4 integrantes). Repositorio público en `https://github.com/JSobero/voluntariado` y demo desplegada en `https://glittering-kelpie-1a1a62.netlify.app/`.
  3. `mi-ferreteria-personal` (*Ferre-CRM — Sistema de Gestión para Ferretería*): Desarrollador Full Stack (proyecto personal). Repositorio privado en desarrollo local.
- **Decisiones y activos explícitamente pendientes (no inventar ni fabricar):**
  - El 4.º proyecto en Python (`proyecto-python-fastapi`, actualmente marcado en fase de documentación con `featured: false`) está pendiente de actualizarse cuando concluya la documentación del proyecto real del usuario.
  - Las imágenes actuales en `public/projects/*.svg` son diagramas arquitectónicos temporales; el usuario proveerá capturas reales (`.webp` / `.png`) de los sistemas más adelante. No se deben fabricar testimonios, clientes ni métricas no declaradas.

## Product Principles

1. **La evidencia técnica lidera:** Cada proyecto debe explicarse desde el problema real, el rol desempeñado y los retos de ingeniería resueltos (transacciones, concurrencia, arquitectura, seguridad), evitando frases vacías.
2. **Cero ficción en credenciales y enlaces:** Nunca inventar URLs de demos, repositorios públicos, métricas ni certificaciones; respetar explícitamente el carácter privado o en desarrollo de los proyectos cuando corresponda.
3. **Evaluación rápida y profunda en dos niveles:** Permitir que un reclutador capte el perfil y el stack en menos de 30 segundos desde el inicio y las tarjetas, mientras ofrece profundidad arquitectónica completa en cada caso de estudio (`/proyectos/[slug]`).
4. **Contacto directo y sin fricción:** Facilitar la comunicación inmediata mediante correo copiable, `mailto:` prellenado y enlaces visibles a GitHub y LinkedIn.
