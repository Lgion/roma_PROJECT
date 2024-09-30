'use client'

import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "./card"
import { Button } from "./button"
import { Progress } from "./progress"
import { Input } from "../ui/input"
import { Label } from "../ui/label"
import { Select,SelectTrigger,SelectContent,SelectItem,SelectValue } from "../ui/select"
// import LocationStep from './LocationStep'
// import MoreCommentStep from './MoreCommentStep'
// import DateTimeStep from './DateTimeStep'
// import InfosStep from './PaymentStep'
// import SendingTypeStep from './SendingTypeStep'
import { useUser } from "@clerk/nextjs";

const MultistepForm = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const { user } = useUser();

  useEffect(() => {
    if (user && currentStep === 0) {
      // Si l'utilisateur est connecté et que nous sommes à l'étape 0 (infosStep),
      // passons automatiquement à l'étape suivante
      setCurrentStep(1);
    }
  }, [user, currentStep]);

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

  const nextStep = () => setCurrentStep(prev => Math.min(prev + 1, 5))
  const prevStep = () => setCurrentStep(prev => Math.max(prev - 1, 1))

  const totalSteps = 5

  const handleNext = () => {
    if (currentStep < totalSteps) {
      nextStep()
    } else {
      console.log('Réservation confirmée:', formData)
    }
  }

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return <InfosStep formData={formData} updateFormData={updateFormData} />;
      case 2:
        return <DateTimeStep formData={formData} updateFormData={updateFormData} />;
      case 3:
        return <LocationStep formData={formData} updateFormData={updateFormData} />;
      case 4:
        return <SendingTypeStep formData={formData} />;
      case 5:
        return <MoreCommentStep formData={formData} updateFormData={updateFormData} />;
      default:
        return null
    }
  }

  return (
    (<Card className="w-full h-[80vh] max-w-[1000px] mx-auto booking-form-card">
      <CardHeader>
        <CardTitle>Réserver une course</CardTitle>
        <Progress 
          value={(currentStep / totalSteps) * 100} 
          totalSteps={totalSteps} 
          currentStep={currentStep} 
          onPrevious={prevStep} 
          onNext={handleNext}
          className="mt-4"
        />
      </CardHeader>
      <CardContent className="h-[calc(100%-100px)] overflow-y-auto">
        {renderStep()}
        <div className="flex justify-between mt-6">
          {currentStep > 1 && (
            <Button onClick={prevStep} variant="outline">
              Précédent
            </Button>
          )}
          {currentStep < 5 ? (
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

function MoreCommentStep({ formData, updateFormData }) {
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

function InfosStep({ formData, updateFormData }) {
  return (
    <div>
      <Label htmlFor="paymentMethod">Méthode de paiement</Label>
      <Select
        id="paymentMethod"
        value={formData.paymentMethod}
        onValueChange={(value) => updateFormData({ paymentMethod: value })}
      >
        <SelectTrigger>
          <SelectValue placeholder="Sélectionnez une méthode de paiement" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="card">Carte bancaire</SelectItem>
          <SelectItem value="paypal">PayPal</SelectItem>
          <SelectItem value="cash">Espèces</SelectItem>
        </SelectContent>
      </Select>
    </div>
  )
}

function SendingTypeStep({ formData }) {
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

export default MultistepForm;