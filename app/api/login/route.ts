"use server";

import { login } from "@/app/login/actions";

export async function POST(request: Request) {
  const data = await request.json();
  // Login action now accepts a JSON payload
  return await login(data);
}
