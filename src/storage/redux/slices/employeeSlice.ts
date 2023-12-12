import { EmployeeType } from '@/interfaces/employeeModel';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchEmployeesByCompanyId = createAsyncThunk('employees/fetchByCompanyIds', async (companyIds: string[]) => {
  try {
    const requests = companyIds.map((companyId) => axios.get(`http://localhost:3000/employees?companyId=${companyId}`));
    const responses = await axios.all(requests);

    const employeesByCompany = responses.map((response) => response.data);
    const combinedData = employeesByCompany.flat();

    return combinedData;
  } catch (error) {
    console.error('Error fetching employees by companyIds:', error);
    throw error;
  }
});

export const addEmployee = createAsyncThunk('employee/add', async (data: EmployeeType) => {
  await axios.post('http://localhost:3000/employees', data);

  return data;
});

export const editEmployee = createAsyncThunk('employees/edit', async (data: EmployeeType) => {
  await axios.patch(`http://localhost:3000/employees/${data.id}`, data);

  return data;
});

export const deleteEmployees = createAsyncThunk('employees/deleteEmployees', async (ids: string | string[]) => {
  try {
    if (typeof ids === 'string') {
      await axios.delete(`http://localhost:3000/employees/${ids}`);
    } else {
      const requests = ids.map((ids) => axios.delete(`http://localhost:3000/employees/${ids}`));
      await axios.all(requests);
    }

    return ids;
  } catch (error) {
    console.error('Error deleting companies:', error);
    throw error;
  }
});

const employeeSlice = createSlice({
  name: 'employeeSlice',
  initialState: {
    employees: [] as EmployeeType[],
    loading: null,
    error: null,
  },
  reducers: {
    deleteEmployeesByCompanyId: (state, action) => {
      const deletedIds = action.payload;

      state.employees = state.employees.filter((employee) => !deletedIds.includes(employee.companyId));
    },
  },
  extraReducers(builder) {
    builder.addCase(fetchEmployeesByCompanyId.fulfilled, (state, action) => {
      state.employees = action.payload;
    });
    builder.addCase(addEmployee.fulfilled, (state, action) => {
      state.employees.push(action.payload);
    });
    builder.addCase(deleteEmployees.fulfilled, (state, action) => {
      const idsToDelete = Array.isArray(action.payload) ? action.payload : [action.payload];
      state.employees = state.employees.filter((employee) => !idsToDelete.includes(employee.id));
    });
    builder.addCase(editEmployee.fulfilled, (state, action) => {
      state.employees = state.employees.map((employee) =>
        employee.id === action.payload.id
          ? {
              ...employee,
              firstName: action.payload.firstName,
              lastName: action.payload.lastName,
              position: action.payload.position,
            }
          : employee,
      );
    });
  },
});

export const { deleteEmployeesByCompanyId } = employeeSlice.actions;
export default employeeSlice.reducer;
