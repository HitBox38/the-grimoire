"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/utils/supabase/server";
import { NextResponse } from "next/server";

interface AuthPayload {
  data: { email: string; password: string };
}

export async function login(payload: AuthPayload) {
  const supabase = await createClient();

  console.log(payload);

  const { error } = await supabase.auth.signInWithPassword(payload.data);

  if (error) {
    return new NextResponse(JSON.stringify({ error: error.message }), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    });
  }

  revalidatePath("/", "layout");
  return new NextResponse(JSON.stringify({ success: true, redirect: "/" }), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
}

export async function signup(payload: AuthPayload) {
  const supabase = await createClient();

  const { error } = await supabase.auth.signUp(payload.data);

  if (error) {
    return new NextResponse(JSON.stringify({ error: error.message }), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    });
  }

  revalidatePath("/", "layout");
  return new NextResponse(JSON.stringify({ success: true, redirect: "/signUpSuccess" }), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
}
