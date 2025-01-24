export default function SignUpSuccessPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <div className="flex flex-col items-center justify-center gap-4 p-8 border-slate-500 border-2 rounded-lg">
        <h1 className="text-5xl font-bold">Sign up successful</h1>
        <p className="text-lg">Go check your email for the confirmation link.</p>
        <p className="text-lg">If you don&apos;t see it, check your spam folder.</p>
      </div>
    </div>
  );
}
