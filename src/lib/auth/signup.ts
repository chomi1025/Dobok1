// pages/api/testSignup.ts
import type { NextApiRequest, NextApiResponse } from "next";
import { createClient } from "@supabase/supabase-js";
import bcrypt from "bcryptjs";

const supabaseServer = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!, // 서버 전용
);

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method !== "POST") return res.status(405).end();

  const { username, password, email, name, phone, address, birth_date } =
    req.body;

  try {
    // 1️⃣ 비밀번호 해시
    const hashedPassword = bcrypt.hashSync(password, 10);

    // 2️⃣ Auth 테이블에 직접 유저 생성 (이메일 인증 없음)
    const { data: authData, error: authError } =
      await supabaseServer.auth.admin.createUser({
        email: `${username}@yourdomain.com`, // 테스트용 이메일
        password: hashedPassword,
        email_confirm: true, // 이메일 인증 없이 바로 가입
        user_metadata: { username, name },
      });

    if (authError) return res.status(400).json({ error: authError.message });
    const user = authData.user;

    // 3️⃣ profiles 테이블 생성
    const { error: profileError } = await supabaseServer
      .from("profiles")
      .insert([
        { id: user.id, email, username, name, phone, address, birth_date },
      ]);

    if (profileError)
      return res.status(400).json({ error: profileError.message });

    // 4️⃣ 성공 응답
    return res
      .status(200)
      .json({ message: "Test signup complete", userId: user.id });
  } catch (err: any) {
    return res.status(500).json({ error: err.message });
  }
}
