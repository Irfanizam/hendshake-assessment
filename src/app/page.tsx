"use client";

import { useState, useEffect } from "react";
import { loadFromLocalStorage, saveToLocalStorage } from "./action";
import Form from "./form";
import { FormData } from "./types";
import styles from "./styles.module.css";

export default function Home() {
  // State for storing activities
  const [activities, setActivities] = useState<FormData[]>([]);

  // Load activities from localStorage on page load
  useEffect(() => {
    const savedActivities = loadFromLocalStorage();
    if (savedActivities) {
      setActivities(savedActivities);
    }
  }, []);

  // Handle form submission: Add new activity
  const handleFormSubmit = (data: FormData) => {
    setActivities((prevActivities) => {
      const updatedActivities = [...prevActivities, data];
      saveToLocalStorage(updatedActivities);
      return updatedActivities;
    });
  };

  // Handle deletion of an activity
  const handleDelete = (index: number) => {
    const updatedActivities = activities.filter((_, i) => i !== index);
    setActivities(updatedActivities);
    saveToLocalStorage(updatedActivities);
  };

  return (
    <div className={styles.pageContainer}>
      <Form onSubmit={handleFormSubmit} />

      <div className={styles.activitySummary}>
        <h1 className={styles.header}>Activity To-Do List</h1>
        <h2>Total Activities: {activities.length}</h2>
        <ul className={styles.activityList}>
          {activities.map((activity, index) => (
            <li key={index} className={styles.activityItem}>
              <div>
                <strong>{activity.activity}</strong> - {activity.price} -{" "}
                {activity.type} -
                {activity.bookingRequired
                  ? " Booking Required"
                  : " No Booking Required"}{" "}
                - Accessibility: {activity.accessibility.toFixed(2)}
              </div>
              <button
                className={styles.deleteButton}
                onClick={() => handleDelete(index)}
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
