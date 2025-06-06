import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import {
  ArrowLeft,
  MapPin,
  Calendar,
  PlusIcon,
  PencilIcon,
  TableIcon,
  ListIcon,
  ViewIcon,
  // HammerIcon,
  // EditIcon,
  // EyeIcon,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "../../components/ui/table";
import Badge from "../../components/ui/badge/Badge";
import { CloseIcon } from "../../icons";
import SiteForm from "./SiteForm";
import { Modal } from "../../components/ui/modal";
import UnitForm from "./Units/UnitForm";

// Replace with your real data fetching
const mockSiteData = {
  id: "site001",
  name: "Green Valley Residency",
  location: "Coimbatore",
  startDate: "2024-01-10",
  status: "Active",
  units: [
    {
      id: "unit-a1",
      name: "Plot A1",
      siteName: "Green Meadows Phase 2",
      sqft: 1450,
      floors: 2,
      rooms: 4,
      clientName: "Arun Kumar",
      status: "Under Construction",
      startDate: "2024-12-01",
      lastUpdate: "2025-06-04",
      hasClient: true,
      progress: 45,
      photosCount: 8,
      expense: 50000,
    },
    {
      id: "unit-b3",
      name: "Plot B3",
      siteName: "Green Meadows Phase 2",
      sqft: 1200,
      floors: 1,
      rooms: 3,
      status: "Empty Land",
      hasClient: false,
      progress: 0,
      photosCount: 0,
      expense: 50000,
    },
    {
      id: "unit-c2",
      name: "Villa C2",
      siteName: "Sunview Residency",
      sqft: 2000,
      floors: 2,
      rooms: 5,
      clientName: "Meena Raj",
      status: "Constructed",
      hasClient: true,
      progress: 100,
      photosCount: 20,
      lastUpdate: "2025-05-20",
      expense: 50000,
    },
  ],
};

// status values for units:

// Empty Land – Nothing started yet

// Booked – Client has booked this

// Under Construction – Construction started

// Constructed – Fully built

// Handover in Progress – Final phase

// Handed Over – Client has taken possession

const statusStyles: Record<string, string> = {
  "Empty Land": "bg-yellow-100 text-yellow-700",
  Booked: "bg-blue-100 text-blue-700",
  "Under Construction": "bg-orange-100 text-orange-700",
  Constructed: "bg-green-100 text-green-700",
  "Handover in Progress": "bg-purple-100 text-purple-700",
  "Handed Over": "bg-teal-100 text-teal-700",
};

export default function SiteDetails() {
  const { siteId } = useParams();
  const navigate = useNavigate();
  const [siteData, setSiteData]: any = useState(null);
  const [siteModal, setSiteModal] = useState({
    isOpen: false,
    type: "edit",
    data: {},
  });
  const [unitModal, setUnitModal] = useState({
    isOpen: false,
    type: "add",
    data: {},
  });
  const [viewType, setViewType] = useState<"table" | "card">("card");
  const [search, setSearch] = useState("");

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setSiteData(mockSiteData); // Replace with actual fetch by siteId
    }, 1000);
  }, [siteId]);

  const handleAddUnit = () => {
    setUnitModal((preValue: any) => {
      preValue.isOpen = true;
      preValue.type = "add";
      return { ...preValue };
    });
  };

  // const handleUnitSubmit = (data: any) => {
  //   // if (editUnit) {
  //   //   // update
  //   //   setUnits((prev) =>
  //   //     prev.map((u) => (u.id === editUnit.id ? { ...u, ...data } : u))
  //   //   );
  //   // } else {
  //   //   // add
  //   //   setUnits((prev) => [
  //   //     ...prev,
  //   //     { id: Date.now().toString(), ...data },
  //   //   ]);
  //   // }
  //   // setShowUnitModal(false);
  //   setUnitModal((preValue: any) => {
  //     preValue.isOpen = false;
  //     preValue.type = "";
  //     return { ...preValue };
  //   });
  // };

  const filteredUnits = mockSiteData?.units?.filter?.((unit) =>
    unit.name.toLowerCase().includes(search.toLowerCase())
  );

  if (!siteData)
    return (
      <div className="animate-pulse rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] lg:p-6 space-y-6">
        <div className="flex items-center justify-between mb-4">
          <div className="h-6 w-32 bg-gray-200 dark:bg-gray-700 rounded"></div>
          <div className="h-8 w-20 bg-gray-200 dark:bg-gray-700 rounded"></div>
        </div>

        <div className="space-y-2 mb-6">
          <div className="h-6 w-2/3 bg-gray-200 dark:bg-gray-700 rounded"></div>
          <div className="h-4 w-1/3 bg-gray-200 dark:bg-gray-700 rounded"></div>
          <div className="h-4 w-1/2 bg-gray-200 dark:bg-gray-700 rounded"></div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="rounded-xl border border-gray-200 bg-white p-4 dark:border-gray-700 dark:bg-white/[0.03] space-y-3"
            >
              <div className="h-4 w-1/3 bg-gray-200 dark:bg-gray-700 rounded"></div>
              <div className="h-6 w-1/4 bg-gray-200 dark:bg-gray-600 rounded"></div>
            </div>
          ))}
        </div>

        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="h-6 w-24 bg-gray-200 dark:bg-gray-700 rounded"></div>
          <div className="flex gap-2 w-full sm:w-auto">
            <div className="h-10 w-full sm:w-[260px] bg-gray-200 dark:bg-gray-700 rounded"></div>
            <div className="h-10 w-10 bg-gray-200 dark:bg-gray-700 rounded"></div>
            <div className="h-10 w-28 bg-gray-200 dark:bg-gray-700 rounded hidden lg:block"></div>
          </div>
        </div>

        {/* Unit cards */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {[...Array(3)].map((_, i) => (
            <div
              key={`skeleton_unit_${i}`}
              className="rounded-lg border border-gray-200 p-4 shadow-sm dark:border-gray-700 dark:bg-gray-800 space-y-4 animate-pulse"
            >
              <div className="flex items-center justify-between">
                <div className="h-5 w-1/2 bg-gray-200 dark:bg-gray-600 rounded"></div>
                <div className="h-5 w-16 bg-gray-200 dark:bg-gray-600 rounded"></div>
              </div>

              <div className="grid grid-cols-3 gap-4 text-sm">
                <div className="space-y-1">
                  <div className="h-3 w-10 bg-gray-200 dark:bg-gray-700 rounded"></div>
                  <div className="h-4 w-full bg-gray-200 dark:bg-gray-600 rounded"></div>
                </div>
                <div className="space-y-1">
                  <div className="h-3 w-10 bg-gray-200 dark:bg-gray-700 rounded"></div>
                  <div className="h-4 w-full bg-gray-200 dark:bg-gray-600 rounded"></div>
                </div>
                <div className="space-y-1">
                  <div className="h-3 w-10 bg-gray-200 dark:bg-gray-700 rounded"></div>
                  <div className="h-4 w-full bg-gray-200 dark:bg-gray-600 rounded"></div>
                </div>
              </div>

              {/* <div className="space-y-1">
                <div className="h-3 w-20 bg-gray-200 dark:bg-gray-700 rounded"></div>
                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded h-2.5"></div>
                <div className="h-3 w-16 bg-gray-400 dark:bg-gray-600 rounded"></div>
              </div> */}

              <div className="flex justify-between items-center pt-2 border-t dark:border-gray-700 pt-4">
                <div className="flex items-center gap-2">
                  <div className="h-8 w-8 rounded-full bg-gray-200 dark:bg-gray-700"></div>
                  <div className="space-y-1">
                    <div className="h-3 w-20 bg-gray-200 dark:bg-gray-700 rounded"></div>
                    <div className="h-2 w-12 bg-gray-200 dark:bg-gray-700 rounded"></div>
                  </div>
                </div>
                <div className="h-8 w-16 bg-gray-200 dark:bg-gray-700 rounded"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );

  return (
    <>
      <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] lg:p-6">
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
            onClick={() => {
              setSiteModal((preValue) => {
                preValue.isOpen = true;
                preValue.type = "edit";
                return { ...preValue };
              });
            }}
            className="ms-auto inline-flex items-center gap-1 rounded-md border border-gray-300 bg-white px-3 py-1.5 text-sm font-medium text-gray-700 hover:bg-gray-100 dark:bg-white/[0.03] dark:text-white/80 dark:border-gray-700"
          >
            <PencilIcon size={16} />
            Edit
          </button>
        </div>

        {/* Header */}
        <div className="mb-6 text-lg font-semibold text-gray-800 dark:text-white/90 lg:mb-7">
          <h2 className="text-2xl font-bold text-gray-800 dark:text-white/90">
            {siteData.name}
          </h2>
          <p className="text-sm text-gray-500 flex items-center gap-2 mt-1">
            <MapPin className="w-4 h-4" />
            {siteData.location}
          </p>
          <p className="text-sm text-gray-500 flex items-center gap-2">
            <Calendar className="w-4 h-4" />
            Started on: {new Date(siteData.startDate).toLocaleDateString()}
          </p>
        </div>

        <div className="space-y-6">
          {/* Overview Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
            <div className="rounded-xl border border-gray-200 bg-white p-4 dark:border-gray-700 dark:bg-white/[0.03]">
              <h4 className="text-sm text-gray-500">Total Units</h4>
              <p className="text-xl font-semibold text-gray-800 dark:text-white/90">
                {siteData?.units?.length}
              </p>
            </div>
            <div className="rounded-xl border border-gray-200 bg-white p-4 dark:border-gray-700 dark:bg-white/[0.03]">
              <h4 className="text-sm text-gray-500">Total Expense</h4>
              <p className="text-xl font-semibold text-gray-800 dark:text-white/90">
                ₹
                {siteData.units
                  .reduce((sum: any, u: any) => sum + u.expense, 0)
                  .toLocaleString()}
              </p>
            </div>
            <div className="rounded-xl border border-gray-200 bg-white p-4 dark:border-gray-700 dark:bg-white/[0.03]">
              <h4 className="text-sm text-gray-500">Average Progress</h4>
              <p className="text-xl font-semibold text-gray-800 dark:text-white/90">
                {Math.round(
                  siteData.units.reduce((sum : any, u : any) => sum + u.progress, 0) /
                    siteData.units.length
                )}
                %
              </p>
            </div>
          </div>

          {/* header */}
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between mb-5 lg:mb-7">
            {/* Left: Title + Add Button */}
            <div className="flex items-center justify-between sm:justify-start gap-3">
              <h3 className="text-lg font-semibold text-gray-800 dark:text-white/90">
                Plots
              </h3>
              <button
                onClick={handleAddUnit}
                className="sm:hidden flex items-center gap-1 rounded-md bg-blue-600 px-3 py-1.5 text-sm font-semibold text-white hover:bg-blue-700"
              >
                <PlusIcon />
                <span className="">Add Unit</span>
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
                onClick={handleAddUnit}
                className="h-10 hidden lg:flex flex items-center gap-1 rounded-md bg-blue-600 px-3 py-1.5 text-sm font-semibold text-white hover:bg-blue-700"
              >
                <PlusIcon />
                <span className="">Add Plot</span>
              </button>
            </div>
          </div>

          {viewType == "card" && (
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {filteredUnits?.map((unit) => (
                <div
                  key={`unit_${unit.id}`}
                  className="rounded-lg border border-gray-200 p-4 shadow-sm dark:border-gray-700 dark:bg-gray-800 transition hover:shadow-md space-y-4"
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-800 dark:text-white">
                        {unit.name}
                      </h3>
                      {/* <p className="text-xs text-gray-500">{unit.siteName}</p> */}
                    </div>
                    <span
                      className={`text-xs text-center px-3 py-1 rounded-full font-medium capitalize ${
                        unit.status
                          ? statusStyles[unit.status]
                          : "bg-gray-100 text-gray-600"
                      }`}
                    >
                      {unit.status}
                    </span>
                  </div>

                  <div className="grid grid-cols-3 gap-4 text-sm text-gray-600 dark:text-gray-300">
                    <div>
                      <p className="text-xs text-gray-400">Area</p>
                      <p>{unit.sqft} sqft</p>
                    </div>

                    {unit.status != "Empty Land" && (
                      <>
                        <div>
                          <p className="text-xs text-gray-400">Floors</p>
                          <p>{unit.floors || "N/A"}</p>
                        </div>
                        <div>
                          <p className="text-xs text-gray-400">Rooms</p>
                          <p>{unit.rooms || "N/A"}</p>
                        </div>
                      </>
                    )}
                  </div>

                  {/* {unit.status != "Empty Land" && (
                    <div>
                      <p className="text-xs text-gray-400 mb-1">Progress</p>
                      <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5">
                        <div
                          className="bg-blue-500 h-2.5 rounded-full"
                          style={{ width: `${unit.progress}%` }}
                        />
                      </div>
                      <p className="text-xs mt-1 text-gray-500">
                        {unit.progress}% complete
                      </p>
                    </div>
                  )} */}

                  {/* view / client / edit */}
                  <div className="left-0 right-0 transition-all pt-2 border-t flex items-center justify-between text-sm">
                    {unit?.hasClient ? (
                      <div className="flex items-center gap-2">
                        <div className="h-8 w-8 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center text-sm font-semibold uppercase">
                          {unit?.clientName?.[0]}
                        </div>
                        <div>
                          <p className="text-gray-800 dark:text-white">
                            {unit?.clientName}
                          </p>
                          <p className="text-xs text-gray-500">Client</p>
                        </div>
                      </div>
                    ) : (
                      <p className="text-xs text-gray-500">No client linked</p>
                    )}

                    <div className="flex gap-2">
                      <button
                        title="View"
                        className="p-2 text-blue-700"
                        onClick={() => {
                          navigate(`/sites/${siteId}/units/${unit.id}`);
                        }}
                      >
                        {/* <EyeIcon className="w-4 h-4 text-gray-700 dark:text-white" /> */}
                        View
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {viewType == "table" && (
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
                        Unit Name
                      </TableCell>
                      <TableCell
                        isHeader
                        className="px-5 py-3 font-medium text-gray-500 text-start text-sm dark:text-gray-400"
                      >
                        Status
                      </TableCell>
                      <TableCell
                        isHeader
                        className="px-5 py-3 font-medium text-gray-500 text-start text-sm dark:text-gray-400"
                      >
                        Expense
                      </TableCell>
                      <TableCell
                        isHeader
                        className="px-5 py-3 font-medium text-gray-500 text-start text-sm dark:text-gray-400"
                      >
                        Progress
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
                    {filteredUnits?.map((unit: any) => (
                      <TableRow key={`unit_${unit.id}`}>
                        <TableCell className="px-4 py-3 text-gray-500 text-start text-base dark:text-gray-400">
                          {unit.name}
                        </TableCell>
                        <TableCell className="px-4 py-3 text-gray-500 text-start text-base dark:text-gray-400">
                          <Badge
                            size="sm"
                            color={
                              unit.status === "In Progress"
                                ? "success"
                                : unit.status === "Not Started"
                                ? "warning"
                                : "error"
                            }
                          >
                            {unit.status}
                          </Badge>
                        </TableCell>
                        <TableCell className="px-4 py-3 text-gray-500 text-start text-base dark:text-gray-400">
                          ₹{unit.expense.toLocaleString()}
                        </TableCell>
                        <TableCell className="px-4 py-3 text-gray-500 text-start text-base dark:text-gray-400">
                          {unit.progress}%
                        </TableCell>
                        <TableCell className="px-4 py-3 text-gray-500 text-start text-base dark:text-gray-400">
                          <ViewIcon
                            onClick={() => {
                              navigate(`/sites/${siteId}/units/${unit.id}`);
                            }}
                          />
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </div>
          )}

          {/* </div> */}
        </div>
      </div>
      {/* SiteModal */}
      <Modal
        isOpen={siteModal.isOpen}
        onClose={() => {
          setSiteModal((preValue: any) => {
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
              {`${siteModal.type == "add" ? "Add " : "Edit "}Site Information`}
            </h4>
            {/* <p className="mb-6 text-sm text-gray-500 dark:text-gray-400 lg:mb-7">
              Update your details to keep your profile up-to-date.
            </p> */}
          </div>
          <SiteForm
            type={siteModal.type}
            initialData={siteModal.data}
            onSubmit={() => {}}
            onCancel={() => {
              setSiteModal((preValue: any) => {
                preValue.isOpen = true;
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
              {`${unitModal.type == "add" ? "Add " : "Edit "}Plot Information`}
            </h4>
            {/* <p className="mb-6 text-sm text-gray-500 dark:text-gray-400 lg:mb-7">
              Update your details to keep your profile up-to-date.
            </p> */}
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
}
