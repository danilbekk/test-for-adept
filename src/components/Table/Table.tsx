import React, { useState } from 'react';
import s from './table.module.css';
import TableHeader from '../TableHeader/TableHeader';
import TableRow from '../TableRow';

interface TableProps {
  data: Record<string, string | number>[];
  columns: { key: string; header: string }[];
  onCheckboxChange?: (ids: string[]) => void;
  onEdit: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
  onSave: () => void;
  setEditingData: React.Dispatch<React.SetStateAction<Record<string, string | number>>>;
  editingData: object;
  onDelete: (ids: string | string[], rowData?: Record<string, string | number> | []) => void;
  showCompanyName?: boolean;
  setShowCompanyName?: (showCompanyName: boolean) => void;
}

const Table = ({
  data,
  columns,
  onCheckboxChange,
  onEdit,
  onSave,
  setEditingData,
  editingData,
  onDelete,
  setShowCompanyName,
  showCompanyName = false,
}: TableProps) => {
  const [selectedRowIds, setSelectedRowIds] = useState<Set<string>>(new Set());
  const [selectedAll, setSelectedAll] = useState(false);

  const handleCheckboxChange = (id: string) => {
    const newSelectedRowIds = new Set(selectedRowIds);
    newSelectedRowIds.has(id) ? newSelectedRowIds.delete(id) : newSelectedRowIds.add(id);

    setSelectedRowIds(newSelectedRowIds);
    setSelectedAll(newSelectedRowIds.size === data.length);
    if (onCheckboxChange) {
      onCheckboxChange(Array.from(newSelectedRowIds));
    }
    console.log(newSelectedRowIds.size);

    if (newSelectedRowIds.size > 1 && setShowCompanyName) {
      setShowCompanyName(true);
    } else {
      setShowCompanyName && setShowCompanyName(false);
    }
  };
  console.log(showCompanyName);

  const handleSelectAllChange = () => {
    const ids = data.map((item) => String(item.id));
    const newSelectedRowIds: Set<string> = selectedAll ? new Set() : new Set(ids);

    setSelectedRowIds(newSelectedRowIds);
    setSelectedAll(!selectedAll);
    if (onCheckboxChange) {
      onCheckboxChange(Array.from(newSelectedRowIds));
    }
    if (setShowCompanyName) {
      setShowCompanyName(true);
    }
    if (setShowCompanyName && selectedAll) {
      setShowCompanyName(false);
    }
  };

  const handleDeleteOne = (rowData) => {
    onDelete(rowData.id, rowData);
    const newSelectedRowIds = new Set(selectedRowIds);
    newSelectedRowIds.delete(rowData.id.toString());
    setSelectedRowIds(newSelectedRowIds);
  };

  const handleDeletes = () => {
    onDelete(Array.from(selectedRowIds), data);
    setSelectedRowIds(new Set());
  };

  return (
    <div className={s.table_scroll}>
      <div className={s.table}>
        <TableHeader
          onDelete={handleDeletes}
          columns={columns}
          onSelectAllChange={handleSelectAllChange}
          selectAll={selectedAll}
          selectedRowIds={selectedRowIds}
        />
        <div className={s.tbody}>
          {data.map((rowData) => (
            <div className={`${s.tr} ${selectedRowIds.has(rowData.id) ? s.selected : ''}`} key={rowData.id}>
              <div className={s.sd} data-label="Select">
                <input
                  type="checkbox"
                  checked={selectedRowIds.has(rowData.id)}
                  onChange={() => handleCheckboxChange(rowData.id)}
                />
                <button onClick={() => handleDeleteOne(rowData)} disabled={!selectedRowIds.has(rowData.id)}>
                  Удалить
                </button>
              </div>
              <TableRow
                setEditingData={setEditingData}
                onSave={onSave}
                onEdit={onEdit}
                data={rowData}
                columns={columns}
                editingData={editingData}
                key={rowData.id}
                showCompanyName={showCompanyName}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Table;
