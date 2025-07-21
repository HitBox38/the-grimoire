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
    <Suspense fallback={
      <div className="w-full h-screen flex items-center justify-center">
        <LoaderPinwheelIcon className="animate-spin" />
      </div>
    }>
      {children}
    </Suspense>
  );
}
