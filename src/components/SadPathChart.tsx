import { useState } from "react";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
  Legend,
} from "recharts";
import { PencilIcon } from "@heroicons/react/24/outline";

interface SadPathData {
  name: string;
  value: number;
  color: string;
}

interface Props {
  onEdit: () => void;
}

const SadPathChart = ({ onEdit }: Props) => {
  const [data] = useState<SadPathData[]>([
    { name: "User refused to confirm identity", value: 35, color: "#EF4444" },
    { name: "Caller Identification", value: 28, color: "#F97316" },
    { name: "Incorrect caller identity", value: 15, color: "#EAB308" },
    { name: "Verbal Aggression", value: 12, color: "#84CC16" },
    { name: "Customer Hostility", value: 8, color: "#06B6D4" },
    { name: "Assistant did not speak French", value: 6, color: "#8B5CF6" },
    { name: "Unsupported Language", value: 4, color: "#EC4899" },
    { name: "Assistant did not speak Spanish", value: 3, color: "#10B981" },
  ]);

  const totalIssues = data.reduce((sum, item) => sum + item.value, 0);

  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0];
      return (
        <div className="bg-white p-3 border border-gray-200 rounded-lg shadow-lg">
          <p className="text-sm font-medium text-gray-800">{data.name}</p>
          <p className="text-sm text-blue-600">
            {data.value}% ({Math.round((data.value / 100) * totalIssues)} calls)
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="w-full">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-semibold text-gray-800 mb-1">
            Sad Path Analysis
          </h3>
          <p className="text-sm text-gray-500">
            Common failure points in voice interactions
          </p>
        </div>
        <button
          onClick={onEdit}
          className="flex items-center space-x-2 px-3 py-2 text-sm bg-gray-100 hover:bg-gray-200 rounded-lg transition duration-200"
        >
          <PencilIcon className="w-4 h-4" />
          <span>Edit Data</span>
        </button>
      </div>

      <div className="mb-4">
        <div className="text-2xl font-bold text-red-500">{totalIssues}%</div>
        <div className="text-sm text-gray-500">Total Failure Rate</div>
      </div>

      <div className="h-80 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={120}
              paddingAngle={2}
              dataKey="value"
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip content={<CustomTooltip />} />
            <Legend
              verticalAlign="bottom"
              height={36}
              iconType="circle"
              wrapperStyle={{ fontSize: "12px" }}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>

      <div className="mt-4 grid grid-cols-2 gap-3 text-xs">
        {data.slice(0, 4).map((item, index) => (
          <div key={index} className="flex items-center space-x-2">
            <div
              className="w-3 h-3 rounded-full"
              style={{ backgroundColor: item.color }}
            />
            <span className="text-gray-600 truncate">{item.name}</span>
            <span className="font-medium text-gray-800">{item.value}%</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SadPathChart;
