'use client'

import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "./card"
import { Button } from "./button"
import { Progress } from "./progress"
import { Input } from "../ui/input"
import { Label } from "../ui/label"
import { Select,SelectTrigger,SelectContent,SelectItem,SelectValue } from "../ui/select"
import { SignedIn, SignInButton, SignedOut, useUser } from "@clerk/nextjs";
// import { SignInButton } from "../vendors/ClerkBtns";

// import LocationStep from './LocationStep'
// import MoreCommentStep from './MoreCommentStep'
// import DateTimeStep from './DateTimeStep'
// import InfosStep from './PaymentStep'
// import SendingTypeStep from './SendingTypeStep'

const MultistepForm = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const { user } = useUser();

  useEffect(() => {
    if (user && currentStep === 1) {
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
    name: '',
    phone: '',
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

  const handleSubmit = () => {
    // Logique pour soumettre le formulaire complet
    console.log("Formulaire soumis !")
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
      </CardHeader>
      <CardContent className="h-[calc(100%-100px)] overflow-y-auto">
        <Progress 
          value={(currentStep / totalSteps) * 100} 
          totalSteps={totalSteps} 
          currentStep={currentStep} 
          onPrevious={prevStep} 
          onNext={handleNext}
          onSubmit={handleSubmit}
          className="mb-6"
        />
        <div className="p-6">
          {renderStep()}
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
  const { user, isSignedIn } = useUser();

  useEffect(() => {
    if (isSignedIn && user) {
      updateFormData({
        name: user.fullName || '',
        phone: user.primaryPhoneNumber?.phoneNumber || '',
      });
    }
  }, [isSignedIn, user, updateFormData]);

  return (
    <div className="space-y-4">
      <div>
        <Label htmlFor="name">Nom</Label>
        <Input
          id="name"
          value={formData.name}
          onChange={(e) => updateFormData({ name: e.target.value })}
          placeholder="Entrez votre nom"
          disabled={isSignedIn}
        />
      </div>
      <div>
        <Label htmlFor="phone">Numéro de téléphone</Label>
        <Input
          id="phone"
          type="tel"
          value={formData.phone}
          onChange={(e) => updateFormData({ phone: e.target.value })}
          placeholder="Entrez votre numéro de téléphone"
          disabled={isSignedIn}
        />
      </div>
      <SignedOut>
        <div className="mt-6">
          <SignInButton mode="modal">
            <Button>Se connecter</Button>
          </SignInButton>
        </div>
      </SignedOut>
    </div>
  );
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