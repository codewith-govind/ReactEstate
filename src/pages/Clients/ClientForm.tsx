import React, { useState, useEffect } from "react";

interface ClientFormProps {
  type: String;
  initialData?: {
    name: string;
    phone: string;
    email?: string;
    address?: string;
    advancePaid?: number;
  };
  onSubmit: (data: {
    name: string;
    phone: string;
    email?: string;
    address?: string;
    advancePaid?: number;
  }) => void;
  onClose: () => void;
}

const ClientForm: React.FC<ClientFormProps> = ({
  type,
  initialData,
  onSubmit,
  onClose,
}) => {
  const [name, setName] = useState(initialData?.name || "");
  const [phone, setPhone] = useState(initialData?.phone || "");
  const [email, setEmail] = useState(initialData?.email || "");
  const [address, setAddress] = useState(initialData?.address || "");
  const [advancePaid, setAdvancePaid] = useState(
    initialData?.advancePaid?.toString() || ""
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      name,
      phone,
      email: email.trim() || undefined,
      address: address.trim() || undefined,
      advancePaid: advancePaid ? Number(advancePaid) : undefined,
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block mb-1 font-medium text-gray-700 dark:text-white">
          Name *
        </label>
        <input
          type="text"
          required
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div>
        <label className="block mb-1 font-medium text-gray-700 dark:text-white">
          Phone *
        </label>
        <input
          type="tel"
          required
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          className="w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          pattern="[0-9]{10}"
          title="Enter 10 digit phone number"
        />
      </div>

      <div>
        <label className="block mb-1 font-medium text-gray-700 dark:text-white">
          Email
        </label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div>
        <label className="block mb-1 font-medium text-gray-700 dark:text-white">
          Address
        </label>
        <textarea
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          rows={3}
          className="w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div>
        <label className="block mb-1 font-medium text-gray-700 dark:text-white">
          Advance Paid (₹)
        </label>
        <input
          type="number"
          min={0}
          value={advancePaid}
          onChange={(e) => setAdvancePaid(e.target.value)}
          className="w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div className="flex justify-end gap-3 pt-4 border-t border-gray-200 dark:border-gray-700">
        <button
          type="button"
          onClick={onClose}
          className="rounded-md bg-gray-200 px-4 py-2 text-gray-700 hover:bg-gray-300"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="rounded-md bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
        >
          {type == "add" ? "Save" : "Update"}
        </button>
      </div>
    </form>
  );
};

export default ClientForm;
