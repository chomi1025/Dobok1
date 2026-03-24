export const EXPERIENCE_MAP: Record<string, string> = {
  IRRELEVANT: "경력무관",
  NEWBIE: "신입(1년미만 ~ 2년)",
  JUNIOR: "주니어(3 ~ 4년 )",
  MID_LEVEL: "중급(5 ~ 6년)",
  SENIOR: "7년 이상",
};

export const JOB_ROLE_MAP: Record<string, string> = {
  TAEKWONDO: "태권도",
  JUDO: "유도",
  HAPKIDO: "합기도",
  KENDO: "검도",
  JUMPROPE: "줄넘기",
  GYM: "헬스/PT",
  SWIMMING: "수영",
  OTHERS: "기타",
};

export const EXPERIENCE_OPTIONS = Object.entries(EXPERIENCE_MAP).map(
  ([value, label]) => ({
    value,
    label,
  }),
);
