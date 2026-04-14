import React from "react";
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

interface TableProps<T> {
  columns: Column<T>[];
  data: T[];
  pricing?: boolean;
  isLoading?: boolean;
  getRowProps?: (row: T) => React.HTMLAttributes<HTMLDivElement>;
}

const TableInner = <T extends { id?: number }>({
  columns,
  data,
  isLoading,
  getRowProps,
}: TableProps<T>) => {
  return (
    <O.Section>
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
            <O.Row key={row.id ?? idx} {...getRowProps?.(row)}>
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

export const Table = React.memo(TableInner) as <T extends { id?: number }>(
  props: TableProps<T>,
) => React.ReactElement;
