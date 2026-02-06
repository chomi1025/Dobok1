import DatePicker from "react-datepicker";
import * as P from "./style";
import { ko } from "date-fns/locale";
import { useState, useEffect } from "react";

type PeriodType = "1MONTH" | "3MONTH" | "6MONTH" | "12MONTH" | "CUSTOM";

interface Props {
  period: PeriodType;
  onPeriodChange: (p: PeriodType) => void; // 탭용 (즉시)
  onCustomSubmit: (start: Date, end: Date) => void; // 조회 버튼용
}

const tabMap: { label: string; value: PeriodType; months: number }[] = [
  { label: "1개월", value: "1MONTH", months: 1 },
  { label: "3개월", value: "3MONTH", months: 3 },
  { label: "6개월", value: "6MONTH", months: 6 },
  { label: "12개월", value: "12MONTH", months: 12 },
];

export default function PeriodTabsComponent({
  period,
  onPeriodChange,
  onCustomSubmit,
}: Props) {
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);

  const applyPeriod = (months: number, value: PeriodType) => {
    const end = new Date();
    end.setHours(23, 59, 59, 999);

    const start = new Date(end);
    start.setMonth(start.getMonth() - months);
    start.setDate(1);

    setStartDate(start);
    setEndDate(end);

    onPeriodChange(value); // ✅ 즉시 조회
  };

  // 최초 진입 시 1개월
  useEffect(() => {
    applyPeriod(1, "1MONTH");
  }, []);

  return (
    <P.PeriodTabs>
      <ul>
        {tabMap.map((tab) => (
          <P.Tab
            key={tab.value}
            active={period === tab.value}
            onClick={() => applyPeriod(tab.months, tab.value)}
          >
            {tab.label}
          </P.Tab>
        ))}
      </ul>

      <div>
        <DatePicker
          locale={ko}
          selected={startDate}
          onChange={(date: Date | null) => setStartDate(date)}
          selectsStart
          startDate={startDate}
          endDate={endDate}
          dateFormat="yyyy.MM.dd"
        />

        <span>~</span>

        <DatePicker
          locale={ko}
          selected={endDate}
          onChange={(date: Date | null) => setEndDate(date)}
          selectsEnd
          startDate={startDate}
          endDate={endDate}
          minDate={startDate ?? undefined}
          dateFormat="yyyy.MM.dd"
        />
        <button
          onClick={() => {
            if (!startDate || !endDate) return;
            onCustomSubmit(startDate, endDate); // 🔥 이것만
          }}
        >
          조회
        </button>
      </div>
    </P.PeriodTabs>
  );
}
