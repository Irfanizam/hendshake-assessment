"use client";

import { useState, ChangeEvent, FormEvent } from "react";
import { FormData } from "./types";
import styles from "./styles.module.css";

interface FormProps {
  onSubmit: (data: FormData) => void;
}

const Form = ({ onSubmit }: FormProps) => {
  const [formData, setFormData] = useState<FormData>({
    // Default data on page load
    activity: "",
    price: 0,
    type: "education",
    bookingRequired: false,
    accessibility: 0.5,
  });

  // Handle input changes
  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value, type, checked } = e.target as HTMLInputElement;

    if (type === "checkbox") {
      setFormData({
        ...formData,
        [name]: checked,
      });
    } else if (type === "number") {
      setFormData({
        ...formData,
        [name]: name === "price" ? parseFloat(value) : value,
      });
    } else if (name === "accessibility") {
      setFormData({
        ...formData,
        accessibility: parseFloat(value),
      });
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
    setFormData({
      activity: "",
      price: 0,
      type: "education",
      bookingRequired: false,
      accessibility: 0.5,
    });
  };

  return (
    <div className={styles.formContainer}>
      <form onSubmit={handleSubmit} className={styles.form}>
        <h1 className={styles.formHeader}>Activity Form</h1>

        <label className={styles.label}>
          Activity:
          <input
            className={styles.inputText}
            type="text"
            name="activity"
            value={formData.activity}
            onChange={handleChange}
            required
            placeholder="Enter activity name"
          />
        </label>

        <label className={styles.label}>
          Price:
          <input
            className={styles.inputNumber}
            type="number"
            name="price"
            value={formData.price}
            onChange={handleChange}
            required
            min="0"
          />
        </label>

        <label className={styles.label}>
          Type:
          <select
            className={styles.selectInput}
            name="type"
            value={formData.type}
            onChange={handleChange}
          >
            <option value="education">Education</option>
            <option value="recreational">Recreational</option>
            <option value="social">Social</option>
            <option value="diy">DIY</option>
            <option value="charity">Charity</option>
            <option value="cooking">Cooking</option>
            <option value="relaxation">Relaxation</option>
            <option value="music">Music</option>
            <option value="busywork">Busywork</option>
          </select>
        </label>

        <label className={styles.label}>
          Booking Required:
          <input
            className={styles.checkboxInput}
            type="checkbox"
            name="bookingRequired"
            checked={formData.bookingRequired}
            onChange={handleChange}
          />
        </label>

        <label className={styles.label}>
          Accessibility (0.0 - 1.0):
          <input
            className={styles.rangeInput}
            type="range"
            name="accessibility"
            min="0"
            max="1"
            step="0.01"
            value={formData.accessibility}
            onChange={handleChange}
          />
          <span className={styles.rangeLabel}>
            {formData.accessibility.toFixed(2)}
          </span>
        </label>

        <button type="submit" className={styles.submitButton}>
          Add Activity
        </button>
      </form>
    </div>
  );
};

export default Form;
