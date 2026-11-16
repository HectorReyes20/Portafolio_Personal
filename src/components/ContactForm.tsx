"use client";

import React, { useState } from "react";
import { Send, CheckCircle2, Mail, Copy, Check, AlertCircle } from "lucide-react";
import { profileData } from "@/data/portfolio";

/**
 * Formulario de contacto sin backend (Client Component) adaptado a Midnight Teal
 * con microinteracciones táctiles, blur-bridge en estados de copia y entradas `@starting-style`.
 */
export default function ContactForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState(
    "Oportunidad de Prácticas / Empleo Full Stack"
  );
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<
    "idle" | "submitting" | "sent" | "mailto-opened" | "error"
  >("idle");
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [copiedFullMessage, setCopiedFullMessage] = useState(false);
  const [clipboardError, setClipboardError] = useState(false);

  const handleCopyEmail = async () => {
    setClipboardError(false);
    try {
      await navigator.clipboard.writeText(profileData.email);
      setCopiedEmail(true);
      setTimeout(() => setCopiedEmail(false), 2500);
    } catch {
      setClipboardError(true);
    }
  };

  const handleCopyFullPayload = async () => {
    setClipboardError(false);
    const fullText = `Para: ${profileData.email}\nAsunto: ${subject.trim()} — de ${name.trim()}\n\nHola ${profileData.name},\n\n${message.trim()}\n\n---\nRemitente: ${name.trim()}\nCorreo: ${email.trim()}`;
    try {
      await navigator.clipboard.writeText(fullText);
      setCopiedFullMessage(true);
      setTimeout(() => setCopiedFullMessage(false), 3000);
    } catch {
      setClipboardError(true);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (status === "submitting") return;

    const cleanName = name.trim();
    const cleanEmail = email.trim();
    const cleanSubject = subject.trim();
    const cleanMessage = message.trim();

    if (!cleanName || !cleanEmail || !cleanSubject || !cleanMessage) {
      return;
    }

    if (profileData.formspreeEndpoint) {
      setStatus("submitting");
      try {
        const res = await fetch(profileData.formspreeEndpoint, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify({
            name: cleanName,
            email: cleanEmail,
            subject: cleanSubject,
            message: cleanMessage,
          }),
        });

        if (res.ok) {
          setStatus("sent");
          setName("");
          setEmail("");
          setMessage("");
          return;
        }
        setStatus("error");
      } catch {
        setStatus("error");
      }
      return;
    }

    const mailtoSubject = encodeURIComponent(`${cleanSubject} — de ${cleanName}`);
    const mailtoBody = encodeURIComponent(
      `Hola ${profileData.name},\n\n${cleanMessage}\n\n---\nRemitente: ${cleanName}\nCorreo de contacto: ${cleanEmail}`
    );

    window.location.href = `mailto:${profileData.email}?subject=${mailtoSubject}&body=${mailtoBody}`;
    setStatus("mailto-opened");
  };

  const inputClass =
    "w-full rounded-sm border border-line bg-canvas px-4 py-3 text-base text-ink placeholder-muted/60 outline-none transition-[border-color,box-shadow] duration-150 ease-out-strong focus:border-accent focus:ring-2 focus:ring-accent/20 sm:text-sm";

  return (
    <div className="rounded-sm border border-line bg-surface p-6 sm:p-8">
      <div className="mb-6 flex flex-wrap items-center justify-between gap-3 border-b border-line pb-4">
        <div>
          <h2 className="text-xl font-semibold text-ink">Envíame un mensaje</h2>
          <p className="mt-1 text-sm text-muted">
            Completa el formulario para redactar el correo o copia mi dirección directamente.
          </p>
        </div>

        <button
          type="button"
          onClick={handleCopyEmail}
          className="ui-press relative inline-flex items-center gap-2 rounded-sm border border-line bg-secondary px-3.5 py-2 font-mono text-xs font-medium text-accent hover:border-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
        >
          <span className="relative inline-flex h-3.5 w-3.5 items-center justify-center">
            <Copy
              className={`h-3.5 w-3.5 transition-[transform,opacity,filter] duration-150 ease-out-strong ${
                copiedEmail
                  ? "scale-75 opacity-0 blur-[1.5px]"
                  : "scale-100 opacity-100 blur-0"
              }`}
              aria-hidden="true"
            />
            <Check
              className={`absolute h-3.5 w-3.5 text-accent transition-[transform,opacity,filter] duration-150 ease-out-strong ${
                copiedEmail
                  ? "scale-100 opacity-100 blur-0"
                  : "scale-75 opacity-0 blur-[1.5px]"
              }`}
              aria-hidden="true"
            />
          </span>
          <span>{copiedEmail ? "¡Correo copiado!" : "Copiar correo"}</span>
        </button>
      </div>

      {clipboardError && (
        <div
          role="status"
          className="ui-status-banner mb-5 flex items-center gap-2.5 rounded-sm border border-accent bg-secondary p-3.5 text-xs text-ink"
        >
          <AlertCircle className="h-4 w-4 shrink-0 text-accent" aria-hidden="true" />
          <span>
            Tu navegador bloqueó el acceso automático al portapapeles. Puedes seleccionar y copiar manualmente:{" "}
            <strong className="select-all font-mono font-semibold text-accent">
              {profileData.email}
            </strong>
          </span>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-5">
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
          <div>
            <label
              htmlFor="name"
              className="mb-2 block font-mono text-xs uppercase tracking-wider text-muted"
            >
              Tu nombre / Empresa
            </label>
            <input
              id="name"
              name="name"
              type="text"
              required
              maxLength={120}
              autoComplete="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Ej. María Gómez — Tech Recruiter"
              className={inputClass}
            />
          </div>

          <div>
            <label
              htmlFor="email"
              className="mb-2 block font-mono text-xs uppercase tracking-wider text-muted"
            >
              Tu correo electrónico
            </label>
            <input
              id="email"
              name="email"
              type="email"
              required
              maxLength={160}
              autoComplete="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="nombre@empresa.com"
              className={inputClass}
            />
          </div>
        </div>

        <div>
          <label
            htmlFor="subject"
            className="mb-2 block font-mono text-xs uppercase tracking-wider text-muted"
          >
            Asunto
          </label>
          <input
            id="subject"
            name="subject"
            type="text"
            required
            maxLength={180}
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            className={inputClass}
          />
        </div>

        <div>
          <label
            htmlFor="message"
            className="mb-2 block font-mono text-xs uppercase tracking-wider text-muted"
          >
            Mensaje
          </label>
          <textarea
            id="message"
            name="message"
            rows={5}
            required
            maxLength={2500}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Hola Héctor, revisamos tus casos de estudio y nos gustaría coordinar una entrevista para..."
            className={`${inputClass} resize-y`}
          />
        </div>

        {status === "sent" && (
          <div
            role="status"
            aria-live="polite"
            className="ui-status-banner flex items-center gap-3 rounded-sm border border-accent bg-secondary p-4 text-sm text-ink"
          >
            <CheckCircle2 className="h-5 w-5 shrink-0 text-accent" aria-hidden="true" />
            <span>¡Mensaje enviado con éxito! Te responderé a la brevedad.</span>
          </div>
        )}

        {status === "mailto-opened" && (
          <div
            role="status"
            aria-live="polite"
            className="ui-status-banner space-y-3 rounded-sm border border-accent bg-secondary p-4 text-sm text-ink"
          >
            <div className="flex items-start gap-3">
              <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-accent" aria-hidden="true" />
              <div>
                <p className="font-semibold text-ink">
                  Solicitamos abrir tu aplicación de correo con el mensaje prellenado.
                </p>
                <p className="mt-1 text-xs leading-relaxed text-muted">
                  Recuerda presionar &ldquo;Enviar&rdquo; en tu cliente de correo. Si usas Gmail/Outlook en el navegador y no se abrió ninguna ventana, puedes copiar todo el mensaje abajo:
                </p>
              </div>
            </div>
            <div className="flex flex-wrap items-center gap-2.5 pl-8">
              <button
                type="button"
                onClick={handleCopyFullPayload}
                className="ui-press inline-flex items-center gap-1.5 rounded-sm border border-accent bg-surface px-3.5 py-1.5 font-mono text-xs font-medium text-accent hover:bg-accent hover:text-accent-fg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
              >
                <span className="relative inline-flex h-3.5 w-3.5 items-center justify-center">
                  <Copy
                    className={`h-3.5 w-3.5 transition-[transform,opacity,filter] duration-150 ease-out-strong ${
                      copiedFullMessage
                        ? "scale-75 opacity-0 blur-[1.5px]"
                        : "scale-100 opacity-100 blur-0"
                    }`}
                    aria-hidden="true"
                  />
                  <Check
                    className={`absolute h-3.5 w-3.5 transition-[transform,opacity,filter] duration-150 ease-out-strong ${
                      copiedFullMessage
                        ? "scale-100 opacity-100 blur-0"
                        : "scale-75 opacity-0 blur-[1.5px]"
                    }`}
                    aria-hidden="true"
                  />
                </span>
                <span>
                  {copiedFullMessage
                    ? "¡Mensaje y destinatario copiados!"
                    : "Copiar mensaje completo y correo"}
                </span>
              </button>
            </div>
          </div>
        )}

        {status === "error" && (
          <div
            role="alert"
            className="ui-status-banner rounded-sm border border-line bg-secondary p-4 text-sm text-ink"
          >
            Ocurrió un inconveniente al enviar el formulario. Por favor escribe directamente a{" "}
            <a
              href={`mailto:${profileData.email}`}
              className="ui-link font-mono font-semibold text-accent underline"
            >
              {profileData.email}
            </a>{" "}
            o usa el botón &ldquo;Copiar correo&rdquo;.
          </div>
        )}

        <div className="flex flex-col gap-3 pt-2 sm:flex-row sm:items-center sm:justify-between">
          <button
            type="submit"
            disabled={status === "submitting"}
            className="ui-press inline-flex items-center justify-center gap-2 rounded-sm border border-accent bg-accent px-6 py-3 text-sm font-semibold text-accent-fg hover:bg-accent-soft hover:text-canvas focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent disabled:pointer-events-none disabled:opacity-60"
          >
            <Send className="h-4 w-4 shrink-0" aria-hidden="true" />
            {status === "submitting" ? "Preparando..." : "Redactar en mi correo"}
          </button>

          <a
            href={`mailto:${profileData.email}`}
            className="ui-press inline-flex items-center justify-center gap-2 rounded-sm border border-line bg-secondary px-4 py-3 text-xs font-medium text-ink hover:border-accent hover:text-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
          >
            <Mail className="h-4 w-4 shrink-0 text-accent" aria-hidden="true" />
            Abrir mailto directo
          </a>
        </div>
      </form>
    </div>
  );
}
