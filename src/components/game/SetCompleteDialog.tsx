// client/src/components/game/SetCompleteDialog.tsx

import React from "react";
import { Trophy, ArrowRight } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../ui/dialog";
import { Button } from "../ui/button";

interface SetCompleteDialogProps {
  isOpen: boolean;
  setNumber: number;
  totalSets: number;
  matchedWord: string;
  attempts: number;
  onContinue: () => void;
}

export const SetCompleteDialog: React.FC<SetCompleteDialogProps> = ({
  isOpen,
  setNumber,
  totalSets,
  matchedWord,
  attempts,
  onContinue,
}) => {
  return (
    <Dialog open={isOpen}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <div className="flex justify-center mb-4">
            <div className="w-16 h-16 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-full flex items-center justify-center">
              <Trophy className="w-8 h-8 text-white" />
            </div>
          </div>
          <DialogTitle className="text-center text-2xl">
            Perfect Match!
          </DialogTitle>
        </DialogHeader>

        <div className="text-center space-y-4 py-4">
          <p className="text-gray-600">You both guessed the same word:</p>
          <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
            <p className="text-3xl font-bold text-green-700">"{matchedWord}"</p>
          </div>

          <div className="grid grid-cols-2 gap-4 pt-4">
            <div className="p-3 bg-gray-50 rounded-lg border border-gray-200">
              <p className="text-2xl font-bold text-gray-900">{attempts}</p>
              <p className="text-xs text-gray-600 mt-1">Attempts</p>
            </div>
            <div className="p-3 bg-gray-50 rounded-lg border border-gray-200">
              <p className="text-2xl font-bold text-blue-600">
                {setNumber}/{totalSets}
              </p>
              <p className="text-xs text-gray-600 mt-1">Sets Complete</p>
            </div>
          </div>

          <Button onClick={onContinue} className="w-full mt-6" size="lg">
            Continue to Next Set
            <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
