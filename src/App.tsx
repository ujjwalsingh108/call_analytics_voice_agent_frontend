import { useState, Suspense, lazy } from "react";
import Header from "./components/Header";
import EmailModal from "./components/EmailModal";
import { ToastProvider, showToast } from "./components/ToastProvider";

const CallDurationChart = lazy(() => import("./components/CallDurationChart"));
const SadPathChart = lazy(() => import("./components/SadPathChart"));

function App() {
  const [isEmailModalOpen, setIsEmailModalOpen] = useState(false);
  const [userEmail, setUserEmail] = useState<string | null>(null);
  const [chartToEdit, setChartToEdit] = useState<string | null>(null);

  const handleEditChart = (chartType: string) => {
    if (!userEmail) {
      setChartToEdit(chartType);
      setIsEmailModalOpen(true);
    } else {
      console.log(`Editing ${chartType} chart for user ${userEmail}`);
    }
  };

  const handleEmailSubmit = (email: string) => {
    setUserEmail(email);
    setIsEmailModalOpen(false);
    showToast(
      "success",
      "Email saved!",
      `You can now customize charts and your data will be saved for ${email}`
    );

    if (chartToEdit) {
      console.log(`Editing ${chartToEdit} chart for user ${email}`);
      setChartToEdit(null);
    }
  };

  return (
    <ToastProvider>
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
        <Header />

        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Voice Agent Analytics Dashboard
            </h1>
            <p className="text-gray-600">
              Monitor and analyze your voice agent performance with real-time
              insights
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="bg-white rounded-xl shadow-lg p-6">
              <Suspense
                fallback={
                  <div className="flex items-center justify-center h-64">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
                    <span className="ml-2 text-gray-600">Loading chart...</span>
                  </div>
                }
              >
                <CallDurationChart
                  onEdit={() => handleEditChart("duration")}
                  userEmail={userEmail}
                />
              </Suspense>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-6">
              <Suspense
                fallback={
                  <div className="flex items-center justify-center h-64">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
                    <span className="ml-2 text-gray-600">Loading chart...</span>
                  </div>
                }
              >
                <SadPathChart onEdit={() => handleEditChart("sadpath")} />
              </Suspense>
            </div>
          </div>

          <div className="mt-12 bg-white rounded-xl shadow-lg p-8">
            <div className="text-center">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                Ready to optimize your voice agents?
              </h2>
              <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
                Get deeper insights into call patterns, user satisfaction, and
                agent performance to continuously improve your voice AI systems.
              </p>
              <button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-8 rounded-lg transition duration-200">
                Get Started
              </button>
            </div>
          </div>
        </main>

        <EmailModal
          isOpen={isEmailModalOpen}
          onClose={() => setIsEmailModalOpen(false)}
          onSubmit={handleEmailSubmit}
        />
      </div>
    </ToastProvider>
  );
}

export default App;
