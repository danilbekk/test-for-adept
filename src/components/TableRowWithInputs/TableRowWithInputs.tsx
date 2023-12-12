import React from 'react';
import s from './tableRowWithInputs.module.css';

interface Column {
  key: string;
  header: string;
}

interface TableRowWithInputsProps {
  rowData: Record<string, string | number>;
  columns: Column[];
  setIsEditing: React.Dispatch<React.SetStateAction<boolean>>;
  editingData: Record<string, string | number>;
  onEdit: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
  onSave: () => void;
}

const TableRowWithInputs = ({
  rowData,
  columns,
  setIsEditing,
  editingData,
  onEdit,
  onSave,
}: TableRowWithInputsProps) => {
  return (
    <>
      {columns?.map((column) => (
        <div className={s.td} key={column.key} data-label={column.header}>
          {column.key === 'employeesCount' ? (
            rowData[column.key]
          ) : (
            <textarea name={column.key} value={(editingData as Record<string, string>)[column.key]} onChange={onEdit} />
          )}
        </div>
      ))}
      <div className={s.td}>
        <button
          onClick={() => {
            onSave();
            setIsEditing(false);
          }}>
          Сохранить
        </button>{' '}
        <button
          onClick={() => {
            setIsEditing(false);
          }}>
          Отменить
        </button>
      </div>
    </>
  );
};

export default TableRowWithInputs;
