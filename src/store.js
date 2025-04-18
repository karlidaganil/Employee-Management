import { createStore } from "zustand/vanilla";

export const useEmployeeStore = createStore((set) => ({
  employees: [
    {
      firstName: "John",
      lastName: "Doe",
      dateOfEmployment: "2020-01-01",
      dateOfBirth: "1990-01-01",
      phone: "1234567890",
      email: "john.doe@example.com",
      department: "Sales",
      position: "Sales Manager",
    },
    {
      firstName: "Jane",
      lastName: "Doe",
      dateOfEmployment: "2020-01-01",
      dateOfBirth: "1995-02-01",
      phone: "1234567890",
      email: "jane.doe@example.com",
      department: "Sales",
      position: "Sales Manager",
    },
    {
      firstName: "Jim",
      lastName: "Doe",
      dateOfEmployment: "2020-01-01",
      dateOfBirth: "1990-01-01",
      phone: "1234567890",
      email: "jim.doe@example.com",
      department: "Sales",
      position: "Sales Manager",
    },
  ],
  addEmployee: (employee) =>
    set((state) => ({ employees: [...state.employees, employee] })),
}));
