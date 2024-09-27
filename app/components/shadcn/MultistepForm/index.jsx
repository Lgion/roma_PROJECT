'use client'

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "./card"
import { Button } from "./button"
import { Progress } from "./progress"
import { Input } from "../ui/input"
import { Label } from "../ui/label"
import { Select,SelectTrigger,SelectContent,SelectItem,SelectValue } from "../ui/select"
// import LocationStep from './LocationStep'
// import VehicleStep from './VehicleStep'
// import DateTimeStep from './DateTimeStep'
// import PaymentStep from './PaymentStep'
// import ConfirmationStep from './ConfirmationStep'

export default function BookingFormComponent() {
  const [step, setStep] = useState(1)
  const [formData, setFormData] = useState({
    pickup: '',
    dropoff: '',
    vehicleType: '',
    date: '',
    time: '',
    paymentMethod: '',
  })

  const updateFormData = (data) => {
    setFormData(prev => ({ ...prev, ...data }))
  }

  const nextStep = () => setStep(prev => Math.min(prev + 1, 5))
  const prevStep = () => setStep(prev => Math.max(prev - 1, 1))

  const renderStep = () => {
    switch (step) {
      case 1:
        return <LocationStep formData={formData} updateFormData={updateFormData} />;
      case 2:
        return <VehicleStep formData={formData} updateFormData={updateFormData} />;
      case 3:
        return <DateTimeStep formData={formData} updateFormData={updateFormData} />;
      case 4:
        return <PaymentStep formData={formData} updateFormData={updateFormData} />;
      case 5:
        return <ConfirmationStep formData={formData} />;
      default:
        return null
    }
  }

  return (
    (<Card className="w-full max-w-lg mx-auto">
      {step}
      <CardHeader>
        <CardTitle>Réserver une course</CardTitle>
        <Progress value={(step / 5) * 100} className="w-full" />
      </CardHeader>
      <CardContent>
        {renderStep()}
        <div className="flex justify-between mt-6">
          {step > 1 && (
            <Button onClick={prevStep} variant="outline">
              Précédent
            </Button>
          )}
          {step < 5 ? (
            <Button onClick={nextStep} className="ml-auto">
              Suivant
            </Button>
          ) : (
            <Button
              onClick={() => console.log('Réservation confirmée:', formData)}
              className="ml-auto">
              Confirmer la réservation
            </Button>
          )}
        </div>
      </CardContent>
    </Card>)
  );
}

function LocationStep({ formData, updateFormData }) {
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
  )
}

function VehicleStep({ formData, updateFormData }) {
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
  )
}

function DateTimeStep({ formData, updateFormData }) {
  return (
    <div className="space-y-4">
      <div>
        <Label htmlFor="date">Date</Label>
        <Input
          id="date"
          type="date"
          value={formData.date}
          onChange={(e) => updateFormData({ date: e.target.value })}
        />
      </div>
      <div>
        <Label htmlFor="time">Heure</Label>
        <Input
          id="time"
          type="time"
          value={formData.time}
          onChange={(e) => updateFormData({ time: e.target.value })}
        />
      </div>
    </div>
  )
}

function PaymentStep({ formData, updateFormData }) {
  return (
    <div>
      <Label htmlFor="paymentMethod">Méthode de paiement</Label>
      <Select
        id="paymentMethod"
        value={formData.paymentMethod}
        onValueChange={(value) => updateFormData({ paymentMethod: value })}
      >
        <Select.Trigger>
          <Select.Value placeholder="Sélectionnez une méthode de paiement" />
        </Select.Trigger>
        <Select.Content>
          <Select.Item value="card">Carte bancaire</Select.Item>
          <Select.Item value="paypal">PayPal</Select.Item>
          <Select.Item value="cash">Espèces</Select.Item>
        </Select.Content>
      </Select>
    </div>
  )
}

function ConfirmationStep({ formData }) {
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold">Récapitulatif de la réservation</h3>
      <p>Point de départ : {formData.pickup}</p>
      <p>Destination : {formData.dropoff}</p>
      <p>Type de véhicule : {formData.vehicleType}</p>
      <p>Date : {formData.date}</p>
      <p>Heure : {formData.time}</p>
      <p>Méthode de paiement : {formData.paymentMethod}</p>
    </div>
  )
}