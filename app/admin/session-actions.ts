"use server";

import { redirect } from "next/navigation";
import { endSession, isPasswordValid, startSession } from "@/lib/auth";

export type LoginState = { error?: string };

export async function login(_prev: LoginState, data: FormData): Promise<LoginState> {
  const password = String(data.get("password") ?? "");
  const next = String(data.get("next") ?? "/admin");

  try {
    if (!isPasswordValid(password)) return { error: "acceso_denegado: contraseña incorrecta;" };
  } catch (error) {
    return { error: error instanceof Error ? error.message : "error de configuración;" };
  }

  await startSession();
  // Solo rutas internas, para no convertir `next` en un open redirect.
  redirect(next.startsWith("/admin") ? next : "/admin");
}

export async function logout() {
  await endSession();
  redirect("/admin/login");
}
