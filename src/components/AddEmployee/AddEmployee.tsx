import { useAppDispatch, useAppSelector } from '@/storage/redux/hooks';
import { addEmployee } from '@/storage/redux/slices/employeeSlice';
import { generateUniqueId } from '@/utils/helpers';
import React, { useState } from 'react';
import Modal from '../ui/Modal/Modal';
import { updateEmployeesCountOnAdd } from '@/storage/redux/slices/companySlice';
import { CompanyType } from '@/interfaces/companyModel';
import s from './addEmployee.module.css';

interface AddEmployeeProps {
  activeModal: string | boolean;
  setActiveModal: (arg: boolean) => void;
}

const AddEmployee: React.FC<AddEmployeeProps> = ({ activeModal, setActiveModal }) => {
  const dispatch = useAppDispatch();
  const companies = useAppSelector((state) => state.companies.companies);
  const [companyId, setCompanyId] = useState('');

  const [employee, setEmployee] = useState({
    id: generateUniqueId(),
    lastName: '',
    firstName: '',
    position: '',
    companyId: '',
    companyName: '',
  });

  const addItem = () => {
    if (employee.lastName.trim() !== '' && employee.firstName.trim() !== '' && employee.position.trim() !== '') {
      dispatch(addEmployee(employee));
      dispatch(updateEmployeesCountOnAdd(companyId));
      setEmployee({ ...employee, id: '', lastName: '', firstName: '', position: '', companyId: '' });
      setCompanyId('');
    }
  };

  const onChangeSelects = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedCompanyId = event.target.value;
    const selectedCompanyName = event.target.options[event.target.selectedIndex].dataset.companyname;

    setCompanyId(selectedCompanyId);
    setEmployee({
      ...employee,
      companyId: selectedCompanyId,
      companyName: selectedCompanyName || '', 
    });
  };

  const handleEmployeeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;

    setEmployee((prevData) => ({ ...prevData, [name]: value }));
  };

  return (
    <Modal active={!!activeModal} setActive={setActiveModal}>
      <div className={s.container}>
        <select onChange={(e) => onChangeSelects(e)} value={companyId}>
          <option value={0}>Выберите компанию...</option>
          {companies.map((item: CompanyType) => (
            <option key={item.id} value={item.id} data-companyname={item.name}>
              {item.name}
            </option>
          ))}
        </select>
        <input
          type="text"
          name="lastName"
          placeholder="Фамилия"
          value={employee.lastName}
          onChange={handleEmployeeChange}
        />
        <input
          type="text"
          name="firstName"
          placeholder="Имя"
          value={employee.firstName}
          onChange={handleEmployeeChange}
        />
        <input
          type="text"
          name="position"
          placeholder="Должность"
          value={employee.position}
          onChange={handleEmployeeChange}
        />
        <button onClick={addItem}>Добавить</button>
        <button onClick={() => setActiveModal(false)}>Закрыть</button>
      </div>
    </Modal>
  );
};

export default AddEmployee;
