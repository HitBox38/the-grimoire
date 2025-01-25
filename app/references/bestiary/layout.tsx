import { LoaderPinwheelIcon } from "lucide-react";
import { Metadata } from "next";
import { Suspense } from "react";

interface Props {
  children: React.ReactNode;
}

export const metadata: Metadata = {
  title: "Bestiary - The Grimoire",
  description: "A comprehensive bestiary library.",
};

export default async function BestiaryLayout({ children }: Props) {
  return (
    <div className="w-full flex flex-col items-center justify-center gap-4 h-screen overflow-hidden">
      <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">Bestiary</h1>
      <Suspense fallback={<LoaderPinwheelIcon className="animate-spin" />}>{children}</Suspense>
    </div>
  );
}
