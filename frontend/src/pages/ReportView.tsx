import { useState } from "react";
import { useGetAllVechiles } from "../hooks/vechile";
import Spinner from "../components/Spinner";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import {
  Chart as ChartJS,
  ArcElement,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";

// Register Chart.js components
ChartJS.register(
  ArcElement,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

function ReportView() {
  const [startDate, setStartDate] = useState(new Date());
  const { data, isLoading, isError } = useGetAllVechiles({
    page: 1,
    limit: Number.MAX_SAFE_INTEGER, // Fetch all vehicles
  });

  if (isLoading) return <Spinner />;
  if (isError)
    return (
      <div className="text-center text-red-500">Error loading vehicles</div>
    );

  const vehicleData = data?.vehicles || [];

  const activeCount = vehicleData.filter((v) => v.status === "Active").length;
  const inactiveCount = vehicleData.filter(
    (v) => v.status === "Inactive"
  ).length;

  const vehicleByYear = vehicleData.reduce((acc, vehicle) => {
    const year = vehicle.year || "Unknown";
    acc[year] = (acc[year] || 0) + 1;
    return acc;
  }, {});

  const chartData = {
    labels: Object.keys(vehicleByYear),
    datasets: [
      {
        label: "Vehicles by Year",
        data: Object.values(vehicleByYear),
        backgroundColor: "rgba(75, 192, 192, 0.2)",
        borderColor: "rgba(75, 192, 192, 1)",
        borderWidth: 1,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Vehicles by Year",
      },
    },
  };

  return (
    <div className="p-8">
      {/* Header */}
      <header className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Vehicle Report</h1>
        <div className="flex gap-4">
          <DatePicker
            selected={startDate}
            onChange={(date) => setStartDate(date)}
            className="border px-4 py-2 rounded"
          />
        </div>
      </header>

      {/* Summary */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
        <div className="bg-white p-4 rounded-lg shadow">
          <h2 className="text-xl font-bold mb-2">Active Vehicles</h2>
          <p className="text-3xl">{activeCount}</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow">
          <h2 className="text-xl font-bold mb-2">Inactive Vehicles</h2>
          <p className="text-3xl">{inactiveCount}</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow">
          <h2 className="text-xl font-bold mb-2">Vehicles by Year</h2>
          <ul>
            {Object.entries(vehicleByYear).map(([year, count]) => (
              <li key={year}>
                {year}: {count}
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Bar Chart */}
      <div className="bg-white p-4 rounded-lg shadow mb-8">
        <Bar data={chartData} options={chartOptions} />
      </div>

      {/* Vehicle Table */}
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
                "Mileage",
                "Fuel Type",
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
            {vehicleData.map((vehicle) => (
              <tr key={vehicle._id}>
                <td className="px-6 py-4 whitespace-nowrap">{vehicle.name}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {vehicle.status}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {vehicle.licensePlate}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">{vehicle.make}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {vehicle.vehicleModel}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">{vehicle.year}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {vehicle.mileage}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {vehicle.fuelType}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default ReportView;
