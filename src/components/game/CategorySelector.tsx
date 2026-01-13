// client/src/components/game/CategorySelector.tsx

import React, { useState } from "react";
import { Sparkles } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../ui/dialog";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { PREDEFINED_CATEGORIES } from "../../types";

interface CategorySelectorProps {
  isOpen: boolean;
  playerName: string;
  onSelect: (category: string) => void;
}

export const CategorySelector: React.FC<CategorySelectorProps> = ({
  isOpen,
  playerName,
  onSelect,
}) => {
  const [customCategory, setCustomCategory] = useState("");
  const [showCustomInput, setShowCustomInput] = useState(false);

  const handleSelectPredefined = (category: string) => {
    onSelect(category);
  };

  const handleSelectCustom = () => {
    if (customCategory.trim()) {
      onSelect(customCategory.trim());
      setCustomCategory("");
      setShowCustomInput(false);
    }
  };

  return (
    <Dialog open={isOpen}>
      <DialogContent className="sm:max-w-2xl">
        <DialogHeader>
          <div className="flex justify-center mb-4">
            <div className="w-16 h-16 bg-gradient-to-br from-purple-400 to-purple-600 rounded-full flex items-center justify-center">
              <Sparkles className="w-8 h-8 text-white" />
            </div>
          </div>
          <DialogTitle className="text-center text-2xl">
            Choose a Category
          </DialogTitle>
          <p className="text-center text-gray-600 text-sm mt-2">
            {playerName}, you've been selected to pick the category!
          </p>
        </DialogHeader>

        <div className="py-4 space-y-4">
          {!showCustomInput ? (
            <>
              <div className="grid grid-cols-3 gap-2 max-h-60 overflow-y-auto">
                {PREDEFINED_CATEGORIES.map((category) => (
                  <Button
                    key={category}
                    onClick={() => handleSelectPredefined(category)}
                    variant="outline"
                    className="h-auto py-3 text-sm hover:bg-purple-50 hover:border-purple-300"
                  >
                    {category}
                  </Button>
                ))}
              </div>

              <div className="pt-4 border-t border-gray-200">
                <Button
                  onClick={() => setShowCustomInput(true)}
                  variant="ghost"
                  className="w-full text-purple-600 hover:text-purple-700 hover:bg-purple-50"
                >
                  ✏️ Enter Custom Category
                </Button>
              </div>
            </>
          ) : (
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2 text-gray-900">
                  Custom Category:
                </label>
                <Input
                  type="text"
                  value={customCategory}
                  onChange={(e) => setCustomCategory(e.target.value)}
                  onKeyPress={(e) => e.key === "Enter" && handleSelectCustom()}
                  placeholder="e.g., Video Games, Books, Cities..."
                  className="text-lg"
                  autoFocus
                />
              </div>

              <div className="flex space-x-2">
                <Button
                  onClick={handleSelectCustom}
                  disabled={!customCategory.trim()}
                  className="flex-1"
                >
                  Confirm Category
                </Button>
                <Button
                  onClick={() => {
                    setShowCustomInput(false);
                    setCustomCategory("");
                  }}
                  variant="outline"
                  className="flex-1"
                >
                  Back to Presets
                </Button>
              </div>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};
