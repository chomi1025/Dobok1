import type { NextApiRequest, NextApiResponse } from "next";
import { createClient } from "@supabase/supabase-js";
import bcrypt from "bcryptjs";

const supabaseServer = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!,
);

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method !== "POST") return res.status(405).end();

  const { username, password, email, name, phone, address, birth_date } =
    req.body;

  try {
    const hashedPassword = bcrypt.hashSync(password, 10);

    const { data: authData, error: authError } =
      await supabaseServer.auth.admin.createUser({
        email: `${username}@yourdomain.com`,
        password: hashedPassword,
        email_confirm: true,
        user_metadata: { username, name },
      });

    if (authError) return res.status(400).json({ error: authError.message });
    const user = authData.user;

    const { error: profileError } = await supabaseServer
      .from("profiles")
      .insert([
        { id: user.id, email, username, name, phone, address, birth_date },
      ]);

    if (profileError)
      return res.status(400).json({ error: profileError.message });

    return res
      .status(200)
      .json({ message: "Test signup complete", userId: user.id });
  } catch (err: any) {
    return res.status(500).json({ error: err.message });
  }
}
