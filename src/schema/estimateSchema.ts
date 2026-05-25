import { z } from "zod";

export const createEstimateSchema = (isLoggedIn: boolean) =>
  z.object({
    writer: z
      .string({
        required_error: "필수 입력값입니다.",
      })
      .min(1, "필수 입력값입니다."),

    phone: z
      .string({
        required_error: "필수 입력값입니다.",
      })
      .min(1, "필수 입력값입니다.")
      .regex(/^010-\d{4}-\d{4}$/, "휴대폰 번호 형식이 올바르지 않습니다."),

    email: z
      .string({
        required_error: "필수 입력값입니다.",
      })
      .min(1, "필수 입력값입니다.")
      .email("이메일 형식이 올바르지 않습니다."),

    password: isLoggedIn
      ? z.string().optional()
      : z
          .string({
            required_error: "필수 입력값입니다.",
          })
          .min(4, "비밀번호는 최소 4자 이상 입력해주세요."),

    title: z
      .string({
        required_error: "필수 입력값입니다.",
      })
      .min(1, "필수 입력값입니다."),

    content: z
      .string({
        required_error: "필수 입력값입니다.",
      })
      .min(1, "필수 입력값입니다."),
  });

export type EstimateFormValues = z.infer<
  ReturnType<typeof createEstimateSchema>
>;
