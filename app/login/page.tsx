"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";

const schema = z.object({
  email: z.string().email({ error: "Invalid email address" }),
  password: z.string().min(6, {
    error: "Password must be at least 6 characters long",
  }),
});

type AuthForm = z.infer<typeof schema>;

export default function LoginPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<AuthForm>({
    resolver: zodResolver(schema),
  });
  const [serverError, setServerError] = useState("");

  const submitAuth = async (data: AuthForm, endpoint: string) => {
    setServerError("");
    try {
      const res = await fetch(endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ data }),
      });

      const result = await res.json();

      if (!res.ok) {
        throw new Error(result.error || "Server error");
      }

      // On success, you might want to redirect programmatically.
      // For example:
      window.location.href = result.redirect;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      setServerError(err.message || "Something went wrong.");
    }
  };

  const handleLogin = handleSubmit((data) => submitAuth(data, "/api/login"));
  const handleSignup = handleSubmit((data) => submitAuth(data, "/api/signup"));

  return (
    <form className="flex flex-col items-center justify-center min-h-screen">
      <Card className="bg-neutral-900 w-96">
        <CardHeader>
          <h1 className="text-4xl font-bold">Login</h1>
        </CardHeader>
        <CardContent className="flex flex-col gap-4">
          <div className="flex flex-col gap-2">
            <Label htmlFor="email">Email:</Label>
            <Input
              id="email"
              type="email"
              {...register("email")}
              aria-invalid={errors.email ? "true" : "false"}
              required
            />
            {errors.email && <p className="text-red-500">{errors.email.message}</p>}
          </div>
          <div className="flex flex-col gap-2">
            <Label htmlFor="password">Password:</Label>
            <Input
              id="password"
              type="password"
              {...register("password")}
              aria-invalid={errors.password ? "true" : "false"}
              required
            />
            {errors.password && <p className="text-red-500">{errors.password.message}</p>}
          </div>
          {serverError && <p className="text-red-500 text-center">{serverError}</p>}
        </CardContent>
        <CardFooter>
          <div className="flex gap-2">
            <Button onClick={handleSignup}>Sign in</Button>
            <Button onClick={handleLogin}>Log in</Button>
          </div>
        </CardFooter>
      </Card>
    </form>
  );
}
