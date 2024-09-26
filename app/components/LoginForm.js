"use client";
import React, { useState } from "react";
import { authService } from "../services/authService";

export default function LoginForm({ onClose, onLogin }) {
    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });

    const handleInputChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleLoginSubmit = (e) => {
        e.preventDefault();
        const user = authService.login(formData.email, formData.password);
        if (user) {
            console.log("Connexion réussie:", user);
            authService.setCurrentUser(user);
            onLogin(user);
            onClose();
        } else {
            console.log("Échec de la connexion");
            // Ici, vous pourriez afficher un message d'erreur à l'utilisateur
        }
    };

    const handleForgotPassword = () => {
        console.log("Mot de passe oublié");
        // Ajoutez ici la logique pour gérer le mot de passe oublié
    };

    return (
        <div className="login-form-container">
            <button onClick={onClose} className="close-button">
                &times;
            </button>
            <form onSubmit={handleLoginSubmit} className="login-form">
                <h2 className="form-title">Connexion</h2>
                <input type="text" name="email" placeholder="Email ou numéro de téléphone" onChange={handleInputChange} required />
                <input type="password" name="password" placeholder="Mot de passe" onChange={handleInputChange} required />
                <button type="button" onClick={handleForgotPassword} className="forgot-password-button">
                    Mot de passe oublié ?
                </button>
                <button type="submit" className="login-button">
                    Se connecter
                </button>
            </form>
        </div>
    );
}
