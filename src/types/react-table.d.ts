import "@tanstack/react-table";

declare module "@tanstack/react-table" {
  interface ColumnMeta<TData, TValue> {
    flex?: number;
    mobileHidden?: boolean;
  }

  interface TableMeta<TData> {
    totalCount?: number;
    currentPage?: number;
    pageSize?: number;
    checkedItems?: string[];
    toggleCheck?: (id: string) => void;
    isAllChecked?: boolean;
    toggleAll?: () => void;
  }
}
