import React from 'react';
import { Label } from "../ui/label";
import { Select, SelectTrigger, SelectContent, SelectItem, SelectValue } from "../ui/select";

export function VehiculeTypeStep({ formData, updateFormData }) {
  return (
    <div>
      <Label htmlFor="vehicleType">Type de véhicule</Label>
      <Select
        id="vehicleType"
        value={formData.vehicleType}
        onValueChange={(value) => updateFormData({ vehicleType: value })}
      >
        <SelectTrigger>
          <SelectValue placeholder="Sélectionnez un type de véhicule" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="standard">Standard</SelectItem>
          <SelectItem value="premium">Premium</SelectItem>
          <SelectItem value="van">Van</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
}