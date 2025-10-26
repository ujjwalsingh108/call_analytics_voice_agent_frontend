import { useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { Fragment } from "react";
import { ExclamationTriangleIcon } from "@heroicons/react/24/outline";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  previousData: any;
  lastModified?: string;
}

const OverwriteConfirmModal = ({
  isOpen,
  onClose,
  onConfirm,
  previousData,
  lastModified,
}: Props) => {
  const [isProcessing, setIsProcessing] = useState(false);

  const handleConfirm = async () => {
    setIsProcessing(true);
    // Simulate processing delay
    await new Promise((resolve) => setTimeout(resolve, 500));
    onConfirm();
    setIsProcessing(false);
  };

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={onClose}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black bg-opacity-25" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                <div className="flex items-center mb-4">
                  <div className="flex-shrink-0">
                    <ExclamationTriangleIcon className="h-6 w-6 text-amber-400" />
                  </div>
                  <Dialog.Title
                    as="h3"
                    className="ml-3 text-lg font-medium leading-6 text-gray-900"
                  >
                    Existing Data Found
                  </Dialog.Title>
                </div>

                <div className="mb-4">
                  <p className="text-sm text-gray-500 mb-3">
                    We found existing custom chart data for your email address.
                    {lastModified && (
                      <span className="block mt-1 font-medium">
                        Last modified:{" "}
                        {new Date(lastModified).toLocaleDateString()}
                      </span>
                    )}
                  </p>

                  <div className="bg-gray-50 rounded-lg p-3 mb-3">
                    <h4 className="text-sm font-medium text-gray-700 mb-2">
                      Previous Values:
                    </h4>
                    <div className="text-xs text-gray-600 space-y-1 max-h-32 overflow-y-auto">
                      {Array.isArray(previousData) ? (
                        previousData
                          .slice(0, 5)
                          .map((item: any, index: number) => (
                            <div key={index} className="flex justify-between">
                              <span>{item.time || item.name}</span>
                              <span className="font-medium">
                                {item.duration || item.value}
                              </span>
                            </div>
                          ))
                      ) : (
                        <div className="text-center text-gray-500">
                          No preview available
                        </div>
                      )}
                      {Array.isArray(previousData) &&
                        previousData.length > 5 && (
                          <div className="text-center text-gray-400 text-xs">
                            ... and {previousData.length - 5} more items
                          </div>
                        )}
                    </div>
                  </div>

                  <p className="text-sm text-gray-600">
                    Would you like to overwrite this data with new custom
                    values?
                  </p>
                </div>

                <div className="flex space-x-3">
                  <button
                    type="button"
                    className="flex-1 inline-flex justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                    onClick={onClose}
                  >
                    Keep Existing
                  </button>
                  <button
                    type="button"
                    disabled={isProcessing}
                    onClick={handleConfirm}
                    className="flex-1 inline-flex justify-center rounded-md border border-transparent bg-amber-600 px-4 py-2 text-sm font-medium text-white hover:bg-amber-700 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isProcessing ? "Processing..." : "Overwrite Data"}
                  </button>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};

export default OverwriteConfirmModal;
