// Mock Supabase integration with localStorage for demo purposes
interface UserChartData {
  email: string;
  chart_type: "duration" | "sadpath";
  chart_data: any;
  created_at: string;
  updated_at: string;
}

// Simulate Supabase operations using localStorage
export const mockSupabase = {
  async saveChartData(email: string, chartType: string, data: any) {
    try {
      const key = `chart_${email}_${chartType}`;
      const chartData: UserChartData = {
        email,
        chart_type: chartType as "duration" | "sadpath",
        chart_data: data,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      };

      localStorage.setItem(key, JSON.stringify(chartData));

      // Simulate network delay
      await new Promise((resolve) => setTimeout(resolve, 500));

      return { success: true, data: chartData };
    } catch (error) {
      console.error("Error saving chart data:", error);
      return { success: false, error };
    }
  },

  async getChartData(email: string, chartType: string) {
    try {
      const key = `chart_${email}_${chartType}`;
      const stored = localStorage.getItem(key);

      if (!stored) {
        return { success: false, error: "No data found" };
      }

      // Simulate network delay
      await new Promise((resolve) => setTimeout(resolve, 300));

      const data = JSON.parse(stored);
      return { success: true, data };
    } catch (error) {
      console.error("Error fetching chart data:", error);
      return { success: false, error };
    }
  },

  async getAllUserData(email: string) {
    try {
      const keys = Object.keys(localStorage).filter((key) =>
        key.startsWith(`chart_${email}_`)
      );

      const allData = keys
        .map((key) => {
          const stored = localStorage.getItem(key);
          return stored ? JSON.parse(stored) : null;
        })
        .filter(Boolean);

      return { success: true, data: allData };
    } catch (error) {
      console.error("Error fetching user data:", error);
      return { success: false, error };
    }
  },
};

// Hook for managing chart data persistence
export const useChartPersistence = () => {
  const saveData = async (email: string, chartType: string, data: any) => {
    return await mockSupabase.saveChartData(email, chartType, data);
  };

  const loadData = async (email: string, chartType: string) => {
    return await mockSupabase.getChartData(email, chartType);
  };

  const checkExistingData = async (email: string, chartType: string) => {
    const result = await mockSupabase.getChartData(email, chartType);
    return result.success ? result.data : null;
  };

  return { saveData, loadData, checkExistingData };
};
