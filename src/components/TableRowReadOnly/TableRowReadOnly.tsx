import React from 'react';
import s from './tableRowReadOnly.module.css';

interface Column {
  key: string;
  header: string;
}

interface TableRowReadOnlyProps {
  rowData: Record<string, string | number>;
  columns: Column[];
  setIsEditing: React.Dispatch<React.SetStateAction<boolean>>;
  setEditingData: React.Dispatch<React.SetStateAction<Record<string, string | number>>>;
  showCompanyName: boolean;
}

const TableRowReadOnly = ({
  rowData,
  columns,
  setIsEditing,
  setEditingData,
  showCompanyName,
}: TableRowReadOnlyProps) => {
  return (
    <>
      {columns?.map((column) => (
        <div className={s.td} key={column.key} data-label={column.header}>
          {rowData[column.key]} {showCompanyName && column.key === 'lastName' && `(${rowData.companyName})`}
        </div>
      ))}
      <div className={s.td}>
        <button
          onClick={() => {
            setEditingData(rowData);
            setIsEditing(true);
          }}>
          ✎
        </button>
      </div>
    </>
  );
};

export default TableRowReadOnly;
