import { flexRender, Table as ReactTable } from "@tanstack/react-table";
import styles from "./UnifiedTable.module.scss";

interface TableProps<T> {
  table: ReactTable<T>;
  className?: string;
  getRowProps?: (row: any) => React.HTMLAttributes<HTMLDivElement>;
}

export function UnifiedTable<T>({
  table,
  className,
  getRowProps,
}: TableProps<T>) {
  return (
    <div className={`${className} ${styles.table}`}>
      <div className={styles.header}>
        {table.getHeaderGroups().map((headerGroup) => (
          <div key={headerGroup.id} className={styles.row}>
            {headerGroup.headers.map((header) => (
              <div
                key={header.id}
                className={`${styles.cell} ${styles.headerCell}`}
                style={{
                  flex: header.column.columnDef.meta?.flex ?? 1,
                }}
              >
                {flexRender(
                  header.column.columnDef.header,
                  header.getContext(),
                )}
              </div>
            ))}
          </div>
        ))}
      </div>

      <div className={styles.body}>
        {table.getRowModel().rows.map((row) => (
          <div
            key={row.id}
            className={styles.row}
            {...(getRowProps ? getRowProps(row) : {})}
          >
            {row.getVisibleCells().map((cell) => (
              <div
                key={cell.id}
                className={styles.cell}
                style={{
                  flex: cell.column.columnDef.meta?.flex ?? 1,
                }}
              >
                {flexRender(cell.column.columnDef.cell, cell.getContext())}
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
