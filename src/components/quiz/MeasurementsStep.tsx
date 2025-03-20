
import React from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

interface Measurements {
  height: string;
  weight: string;
  shoeSize: string;
  waist: string;
  chest: string;
  hips: string;
  inseam: string;
  neckSize: string;
}

interface MeasurementsStepProps {
  measurements: Measurements;
  gender: string;
  onMeasurementChange: (field: string, value: string) => void;
}

const MeasurementsStep = ({ 
  measurements, 
  gender,
  onMeasurementChange 
}: MeasurementsStepProps) => {
  const isMale = gender === "male";
  
  return (
    <div>
      <h3 className="text-xl font-medium mb-6">Your measurements</h3>
      <p className="text-muted-foreground mb-6">
        This helps us recommend the right fit for your body type. All measurements are in inches.
      </p>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4 mb-8">
        <div className="space-y-2">
          <Label htmlFor="height">Height</Label>
          <Input
            id="height"
            type="text"
            placeholder="5'10"
            value={measurements.height}
            onChange={(e) => onMeasurementChange("height", e.target.value)}
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="weight">Weight (optional)</Label>
          <Input
            id="weight"
            type="text"
            placeholder="170 lbs"
            value={measurements.weight}
            onChange={(e) => onMeasurementChange("weight", e.target.value)}
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor={isMale ? "chest" : "bust"}>{isMale ? "Chest" : "Bust"}</Label>
          <Input
            id={isMale ? "chest" : "bust"}
            type="text"
            placeholder="42 inches"
            value={measurements.chest}
            onChange={(e) => onMeasurementChange("chest", e.target.value)}
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="waist">Waist</Label>
          <Input
            id="waist"
            type="text"
            placeholder="34 inches"
            value={measurements.waist}
            onChange={(e) => onMeasurementChange("waist", e.target.value)}
          />
        </div>
        
        {!isMale && (
          <div className="space-y-2">
            <Label htmlFor="hips">Hips</Label>
            <Input
              id="hips"
              type="text"
              placeholder="40 inches"
              value={measurements.hips}
              onChange={(e) => onMeasurementChange("hips", e.target.value)}
            />
          </div>
        )}
        
        <div className="space-y-2">
          <Label htmlFor="shoeSize">Shoe Size</Label>
          <Input
            id="shoeSize"
            type="text"
            placeholder={isMale ? "10.5 US Men's" : "8 US Women's"}
            value={measurements.shoeSize}
            onChange={(e) => onMeasurementChange("shoeSize", e.target.value)}
          />
        </div>
        
        {isMale && (
          <div className="space-y-2">
            <Label htmlFor="neckSize">Neck Size (optional)</Label>
            <Input
              id="neckSize"
              type="text"
              placeholder="16 inches"
              value={measurements.neckSize}
              onChange={(e) => onMeasurementChange("neckSize", e.target.value)}
            />
          </div>
        )}
        
        <div className="space-y-2">
          <Label htmlFor="inseam">Inseam (optional)</Label>
          <Input
            id="inseam"
            type="text"
            placeholder="32 inches"
            value={measurements.inseam}
            onChange={(e) => onMeasurementChange("inseam", e.target.value)}
          />
        </div>
      </div>
    </div>
  );
};

export default MeasurementsStep;
