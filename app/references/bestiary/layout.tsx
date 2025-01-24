interface Props {
  children: React.ReactNode;
}

export default async function BestiaryLayout({ children }: Props) {
  return (
    <div className="w-full flex flex-col items-center justify-center gap-4 h-screen overflow-hidden">
      <h1 className="text-4xl font-bold">Bestiary</h1>
      {children}
    </div>
  );
}
