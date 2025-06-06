import React from "react";
import { PencilIcon } from "lucide-react";

interface ClientInfo {
  name: string;
  phone: string;
  email?: string;
  address?: string;
  advancePaid?: number;
}

interface ClientInfoCardProps {
  client: ClientInfo;
  onEdit: () => void;
}

const ClientInfoCard: React.FC<ClientInfoCardProps> = ({ client, onEdit }) => {
  return (
    <div className="rounded-xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03]">
      <div className="flex justify-between items-start mb-4">
        <h3 className="text-lg font-semibold text-gray-800 dark:text-white/90">
          Client Information
        </h3>
        <button
          onClick={onEdit}
          className="flex items-center gap-1 text-sm text-blue-600 hover:underline"
        >
          <PencilIcon size={16} />
          Edit
        </button>
      </div>

      <div className="space-y-2 text-sm text-gray-700 dark:text-white/80">
        <p>
          <strong>Name:</strong> {client.name}
        </p>
        <p>
          <strong>Phone:</strong> {client.phone}
        </p>
        {client.email && (
          <p>
            <strong>Email:</strong> {client.email}
          </p>
        )}
        {client.address && (
          <p>
            <strong>Address:</strong> {client.address}
          </p>
        )}
        {client.advancePaid !== undefined && (
          <p>
            <strong>Advance Paid:</strong> ₹{client.advancePaid.toLocaleString()}
          </p>
        )}
      </div>
    </div>
  );
};

export default ClientInfoCard;
