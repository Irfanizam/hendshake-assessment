"use client";

import { useState, ChangeEvent, FormEvent } from "react";

// Define types for the form data
interface FormData {
  activity: string;
  price: number;
  type: string;
  bookingRequired: boolean;
  accessibility: number;
}

interface FormProps {
  onSubmit: (data: FormData) => void;
}

const Form = ({ onSubmit }: FormProps) => {
  const [formData, setFormData] = useState<FormData>({
    activity: "",
    price: 0,
    type: "education",
    bookingRequired: false,
    accessibility: 0.5,
  });

  // Handle input changes

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
    <form onSubmit={handleSubmit}>
      <div>
        <label>Activity:
          <input type="text" name="activity" value={formData.activity} onChange={} required />
        </label>
      </div>
      <div>
        <label>Price:
          <input type="number" name="price" value={formData.price} onChange={} required min="0" />
        </label>
      </div>
      <div>
        <label>Type:
          <select name="type" value={formData.type} onChange={}>
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
      </div>
      <div>
        <label>Booking Required:
          <input type="checkbox" name="bookingRequired" checked={formData.bookingRequired} onChange={} />
        </label>
      </div>
      <div>
        <label>Accessibility (0.0 - 1.0):
          <input type="range" name="accessibility" min="0" max="1" step="0.01" value={formData.accessibility} onChange={} />
          {formData.accessibility.toFixed(2)}
        </label>
      </div>
      <button type="submit">Add Activity</button>
    </form>
  );
};

export default Form;
