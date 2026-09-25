import { createClient } from "@/lib/supabase/server";

export async function getAboutSection<T = any>(section: string): Promise<T | null> {
  const supabase = await createClient();
  const { data } = await supabase
    .from("page_content")
    .select("content")
    .eq("page", "about")
    .eq("section", section)
    .single();
  return (data?.content as T) ?? null;
}
