import DatePicker from "react-datepicker";
import * as P from "./style";
import { ko } from "date-fns/locale";
import { useState, useEffect } from "react";
import { subMonths } from "date-fns";

export default function PeriodTabsComponent() {
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [active, setActive] = useState<number>(1);
  const [endDate, setEndDate] = useState<Date | null>(null);

  const setPeriod = (months: number) => {
    const end = new Date();
    const start = subMonths(end, months);

    setStartDate(start);
    setEndDate(end);
    setActive(months);
  };

  const handleSearch = () => {
    if (!startDate || !endDate) {
      alert("조회 기간을 선택해주세요.");
      return;
    }
    // 여기서 API 호출 or router.push
  };

  useEffect(() => {
    setPeriod(1);
  }, []);

  return (
    <>
      <P.PeriodTabs>
        <ul>
          <P.Tab active={active == 1} onClick={() => setPeriod(1)}>
            1개월
          </P.Tab>

          <P.Tab active={active == 3} onClick={() => setPeriod(3)}>
            3개월
          </P.Tab>

          <P.Tab active={active == 6} onClick={() => setPeriod(6)}>
            6개월
          </P.Tab>

          <P.Tab active={active == 12} onClick={() => setPeriod(12)}>
            12개월
          </P.Tab>
        </ul>

        <div>
          <DatePicker
            locale={ko}
            selected={startDate}
            onChange={(date: Date | null) => setStartDate(date)}
            selectsStart
            startDate={startDate}
            endDate={endDate}
            placeholderText="시작일"
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
            placeholderText="종료일"
            dateFormat="yyyy.MM.dd"
          />

          <button onClick={handleSearch}>조회</button>
        </div>
      </P.PeriodTabs>
    </>
  );
}
