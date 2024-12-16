import { useState, useEffect, SetStateAction } from "react";
import { useDeleteVechile, useGetAllVechiles } from "../hooks/vechile";
import Spinner from "../components/Spinner";
import Modal from "../components/Modal";
import Button from "../components/Button";
import {
  FaCalendarAlt,
  FaCar,
  FaGasPump,
  FaTachometerAlt,
} from "react-icons/fa";
import AddNewVechile from "./AddNewVechile";
import ConfirmationModal from "../components/ConfirmationModal";
import UpdateVechile from "../sections/UpdateVechiles";
interface Vehicle {
  _id: string;
  name: string;
  status: string;
  licensePlate: string;
  make: string;
  vehicleModel: string;
  year: number;
  mileage: number;
  fuelType: string;
}
interface GetAllVehiclesResponse {
  vehicles: Vehicle[];
  total: number;
  pages: number;
}
function VehicleTable() {
  const [page, setPage] = useState(1);
  const [limit] = useState(10);
  const [sortField, setSortField] = useState("name");
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");
  const [selectedVehicle, setSelectedVehicle] = useState<{
    _id: string;
    status?: string;
    name?: string;
    licensePlate?: string;
    make?: string;
    vehicleModel?: string;
    year?: number;
    mileage?: number;
    fuelType?: string;
  } | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [addNewVechileModal, setAddNewVechileModal] = useState(false);
  const [updateVechileModal, setUpdateVechileModal] = useState(false);
  const [isConfirmationModalOpen, setIsConfirmationModalOpen] = useState(false);
  const {
    data,
    isLoading,
    isError,
  }: { data?: GetAllVehiclesResponse; isLoading: boolean; isError: boolean } =
    useGetAllVechiles({
      page,
      limit,
      // sortField,
      // sortDirection,
    }) as {
      data?: GetAllVehiclesResponse;
      isLoading: boolean;
      isError: boolean;
    };
  useGetAllVechiles({
    page,
    limit,
    // sortField,
    // sortDirection,
  });
  const { deleteVechiles } = useDeleteVechile(selectedVehicle?._id || "");

  const vehicleData = data?.vehicles;
  // const totalVehicles = data?.total;
  const totalPages = data?.pages;

  const handlePageChange = (newPage: number) => {
    if (newPage >= 1 && newPage <= (totalPages ?? 1)) {
      setPage(newPage);
    }
  };

  const handleSortFieldChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSortField(e.target.value);
  };

  const handleSortDirectionChange = (
    e: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setSortDirection(e.target.value as "asc" | "desc");
  };

  const handleViewDetails = (
    vehicle: SetStateAction<{ _id: string } | null>
  ) => {
    console.log("vehicle", vehicle);
    setSelectedVehicle(vehicle);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setSelectedVehicle(null);
    setIsModalOpen(false);
  };
  const handleDelete = async () => {
    if (!selectedVehicle?._id) return;
    try {
      await deleteVechiles();
      handleCloseModal();
    } catch (error) {
      console.error("Delete Vehicle Error:", error);
    }
  };

  useEffect(() => {
    setPage(1);
  }, [sortField, sortDirection]);

  if (isLoading) return <Spinner />;
  if (isError)
    return (
      <div className="text-center text-red-500">Error loading vehicles</div>
    );
  const handleConfirmDelete = () => {
    setIsConfirmationModalOpen(true);
  };
  const handleCancelDelete = () => {
    setIsConfirmationModalOpen(false);
  };

  const handleConfirmDeleteAction = async () => {
    await handleDelete();
    setIsConfirmationModalOpen(false);
  };
  return (
    <div>
      {/* Filter and Sort Controls */}
      <div className="flex items-center  gap-10 mb-4">
        <div className="">
          <label htmlFor="sortField" className="mr-2">
            Sort by:
          </label>
          <select
            id="sortField"
            value={sortField}
            onChange={handleSortFieldChange}
            className="px-4 py-2 border border-gray-300 rounded"
          >
            <option value="name">Name</option>
            <option value="make">Make</option>
            <option value="year">Year</option>
          </select>
        </div>
        <div className="">
          <label htmlFor="sortDirection" className="mr-2">
            Sort direction:
          </label>
          <select
            id="sortDirection"
            value={sortDirection}
            onChange={handleSortDirectionChange}
            className="px-4 py-2 border border-gray-300 rounded"
          >
            <option value="asc">Ascending</option>
            <option value="desc">Descending</option>
          </select>
        </div>
        {/* add new vechile */}
        <div>
          <Button
            title="Add New Vechile"
            action={() => setAddNewVechileModal(true)}
          />
        </div>
      </div>
      {addNewVechileModal && (
        <Modal
          title="Add New Vechile"
          size="large"
          isOpen={addNewVechileModal}
          onClose={() => setAddNewVechileModal(false)}
        >
          <AddNewVechile onClose={() => setAddNewVechileModal(false)} />
        </Modal>
      )}
      {updateVechileModal && selectedVehicle && (
        <Modal
          title="Update Vechile"
          size="large"
          isOpen={updateVechileModal}
          onClose={() => setUpdateVechileModal(false)}
        >
          <UpdateVechile
            selectedVechile={selectedVehicle}
            onClose={() => {
              setUpdateVechileModal(false);
            }}
          />
        </Modal>
      )}

      {/* Table of Vehicles */}
      <div className="overflow-x-auto w-full">
        <table className="min-w-full table-auto divide-y divide-gray-200 bg-white">
          <thead className="bg-gray-50">
            <tr>
              {[
                "Name",
                "Status",
                "License Plate",
                "Make",
                "Model",
                "Year",
                "Actions",
              ].map((header) => (
                <th
                  key={header}
                  className="px-6 py-3 text-left font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap"
                >
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-y-200">
            {vehicleData?.map(
              (vehicle: {
                _id: string;
                name: string;
                status: string;
                licensePlate: string;
                make: string;
                vehicleModel: string;
                year: number;
                mileage: number;
                fuelType: string;
              }) => (
                <tr key={vehicle._id}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {vehicle.name}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {vehicle.status}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {vehicle.licensePlate}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {vehicle.make}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {vehicle.vehicleModel}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {vehicle.year}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <button
                      onClick={() => handleViewDetails(vehicle)}
                      className="px-4 py-2 bg-blue-500 text-white rounded mr-2"
                    >
                      Actions
                    </button>
                  </td>
                </tr>
              )
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex justify-between items-center mt-4">
        <button
          onClick={() => handlePageChange(page - 1)}
          disabled={page <= 1}
          className="px-4 py-2 bg-gray-200 text-gray-500 rounded"
        >
          Previous
        </button>
        <span className="text-gray-700">
          Page {page} of {totalPages}
        </span>
        <button
          onClick={() => handlePageChange(page + 1)}
          disabled={page >= (totalPages || 1)}
          className="px-4 py-2 bg-gray-200 text-gray-500 rounded"
        >
          Next
        </button>
      </div>

      {/* Modal for Vehicle Details */}
      {isModalOpen && (
        <Modal
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          title="    Vehicle Details"
        >
          <div className="p-4">
            <div className="grid grid-cols-1 gap-4">
              {/* Vehicle Name */}
              <div className="flex items-center">
                <FaCar className="text-blue-500 mr-3" size={24} />
                <p className="text-gray-800">
                  <strong>Name:</strong> {selectedVehicle?.name}
                </p>
              </div>

              {/* Status */}
              <div className="flex items-center">
                <span
                  className={`inline-block h-3 w-3 rounded-full mr-3 ${
                    selectedVehicle?.status === "Active"
                      ? "bg-green-500"
                      : selectedVehicle?.status === "Inactive"
                      ? "bg-red-500"
                      : "bg-yellow-500"
                  }`}
                ></span>
                <p className="text-gray-800">
                  <strong>Status:</strong> {selectedVehicle?.status}
                </p>
              </div>

              {/* License Plate */}
              <div className="flex items-center">
                <FaCar className="text-blue-500 mr-3" size={24} />
                <p className="text-gray-800">
                  <strong>License Plate:</strong>{" "}
                  {selectedVehicle?.licensePlate}
                </p>
              </div>

              {/* Make */}
              <div className="flex items-center">
                <FaCar className="text-blue-500 mr-3" size={24} />
                <p className="text-gray-800">
                  <strong>Make:</strong> {selectedVehicle?.make}
                </p>
              </div>

              {/* Model */}
              <div className="flex items-center">
                <FaCar className="text-blue-500 mr-3" size={24} />
                <p className="text-gray-800">
                  <strong>Model:</strong> {selectedVehicle?.vehicleModel}
                </p>
              </div>

              {/* Year */}
              <div className="flex items-center">
                <FaCalendarAlt className="text-blue-500 mr-3" size={24} />
                <p className="text-gray-800">
                  <strong>Year:</strong> {selectedVehicle?.year}
                </p>
              </div>

              {/* Mileage */}
              <div className="flex items-center">
                <FaTachometerAlt className="text-blue-500 mr-3" size={24} />
                <p className="text-gray-800">
                  <strong>Mileage:</strong> {selectedVehicle?.mileage} km
                </p>
              </div>

              {/* Fuel Type */}
              <div className="flex items-center">
                <FaGasPump className="text-blue-500 mr-3" size={24} />
                <p className="text-gray-800">
                  <strong>Fuel Type:</strong> {selectedVehicle?.fuelType}
                </p>
              </div>
              <div className="flex items-center  justify-center gap-6 mt-6">
                <Button
                  title="Update"
                  action={() => {
                    setIsModalOpen(false);
                    setUpdateVechileModal(true);
                  }}
                />
                <Button title="Delete" action={handleConfirmDelete} />
              </div>
            </div>
          </div>
        </Modal>
      )}
      <ConfirmationModal
        isOpen={isConfirmationModalOpen}
        onClose={handleCancelDelete}
        onConfirm={handleConfirmDeleteAction}
        message="Are you sure you want to delete this vehicle?"
      />
    </div>
  );
}

export default VehicleTable;
