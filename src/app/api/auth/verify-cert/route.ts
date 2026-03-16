import { NextResponse } from "next/server";
import axios from "axios";
import { prisma } from "@/lib/prisma";

export async function POST(req: Request) {
  try {
    const { imp_uid } = await req.json();
    const getToken = await axios.post("https://api.iamport.kr/users/getToken", {
      imp_key: process.env.PORTONE_API_KEY,
      imp_secret: process.env.PORTONE_API_SECRET,
    });

    const { access_token } = getToken.data.response;

    const getCertification = await axios.get(
      `https://api.iamport.kr/certifications/${imp_uid}`,
      {
        headers: { Authorization: access_token },
      },
    );

    const certInfo = getCertification.data.response;
    const rawPhone = certInfo.phone;

    const formattedPhone =
      rawPhone.length === 11
        ? rawPhone.replace(/(\d{3})(\d{4})(\d{4})/, "$1-$2-$3")
        : rawPhone;

    const existingUser = await prisma.user.findFirst({
      where: {
        OR: [
          { ci: certInfo.ci || "TEST_MODE_NO_CI" },
          { phone: rawPhone },
          { phone: formattedPhone },
        ],
      },
    });
    console.log("검색된 유저 존재 여부:", !!existingUser);
    return NextResponse.json({
      success: true,
      isAlreadyRegistered: !!existingUser,
      data: {
        name: certInfo.name,
        phone: certInfo.phone,
        birthday: certInfo.birthday,
        ci: certInfo.ci || null,
      },
    });
  } catch (error: any) {
    console.error("인증 검증 에러:", error.response?.data || error.message);
    return NextResponse.json(
      { success: false, message: "인증 정보 확인 실패" },
      { status: 500 },
    );
  }
}
