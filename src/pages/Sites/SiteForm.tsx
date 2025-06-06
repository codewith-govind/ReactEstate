// components/SiteForm.tsx
import React, { useState, useEffect } from "react";

export interface SiteData {
  name: string;
  location: string;
  startDate: string;
  status: "Active" | "Completed" | "Pending";
}

interface SiteFormProps {
  type:String;
  initialData?: Partial<SiteData>;
  onSubmit: (data: any) => void;
  onCancel?: () => void;
}

const SiteForm: React.FC<SiteFormProps> = ({ type,initialData, onSubmit, onCancel }) => {
  const [form, setForm] = useState <Partial<SiteData>>({
    name: "",
    location: "",
    startDate: "",
    status: "Active",
  });

  useEffect(() => {
    if (initialData) {
      setForm(initialData);
    }
  }, [initialData]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(form);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-white mb-1">
          Site Name *
        </label>
        <input
          type="text"
          name="name"
          value={form.name}
          onChange={handleChange}
          required
          className="w-full rounded-md border px-4 py-2 dark:bg-gray-800 dark:border-gray-700 dark:text-white"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-white mb-1">
          Location *
        </label>
        <input
          type="text"
          name="location"
          value={form.location}
          onChange={handleChange}
          required
          className="w-full rounded-md border px-4 py-2 dark:bg-gray-800 dark:border-gray-700 dark:text-white"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-white mb-1">
          Start Date *
        </label>
        <input
          type="date"
          name="startDate"
          value={form.startDate}
          onChange={handleChange}
          required
          className="w-full rounded-md border px-4 py-2 dark:bg-gray-800 dark:border-gray-700 dark:text-white"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-white mb-1">
          Status
        </label>
        <select
          name="status"
          value={form.status}
          onChange={handleChange}
          className="w-full rounded-md border px-4 py-2 dark:bg-gray-800 dark:border-gray-700 dark:text-white"
        >
          <option value="Active">Active</option>
          <option value="Completed">Completed</option>
          <option value="Pending">Pending</option>
        </select>
      </div>

      <div className="flex justify-end gap-3">
        {onCancel && (
          <button
            type="button"
            onClick={onCancel}
            className="px-4 py-2 rounded-md border dark:border-gray-700 text-gray-600 dark:text-white"
          >
            Cancel
          </button>
        )}
        <button
          type="submit"
          className="bg-blue-600 text-white px-5 py-2 rounded-md hover:bg-blue-700"
        >
          {type == "add" ? "Save" : "Update"}
        </button>
      </div>
    </form>
  );
};

export default SiteForm;
