import { useState, useEffect } from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { PencilIcon } from "@heroicons/react/24/outline";
import EditChartModal from "./EditChartModal";
import OverwriteConfirmModal from "./OverwriteConfirmModal";
import { useChartPersistence } from "../hooks/useChartPersistence";
import { showToast } from "./ToastProvider";

interface CallDurationData {
  time: string;
  duration: number;
}

interface Props {
  onEdit: () => void;
  userEmail?: string | null;
}

const CallDurationChart = ({ onEdit, userEmail }: Props) => {
  const defaultData: CallDurationData[] = [
    { time: "9:00", duration: 245 },
    { time: "10:00", duration: 312 },
    { time: "11:00", duration: 198 },
    { time: "12:00", duration: 567 },
    { time: "13:00", duration: 423 },
    { time: "14:00", duration: 389 },
    { time: "15:00", duration: 298 },
    { time: "16:00", duration: 445 },
    { time: "17:00", duration: 234 },
    { time: "18:00", duration: 178 },
  ];

  const [data, setData] = useState<CallDurationData[]>(defaultData);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isOverwriteModalOpen, setIsOverwriteModalOpen] = useState(false);
  const [existingData, setExistingData] = useState<any>(null);
  const { saveData, checkExistingData } = useChartPersistence();

  // Load existing data when user email is available
  useEffect(() => {
    if (userEmail) {
      loadUserData();
    }
  }, [userEmail]);

  const loadUserData = async () => {
    if (!userEmail) return;

    const existing = await checkExistingData(userEmail, "duration");
    if (existing) {
      setData(existing.chart_data);
    }
  };

  const averageDuration = Math.round(
    data.reduce((sum, item) => sum + item.duration, 0) / data.length
  );

  const handleEditClick = async () => {
    if (userEmail) {
      // Check for existing data before allowing edit
      const existing = await checkExistingData(userEmail, "duration");
      if (
        existing &&
        existing.chart_data &&
        JSON.stringify(existing.chart_data) !== JSON.stringify(defaultData)
      ) {
        setExistingData(existing);
        setIsOverwriteModalOpen(true);
      } else {
        setIsEditModalOpen(true);
      }
    } else {
      onEdit();
    }
  };

  const handleSaveData = async (newData: CallDurationData[]) => {
    setData(newData);
    setIsEditModalOpen(false);

    if (userEmail) {
      const result = await saveData(userEmail, "duration", newData);
      if (result.success) {
        showToast(
          "success",
          "Chart data saved!",
          "Your custom call duration data has been saved successfully."
        );
      } else {
        showToast(
          "error",
          "Save failed",
          "There was an error saving your chart data. Please try again."
        );
      }
    }
  };

  const handleOverwriteConfirm = () => {
    setIsOverwriteModalOpen(false);
    setIsEditModalOpen(true);
  };

  return (
    <div className="w-full">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-semibold text-gray-800 mb-1">
            Call Duration Analysis
          </h3>
          <p className="text-sm text-gray-500">
            Average call duration over the last 10 hours
          </p>
        </div>
        <button
          onClick={handleEditClick}
          className="flex items-center space-x-2 px-3 py-2 text-sm bg-gray-100 hover:bg-gray-200 rounded-lg transition duration-200"
        >
          <PencilIcon className="w-4 h-4" />
          <span>Edit Data</span>
        </button>
      </div>

      <div className="mb-4">
        <div className="text-2xl font-bold text-blue-600">
          {averageDuration}s
        </div>
        <div className="text-sm text-gray-500">Average Duration</div>
      </div>

      <div className="h-64 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data}>
            <defs>
              <linearGradient id="colorDuration" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.3} />
                <stop offset="95%" stopColor="#3B82F6" stopOpacity={0.1} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
            <XAxis
              dataKey="time"
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 12, fill: "#6b7280" }}
            />
            <YAxis
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 12, fill: "#6b7280" }}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: "white",
                border: "1px solid #e5e7eb",
                borderRadius: "8px",
                boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
              }}
            />
            <Area
              type="monotone"
              dataKey="duration"
              stroke="#3B82F6"
              strokeWidth={2}
              fillOpacity={1}
              fill="url(#colorDuration)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      <EditChartModal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        onSave={handleSaveData}
        initialData={data}
      />

      <OverwriteConfirmModal
        isOpen={isOverwriteModalOpen}
        onClose={() => setIsOverwriteModalOpen(false)}
        onConfirm={handleOverwriteConfirm}
        previousData={existingData?.chart_data}
        lastModified={existingData?.updated_at}
      />
    </div>
  );
};

export default CallDurationChart;
