import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(req: Request) {
  try {
    const { name, email } = await req.json();

    // 유저 확인
    const user = await prisma.user.findFirst({
      where: { name, email },
    });

    if (!user) {
      return NextResponse.json(
        { message: "일치하는 회원 정보가 없습니다." },
        { status: 404 },
      );
    }

    // 인증번호
    const authCode = Math.floor(100000 + Math.random() * 900000).toString();

    // 메일 발송 설정
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const mailOptions = {
      from: `"도복일번지" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: "[도복일번지] 아이디 찾기 인증번호입니다.",
      html: `
        <div style="font-family: sans-serif; padding: 20px; border: 1px solid #eee;">
          <h2 style="color: #000;">아이디 찾기 인증번호</h2>
          <p>안녕하세요, 도복일번지입니다.</p>
          <p>아래의 인증번호를 입력해서 아이디 찾기를 완료해주세요.</p>
          <div style="background: #f4f4f4; padding: 15px; font-size: 24px; font-weight: bold; text-align: center; letter-spacing: 5px;">
            ${authCode}
          </div>

        </div>
      `,
    };

    await transporter.sendMail(mailOptions);

    await prisma.verification.upsert({
      where: { email },
      update: { code: authCode, createdAt: new Date() },
      create: { email, code: authCode },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json(
      { message: "메일 발송 중 에러 발생" },
      { status: 500 },
    );
  }
}
