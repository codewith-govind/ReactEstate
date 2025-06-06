import React, { useState } from "react";
import ClientInfoCard from "../../../components/unit/ClientInfoCard";
import ClientForm from "../../Clients/ClientForm";
import UnitPhotos from "../../../components/unit/UnitPhotos";
import ProgressTimeline from "../../../components/unit/ProgressTimeline";
import ExpenseTable from "../../../components/unit/ExpenseTable";
import { Modal } from "../../../components/ui/modal"; // Assume you have a reusable Modal component
import { ArrowLeft, PencilIcon } from "lucide-react";
import { useNavigate, useParams } from "react-router";
import UnitForm from "./UnitForm";

// Sample types (adjust as needed)
interface Client {
  name: string;
  phone: string;
  email?: string;
  address?: string;
  advancePaid?: number;
}

// interface ProgressItem {
//   date: string;
//   title: string;
//   description?: string;
// }

interface Expense {
  id: string;
  date: string;
  description: string;
  amount: number;
}

export const mockUnit = {
  id: "unit-101",
  siteId: "site-001",
  siteName: "Green Valley Residency",
  name: "Villa A1",
  type: "3BHK Duplex", // could be "2BHK Flat", "Independent House", etc.
  areaSqFt: 1650,
  facing: "East",
  floors: 2,
  location: {
    plotNumber: "Plot 12",
    street: "2nd Cross Street",
    locality: "Thiruvalluvar Nagar",
    city: "Chennai",
    name: "Chennai",
    pincode: "600041",
  },
  client: {
    name: "Rajesh Kumar",
    phone: "+91 98765 43210",
    email: "rajesh.kumar@example.com",
    address: "12, Anna Nagar, Chennai, Tamil Nadu - 600040",
    advancePaid: 250000,
    totalBudget: 1500000,
    paymentStatus: "Advance Paid",
  },
  clientName: "Rajesh Kumar",
  clientContact: "+91 98765 43210",
  clientAddress: "12, Anna Nagar, Chennai, TN",
  advancePaid: 250000,
  totalBudget: 1500000,
  startDate: "2024-12-01",
  status: "In Progress", // or "Not Started", "Completed"

  progress: [
    { label: "Foundation", date: "2024-12-10", completed: true },
    { label: "Framing", date: "2025-01-05", completed: true },
    { label: "Roofing", date: "2025-02-01", completed: false },
  ],

  photos: ["/mock-images/unit-101-img1.jpg", "/mock-images/unit-101-img2.jpg"],

  expenses: [
    {
      id: "exp-1",
      title: "Cement Purchase",
      amount: 45000,
      date: "2025-01-02",
      category: "Materials",
    },
    {
      id: "exp-2",
      title: "Sand Delivery",
      amount: 18000,
      date: "2025-01-04",
      category: "Transport",
    },
  ],
};

const UnitDetail: React.FC = () => {
  // Sample static data - replace with your Firebase state/hooks
  const [client, setClient] = useState<Client>({
    name: "Rajesh Kumar",
    phone: "9876543210",
    email: "rajesh@example.com",
    address: "123, MG Road, Chennai",
    advancePaid: 150000,
  });

  const [photos, setPhotos] = useState<string[]>([
    "https://via.placeholder.com/300x200?text=Photo+1",
    "https://via.placeholder.com/300x200?text=Photo+2",
  ]);

  // const [progressItems, setProgressItems] = useState<ProgressItem[]>([
  //   { date: "2025-05-01", title: "Foundation completed" },
  //   {
  //     date: "2025-05-10",
  //     title: "Walls constructed",
  //     description: "Walls reached 2nd floor.",
  //   },
  // ]);


  const progressItems  = [
    { date: "2025-05-01", title: "Foundation completed" },
    {
      date: "2025-05-10",
      title: "Walls constructed",
      description: "Walls reached 2nd floor.",
    },
  ]

  const [expenses, setExpenses] = useState<Expense[]>([
    {
      id: "1",
      date: "2025-05-05",
      description: "Cement purchase",
      amount: 50000,
    },
    { id: "2", date: "2025-05-12", description: "Steel rods", amount: 75000 },
  ]);

  // Modal state for editing client info
  // const [isClientFormOpen, setIsClientFormOpen] = useState(false);

  const { siteId } = useParams();
  const navigate = useNavigate();
  const [unitModal, setUnitModal] = useState({
    isOpen: false,
    type: "edit",
    data: {},
  });
  const [clientModal, setClientModal] = useState({
    isOpen: false,
    type: "edit",
    data: {},
  });

  // const statusColorMap = {
  //   Planned: "bg-yellow-100 text-yellow-800",
  //   "In Progress": "bg-blue-100 text-blue-800",
  //   Completed: "bg-green-100 text-green-800",
  // };

  const handleClientUpdate = (updatedClient: Client) => {
    setClient(updatedClient);
    // setIsClientFormOpen(false);
    // TODO: Save changes to Firebase
  };

  const handleAddPhoto = () => {
    // Dummy logic: add a placeholder photo
    const newPhotoUrl = prompt("Enter photo URL");
    if (newPhotoUrl) setPhotos((prev) => [...prev, newPhotoUrl]);
  };

  const handleRemovePhoto = (index: number) => {
    setPhotos((prev) => prev.filter((_, i) => i !== index));
  };

  const handleEditUnit = (unit: any) => {
    setUnitModal((preValue: any) => {
      preValue.isOpen = true;
      preValue.type = "edit";
      preValue.data = unit;
      return { ...preValue };
    });
  };

  const handleEditClient = (client: any) => {
    setClientModal((preValue: any) => {
      preValue.isOpen = true;
      preValue.type = "edit";
      preValue.data = client;
      return { ...preValue };
    });
  };

  // Add/edit expense handlers would be similar (not shown for brevity)

  return (
    <>
      <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] lg:p-6">
        {/* top */}
        <div className="flex items-center mb-4">
          {/* Back Button */}
          <button
            onClick={() => navigate(-1)}
            className="text-xl inline-flex items-center font-bold text-gray-800 dark:text-white/90 hover:underline"
          >
            <ArrowLeft className="w-5 h-5 mr-1" />
            Back
          </button>
          {/* Edit */}
          <button
            onClick={() => handleEditUnit(mockUnit)}
            className="ms-auto inline-flex items-center gap-1 rounded-md border border-gray-300 bg-white px-3 py-1.5 text-sm font-medium text-gray-700 hover:bg-gray-100 dark:bg-white/[0.03] dark:text-white/80 dark:border-gray-700"
          >
            <PencilIcon size={16} />
            Edit
          </button>
        </div>

        <div className="space-y-6">
          {/* Header */}
          <div className="flex gap-3 items-center justify-between mb-6">
            <div>
              <h2 className="text-xl font-semibold text-gray-800 dark:text-white/90">
                {mockUnit.name}
                <span className="text-sm"> - {mockUnit.areaSqFt} Sqft</span>
              </h2>
              <p
                className="text-sm text-blue-600 cursor-pointer hover:underline"
                onClick={() => navigate(`/sites/${siteId}`)}
              >
                {mockUnit.siteName} : {mockUnit.location.name}
              </p>
            </div>

            <div className="ms-auto flex items-center gap-3">
              <span
                className={`text-sm font-medium px-3 py-1 rounded-full ${
                  mockUnit.status ? "" : ""
                }`}
                // statusColorMap[mockUnit.status]
              >
                {mockUnit.status}
              </span>
            </div>
          </div>

          {/* Client Info with Edit button */}
          <ClientInfoCard
            client={client}
            onEdit={() => handleEditClient(mockUnit.client)}
          />

          {/* Photos */}
          <UnitPhotos
            photos={photos}
            onAddPhoto={handleAddPhoto}
            onRemovePhoto={handleRemovePhoto}
          />

          {/* Progress Timeline */}
          <ProgressTimeline progressItems={progressItems} />

          {/* Expenses */}
          <ExpenseTable
            expenses={expenses}
            onAddExpense={() => alert("Add expense modal TODO")}
            onEditExpense={(id) => alert(`Edit expense ${id} modal TODO`)}
            onDeleteExpense={(id) =>
              setExpenses((prev) => prev.filter((e) => e.id !== id))
            }
          />
        </div>
      </div>

      {/* ClientModal */}
      <Modal
        isOpen={clientModal.isOpen}
        onClose={() => {
          setClientModal((preValue: any) => {
            preValue.isOpen = false;
            preValue.type = "";
            return { ...preValue };
          });
        }}
        className="max-w-[700px] m-4"
      >
        <div className="no-scrollbar relative w-full max-w-[700px] overflow-y-auto rounded-3xl bg-white p-4 dark:bg-gray-900 lg:p-11">
          <div className="mb-3 pr-14">
            <h4 className="mb-2 text-2xl font-semibold text-gray-800 dark:text-white/90">
              {`${
                unitModal.type == "add" ? "Add " : "Edit "
              }Client Information`}
            </h4>
          </div>
          <ClientForm
            type={clientModal.type}
            initialData={client}
            onSubmit={handleClientUpdate}
            onClose={() => {
              setClientModal((preValue: any) => {
                preValue.isOpen = false;
                preValue.type = "";
                return { ...preValue };
              });
            }}
          />
        </div>
      </Modal>

      {/* UnitModal */}
      <Modal
        isOpen={unitModal.isOpen}
        onClose={() => {
          setUnitModal((preValue: any) => {
            preValue.isOpen = false;
            preValue.type = "";
            return { ...preValue };
          });
        }}
        className="max-w-[700px] m-4"
      >
        <div className="no-scrollbar relative w-full max-w-[700px] overflow-y-auto rounded-3xl bg-white p-4 dark:bg-gray-900 lg:p-11">
          <div className="mb-3 pr-14">
            <h4 className="mb-2 text-2xl font-semibold text-gray-800 dark:text-white/90">
              {`${unitModal.type == "add" ? "Add " : "Edit "}Unit Information`}
            </h4>
          </div>
          <UnitForm
            type={unitModal.type}
            initialData={unitModal.data}
            onSubmit={() => {}}
            onCancel={() => {
              setUnitModal((preValue: any) => {
                preValue.isOpen = true;
                preValue.type = "";
                return { ...preValue };
              });
            }}
          />
        </div>
      </Modal>
    </>
  );
};

export default UnitDetail;
