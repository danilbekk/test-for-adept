import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { CompanyType } from '@/interfaces/companyModel';
import axios from 'axios';
import { EmployeeType } from '@/interfaces/employeeModel';
interface UpdateEmployeesCountPayload {
  employeeIds: string[] | string;
  employees: EmployeeType | EmployeeType[];
}

export const fetchCompanies = createAsyncThunk('companies/fetch', async () => {
  try {
    const response = await axios.get('http://localhost:3000/companies');

    return response.data;
  } catch (error) {
    console.error('Error fetching companies:', error);
    throw error;
  }
});

export const addCompany = createAsyncThunk('companies/add', async (data: CompanyType) => {
  await axios.post('http://localhost:3000/companies', data);

  return data;
});

export const editCompany = createAsyncThunk('companies/edit', async (data: CompanyType) => {
  await axios.patch(`http://localhost:3000/companies/${data.id}`, data);

  return data;
});

export const deleteCompanies = createAsyncThunk('companies/delete', async (ids: string | string[]) => {
  try {
    if (typeof ids === 'string') {
      await axios.delete(`http://localhost:3000/companies/${ids}`);
    } else {
      const requests = ids.map((ids) => axios.delete(`http://localhost:3000/companies/${ids}`));
      await axios.all(requests);
    }

    return ids;
  } catch (error) {
    console.error('Error deleting companies:', error);
    throw error;
  }
});

export const updateEmployeesCountOnAdd = createAsyncThunk(
  'companies/updateEmployeesCountOnAdd',
  async (companyId: string) => {
    const responseCompany = await axios.get(`http://localhost:3000/companies/${companyId}`);

    await axios.patch(`http://localhost:3000/companies/${companyId}`, {
      employeesCount: responseCompany.data.employeesCount + 1,
    });

    return companyId;
  },
);

export const updateEmployeesCountOnDelete = createAsyncThunk(
  'companies/updateEmployeesCountOnDelete',
  async ({ employeeIds, employees }: UpdateEmployeesCountPayload) => {
    try {
      if (!Array.isArray(employees)) {
        const response = await axios.get(`http://localhost:3000/companies/${employees.companyId}`);
        const currentEmployeesCount = response.data.employeesCount;

        const updatedResponse = await axios.patch(`http://localhost:3000/companies/${employees.companyId}`, {
          employeesCount: currentEmployeesCount - 1,
        });
        return updatedResponse.data;
      } else if (Array.isArray(employees)) {
        const employeesFiltered = employees.filter((employee) => employeeIds.includes(employee.id));
        const requests = employeesFiltered.map(async (employee) => {
          const response = await axios.get(`http://localhost:3000/companies/${employee.companyId}`);

          return await axios.patch(`http://localhost:3000/companies/${employee.companyId}`, {
            employeesCount:
              response.data.employeesCount -
              employeesFiltered.filter((employee) => employee.companyId === response.data.id).length,
          });
        });

        const responses = await axios.all(requests);

        return responses.map((response) => response.data);
      }
    } catch (error) {
      console.error('Error updating employees count:', error);
      throw error;
    }
  },
);

const companySlice = createSlice({
  name: 'companySlice',
  initialState: {
    companies: [] as CompanyType[],
    loading: null,
    error: null,
  },
  reducers: {},
  extraReducers(builder) {
    builder.addCase(fetchCompanies.fulfilled, (state, action) => {
      state.companies = action.payload;
    });
    builder.addCase(addCompany.fulfilled, (state, action) => {
      state.companies.push(action.payload);
    });
    builder.addCase(deleteCompanies.fulfilled, (state, action) => {
      const idsToDelete = Array.isArray(action.payload) ? action.payload : [action.payload];
      state.companies = state.companies.filter((company) => !idsToDelete.includes(company.id));
    });
    builder.addCase(editCompany.fulfilled, (state, action) => {
      state.companies = state.companies.map((company) => {
        return company.id === action.payload.id
          ? {
              ...company,
              name: action.payload.name,
              address: action.payload.address,
            }
          : company;
      });
    });
    builder.addCase(updateEmployeesCountOnDelete.fulfilled, (state, action) => {
      state.companies = state.companies.map((company) => {
        const companyFound = Array.isArray(action.payload)
          ? action.payload.find((companyPayload) => companyPayload.id === company.id)
          : action.payload;

        return company.id === companyFound?.id
          ? {
              ...company,
              employeesCount: companyFound.employeesCount,
            }
          : company;
      });
    });
    builder.addCase(updateEmployeesCountOnAdd.fulfilled, (state, action) => {
      state.companies = state.companies.map((company) => {
        return company.id === action.payload
          ? {
              ...company,
              employeesCount: company.employeesCount + 1,
            }
          : company;
      });
    });
  },
});

export default companySlice.reducer;
