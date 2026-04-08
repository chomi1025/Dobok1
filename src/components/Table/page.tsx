import * as O from "./style";

export interface Column<T> {
  key: keyof T | string;
  label: React.ReactNode;
  hideLabel?: boolean;
  width?: string;
  flex?: number;
  align?: "left" | "center" | "right";
  render?: (row: T, idx: number) => React.ReactNode;
}

interface tableProps<T> {
  columns: Column<T>[];
  data: T[];
  pricing?: boolean;
  isLoading?: boolean;
}

export const Table = <T extends { id?: number }>({
  columns,
  data,
  isLoading,
}: tableProps<T>) => {
  return (
    <O.Section>
      {/* 헤더 */}
      <O.Header>
        {columns?.map((col) => (
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
        {isLoading ? (
          [...Array(3)].map((_, idx) => (
            <O.Row key={`skeleton-${idx}`}>
              {columns.map((col) => (
                <O.Info
                  key={String(col.key)}
                  style={{ flex: col.flex }}
                  align={col.align}
                >
                  <div className="common-skeleton-bar" />
                </O.Info>
              ))}
            </O.Row>
          ))
        ) : data.length === 0 ? (
          <O.Row>
            <O.Info align="center" style={{ flex: 1 }} className="empty-text">
              데이터가 없습니다.
            </O.Info>
          </O.Row>
        ) : (
          data.map((row, idx) => (
            <O.Row key={row.id ?? idx}>
              {columns?.map((col) => (
                <O.Info
                  key={String(col.key)}
                  align={col.align}
                  style={{ flex: col.flex }}
                >
                  {col.render
                    ? col.render(row, idx)
                    : String(row[col.key as keyof T] || "")}
                </O.Info>
              ))}
            </O.Row>
          ))
        )}
      </O.Body>
    </O.Section>
  );
};
