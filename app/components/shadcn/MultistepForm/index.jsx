'use client'

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "./card"
import { Button } from "./button"
import { Progress } from "./progress"
import LocationStep from './LocationStep'
import VehicleStep from './VehicleStep'
import DateTimeStep from './DateTimeStep'
import PaymentStep from './PaymentStep'
import ConfirmationStep from './ConfirmationStep'

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