import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://your-project-ref.supabase.co";
const supabaseAnonKey = "your-anon-key";

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Database types
export interface UserChartData {
  id?: number;
  email: string;
  chart_type: "duration" | "sadpath";
  chart_data: any;
  created_at?: string;
  updated_at?: string;
}

// Helper functions
export const saveChartData = async (
  email: string,
  chartType: string,
  data: any
) => {
  try {
    const { error } = await supabase.from("user_chart_data").upsert({
      email,
      chart_type: chartType,
      chart_data: data,
      updated_at: new Date().toISOString(),
    });

    if (error) throw error;
    return { success: true };
  } catch (error) {
    console.error("Error saving chart data:", error);
    return { success: false, error };
  }
};

export const getChartData = async (email: string, chartType: string) => {
  try {
    const { data, error } = await supabase
      .from("user_chart_data")
      .select("*")
      .eq("email", email)
      .eq("chart_type", chartType)
      .single();

    if (error) throw error;
    return { success: true, data };
  } catch (error) {
    console.error("Error fetching chart data:", error);
    return { success: false, error };
  }
};
