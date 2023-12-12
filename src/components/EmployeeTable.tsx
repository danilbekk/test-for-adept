import { useState } from 'react';
import Table from './Table/Table';
import { useAppDispatch, useAppSelector } from '@/storage/redux/hooks';
import { deleteEmployees, editEmployee } from '@/storage/redux/slices/employeeSlice';
import { updateEmployeesCountOnDelete } from '@/storage/redux/slices/companySlice';
import { EmployeeType } from '@/interfaces/employeeModel';

const columns = [
  { key: 'lastName', header: 'Фамилия' },
  { key: 'firstName', header: 'Имя' },
  { key: 'position', header: 'Должность' },
];

interface EmployeeTable {
  showCompanyName: boolean;
}

const EmployeeTable = ({ showCompanyName }: EmployeeTable) => {
  const dispatch = useAppDispatch();
  const employees = useAppSelector((state) => state.employees.employees);

  const [employee, setEmployee] = useState({
    id: '',
    firstName: '',
    lastName: '',
    position: '',
    companyId: '',
  });

  const handleEditEmployee = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    const { name, value } = event.target;

    setEmployee({ ...employee, [name]: value });
  };

  const onSaveEmployee = () => {
    dispatch(editEmployee(employee));
  };

  const onDeleteEmployee = async (ids: string | string[], data: EmployeeType | EmployeeType[]) => {
    await dispatch(deleteEmployees(ids));
    dispatch(updateEmployeesCountOnDelete({ employeeIds: ids, employees: data }));
  };

  return (
    <Table
      data={employees}
      columns={columns}
      onEdit={handleEditEmployee}
      onSave={onSaveEmployee}
      setEditingData={setEmployee}
      editingData={employee}
      onDelete={onDeleteEmployee}
      showCompanyName={showCompanyName}
    />
  );
};

export default EmployeeTable;
