import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import nodemailer from "nodemailer";
import crypto from "crypto";

export async function POST(req: Request) {
  try {
    const { name, email } = await req.json();

    const user = await prisma.user.findFirst({
      where: { name, email },
    });

    if (!user) {
      return NextResponse.json(
        { message: "일치하는 회원 정보가 없습니다." },
        { status: 404 },
      );
    }

    const token = crypto.randomBytes(32).toString("hex");

    const expires = new Date(Date.now() + 3600000);

    await prisma.passwordResetToken.upsert({
      where: { email },
      update: { token, expires },
      create: { email, token, expires },
    });

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const resetLink = `${process.env.NEXT_PUBLIC_BASE_URL}/find/password/reset?token=${token}`;

    const mailOptions = {
      from: `"도복일번지" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: "[도복일번지] 비밀번호 재설정 링크입니다.",
      html: `
        <div style="font-family: sans-serif; padding: 20px; border: 1px solid #eee; max-width: 500px;">
          <h2 style="color: #000;">비밀번호 재설정</h2>
          <p>안녕하세요, 도복일번지입니다.</p>
          <p>아래 버튼을 클릭해서 비밀번호를 새로 설정할 수 있습니다.</p>
          <div style="text-align: center; margin: 30px 0;">
            <a href="${resetLink}" style="background: #000; color: #fff; padding: 15px 25px; text-decoration: none; border-radius: 5px; font-weight: bold;">
              비밀번호 재설정하기
            </a>
          </div>
          <p style="font-size: 12px; color: #999;">이 링크는 1시간 동안만 유효합니다. 본인이 요청한 게 아니라면 이 메일을 무시해주세요.</p>
        </div>
      `,
    };

    await transporter.sendMail(mailOptions);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("비번 찾기 API 에러:", error);
    return NextResponse.json({ message: "서버 에러 발생" }, { status: 500 });
  }
}
