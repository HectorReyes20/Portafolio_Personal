import React from "react";

interface TechIconProps {
  name: string;
  className?: string;
}

/**
 * Íconos SVG vectoriales personalizados para las tecnologías principales del portafolio.
 */
export default function TechIcon({ name, className = "w-6 h-6" }: TechIconProps) {
  const normalized = name.toLowerCase();

  switch (normalized) {
    case "next.js":
      return (
        <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
          <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="1.75" />
          <path
            d="M8.5 16V8L16.5 17.5M15.5 8V13.5"
            stroke="currentColor"
            strokeWidth="1.75"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      );
    case "react":
      return (
        <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
          <circle cx="12" cy="12" r="2.2" fill="currentColor" />
          <ellipse
            cx="12"
            cy="12"
            rx="9.5"
            ry="4"
            stroke="currentColor"
            strokeWidth="1.5"
          />
          <ellipse
            cx="12"
            cy="12"
            rx="9.5"
            ry="4"
            transform="rotate(60 12 12)"
            stroke="currentColor"
            strokeWidth="1.5"
          />
          <ellipse
            cx="12"
            cy="12"
            rx="9.5"
            ry="4"
            transform="rotate(120 12 12)"
            stroke="currentColor"
            strokeWidth="1.5"
          />
        </svg>
      );
    case "angular":
      return (
        <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
          <path
            d="M12 2.5L3.5 5.5L5 17L12 21.5L19 17L20.5 5.5L12 2.5Z"
            stroke="currentColor"
            strokeWidth="1.75"
            strokeLinejoin="round"
          />
          <path
            d="M12 6.5L8 16H10L10.8 13.8H13.2L14 16H16L12 6.5Z"
            fill="currentColor"
          />
        </svg>
      );
    case "java":
      return (
        <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
          <path
            d="M7 17.5C7 19.2 17 19.2 17 17.5M6 20.5C8.5 21.8 15.5 21.8 18 20.5"
            stroke="currentColor"
            strokeWidth="1.75"
            strokeLinecap="round"
          />
          <path
            d="M8.5 14.5C8.5 14.5 15.5 15.2 15.5 13.2C15.5 11.5 9.5 12 9.5 10.2C9.5 8.5 13.5 7 12.5 4M14.5 5.5C15.5 7.5 13 9 13.5 10.8"
            stroke="currentColor"
            strokeWidth="1.75"
            strokeLinecap="round"
          />
          <path
            d="M17.2 12.5C18.5 12.5 19.5 13.2 19.5 14.2C19.5 15.2 18.5 16 17.2 16"
            stroke="currentColor"
            strokeWidth="1.75"
            strokeLinecap="round"
          />
        </svg>
      );
    case "python":
      return (
        <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
          <path
            d="M12 3C8.5 3 8 4.5 8 6.5V8.5H12.5V9.5H6.5C4.2 9.5 3 11 3 13.5C3 16 4.2 17.5 6.5 17.5H8V15.2C8 13.5 9.2 12.2 11 12.2H15C16.4 12.2 17.5 11.2 17.5 9.8V6.5C17.5 4.2 15.5 3 12 3Z"
            stroke="currentColor"
            strokeWidth="1.65"
          />
          <path
            d="M12 21C15.5 21 16 19.5 16 17.5V15.5H11.5V14.5H17.5C19.8 14.5 21 13 21 10.5C21 8 19.8 6.5 17.5 6.5H16V8.8C16 10.5 14.8 11.8 13 11.8H9C7.6 11.8 6.5 12.8 6.5 14.2V17.5C6.5 19.8 8.5 21 12 21Z"
            stroke="currentColor"
            strokeWidth="1.65"
          />
          <circle cx="10" cy="6" r="0.9" fill="currentColor" />
          <circle cx="14" cy="18" r="0.9" fill="currentColor" />
        </svg>
      );
    case "php":
      return (
        <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
          <ellipse
            cx="12"
            cy="12"
            rx="10"
            ry="6.5"
            stroke="currentColor"
            strokeWidth="1.75"
          />
          <path
            d="M6.2 14.5L7.2 9.5H9.2C10.2 9.5 10.6 10.2 10.4 11C10.2 11.8 9.6 12.3 8.6 12.3H6.8M11.6 14.5L12.6 9.5M12.1 12H14.5M15 9.5L14 14.5M16.2 14.5L17.2 9.5H19C19.8 9.5 20.2 10.2 20 11C19.8 11.8 19.2 12.3 18.4 12.3H16.7"
            stroke="currentColor"
            strokeWidth="1.4"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      );
    case "postgresql":
      return (
        <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
          <ellipse cx="12" cy="6" rx="7.5" ry="3" stroke="currentColor" strokeWidth="1.75" />
          <path
            d="M4.5 6V12C4.5 13.66 7.86 15 12 15C16.14 15 19.5 13.66 19.5 12V6"
            stroke="currentColor"
            strokeWidth="1.75"
          />
          <path
            d="M4.5 12V18C4.5 19.66 7.86 21 12 21C16.14 21 19.5 19.66 19.5 18V12"
            stroke="currentColor"
            strokeWidth="1.75"
          />
        </svg>
      );
    case "mysql":
      return (
        <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
          <path
            d="M4 7C4 5.34 7.58 4 12 4C16.42 4 20 5.34 20 7C20 8.66 16.42 10 12 10C7.58 10 4 8.66 4 7Z"
            stroke="currentColor"
            strokeWidth="1.75"
          />
          <path
            d="M4 7V17C4 18.66 7.58 20 12 20C16.42 20 20 18.66 20 17V7"
            stroke="currentColor"
            strokeWidth="1.75"
          />
          <path
            d="M4 12C4 13.66 7.58 15 12 15C16.42 15 20 13.66 20 12"
            stroke="currentColor"
            strokeWidth="1.75"
          />
        </svg>
      );
    case "prisma":
      return (
        <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
          <path
            d="M12.5 3L4.5 15.5L9.5 21L19.5 17.5L12.5 3Z"
            stroke="currentColor"
            strokeWidth="1.75"
            strokeLinejoin="round"
          />
          <path
            d="M12.5 3L9.5 21"
            stroke="currentColor"
            strokeWidth="1.75"
            strokeLinecap="round"
          />
        </svg>
      );
    default:
      return (
        <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
          <path
            d="M8 9L4 12L8 15M16 9L20 12L16 15M13.5 6L10.5 18"
            stroke="currentColor"
            strokeWidth="1.75"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      );
  }
}
