import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '@/storage/redux/hooks';
import Table from './Table/Table';
import { deleteCompanies, editCompany, fetchCompanies } from '@/storage/redux/slices/companySlice';
import { deleteEmployeesByCompanyId } from '@/storage/redux/slices/employeeSlice';
import { CompanyType } from '@/interfaces/companyModel';

interface CompanyTableProps {
  onCheckboxChange: (ids: string[]) => void;
  setShowCompanyName: (showCompanyName: boolean) => void
}

const columns = [
  { key: 'name', header: 'Название компании' },
  { key: 'employeesCount', header: 'Кол-во сотрудников' },
  { key: 'address', header: 'Адрес' },
];

const CompanyTable: React.FC<CompanyTableProps> = ({ onCheckboxChange, setShowCompanyName }) => {
  const dispatch = useAppDispatch();
  const companies = useAppSelector((state) => state.companies.companies);
  const [company, setCompany] = useState<CompanyType>({
    id: '',
    name: '',
    address: '',
    employeesCount: 0,
  });

  useEffect(() => {
    dispatch(fetchCompanies());
  }, [dispatch]);

  const handleEditCompany = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    const { name, value } = event.target;
    setCompany({ ...company, [name]: value });
  };

  const onSaveCompany = () => {
    dispatch(editCompany(company));
  };

  const onDeleteCompanies = (ids: string | string[]) => {
    dispatch(deleteCompanies(ids));
    dispatch(deleteEmployeesByCompanyId(ids));
  };

  return (
    <>
      <Table
        data={companies}
        columns={columns}
        onCheckboxChange={onCheckboxChange}
        onEdit={handleEditCompany}
        onSave={onSaveCompany}
        setEditingData={setCompany}
        editingData={company}
        onDelete={onDeleteCompanies}
        setShowCompanyName={setShowCompanyName}
      />
    </>
  );
};

export default CompanyTable;
