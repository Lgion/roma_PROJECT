import React from 'react';
import { Input } from "../../ui/input";
import { Label } from "../../ui/label";

export function LocationStep({ formData, updateFormData }) {
  return (
    <div className="space-y-4">
      <div>
        <Label htmlFor="pickup">Point de départ</Label>
        <Input
          id="pickup"
          value={formData.pickup}
          onChange={(e) => updateFormData({ pickup: e.target.value })}
          placeholder="Entrez l'adresse de départ"
        />
      </div>
      <div>
        <Label htmlFor="dropoff">Destination</Label>
        <Input
          id="dropoff"
          value={formData.dropoff}
          onChange={(e) => updateFormData({ dropoff: e.target.value })}
          placeholder="Entrez l'adresse de destination"
        />
      </div>
    </div>
  );
}