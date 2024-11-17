'use client'

import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "./card"
import { Button } from "./button"
import { Progress } from "./progress"
import { useUser } from "@clerk/nextjs";

import { LocationStep } from './steps/LocationStep'
import { MoreCommentStep } from './steps/MoreCommentStep'
import { DateTimeStep } from './steps/DateTimeStep'
import { InfosStep } from './steps/InfosStep'
import { SendingTypeStep } from './steps/SendingTypeStep'

const MultistepForm = ({setIsFormOpen,setIsFormValidating,setDidFormsucceded}) => {
  const totalSteps = 5
  , [currentStep, setCurrentStep] = useState(1)
  , { user } = useUser()
  , [formData, setFormData] = useState({
    pickup: '',
    dropoff: '',
    date: '',
    time: '',
    paymentMethod: '',
    name: '',
    phone: '',
    price: '',
    comment: '',
  })
  , nextStep = () => setCurrentStep(prev => Math.min(prev + 1, 5))
  , prevStep = () => setCurrentStep(prev => Math.max(prev - 1, 1))
  , updateFormData = (data) => {
    setFormData(prev => ({ ...prev, ...data }))
  }


  , handleNext = () => {
    if (currentStep < totalSteps) {
      nextStep()
    } else {
      console.log('Réservation confirmée:', formData)
    }
  }
  , handleSubmit = () => {
    // Logique pour soumettre le formulaire complet
    console.log("Formulaire soumis !")
    console.log(formData);
    setIsFormValidating(true)

    const sendDataToAPI = async () => {
      try {
        const response = await fetch('/api/orders', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body:  JSON.stringify(formData),
        });
        if (!response.ok) {
          throw new Error('Erreur lors de l\'envoi du formulaire');
        }
        const data = await response.json();
        console.log('Données envoyées avec succès:', data);
        setIsFormOpen(false)
        setDidFormsucceded(true)
        setIsFormValidating(false)
      } catch (error) {
        console.error('Erreur lors de l\'envoi du formulaire:', error);
      }
    }

    sendDataToAPI()

    console.log("Formulaire soumis sous forme de JSON:", JSON.stringify(formData))
  }

  , renderStep = () => {
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

  , autoFillMissingData = () => {
    const defaultFormData = {
      pickup: 'Abidjan',
      dropoff: 'Marseille',
      // vehicleType: 'Type de véhicule par défaut',
      date: '2024-10-02',
      time: '12:01',
      paymentMethod: 'Méthode de paiement par défaut',
      name: 'Nom par défaut',
      phone: '0707040302',
      price: 2000,
      comment: 'Un petit commentaire',
    }

    , updatedFormData = Object.keys(formData).reduce((acc, key) => {
      if (!formData[key]) {
        acc[key] = defaultFormData[key];
      } else {
        acc[key] = formData[key];
      }
      return acc;
    }, {})

    setFormData(updatedFormData)
  }


  useEffect(() => {
    autoFillMissingData()
  }, [])

  useEffect(() => {
    if (user && currentStep === 1) {
      // Si l'utilisateur est connecté et que nous sommes à l'étape 0 (infosStep),
      // passons automatiquement à l'étape suivante
      setCurrentStep(2);
    }
  }, [user, currentStep]);

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
        <form className="p-6">
          {renderStep()}
        </form>
      </CardContent>
    </Card>)
  );
}

export default MultistepForm;