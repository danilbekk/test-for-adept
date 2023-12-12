import React from 'react';
import s from './tableHeader.module.css';

interface Column {
  key: string;
  header: string;
}

interface TableHeaderProps {
  columns: Column[];
  onSelectAllChange: () => void;
  selectAll: boolean;
  selectedRowIds: Set<string>;
  onDelete: () => void;
}

const TableHeader: React.FC<TableHeaderProps> = ({ columns, onSelectAllChange, selectAll, selectedRowIds, onDelete }) => (
  <div className={s.thead}>
    <div className={s.tr}>
      <div className={s.th}>
        <input type="checkbox" checked={selectAll} onChange={onSelectAllChange} />
        <button onClick={onDelete} disabled={!selectedRowIds.size}>
          Удалить
        </button>
      </div>
      {columns?.map((column) => (
        <div className={s.th} key={column.key}>
          {column.header}
        </div>
      ))}
      <div className={s.th}>Действия</div>
    </div>
  </div>
);

export default TableHeader;
