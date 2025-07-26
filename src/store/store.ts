import { create } from "zustand";
import { createJSONStorage, devtools, persist } from "zustand/middleware";

export interface Habit {
  id: string;
  name: string;
  frequency: "daily" | "weekly";
  completedDates: string[];
  createdAt: string;
}
interface HabitState {
  habits: Habit[];
  addHabit: (name: string, frequency: "daily" | "weekly") => void;
  removeHabit: (id: string) => void;
  toggleHabit: (id: string, date: string) => void;
  fetchHabits?: (id: string, date: string) => void;
  isLoading: boolean;
  error: string | null;
}

const useHabitStore = create<HabitState>()(
  devtools(
    persist(
      (set, get) => ({
        habits: [],
        isLoading: false,
        error: null,

        addHabit: (name, frequency) =>
          set((state) => ({
            habits: [
              ...state.habits,
              {
                id: Date.now().toString(),
                name,
                frequency,
                completedDates: [],
                createdAt: new Date().toISOString(),
              },
            ],
          })),

        removeHabit: (id) =>
          set((state) => ({
            habits: state.habits.filter((habit) => habit.id !== id),
          })),

        toggleHabit: (id, date) =>
          set((state) => ({
            habits: state.habits.map((habit) =>
              habit.id === id
                ? {
                    ...habit,
                    completedDates: habit.completedDates.includes(date)
                      ? habit.completedDates.filter((d) => d !== date)
                      : [...habit.completedDates, date],
                  }
                : habit
            ),
          })),

        fetchHabits: async (id, date) => {
          set({ isLoading: true });
          try {
            const currentState = get().habits;
            if (currentState.length > 0) {
              set({ habits: currentState });
              return;
            }
            await new Promise((resolve) => setTimeout(resolve, 1000)); // Simulate API call
            const mockHabits: Habit[] = [
              {
                id: "1",
                name: "Exercise",
                frequency: "daily",
                completedDates: ["2023-10-01", "2023-10-02"],
                createdAt: "2023-10-01T00:00:00Z",
              },
              {
                id: "2",
                name: "Read a book",
                frequency: "weekly",
                completedDates: ["2023-10-01"],
                createdAt: "2023-10-01T00:00:00Z",
              },
            ];
            set({ habits: mockHabits, isLoading: false, error: null });
          } catch (error) {
            set({ isLoading: false, error: "Failed to fetch habits" });
          }
        },
      }),
      {
        name: "habits-local",
        storage: createJSONStorage(() => localStorage),
      }
    )
  )
);

export default useHabitStore;
2;
