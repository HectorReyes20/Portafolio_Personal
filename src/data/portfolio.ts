/**
 * Archivo central de datos estáticos del portafolio.
 * Edita los valores de `profileData` y `projectsData` con tu información personal.
 */

export interface Skill {
  name: string;
  category: "Frontend" | "Backend" | "Bases de datos" | "ORM/herramientas";
  badgeColor: string;
  description: string;
}

export interface Project {
  slug: string;
  title: string;
  description: string;
  shortDescription: string; // Descripción corta de 1 línea para las cards
  longDescription: string;
  stack: string[];
  role: string;
  myRole: string;
  challenges: string[];
  technicalChallenges: string[];
  highlights: string[];
  repoUrl: string;
  githubUrl: string;
  demoUrl?: string;
  image: string;
  featured: boolean;
  category: string;
  year: string;
}

export interface AcademicMilestone {
  period: string;
  title: string;
  institution: string;
  description: string;
  highlights: string[];
}

export const profileData = {
  // Reemplaza con tu nombre o edítalo aquí directamente:
  name: "Sebastián Reyes",
  role: "Full Stack Developer en formación",
  academicStatus: "Ingeniería de Sistemas e Informática (9.º ciclo)",
  shortBio:
    "Estudiante de 9.º ciclo de Ingeniería de Sistemas e Informática apasionado por construir aplicaciones web escalables de extremo a extremo. Combino bases sólidas en arquitectura de software y bases de datos relacionales con tecnologías modernas como Next.js, Java y Python.",
  email: "reyesfatama.hector2005@gmail.com",
  github: "https://github.com/HectorReyes20",
  linkedin: "https://www.linkedin.com/in/hector-reyes-fatama-774399326/",
  location: "Perú · Disponible para prácticas preprofesionales / empleo Junior",
  formspreeEndpoint: "", // Opcional: ej. "https://formspree.io/f/tu_id" (si está vacío usa mailto automático)
};

export const skillsData: Skill[] = [
  {
    name: "Next.js",
    category: "Frontend",
    badgeColor: "border-stone-700/80 bg-stone-950 text-stone-200",
    description: "App Router, Server Components, SSR/SSG y optimización SEO",
  },
  {
    name: "React",
    category: "Frontend",
    badgeColor: "border-stone-700/80 bg-stone-950 text-stone-200",
    description: "Hooks personalizados, estado global e interfaces reactivas",
  },
  {
    name: "Angular",
    category: "Frontend",
    badgeColor: "border-stone-700/80 bg-stone-950 text-stone-200",
    description: "Arquitectura modular por componentes, TypeScript y RxJS",
  },
  {
    name: "Java",
    category: "Backend",
    badgeColor: "border-stone-700/80 bg-stone-950 text-stone-200",
    description: "POO avanzada, Spring Boot, patrones de diseño y APIs REST",
  },
  {
    name: "Python",
    category: "Backend",
    badgeColor: "border-stone-700/80 bg-stone-950 text-stone-200",
    description: "Desarrollo de APIs con FastAPI y modelos de Machine Learning",
  },
  {
    name: "PHP",
    category: "Backend",
    badgeColor: "border-stone-700/80 bg-stone-950 text-stone-200",
    description: "Sistemas transaccionales con Laravel, Livewire y arquitectura MVC",
  },
  {
    name: "PostgreSQL",
    category: "Bases de datos",
    badgeColor: "border-stone-700/80 bg-stone-950 text-stone-200",
    description: "Modelado relacional avanzado, integridad transaccional y consultas complejas",
  },
  {
    name: "MySQL",
    category: "Bases de datos",
    badgeColor: "border-stone-700/80 bg-stone-950 text-stone-200",
    description: "Diseño de esquemas normalizados, transacciones ACID y optimización SQL",
  },
  {
    name: "Prisma",
    category: "ORM/herramientas",
    badgeColor: "border-stone-700/80 bg-stone-950 text-stone-200",
    description: "ORM tipado con TypeScript, migraciones declarativas y restricciones únicas",
  },
];

export const projectsData: Project[] = [
  {
    slug: "axioma",
    title: "Axioma — Sistema Integral de Gestión Clínica & Teleterapia",
    description:
      "Plataforma clínica para centros psicológicos con agenda inteligente, kardex de sesiones y predicción ML de inasistencias.",
    shortDescription:
      "Plataforma clínica para centros psicológicos con agenda inteligente, kardex de sesiones y predicción ML de inasistencias.",
    longDescription:
      "Axioma es una plataforma web para centros de atención psicológica que unifica la gestión operativa: agenda médica centralizada sin cruces de horarios, control de paquetes de sesiones con deducción atómica de saldo, registro de evoluciones clínicas en formato SOAP y un motor de Machine Learning que predice en tiempo real el riesgo de inasistencia (No-Show) de los pacientes. El sistema se divide en dos portales: uno público/de pacientes (catálogo de paquetes, agendamiento, control de saldo) y un panel de dirección y staff clínico (agenda centralizada con predicción ML, gestión de terapeutas colegiados, directorio de pacientes y notas SOAP confidenciales).",
    stack: [
      "Next.js 15",
      "React 19",
      "TypeScript",
      "Tailwind CSS",
      "NestJS 10",
      "PostgreSQL",
      "Prisma ORM",
      "JWT + RBAC",
      "Python (ML)",
    ],
    role:
      "Coautor del proyecto (junto a Joao Moises Inga Gallo) para el curso Curso Integrador II. Participé en el diseño de la arquitectura full stack: frontend en Next.js 15 (App Router), backend en NestJS con JWT y RBAC, modelado de base de datos en PostgreSQL con Prisma, e implementación del módulo de Machine Learning (regresión logística) para predicción de inasistencias.",
    myRole:
      "Coautor del proyecto (junto a Joao Moises Inga Gallo) para el curso Curso Integrador II. Participé en el diseño de la arquitectura full stack: frontend en Next.js 15 (App Router), backend en NestJS con JWT y RBAC, modelado de base de datos en PostgreSQL con Prisma, e implementación del módulo de Machine Learning (regresión logística) para predicción de inasistencias.",
    challenges: [
      "Kardex de sesiones con deducción atómica: implementé el registro de consumo de sesiones con una restricción única @@unique([citaId, tipo]) en Prisma para evitar dobles descuentos, distinguiendo entre citas de EVALUACIÓN (no descuentan) y TERAPIA (sí descuentan), con reversión administrativa auditada.",
      "Predicción ML de No-Show en runtime: entrené una regresión logística multivariable (accuracy 84.6%, ROC-AUC 0.87) con 1,500 historiales simulados, exporté los coeficientes a JSON y los inferí en el backend NestJS en tiempo real para categorizar el riesgo del paciente (BAJO / MEDIO / ALTO).",
      "Reglas de negocio complejas (RN-01 a RN-54): implementé validaciones de horarios hábiles, refrigerio obligatorio, feriados peruanos, prevención atómica de cruces de agenda por psicólogo y por paciente, y control de cancelaciones anticipadas vs. tardías con penalización de sesión.",
    ],
    technicalChallenges: [
      "Kardex de sesiones con deducción atómica: implementé el registro de consumo de sesiones con una restricción única @@unique([citaId, tipo]) en Prisma para evitar dobles descuentos, distinguiendo entre citas de EVALUACIÓN (no descuentan) y TERAPIA (sí descuentan), con reversión administrativa auditada.",
      "Predicción ML de No-Show en runtime: entrené una regresión logística multivariable (accuracy 84.6%, ROC-AUC 0.87) con 1,500 historiales simulados, exporté los coeficientes a JSON y los inferí en el backend NestJS en tiempo real para categorizar el riesgo del paciente (BAJO / MEDIO / ALTO).",
      "Reglas de negocio complejas (RN-01 a RN-54): implementé validaciones de horarios hábiles, refrigerio obligatorio, feriados peruanos, prevención atómica de cruces de agenda por psicólogo y por paciente, y control de cancelaciones anticipadas vs. tardías con penalización de sesión.",
    ],
    highlights: [
      "Agenda médica centralizada sin cruces y kardex con deducción atómica",
      "Motor ML de predicción de inasistencias (No-Show) en tiempo real",
      "Doble portal con seguridad JWT + RBAC y evoluciones clínicas SOAP",
    ],
    repoUrl: "https://github.com/Spaurhu/axioma-centro-psicologico",
    githubUrl: "https://github.com/Spaurhu/axioma-centro-psicologico",
    demoUrl: "https://axioma-centro-psicologico-lktj.vercel.app/",
    image: "/projects/axioma-dashboard.webp",
    featured: true,
    category: "Full Stack · Next.js 15 & NestJS",
    year: "2026",
  },
  {
    slug: "nexo-v",
    title: "Nexo V — Plataforma de Gestión de Voluntariado",
    description:
      "Plataforma web para gestionar programas de voluntariado con gamificación, roles y certificación válida por ley.",
    shortDescription:
      "Plataforma web para gestionar programas de voluntariado con gamificación, roles y certificación válida por ley.",
    longDescription:
      "Nexo V es una plataforma web integral para democratizar y optimizar la gestión del voluntariado en Perú, en línea con la Ley N° 32396 que reconoce el voluntariado con créditos académicos y beneficios estatales. El sistema digitaliza eventos, inscripciones, horas de servicio y recompensas, e incorpora gamificación (puntos y canjes), tres roles diferenciados (Administrador, Organizador, Voluntario) y emisión automatizada de certificados válidos por ley. Desarrollado con Spring Boot 3.5.5 en el backend, Angular en el frontend y MySQL como base de datos.",
    stack: [
      "Java",
      "Spring Boot 3.5.5",
      "Angular",
      "TypeScript",
      "MySQL",
      "HTML",
      "CSS",
    ],
    role:
      "Sub-líder del equipo de desarrollo (4 integrantes). Participé en el backend con Spring Boot y en la integración con MySQL, así como en la implementación de los módulos de inscripciones, canje de recompensas y panel de administración. El proyecto fue desplegado en Netlify para la demo pública.",
    myRole:
      "Sub-líder del equipo de desarrollo (4 integrantes). Participé en el backend con Spring Boot y en la integración con MySQL, así como en la implementación de los módulos de inscripciones, canje de recompensas y panel de administración. El proyecto fue desplegado en Netlify para la demo pública.",
    challenges: [
      "Modelado de roles y permisos diferenciados: control de acceso para Administrador, Organizador y Voluntario garantizando que cada tipo de usuario opere únicamente sus funcionalidades dentro del flujo de eventos e inscripciones.",
      "Sistema de gamificación con canje de recompensas: implementación de acumulación de puntos por horas de voluntariado y canje por productos, con validación de saldo y registro de entregas aprobadas por el administrador.",
      "Certificación automatizada válida por ley: generación de certificados de horas de voluntariado alineados a la Ley N° 32396, integrando la lógica de negocio con la base de datos MySQL.",
    ],
    technicalChallenges: [
      "Modelado de roles y permisos diferenciados: control de acceso para Administrador, Organizador y Voluntario garantizando que cada tipo de usuario opere únicamente sus funcionalidades dentro del flujo de eventos e inscripciones.",
      "Sistema de gamificación con canje de recompensas: implementación de acumulación de puntos por horas de voluntariado y canje por productos, con validación de saldo y registro de entregas aprobadas por el administrador.",
      "Certificación automatizada válida por ley: generación de certificados de horas de voluntariado alineados a la Ley N° 32396, integrando la lógica de negocio con la base de datos MySQL.",
    ],
    highlights: [
      "Alineado a la Ley N° 32396 con emisión automatizada de certificados",
      "Sistema de gamificación con puntos por horas de servicio y canje de recompensas",
      "Gestión integral para 3 roles: Administrador, Organizador y Voluntario",
    ],
    repoUrl: "https://github.com/JSobero/voluntariado",
    githubUrl: "https://github.com/JSobero/voluntariado",
    demoUrl: "https://glittering-kelpie-1a1a62.netlify.app/",
    image: "/projects/nexo-v.svg",
    featured: true,
    category: "Full Stack · Spring Boot & Angular",
    year: "2025",
  },
  {
    slug: "mi-ferreteria-personal",
    title: "Ferre-CRM — Sistema de Gestión para Ferretería",
    description:
      "Sistema ERP personal para ferreterías con control de inventario, facturación con IGV peruano y gestión de cuentas por cobrar (fiados).",
    shortDescription:
      "Sistema ERP personal para ferreterías con control de inventario, facturación con IGV peruano y gestión de cuentas por cobrar (fiados).",
    longDescription:
      "Ferre-CRM es un sistema de gestión adaptado al mercado peruano que permite administrar el inventario de materiales y herramientas, controlar el stock en tiempo real, emitir facturas en Soles (S/) con cálculo automático del IGV (18%) y gestionar cuentas por cobrar, incluyendo ventas al fiado y abonos parciales. Desarrollado con Laravel y Livewire, destaca por su interfaz reactiva y su enfoque en la seguridad transaccional del inventario.",
    stack: [
      "PHP 8.3",
      "Laravel 13",
      "Livewire 4",
      "Tailwind CSS",
      "Flux UI",
      "SQLite",
      "Pest",
    ],
    role:
      "Desarrollador Full Stack (Proyecto personal). Diseñé y construí el sistema completo (backend y frontend). Implementé la lógica transaccional para el control de stock, el cálculo de IGV y el sistema de fiados con abonos parciales, utilizando el stack TALL (Tailwind, Alpine, Laravel, Livewire).",
    myRole:
      "Desarrollador Full Stack (Proyecto personal). Diseñé y construí el sistema completo (backend y frontend). Implementé la lógica transaccional para el control de stock, el cálculo de IGV y el sistema de fiados con abonos parciales, utilizando el stack TALL (Tailwind, Alpine, Laravel, Livewire).",
    challenges: [
      "Control transaccional de stock: implementé el registro de ventas dentro de DB::transaction() con bloqueo pesimista (lockForUpdate()) para evitar condiciones de carrera. El precio y la validación de stock se calculan en el servidor antes de ejecutar el decrement(), y si una factura se edita o elimina, el stock se reintegra automáticamente.",
      "Gestión de fiados y abonos parciales: diseñé la lógica para facturas con estado pendiente y el registro de abonos que actualizan automáticamente el saldo pendiente, cambiando el estado a pagado cuando se cubre el total.",
      "Generación de PDFs y exportación: integración de DomPDF para emitir facturas con el desglose de productos, cálculo del IGV peruano y visualización del monto abonado y saldo pendiente.",
    ],
    technicalChallenges: [
      "Control transaccional de stock: implementé el registro de ventas dentro de DB::transaction() con bloqueo pesimista (lockForUpdate()) para evitar condiciones de carrera. El precio y la validación de stock se calculan en el servidor antes de ejecutar el decrement(), y si una factura se edita o elimina, el stock se reintegra automáticamente.",
      "Gestión de fiados y abonos parciales: diseñé la lógica para facturas con estado pendiente y el registro de abonos que actualizan automáticamente el saldo pendiente, cambiando el estado a pagado cuando se cubre el total.",
      "Generación de PDFs y exportación: integración de DomPDF para emitir facturas con el desglose de productos, cálculo del IGV peruano y visualización del monto abonado y saldo pendiente.",
    ],
    highlights: [
      "Facturación en Soles con cálculo automático de IGV (18%)",
      "Sistema de fiados y abonos parciales con validación transaccional",
      "Control de stock en tiempo real con bloqueo pesimista y reintegro automático",
    ],
    repoUrl: "Repositorio privado (en desarrollo local)",
    githubUrl: "Repositorio privado (en desarrollo local)",
    demoUrl: "",
    image: "/projects/mi-ferreteria.svg",
    featured: true,
    category: "Full Stack · PHP & Laravel",
    year: "2026",
  },
  {
    slug: "proyecto-python-fastapi",
    title: "DataPulse API (Proyecto Python)",
    description:
      "API RESTful de alto rendimiento con FastAPI, validación con Pydantic, autenticación JWT y PostgreSQL.",
    shortDescription:
      "API RESTful de alto rendimiento con FastAPI, validación con Pydantic, autenticación JWT y PostgreSQL.",
    longDescription:
      "Servicio backend moderno construido con Python y FastAPI para el procesamiento ágil de datos, exposición de endpoints RESTful documentados automáticamente bajo el estándar OpenAPI 3.1 y gestión segura de usuarios con tokens JWT. Diseñado para integrarse fácilmente con frontends en React, Next.js o Angular, ofreciendo respuestas de baja latencia y validación automática de esquemas.",
    stack: ["Python", "FastAPI", "PostgreSQL", "Pydantic", "JWT Auth", "REST API"],
    role:
      "Desarrollador Backend Python — Diseño de rutas RESTful, definición de esquemas de validación con Pydantic, integración con PostgreSQL, implementación de seguridad con OAuth2/JWT y documentación interactiva Swagger.",
    myRole:
      "Desarrollador Backend Python — Diseño de rutas RESTful, definición de esquemas de validación con Pydantic, integración con PostgreSQL, implementación de seguridad con OAuth2/JWT y documentación interactiva Swagger.",
    challenges: [
      "Concurrencia asíncrona sin bloqueos: aprovechamiento de la programación asíncrona (async/await) en FastAPI para atender múltiples peticiones concurrentes sin bloquear el hilo de ejecución.",
      "Autenticación stateless y seguridad: implementación de un flujo con JSON Web Tokens (JWT), control de permisos por rol y hashing seguro de contraseñas con bcrypt.",
      "Arquitectura modular por dominios: estructuración limpia del proyecto en routers, schemas, models y services facilitando las pruebas automatizadas y el despliegue en contenedores.",
    ],
    technicalChallenges: [
      "Concurrencia asíncrona sin bloqueos: aprovechamiento de la programación asíncrona (async/await) en FastAPI para atender múltiples peticiones concurrentes sin bloquear el hilo de ejecución.",
      "Autenticación stateless y seguridad: implementación de un flujo con JSON Web Tokens (JWT), control de permisos por rol y hashing seguro de contraseñas con bcrypt.",
      "Arquitectura modular por dominios: estructuración limpia del proyecto en routers, schemas, models y services facilitando las pruebas automatizadas y el despliegue en contenedores.",
    ],
    highlights: [
      "Documentación interactiva automática con Swagger UI y ReDoc",
      "Validación estricta de payloads JSON y serialización ultrarrápida con Pydantic",
      "Arquitectura limpia lista para conectar con cualquier cliente Frontend o móvil",
    ],
    repoUrl: "En documentación (próxima publicación)",
    githubUrl: "En documentación (próxima publicación)",
    demoUrl: "",
    image: "/projects/proyecto-python.svg",
    featured: false,
    category: "Backend API · Python & FastAPI",
    year: "2026",
  },
];

export const academicTimeline: AcademicMilestone[] = [
  {
    period: "Actualidad — 9.º Ciclo",
    title: "Ingeniería de Sistemas e Informática",
    institution: "Formación Universitaria — 9.º Ciclo en curso",
    description:
      "Especialización en ingeniería de software, arquitectura de sistemas distribuidos, gestión de proyectos TI y aseguramiento de la calidad de software.",
    highlights: [
      "Desarrollo de proyectos integradores con metodologías ágiles (Scrum)",
      "Arquitectura de aplicaciones web Full Stack y diseño de APIs REST",
      "Administración y optimización de motores de bases de datos SQL (PostgreSQL y MySQL)",
    ],
  },
  {
    period: "Ciclos V — VIII",
    title: "Ingeniería de Software, Bases de Datos y Desarrollo Web",
    institution: "Etapa de consolidación técnica",
    description:
      "Dominio de patrones de diseño de software, modelado de datos relacional avanzado y construcción de sistemas transaccionales completos.",
    highlights: [
      "Liderazgo técnico en proyectos académicos como Nexo V (Java) y Mi Ferretería Personal (PHP)",
      "Aplicación práctica de principios SOLID, arquitectura MVC y control de versiones con Git/GitHub",
    ],
  },
  {
    period: "Ciclos I — IV",
    title: "Fundamentos de Programación y Estructuras de Datos",
    institution: "Base algorítmica y matemática",
    description:
      "Construcción de bases sólidas en lógica algorítmica, estructuras de datos, complejidad computacional y programación orientada a objetos.",
    highlights: [
      "Resolución de problemas algorítmicos en Java y Python",
      "Fundamentos de redes, sistemas operativos y organización de computadores",
    ],
  },
];

export const professionalInterests = [
  {
    title: "Desarrollo Full Stack Moderno",
    description:
      "Construcción de productos digitales completos combinando interfaces reactivas (Next.js, React, Angular) con backends robustos y tipados.",
  },
  {
    title: "Arquitectura Backend & APIs Escalables",
    description:
      "Diseño de servicios limpios, seguros y bien documentados utilizando Java, Python (FastAPI) y Node.js/Next.js.",
  },
  {
    title: "Ingeniería de Datos Relacional",
    description:
      "Modelado eficiente de esquemas SQL en PostgreSQL y MySQL, optimización de consultas y uso de ORMs modernos como Prisma.",
  },
  {
    title: "Calidad de Código y Trabajo en Equipo",
    description:
      "Prácticas de código limpio, revisiones en Git, metodologías ágiles (Scrum) y aprendizaje continuo junto a equipos de ingeniería.",
  },
];
