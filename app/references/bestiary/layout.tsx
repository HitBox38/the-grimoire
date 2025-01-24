interface Props {
  children: React.ReactNode;
  searchParams?: Promise<{ monsterId: string | null }>;
}

export default async function BestiaryLayout({ children, searchParams }: Props) {
  return (
    <div className="w-full flex flex-col items-center justify-center gap-4 h-screen overflow-hidden">
      <h1 className="text-4xl font-bold">Bestiary</h1>
      {children}
    </div>
  );
}
