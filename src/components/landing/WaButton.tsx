"use client";

import { track, waLink } from "./lib";

export function WaIcon({ size = 18 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12 2C6.48 2 2 6.48 2 12c0 1.85.5 3.58 1.37 5.07L2 22l5.09-1.34A9.94 9.94 0 0012 22c5.52 0 10-4.48 10-10S17.52 2 12 2zm4.93 13.67c-.2.56-1.18 1.1-1.62 1.16-.44.07-.85.1-2.72-.57-2.28-.82-3.75-3.13-3.86-3.27-.11-.14-.9-1.2-.9-2.29 0-1.09.57-1.62.77-1.84.2-.22.44-.27.59-.27h.42c.14 0 .32-.05.5.38.2.47.67 1.63.73 1.75.06.12.1.26.02.41-.08.15-.12.24-.23.37-.11.13-.24.29-.34.39-.11.11-.23.23-.1.45.13.22.58.96 1.25 1.55.86.77 1.58 1.01 1.8 1.12.22.11.35.09.48-.05.13-.14.55-.64.7-.86.15-.22.3-.18.5-.11.2.07 1.28.6 1.5.71.22.11.37.16.42.25.06.09.06.52-.14 1.08z" />
    </svg>
  );
}

/** Botón que abre WhatsApp con mensaje listo y registra el clic como Lead. */
export default function WaButton({
  text,
  medium,
  children,
  className = "",
  icon = true,
}: {
  text: string;
  medium: string;
  children: React.ReactNode;
  className?: string;
  icon?: boolean;
}) {
  return (
    <a
      href={waLink(text, medium)}
      target="_blank"
      rel="noopener noreferrer"
      onClick={() => track("Lead", { content_name: medium })}
      className={className}
    >
      {icon && <WaIcon />}
      {children}
    </a>
  );
}
