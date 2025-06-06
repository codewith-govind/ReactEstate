import React, { useState } from "react";

interface UnitData {
  name: string;
  number: string;
  floorArea?: number;
  status?: "Planned" | "In Progress" | "Completed";
}

interface UnitFormProps {
  type: String;
  initialData?: Partial<UnitData>;
  onSubmit: (formData: UnitData) => void;
  onCancel: () => void;
}

const UnitForm: React.FC<UnitFormProps> = ({
  type,
  initialData,
  onSubmit,
  onCancel,
}) => {
  const [formData, setFormData] = useState<UnitData>({
    name: initialData?.name || "",
    number: initialData?.number || "",
    floorArea: initialData?.floorArea || undefined,
    status: initialData?.status || "Planned",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "floorArea" ? Number(value) : value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-white mb-1">
          Unit Name
        </label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
          className="w-full rounded-lg border border-gray-300 dark:border-gray-700 px-4 py-2 dark:bg-gray-800 dark:text-white"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-white mb-1">
          Unit Number
        </label>
        <input
          type="text"
          name="number"
          value={formData.number}
          onChange={handleChange}
          required
          className="w-full rounded-lg border border-gray-300 dark:border-gray-700 px-4 py-2 dark:bg-gray-800 dark:text-white"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-white mb-1">
          Floor Area (sqft)
        </label>
        <input
          type="number"
          name="floorArea"
          value={formData.floorArea || ""}
          onChange={handleChange}
          className="w-full rounded-lg border border-gray-300 dark:border-gray-700 px-4 py-2 dark:bg-gray-800 dark:text-white"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-white mb-1">
          Status
        </label>
        <select
          name="status"
          value={formData.status}
          onChange={handleChange}
          className="w-full rounded-lg border border-gray-300 dark:border-gray-700 px-4 py-2 dark:bg-gray-800 dark:text-white"
        >
          <option value="Planned">Planned</option>
          <option value="In Progress">In Progress</option>
          <option value="Completed">Completed</option>
        </select>
      </div>

      <div className="flex justify-end gap-3 pt-4">
        <button
          type="button"
          onClick={onCancel}
          className="px-4 py-2 rounded-md bg-gray-200 dark:bg-gray-700 dark:text-white"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="px-4 py-2 rounded-md bg-blue-600 text-white hover:bg-blue-700"
        >
          {type == "add" ? "Save" : "Update"}
        </button>
      </div>
    </form>
  );
};

export default UnitForm;
