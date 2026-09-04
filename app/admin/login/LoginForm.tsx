"use client";

import { useActionState } from "react";
import { SubmitButton } from "../components/FormButtons";
import { login, type LoginState } from "../session-actions";

export function LoginForm({ next }: { next: string }) {
  const [state, formAction] = useActionState<LoginState, FormData>(login, {});

  return (
    <form action={formAction} className="w-full max-w-sm border border-[#484736] bg-[#161616] p-6 space-y-4">
      <div>
        <div className="w-10 h-[6px] bg-[#F1E65D] mb-3" />
        <h1 className="text-2xl font-bold tracking-tighter text-[#FFFEF0]">
          buidlers<span className="animate-pulse">_</span>admin
        </h1>
        <p className="font-mono text-xs text-[#9D9A72] mt-1">./sudo --login</p>
      </div>

      <input type="hidden" name="next" value={next} />

      <label className="flex flex-col gap-1.5">
        <span className="font-mono text-[10px] uppercase tracking-wider text-[#9D9A72]">password</span>
        <input
          type="password"
          name="password"
          autoFocus
          required
          className="bg-[#10100F] border border-[#484736] text-[#FFFEF0] font-mono text-sm px-3 py-2 outline-none focus:border-[#F1E65D]"
        />
      </label>

      {state.error && <p className="font-mono text-xs text-[#CD3130]">{state.error}</p>}

      <SubmitButton>entrar()</SubmitButton>
    </form>
  );
}
