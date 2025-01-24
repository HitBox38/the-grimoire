"use server";

import { redirect } from "next/navigation";
import { createClient } from "@/utils/supabase/server";
import { Dashboard } from "@/components/Dashboard";

export default async function Home() {
  const supabase = await createClient();

  const { data, error } = await supabase.auth.getUser();
  if (error || !data?.user) {
    redirect("/login");
  }

  return <Dashboard />;
}
