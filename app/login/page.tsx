import { Button } from "@/components/ui/button";
import { login, signup } from "./actions";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Label } from "@/components/ui/label";

export default function LoginPage() {
  return (
    <form className="flex flex-col items-center justify-center min-h-screen">
      <Card className="bg-neutral-900 w-96">
        <CardHeader>
          <h1 className="text-4xl font-bold">Login</h1>
        </CardHeader>
        <CardContent className="flex flex-col gap-4">
          <div className="flex flex-col gap-2">
            <Label htmlFor="email">Email:</Label>
            <Input id="email" name="email" type="email" required />
          </div>
          <div className="flex flex-col gap-2">
            <Label htmlFor="password">Password:</Label>
            <Input id="password" name="password" type="password" required />
          </div>
        </CardContent>
        <CardFooter>
          <div className="flex gap-2">
            <Button formAction={signup}>Sign in</Button>
            <Button formAction={login}>Log in</Button>
          </div>
        </CardFooter>
      </Card>
    </form>
  );
}
