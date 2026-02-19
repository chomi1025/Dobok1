import * as O from "./style";

export interface Column<T> {
  key: keyof T;
  label: string;
  width?: string;
  flex?: number;
  align?: "left" | "center" | "right";
  render?: (row: T) => React.ReactNode;
}

interface tableProps<T> {
  columns: Column<T>[];
  data: T[];
  inquiry?: boolean;
}

export const Table = <T extends { id: number }>({
  columns,
  data,
  inquiry,
}: tableProps<T>) => {
  return (
    <O.Section>
      {/* 1:1문의 / 문의하기 버튼 */}
      {inquiry && <O.InquiryButton>문의하기</O.InquiryButton>}

      {/* 헤더 */}
      <O.Header>
        {columns.map((col) => (
          <O.Info
            key={String(col.key)}
            style={{ flex: col.flex }}
            align={col.align}
          >
            {col.label}
          </O.Info>
        ))}
      </O.Header>

      {/* 데이터 */}
      <O.Body>
        {data.map((row) => (
          <O.Row key={row.id}>
            {columns.map((col) => (
              <O.Info
                key={String(col.key)}
                align={col.align}
                style={{ flex: col.flex }}
              >
                {col.render ? col.render(row) : String(row[col.key])}
              </O.Info>
            ))}
          </O.Row>
        ))}
      </O.Body>
    </O.Section>
  );
};
