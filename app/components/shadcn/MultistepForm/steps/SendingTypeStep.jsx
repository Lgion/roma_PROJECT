import React from 'react';

export function SendingTypeStep({ formData }) {
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold">Récapitulatif de la réservation</h3>
      <p>Point de départ : {formData.pickup}</p>
      <p>Destination : {formData.dropoff}</p>
      <p>Date : {formData.date}</p>
      <p>Heure : {formData.time}</p>
      <p>Méthode de paiement : {formData.paymentMethod}</p>
    </div>
  );
}