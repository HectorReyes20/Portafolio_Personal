"use client";

import React, { useState } from "react";
import { Send, CheckCircle2, Mail, Copy, Check, AlertCircle } from "lucide-react";
import { profileData } from "@/data/portfolio";

/**
 * Formulario de contacto sin backend (Client Component).
 * Endurecido con tamaño de fuente >= 16px en móvil (evita auto-zoom en iOS),
 * validación de longitud/campos, manejo de fallo de portapapeles y distinción clara
 * entre envío directo (Formspree) y apertura de cliente de correo (mailto:).
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

    // Modo sin backend: construye enlace mailto: y ofrece respaldo de copiado en un clic
    const mailtoSubject = encodeURIComponent(`${cleanSubject} — de ${cleanName}`);
    const mailtoBody = encodeURIComponent(
      `Hola ${profileData.name},\n\n${cleanMessage}\n\n---\nRemitente: ${cleanName}\nCorreo de contacto: ${cleanEmail}`
    );

    window.location.href = `mailto:${profileData.email}?subject=${mailtoSubject}&body=${mailtoBody}`;
    setStatus("mailto-opened");
  };

  return (
    <div className="rounded-2xl border border-stone-800/90 bg-stone-900/60 p-6 shadow-xl sm:p-8">
      <div className="mb-6 flex flex-wrap items-center justify-between gap-3 border-b border-stone-800/80 pb-4">
        <div>
          <h2 className="text-xl font-bold text-stone-50">Envíame un mensaje</h2>
          <p className="mt-1 text-sm text-stone-300">
            Completa el formulario para redactar el correo o copia mi dirección directamente.
          </p>
        </div>

        <button
          type="button"
          onClick={handleCopyEmail}
          className="inline-flex items-center gap-2 rounded-lg border border-stone-700/80 bg-stone-800/70 px-3 py-2 text-xs font-medium text-amber-300 transition hover:border-amber-500/40 hover:bg-stone-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400"
        >
          {copiedEmail ? (
            <>
              <Check className="h-3.5 w-3.5 text-emerald-400" />
              ¡Correo copiado!
            </>
          ) : (
            <>
              <Copy className="h-3.5 w-3.5" />
              Copiar correo
            </>
          )}
        </button>
      </div>

      {clipboardError && (
        <div
          role="status"
          className="mb-5 flex items-center gap-2.5 rounded-xl border border-orange-500/30 bg-orange-500/10 p-3.5 text-xs text-orange-200"
        >
          <AlertCircle className="h-4 w-4 shrink-0 text-orange-300" />
          <span>
            Tu navegador bloqueó el acceso automático al portapapeles. Puedes seleccionar y copiar manualmente:{" "}
            <strong className="select-all font-mono font-semibold text-stone-50">
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
              className="mb-2 block text-xs font-semibold uppercase tracking-wider text-stone-300"
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
              className="w-full rounded-xl border border-stone-800 bg-stone-950/90 px-4 py-3 text-base text-stone-50 placeholder-stone-400 outline-none transition focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20 sm:text-sm"
            />
          </div>

          <div>
            <label
              htmlFor="email"
              className="mb-2 block text-xs font-semibold uppercase tracking-wider text-stone-300"
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
              className="w-full rounded-xl border border-stone-800 bg-stone-950/90 px-4 py-3 text-base text-stone-50 placeholder-stone-400 outline-none transition focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20 sm:text-sm"
            />
          </div>
        </div>

        <div>
          <label
            htmlFor="subject"
            className="mb-2 block text-xs font-semibold uppercase tracking-wider text-stone-300"
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
            className="w-full rounded-xl border border-stone-800 bg-stone-950/90 px-4 py-3 text-base text-stone-50 placeholder-stone-400 outline-none transition focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20 sm:text-sm"
          />
        </div>

        <div>
          <label
            htmlFor="message"
            className="mb-2 block text-xs font-semibold uppercase tracking-wider text-stone-300"
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
            placeholder="Hola Sebastián, revisamos tus casos de estudio y nos gustaría coordinar una entrevista para..."
            className="w-full resize-y rounded-xl border border-stone-800 bg-stone-950/90 px-4 py-3 text-base text-stone-50 placeholder-stone-400 outline-none transition focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20 sm:text-sm"
          />
        </div>

        {status === "sent" && (
          <div
            role="status"
            aria-live="polite"
            className="flex items-center gap-3 rounded-xl border border-emerald-500/30 bg-emerald-500/10 p-4 text-sm text-emerald-200"
          >
            <CheckCircle2 className="h-5 w-5 shrink-0 text-emerald-400" />
            <span>¡Mensaje enviado con éxito! Te responderé a la brevedad.</span>
          </div>
        )}

        {status === "mailto-opened" && (
          <div
            role="status"
            aria-live="polite"
            className="space-y-3 rounded-xl border border-amber-500/30 bg-amber-500/10 p-4 text-sm text-stone-200"
          >
            <div className="flex items-start gap-3">
              <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-amber-400" />
              <div>
                <p className="font-semibold text-stone-50">
                  Solicitamos abrir tu aplicación de correo con el mensaje prellenado.
                </p>
                <p className="mt-1 text-xs leading-relaxed text-stone-300">
                  Recuerda presionar &ldquo;Enviar&rdquo; en tu cliente de correo. Si usas Gmail/Outlook en el navegador y no se abrió ninguna ventana, puedes copiar todo el mensaje abajo:
                </p>
              </div>
            </div>
            <div className="flex flex-wrap items-center gap-2.5 pl-8">
              <button
                type="button"
                onClick={handleCopyFullPayload}
                className="inline-flex items-center gap-1.5 rounded-lg border border-amber-500/40 bg-stone-950/80 px-3 py-1.5 text-xs font-semibold text-amber-300 transition hover:bg-stone-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400"
              >
                {copiedFullMessage ? (
                  <>
                    <Check className="h-3.5 w-3.5 text-emerald-400" />
                    ¡Mensaje y destinatario copiados!
                  </>
                ) : (
                  <>
                    <Copy className="h-3.5 w-3.5" />
                    Copiar mensaje completo y correo
                  </>
                )}
              </button>
            </div>
          </div>
        )}

        {status === "error" && (
          <div
            role="alert"
            className="rounded-xl border border-red-500/30 bg-red-500/10 p-4 text-sm text-red-200"
          >
            Ocurrió un inconveniente al enviar el formulario. Por favor escribe directamente a{" "}
            <a
              href={`mailto:${profileData.email}`}
              className="font-mono font-semibold text-stone-50 underline"
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
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-amber-500 px-6 py-3.5 text-sm font-semibold text-stone-950 shadow-lg shadow-amber-950/40 transition hover:bg-amber-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-300 disabled:opacity-60"
          >
            <Send className="h-4 w-4 shrink-0" />
            {status === "submitting" ? "Preparando..." : "Redactar en mi correo"}
          </button>

          <a
            href={`mailto:${profileData.email}`}
            className="inline-flex items-center justify-center gap-2 rounded-xl border border-stone-800 bg-stone-950/60 px-4 py-3 text-xs font-medium text-stone-300 transition hover:border-amber-500/40 hover:text-amber-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400"
          >
            <Mail className="h-4 w-4 shrink-0 text-amber-400" />
            Abrir mailto directo
          </a>
        </div>
      </form>
    </div>
  );
}
