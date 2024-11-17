import React, { useEffect } from 'react';
import { Input } from "../../ui/input";
import { Label } from "../../ui/label";
import { Button } from "../../ui/button";
import { SignedOut, SignInButton, useUser } from "@clerk/nextjs";

export function InfosStep({ formData, updateFormData }) {
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