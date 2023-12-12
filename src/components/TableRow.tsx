import React, { useState } from 'react';
import TableRowReadOnly from './TableRowReadOnly/TableRowReadOnly';
import TableRowWithInputs from './TableRowWithInputs/TableRowWithInputs';

interface TableRowProps {
  data: Record<string, string | string>;
  columns: { key: string; header: string }[];
  onEdit: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
  onSave: () => void;
  setEditingData: React.Dispatch<React.SetStateAction<Record<string, string | number>>>;
  editingData: Record<string, string | number>;
  showCompanyName: boolean;
}

const TableRow = ({ data, columns, onEdit, onSave, setEditingData, editingData, showCompanyName }: TableRowProps) => {
  const [isEditing, setIsEditing] = useState(false);

  return !isEditing ? (
    <TableRowReadOnly
      rowData={data}
      columns={columns}
      setIsEditing={setIsEditing}
      setEditingData={setEditingData}
      showCompanyName={showCompanyName}
    />
  ) : (
    <TableRowWithInputs
      rowData={data}
      columns={columns}
      setIsEditing={setIsEditing}
      onEdit={onEdit}
      onSave={onSave}
      editingData={editingData}
    />
  );
};

export default TableRow;
