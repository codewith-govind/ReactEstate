import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { CloseIcon, ListIcon, PlusIcon, TableIcon } from "../../icons";
import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "../../components/ui/table";
import { Modal } from "../../components/ui/modal";
import ClientForm from "./ClientForm";
import {
  HousePlus,
  IdCard,
  IndianRupee,
  MapPinCheckIcon,
  PhoneIcon,
  ViewIcon,
} from "lucide-react";

const mockClients = [
  {
    id: "client-001",
    name: "Rajesh Kumar",
    phone: "+91 98765 43210",
    email: "rajesh.kumar@example.com",
    address: "12, Anna Nagar, Chennai, Tamil Nadu - 600040",
    aadhaarNumber: "1234-5678-9012",
    panNumber: "ABCDE1234F",
    advancePaid: 450000,
    totalBudget: 3000000,
    paymentStatus: "Partial Payment",
    unitsOwned: ["unit-101", "unit-106"],
  },
  {
    id: "client-002",
    name: "Priya Subramaniam",
    phone: "+91 91234 56789",
    email: "priya.s@example.com",
    address: "45, T Nagar, Chennai, Tamil Nadu - 600017",
    aadhaarNumber: "2345-6789-0123",
    panNumber: "FGHIJ5678K",
    advancePaid: 500000,
    totalBudget: 1800000,
    paymentStatus: "Advance Paid",
    unitsOwned: ["unit-102"],
  },
  {
    id: "client-003",
    name: "Mohammed Irfan",
    phone: "+91 99887 66554",
    email: "irfan.m@example.com",
    address: "88, Mylapore, Chennai, Tamil Nadu - 600004",
    aadhaarNumber: "3456-7890-1234",
    panNumber: "KLMNO9101P",
    advancePaid: 0,
    totalBudget: 1400000,
    paymentStatus: "Pending",
    unitsOwned: [],
  },
  {
    id: "client-004",
    name: "Sowmya Ramesh",
    phone: "+91 97654 32109",
    email: "sowmya.r@example.com",
    address: "28, Velachery, Chennai, Tamil Nadu - 600042",
    aadhaarNumber: "4567-8901-2345",
    panNumber: "QRSTU1122V",
    advancePaid: 350000,
    totalBudget: 1650000,
    paymentStatus: "Advance Paid",
    unitsOwned: ["unit-104", "unit-107"],
  },
  {
    id: "client-005",
    name: "Vignesh Chandran",
    phone: "+91 90909 09090",
    email: "vignesh.c@example.com",
    address: "102, Avadi, Chennai, Tamil Nadu - 600062",
    aadhaarNumber: "5678-9012-3456",
    panNumber: "WXYZA3344B",
    advancePaid: 200000,
    totalBudget: 1300000,
    paymentStatus: "Advance Paid",
    unitsOwned: ["unit-105"],
  },
];

export default function Clients() {
  const navigate = useNavigate();
  const [viewType, setViewType] = useState<"table" | "card">("card");
  const [search, setSearch] = useState("");
  const [clientModal, setClientModal] = useState({
    isOpen: false,
    type: "add",
    data: {},
  });

  const filteredClients = mockClients.filter((client) =>
    client.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <>
      <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] lg:p-6">
        {/* header */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between mb-5 lg:mb-7">
          {/* Left: Title + Add Button */}
          <div className="flex items-center justify-between sm:justify-start gap-3">
            <h3 className="text-lg font-semibold text-gray-800 dark:text-white/90">
              Clients
            </h3>
            <button
              onClick={() => {
                // navigate("/sites/add")
                setClientModal((preValue: any) => {
                  preValue.isOpen = true;
                  preValue.type = "add";
                  return { ...preValue };
                });
              }}
              className="sm:hidden flex items-center gap-1 rounded-md bg-blue-600 px-3 py-1.5 text-sm font-semibold text-white hover:bg-blue-700"
            >
              <PlusIcon />
              <span className="">Add Client</span>
            </button>
          </div>

          {/* Right: Search bar + View toggle icon */}
          <div className="flex items-center gap-2 w-full sm:w-auto">
            {/* Search input */}
            <div className="relative flex-grow">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 dark:text-gray-400">
                <svg
                  className="w-4 h-4"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M3.04 9.37a6.33 6.33 0 1 1 12.67 0 6.33 6.33 0 0 1-12.67 0ZM9.37 1.54a7.83 7.83 0 1 0 4.98 13.88l2.83 2.82a.84.84 0 1 0 1.18-1.18l-2.82-2.83A7.83 7.83 0 0 0 9.37 1.54Z"
                  />
                </svg>
              </span>
              <input
                type="text"
                placeholder="Search sites..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full sm:w-[260px] xl:w-[320px] h-10 pl-10 pr-10 rounded-md border border-gray-200 bg-transparent text-sm text-gray-800 placeholder:text-gray-400 dark:border-gray-700 dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/40"
              />
              {search && (
                <button
                  onClick={() => setSearch("")}
                  className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-500 dark:text-gray-400"
                >
                  <CloseIcon className="w-6 h-6" />
                </button>
              )}
            </div>

            {/* Toggle view icon */}
            <button
              onClick={() =>
                setViewType(viewType === "card" ? "table" : "card")
              }
              className=" p-2 rounded-md text-gray-600 bg-gray-100 dark:bg-gray-800"
              title={
                viewType === "card"
                  ? "Switch to Table View"
                  : "Switch to Card View"
              }
            >
              {viewType === "card" ? (
                <ListIcon className="w-6 h-6" />
              ) : (
                <TableIcon className="w-6 h-6" />
              )}
            </button>

            {/* Add Button */}
            <button
              onClick={() => {
                // navigate("/sites/add");
                setClientModal((preValue: any) => {
                  preValue.isOpen = true;
                  preValue.type = "add";
                  return { ...preValue };
                });
              }}
              className="h-10 hidden lg:flex flex items-center gap-1 rounded-md bg-blue-600 px-3 py-1.5 text-sm font-semibold text-white hover:bg-blue-700"
            >
              <PlusIcon />
              <span className="">Add Client</span>
            </button>
          </div>
        </div>

        {viewType === "card" && (
          <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            {filteredClients.map((client) => (
              <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm hover:shadow-md dark:bg-white/[0.05] dark:border-gray-800 transition-shadow">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-3">
                    {/* <UserIcon className="text-blue-600" size={20} /> */}
                    <h2 className="text-lg font-semibold text-gray-800 dark:text-white/90">
                      {client.name}
                    </h2>
                  </div>
                  <span
                    className={`text-center text-xs px-2 py-1 rounded-full font-medium ${
                      client.paymentStatus === "Advance Paid"
                        ? "bg-green-100 text-green-700"
                        : client.paymentStatus === "Partial Payment"
                        ? "bg-yellow-100 text-yellow-700"
                        : "bg-red-100 text-red-700"
                    }`}
                  >
                    {client.paymentStatus}
                  </span>
                </div>

                <div className="space-y-2 text-sm text-gray-700 dark:text-gray-300">
                  {/* <div className="flex items-center gap-2">
                    <MailIcon size={16} />
                    <span>{client.email}</span>
                  </div> */}
                  <div className="flex items-center gap-2">
                    <PhoneIcon size={16} />
                    <span>{client.phone}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPinCheckIcon size={16} />
                    <span>{client.address}</span>
                  </div>
                  {/* <div className="flex items-center gap-2">
                    <IdCard size={16} />
                    <span>Aadhaar : {client.aadhaarNumber}</span>
                  </div> */}
                  <div className="flex items-center gap-2">
                    <IdCard size={16} />
                    <span>PAN : {client.panNumber}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <IndianRupee size={16} />
                    <span>
                      {client.advancePaid.toLocaleString()} / 
                      {" " + client.totalBudget.toLocaleString()}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <HousePlus size={16} />
                    <span>Plots Owned : {client.unitsOwned.length}</span>
                  </div>
                </div>

                <div className="mt-4 flex justify-end gap-3">
                  <button
                    onClick={() => navigate(`/clients/${client.id}`)}
                    className="text-sm text-blue-600 hover:underline"
                  >
                    View
                  </button>
                  {/* <button
                    onClick={() => navigate(`/clients/${client.id}/edit`)}
                    className="text-sm text-gray-600 hover:text-blue-600"
                  >
                    Edit
                  </button> */}
                </div>
              </div>
            ))}
          </div>
        )}

        {viewType === "table" && (
          <div className="space-y-6">
            <div className="overflow-hidden rounded-xl border border-gray-200 bg-white dark:border-white/[0.05] dark:bg-white/[0.03]">
              <div className="max-w-full overflow-x-auto">
                <Table>
                  {/* Table Header */}
                  <TableHeader className="border-b border-gray-100 dark:border-white/[0.05]">
                    <TableRow>
                      <TableCell
                        isHeader
                        className="px-5 py-3 font-medium text-gray-500 text-start text-sm dark:text-gray-400"
                      >
                        Client Name
                      </TableCell>
                      <TableCell
                        isHeader
                        className="px-5 py-3 font-medium text-gray-500 text-start text-sm dark:text-gray-400"
                      >
                        Address
                      </TableCell>
                      <TableCell
                        isHeader
                        className="px-5 py-3 font-medium text-gray-500 text-start text-sm dark:text-gray-400"
                      >
                        Phone
                      </TableCell>
                      <TableCell
                        isHeader
                        className="px-5 py-3 font-medium text-gray-500 text-start text-sm dark:text-gray-400"
                      >
                        Pan No
                      </TableCell>
                      <TableCell
                        isHeader
                        className="px-5 py-3 font-medium text-gray-500 text-start text-sm dark:text-gray-400"
                      >
                        Actions
                      </TableCell>
                    </TableRow>
                  </TableHeader>

                  {/* Table Body */}
                  <TableBody className="divide-y divide-gray-100 dark:divide-white/[0.05]">
                    {filteredClients.map((client) => (
                      <TableRow key={`site_${client.id}`}>
                        <TableCell className="px-4 py-3 text-gray-500 text-start text-base dark:text-gray-400">
                          {client.name}
                        </TableCell>
                        <TableCell className="px-4 py-3 text-gray-500 text-start text-base dark:text-gray-400">
                          {client.address}
                        </TableCell>
                        <TableCell className="px-4 py-3 text-gray-500 text-start text-base dark:text-gray-400">
                          {client.phone}
                        </TableCell>
                        <TableCell className="px-4 py-3 text-gray-500 text-start text-base dark:text-gray-400">
                          {client.panNumber}
                        </TableCell>
                        <TableCell className="px-4 py-3 text-gray-500 text-start text-base dark:text-gray-400">
                          <ViewIcon
                            onClick={() => {
                              navigate(`/clients/${client.id}`);
                            }}
                          />
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </div>
          </div>
        )}
      </div>

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
                clientModal.type == "add" ? "Add " : "Edit "
              }Client Information`}
            </h4>
          </div>
          <ClientForm
            type={clientModal.type}
            initialData={clientModal.data}
            onSubmit={() => {}}
            onCancel={() => {
              setClientModal((preValue: any) => {
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
}
