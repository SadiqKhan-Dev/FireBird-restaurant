"use client";

import { useState } from "react";
import { Flame } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";

interface CustomizationOption {
  id: string;
  name: string;
  priceModifier: number;
  isDefault: boolean;
  isAvailable: boolean;
}

interface ItemCustomization {
  id: string;
  name: string;
  type: "single" | "multiple" | "text";
  isRequired: boolean;
  maxSelections?: number;
  options: CustomizationOption[];
}

interface CustomizationPanelProps {
  customizations: ItemCustomization[];
  selectedCustomizations: { customizationOptionId: string; priceModifier: number }[];
  onCustomizationChange: (
    customizationId: string,
    selectedOptions: { customizationOptionId: string; priceModifier: number }[]
  ) => void;
  specialInstructions: string;
  onSpecialInstructionsChange: (value: string) => void;
}

function formatPriceModifier(cents: number): string {
  if (cents === 0) return "Free";
  if (cents > 0) return `+$${(cents / 100).toFixed(2)}`;
  return `-$${(Math.abs(cents) / 100).toFixed(2)}`;
}

export function CustomizationPanel({
  customizations,
  selectedCustomizations,
  onCustomizationChange,
  specialInstructions,
  onSpecialInstructionsChange,
}: CustomizationPanelProps) {
  return (
    <div className="space-y-6">
      {customizations.map((customization) => (
        <CustomizationSection
          key={customization.id}
          customization={customization}
          selectedOptions={selectedCustomizations.filter((s) =>
            customization.options.some((o) => o.id === s.customizationOptionId)
          )}
          onSelectionChange={(options) =>
            onCustomizationChange(customization.id, options)
          }
        />
      ))}

      {/* Special Instructions */}
      <div>
        <label className="text-sm font-medium">Special Instructions</label>
        <p className="text-xs text-muted-foreground mb-2">
          Let us know if you have any allergies or special requests
        </p>
        <Textarea
          placeholder="e.g., Extra crispy, no onions, light on salt..."
          value={specialInstructions}
          onChange={(e) => onSpecialInstructionsChange(e.target.value)}
          maxLength={200}
          className="resize-none"
        />
        <p className="mt-1 text-xs text-muted-foreground text-right">
          {specialInstructions.length}/200
        </p>
      </div>
    </div>
  );
}

function CustomizationSection({
  customization,
  selectedOptions,
  onSelectionChange,
}: {
  customization: ItemCustomization;
  selectedOptions: { customizationOptionId: string; priceModifier: number }[];
  onSelectionChange: (options: { customizationOptionId: string; priceModifier: number }[]) => void;
}) {
  const handleSingleSelect = (option: CustomizationOption) => {
    onSelectionChange([{ customizationOptionId: option.id, priceModifier: option.priceModifier }]);
  };

  const handleMultiSelect = (option: CustomizationOption) => {
    const isSelected = selectedOptions.some((s) => s.customizationOptionId === option.id);

    if (isSelected) {
      // Remove selection
      onSelectionChange(
        selectedOptions.filter((s) => s.customizationOptionId !== option.id)
      );
    } else {
      // Check max selections
      if (
        customization.maxSelections &&
        selectedOptions.length >= customization.maxSelections
      ) {
        return;
      }
      // Add selection
      onSelectionChange([
        ...selectedOptions,
        { customizationOptionId: option.id, priceModifier: option.priceModifier },
      ]);
    }
  };

  // For spice level, use a special flame selector
  if (customization.name.toLowerCase().includes("spice")) {
    return (
      <div>
        <div className="flex items-center justify-between">
          <label className="text-sm font-medium">{customization.name}</label>
          {customization.isRequired && (
            <span className="text-xs text-destructive">Required</span>
          )}
        </div>
        <div className="mt-3 flex gap-2">
          {customization.options.map((option) => {
            const isSelected = selectedOptions.some(
              (s) => s.customizationOptionId === option.id
            );
            return (
              <button
                key={option.id}
                onClick={() => handleSingleSelect(option)}
                disabled={!option.isAvailable}
                className={cn(
                  "flex items-center gap-2 rounded-lg border px-4 py-2 text-sm font-medium transition-all",
                  isSelected
                    ? "border-primary bg-primary/10 text-primary"
                    : "border-border hover:border-primary/50 hover:bg-muted",
                  !option.isAvailable && "opacity-50 cursor-not-allowed"
                )}
              >
                <Flame
                  className={cn(
                    "h-4 w-4",
                    isSelected ? "text-primary fill-primary" : "text-muted-foreground"
                  )}
                />
                {option.name}
                {option.priceModifier !== 0 && (
                  <span className="text-xs text-muted-foreground">
                    {formatPriceModifier(option.priceModifier)}
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </div>
    );
  }

  // For single select customizations (like size)
  if (customization.type === "single") {
    return (
      <div>
        <div className="flex items-center justify-between">
          <label className="text-sm font-medium">{customization.name}</label>
          {customization.isRequired && (
            <span className="text-xs text-destructive">Required</span>
          )}
        </div>
        <div className="mt-3 flex flex-wrap gap-2">
          {customization.options.map((option) => {
            const isSelected = selectedOptions.some(
              (s) => s.customizationOptionId === option.id
            );
            return (
              <button
                key={option.id}
                onClick={() => handleSingleSelect(option)}
                disabled={!option.isAvailable}
                className={cn(
                  "rounded-lg border px-4 py-2 text-sm font-medium transition-all",
                  isSelected
                    ? "border-primary bg-primary/10 text-primary"
                    : "border-border hover:border-primary/50 hover:bg-muted",
                  !option.isAvailable && "opacity-50 cursor-not-allowed"
                )}
              >
                {option.name}
                {option.priceModifier !== 0 && (
                  <span className="ml-1 text-xs text-muted-foreground">
                    {formatPriceModifier(option.priceModifier)}
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </div>
    );
  }

  // For multi-select customizations (like toppings, sauces)
  return (
    <div>
      <div className="flex items-center justify-between">
        <label className="text-sm font-medium">{customization.name}</label>
        <span className="text-xs text-muted-foreground">
          {customization.maxSelections
            ? `Select up to ${customization.maxSelections}`
            : "Select multiple"}
        </span>
      </div>
      <div className="mt-3 space-y-2">
        {customization.options.map((option) => {
          const isSelected = selectedOptions.some(
            (s) => s.customizationOptionId === option.id
          );
          return (
            <button
              key={option.id}
              onClick={() => handleMultiSelect(option)}
              disabled={!option.isAvailable}
              className={cn(
                "flex w-full items-center justify-between rounded-lg border px-4 py-3 text-sm font-medium transition-all",
                isSelected
                  ? "border-primary bg-primary/10 text-primary"
                  : "border-border hover:border-primary/50 hover:bg-muted",
                !option.isAvailable && "opacity-50 cursor-not-allowed"
              )}
            >
              <span>{option.name}</span>
              <span className="text-xs text-muted-foreground">
                {formatPriceModifier(option.priceModifier)}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
