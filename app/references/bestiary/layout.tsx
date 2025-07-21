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
      <Suspense fallback={<LoaderPinwheelIcon className="animate-spin" />}>{children}</Suspense>
    </div>
  );
}
