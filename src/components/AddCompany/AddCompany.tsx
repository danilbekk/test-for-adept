import React, { useState } from 'react';
import Modal from '../ui/Modal/Modal';
import { generateUniqueId } from '@/utils/helpers';
import { addCompany } from '@/storage/redux/slices/companySlice';
import { useAppDispatch } from '@/storage/redux/hooks';
import s from './addCompany.module.css';

interface AddCompanyProps {
  activeModal: string | boolean;
  setActiveModal: (arg: boolean) => void;
}
const AddCompany: React.FC<AddCompanyProps> = ({ activeModal, setActiveModal }) => {
  const dispatch = useAppDispatch();

  const [company, setCompany] = useState({
    id: generateUniqueId(),
    name: '',
    address: '',
    employeesCount: 0,
  });
  const addItem = () => {
    const isCompany = activeModal === 'company';

    if (isCompany && company.name.trim() !== '' && company.address.trim() !== '') {
      dispatch(addCompany(company));
      setCompany({ ...company, id: '', name: '', address: '', employeesCount: 0 });
    }
  };

  const handleCompanyChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setCompany((prevData) => ({ ...prevData, [name]: value }));
  };

  return (
    <Modal active={!!activeModal} setActive={setActiveModal}>
      <div className={s.container}>
        {' '}
        <input
          type="text"
          name="name"
          placeholder="Введите название компании"
          value={company.name}
          onChange={handleCompanyChange}
        />
        <input
          type="text"
          name="address"
          placeholder="Введите адрес"
          value={company.address}
          onChange={handleCompanyChange}
        />
        <button onClick={addItem}>Добавить</button>
        <button onClick={() => setActiveModal(false)}>Закрыть</button>
      </div>
    </Modal>
  );
};

export default AddCompany;
