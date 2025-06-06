import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  CloseIcon,
  HorizontaLDots,
  ListIcon,
  PlusIcon,
  TableIcon,
} from "../../icons";
import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "../../components/ui/table";
import Badge from "../../components/ui/badge/Badge";
import { Modal } from "../../components/ui/modal";
import SiteForm from "./SiteForm";
import {
  BuildingIcon,
  CalendarIcon,
  Layers3Icon,
  MapPinIcon,
  ViewIcon,
} from "lucide-react";

interface Site {
  id: string;
  name: string;
  unitsCount: number;
  location: string;
  startDate: string;
  status: "Active" | "Completed" | "On Hold";
}

const mockSites: Site[] = [
  {
    id: "green-villa",
    name: "Green Villa Site",
    unitsCount: 12,
    location: "Chennai",
    startDate: "2024-11-01",
    status: "Active",
  },
  {
    id: "lakeview",
    name: "Lakeview Estate",
    unitsCount: 8,
    location: "Coimbatore",
    startDate: "2024-06-15",
    status: "On Hold",
  },
  {
    id: "sunset-garden",
    name: "Sunset Garden",
    unitsCount: 20,
    location: "Madurai",
    startDate: "2023-10-10",
    status: "Completed",
  },
];

export default function Sites() {
  const navigate = useNavigate();
  const [viewType, setViewType] = useState<"table" | "card">("card");
  const [search, setSearch] = useState("");
  const [siteModal, setSiteModal] = useState({
    isOpen: false,
    type: "add",
    data: {},
  });

  const statusColors = {
    Active: "bg-green-100 text-green-800",
    Completed: "bg-blue-100 text-blue-800",
    "On Hold": "bg-yellow-100 text-yellow-800",
  };

  const filteredSites = mockSites.filter((site) =>
    site.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <>
      <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] lg:p-6">
        {/* header */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between mb-5 lg:mb-7">
          {/* Left: Title + Add Button */}
          <div className="flex items-center justify-between sm:justify-start gap-3">
            <h3 className="text-lg font-semibold text-gray-800 dark:text-white/90">
              Sites
            </h3>
            <button
              onClick={() => {
                // navigate("/sites/add")
                setSiteModal((preValue: any) => {
                  preValue.isOpen = true;
                  preValue.type = "add";
                  return { ...preValue };
                });
              }}
              className="sm:hidden flex items-center gap-1 rounded-md bg-blue-600 px-3 py-1.5 text-sm font-semibold text-white hover:bg-blue-700"
            >
              <PlusIcon />
              <span className="">Add Site</span>
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
                setSiteModal((preValue: any) => {
                  preValue.isOpen = true;
                  preValue.type = "add";
                  return { ...preValue };
                });
              }}
              className="h-10 hidden lg:flex flex items-center gap-1 rounded-md bg-blue-600 px-3 py-1.5 text-sm font-semibold text-white hover:bg-blue-700"
            >
              <PlusIcon />
              <span className="">Add Site</span>
            </button>
          </div>
        </div>

        {viewType === "card" && (
          <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            {filteredSites.map((site) => (
              <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm hover:shadow-md dark:bg-white/[0.05] dark:border-gray-800 transition-shadow">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <BuildingIcon className="text-blue-600" size={20} />
                    <h2 className="text-lg font-semibold text-gray-800 dark:text-white/90">
                      {site.name}
                    </h2>
                  </div>
                  <span
                    className={`text-xs px-2 py-1 rounded-full font-medium ${
                      site.status === "Active"
                        ? "bg-green-100 text-green-700"
                        : site.status === "Completed"
                        ? "bg-blue-100 text-blue-700"
                        : "bg-yellow-100 text-yellow-700"
                    }`}
                  >
                    {site.status}
                  </span>
                </div>

                <div className="text-sm text-gray-700 dark:text-gray-300 space-y-2">
                  <div className="flex items-center gap-2">
                    <MapPinIcon size={16} />
                    <span>{site.location}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CalendarIcon size={16} />
                    <span>
                      Start Date:{" "}
                      {new Date(site.startDate).toLocaleDateString()}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Layers3Icon size={16} />
                    <span>Total Units: {site.unitsCount}</span>
                  </div>
                </div>

                <div className="mt-4 flex justify-end gap-3">
                  <button
                    onClick={() => navigate(`/sites/${site.id}`)}
                    className="text-sm text-blue-600 hover:underline"
                  >
                    View
                  </button>
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
                        Site Name
                      </TableCell>
                      <TableCell
                        isHeader
                        className="px-5 py-3 font-medium text-gray-500 text-start text-sm dark:text-gray-400"
                      >
                        Location
                      </TableCell>
                      <TableCell
                        isHeader
                        className="px-5 py-3 font-medium text-gray-500 text-start text-sm dark:text-gray-400"
                      >
                        Units
                      </TableCell>
                      <TableCell
                        isHeader
                        className="px-5 py-3 font-medium text-gray-500 text-start text-sm dark:text-gray-400"
                      >
                        Start Date
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
                        Actions
                      </TableCell>
                    </TableRow>
                  </TableHeader>

                  {/* Table Body */}
                  <TableBody className="divide-y divide-gray-100 dark:divide-white/[0.05]">
                    {filteredSites.map((site) => (
                      <TableRow key={`site_${site.id}`}>
                        <TableCell className="px-4 py-3 text-gray-500 text-start text-base dark:text-gray-400">
                          {site.name}
                        </TableCell>
                        <TableCell className="px-4 py-3 text-gray-500 text-start text-base dark:text-gray-400">
                          {site.location}
                        </TableCell>
                        <TableCell className="px-4 py-3 text-gray-500 text-start text-base dark:text-gray-400">
                          {site.unitsCount}
                        </TableCell>
                        <TableCell className="px-4 py-3 text-gray-500 text-start text-base dark:text-gray-400">
                          {new Date(site.startDate).toLocaleDateString()}
                        </TableCell>
                        <TableCell className="px-4 py-3 text-gray-500 text-start text-base dark:text-gray-400">
                          <Badge
                            size="sm"
                            color={
                              site.status === "Completed"
                                ? "success"
                                : site.status === "Active"
                                ? "warning"
                                : "error"
                            }
                          >
                            {site.status}
                          </Badge>
                        </TableCell>
                        <TableCell className="px-4 py-3 text-gray-500 text-start text-base dark:text-gray-400">
                          {/* <HorizontaLDots /> */}
                          <ViewIcon
                            onClick={() => {
                              navigate(`/sites/${site.id}`);
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
    </>
  );
}
