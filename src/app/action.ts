import { FormData } from "./types"

// Save activities to localStorage
export const saveToLocalStorage = (activities: FormData[]) => {
    localStorage.setItem("activities", JSON.stringify(activities));
  };

// Load activities from localStorage
export const loadFromLocalStorage = (): FormData[] | null => {
    const savedActivities = localStorage.getItem("activities");
    return savedActivities ? JSON.parse(savedActivities) : null};