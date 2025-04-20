import { createStore } from "zustand/vanilla";
import { persist, createJSONStorage } from "zustand/middleware";

export const useEmployeeStore = createStore(
  persist(
    (set) => ({
      employees: [],
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
    }),
    {
      name: "employee-storage", // unique name for localStorage key
      storage: createJSONStorage(() => localStorage), // use localStorage
      partialize: (state) => ({ employees: state.employees }), // only persist employees array
    }
  )
);
