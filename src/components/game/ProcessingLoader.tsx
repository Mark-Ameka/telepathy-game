// client/src/components/game/ProcessingLoader.tsx

import React from "react";
import { Brain, Loader2 } from "lucide-react";
import { Dialog, DialogContent } from "../ui/dialog";

interface ProcessingLoaderProps {
  isOpen: boolean;
}

export const ProcessingLoader: React.FC<ProcessingLoaderProps> = ({
  isOpen,
}) => {
  return (
    <Dialog open={isOpen}>
      <DialogContent className="sm:max-w-md">
        <div className="text-center py-6">
          <div className="mb-6 flex justify-center">
            <div className="relative">
              <Brain className="w-16 h-16 text-gray-900" />
              <Loader2 className="w-6 h-6 text-blue-600 animate-spin absolute -top-2 -right-2" />
            </div>
          </div>
          <h3 className="text-xl font-bold mb-2 text-gray-900">
            Analyzing Words...
          </h3>
          <p className="text-gray-600 mb-4">
            Our AI is comparing your words to determine their similarity
          </p>
          <div className="flex items-center justify-center space-x-2">
            <div
              className="w-2 h-2 bg-blue-600 rounded-full animate-bounce"
              style={{ animationDelay: "0ms" }}
            ></div>
            <div
              className="w-2 h-2 bg-blue-600 rounded-full animate-bounce"
              style={{ animationDelay: "150ms" }}
            ></div>
            <div
              className="w-2 h-2 bg-blue-600 rounded-full animate-bounce"
              style={{ animationDelay: "300ms" }}
            ></div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
