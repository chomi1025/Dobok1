import * as O from "./style";

export interface Column<T> {
  key: keyof T;
  label: string;
  width?: string;
  flex?: number;
  align?: "left" | "center" | "right";
  render?: (row: T) => React.ReactNode;
}

interface OrdersTableProps<T> {
  columns: Column<T>[];
  data: T[];
  inquiry: boolean;
}

export const OrdersTable = <T extends { id: number }>({
  columns,
  data,
  inquiry,
}: OrdersTableProps<T>) => {
  return (
    <O.OrdersSection>
      {/* 1:1문의 / 문의하기 버튼 */}
      {inquiry && <O.InquiryButton>문의하기</O.InquiryButton>}

      {/* 헤더 */}
      <O.OrdersHeader>
        {columns.map((col) => (
          <O.OrderInfo key={String(col.key)} style={{ flex: col.flex }}>
            {col.label}
          </O.OrderInfo>
        ))}
      </O.OrdersHeader>

      {/* 데이터 */}
      <O.OrdersBody>
        {data.map((row) => (
          <O.OrdersRow key={row.id}>
            {columns.map((col) => (
              <O.OrderInfo key={String(col.key)} style={{ flex: col.flex }}>
                {col.render ? col.render(row) : String(row[col.key])}
              </O.OrderInfo>
            ))}
          </O.OrdersRow>
        ))}
      </O.OrdersBody>
    </O.OrdersSection>
  );
};
