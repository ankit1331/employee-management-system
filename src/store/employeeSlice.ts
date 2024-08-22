import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Employee {
  id: number;
  name?: string;
  email?: string;
  joinedDate?: string;
  position?: string;
  status?: string;
  department?: string;
}

interface EmployeeState {
  employees: Employee[];
}

const initialState: EmployeeState = {
  employees: [],
};

const employeeSlice = createSlice({
  name: "employees",
  initialState,
  reducers: {
    addAllEmployees: (state, action: PayloadAction<Employee[]>) => {
      console.log(action.payload);
      state.employees = [...action.payload];
      // state.employees.concat(action.payload);
    },
    addEmployee: (state, action: PayloadAction<Employee>) => {
      state.employees.push(action.payload);
    },
    deleteEmployee: (state, action: PayloadAction<number>) => {
      state.employees = state.employees.filter(
        (employee) => employee.id !== action.payload
      );
    },
    updateEmployee: (state, action: PayloadAction<Employee>) => {
      const index = state.employees.findIndex(
        (employee) => employee.id === action.payload.id
      );
      if (index !== -1) {
        state.employees[index] = action.payload;
      }
    },
  },
});

export const { addAllEmployees, addEmployee, deleteEmployee, updateEmployee } =
  employeeSlice.actions;
export default employeeSlice.reducer;
