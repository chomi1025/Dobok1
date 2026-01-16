import { cache } from "react";
import { supabaseServer } from "@/lib/supabase/supabaseServer";

export const getCategories = cache(async () => {
  const mainRes = await supabaseServer
    .from("MainCategory")
    .select("*")
    .order("sort_order");

  const subRes = await supabaseServer
    .from("SubCategory")
    .select("*")
    .order("main_id")
    .order("sort_order");

  const main = mainRes.data ?? [];
  const sub = subRes.data ?? [];

  const grouped = main.map((m) => ({
    ...m,
    subs: sub.filter((s) => s.main_id === m.id),
  }));

  return {
    main,
    sub,
    grouped,
  };
});
