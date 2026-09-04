"use client";

import { useFormStatus } from "react-dom";

export function SubmitButton({ children = "guardar()" }: { children?: React.ReactNode }) {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      className="border border-[#F1E65D] bg-[#F1E65D] text-[#10100F] font-mono text-xs font-bold px-4 py-2 uppercase tracking-wider hover:bg-transparent hover:text-[#F1E65D] transition-colors disabled:opacity-50"
    >
      {pending ? "..." : children}
    </button>
  );
}

export function DeleteButton({ label }: { label: string }) {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      onClick={(event) => {
        if (!confirm(`¿Eliminar "${label}"? Esta acción no se puede deshacer.`)) event.preventDefault();
      }}
      className="border border-[#CD3130] text-[#CD3130] font-mono text-xs px-4 py-2 uppercase tracking-wider hover:bg-[#CD3130] hover:text-[#FFFEF0] transition-colors disabled:opacity-50"
    >
      {pending ? "..." : "eliminar()"}
    </button>
  );
}
