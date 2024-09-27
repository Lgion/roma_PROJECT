"use client";

import { useState } from "react";
import { Button } from "./shadcn/ui/button";
import MultistepForm from "./shadcn/MultistepForm";

export default function ClientHome() {
    const [isFormOpen, setIsFormOpen] = useState(false);

    const toggleForm = () => {
        setIsFormOpen(!isFormOpen);
    };

    return (
        <>
            <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 z-20">
                <Button onClick={toggleForm} variant="outline">
                    {isFormOpen ? "Fermer le formulaire" : "Ouvrir le formulaire"}
                </Button>
            </div>

            {isFormOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-30">
                    <MultistepForm />
                </div>
            )}
        </>
    );
}
