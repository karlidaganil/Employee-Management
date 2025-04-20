import { createStore } from "zustand/vanilla";
import { persist, createJSONStorage } from "zustand/middleware";

export const useEmployeeStore = createStore(
  persist(
    (set) => ({
      employees: [
        {
          id: 1,
          firstName: "John",
          lastName: "Doe",
          dateOfEmployment: "2025-04-20",
          dateOfBirth: "1990-04-23",
          phone: "05383976177",
          email: "john.doe@example.com",
          department: "Sales",
          position: "Sales Manager",
          department:"Analytics",
          position:"Junior"
        },
        {
          id: 2,
          firstName: "Jane",
          lastName: "Doe",
          dateOfEmployment: "2025-04-20",
          dateOfBirth: "1995-04-23",
          phone: "05383976177",
          email: "jane.doe@example.com",
          department: "Analytics",
          position: "Junior",
        },
        {
          id: 3,
          firstName: "Jim",
          lastName: "Doe",
          dateOfEmployment: "2025-04-20",
          dateOfBirth: "1990-04-23",
          phone: "05383976177",
          email: "jim.doe@example.com",
          department: "Analytics",
          position: "Junior",
        },
      ],
      viewType: "table",
      addEmployee: (employee) => {
        return set((state) => {
          const exists = state.employees.some(
            (e) => e.email === employee.email
          );
          if (!exists) {
            return {
              employees: [
                ...state.employees,
                { ...employee, id: state.employees.length + 1 },
              ],
            };
          }
          return state;
        });
      },
      updateEmployee: (employee) => {
        return set((state) => ({
          employees: state.employees.map((e) =>
            e.id === employee.id ? employee : e
          ),
        }));
      },
      removeEmployee: (id) =>
        set((state) => ({
          employees: state.employees.filter((employee) => employee.id !== id),
        })),
      setViewType: (viewType) => set({ viewType }),
    }),
    {
      name: "employee-storage", // unique name for localStorage key
      storage: createJSONStorage(() => localStorage), // use localStorage
      partialize: (state) => ({
        employees: state.employees,
        viewType: state.viewType,
      }), // only persist employees array
    }
  )
);
