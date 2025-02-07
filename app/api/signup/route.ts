"use server";

import { signup } from "@/app/login/actions";

export async function POST(request: Request) {
  const data = await request.json();
  // Signup action now accepts a JSON payload
  return await signup(data);
}
