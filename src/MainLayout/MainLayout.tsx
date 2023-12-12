import { useState } from 'react';
import CompanyTable from '../components/CompanyTable';
import EmployeeTable from '../components/EmployeeTable';
import { useAppDispatch, useAppSelector } from '../storage/redux/hooks';
import { fetchEmployeesByCompanyId } from '../storage/redux/slices/employeeSlice';
import AddCompany from '../components/AddCompany/AddCompany';
import AddEmployee from '../components/AddEmployee/AddEmployee';
import s from './mainLayout.module.css';

function MainLayout() {
  const dispatch = useAppDispatch();
  const employees = useAppSelector((state) => state.employees.employees);
  const [activeModal, setActiveModal] = useState<boolean | string>();
  const [showCompanyName, setShowCompanyName] = useState(false)
  const getEmployeesById = (ids: string[]) => {
    dispatch(fetchEmployeesByCompanyId(ids));
  };

  return (
    <div>
      <div className={s.addButtons}>
        <button onClick={() => setActiveModal('company')}>Добавить компанию</button>
        <button onClick={() => setActiveModal('employee')}>Добавить сотрудника</button>
      </div>
      <div className={s.content}>
        <CompanyTable onCheckboxChange={getEmployeesById} setShowCompanyName={setShowCompanyName}/>
        {employees.length !== 0 && <EmployeeTable showCompanyName={showCompanyName} />}
      </div>

      {activeModal === 'company' ? (
        <AddCompany activeModal={activeModal} setActiveModal={setActiveModal} />
      ) : (
        activeModal === 'employee' && <AddEmployee activeModal={activeModal} setActiveModal={setActiveModal} />
      )}
    </div>
  );
}

export default MainLayout;
