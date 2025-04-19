import { createStore } from "zustand/vanilla";

export const useEmployeeStore = createStore((set) => ({
  employees: [
    {
      firstName: "John",
      lastName: "Doe",
      dateOfEmployment: "23/04/2025",
      dateOfBirth: "23/04/1990",
      phone: "1234567890",
      email: "john.doe@example.com",
      department: "Sales",
      position: "Sales Manager",
    },
    {
      firstName: "Jane",
      lastName: "Doe",
      dateOfEmployment: "23/04/2025",
      dateOfBirth: "23/04/1995",
      phone: "1234567890",
      email: "jane.doe@example.com",
      department: "Sales",
      position: "Sales Manager",
    },
    {
      firstName: "Jim",
      lastName: "Doe",
      dateOfEmployment: "23/04/2025",
      dateOfBirth: "23/04/1990",
      phone: "1234567890",
      email: "jim.doe@example.com",
      department: "Sales",
      position: "Sales Manager",
    },
  ],
  addEmployee: (employee) =>
    set((state) => ({ employees: [...state.employees, employee] })),
}));
