"use client";
import React, { useState, useEffect } from "react";
import LoginForm from "./LoginForm";
import { authService } from "../services/authService";
import {
    // auth,
    useUser,
    UserButton,
    SignIn,
    SignUp,
    SignedIn,
    SignedOut,
    ClerkLoaded,
    ClerkLoading
} from "@clerk/nextjs"
import { useRouter } from 'next/navigation'

export default function AuthButton() {
    const [isOpen, setIsOpen] = useState(false);
    const [isRegistering, setIsRegistering] = useState(false);
    const [isLoggingIn, setIsLoggingIn] = useState(false);
    const router = useRouter()
    const [formData, setFormData] = useState({
        nom: "",
        prenom: "",
        age: "",
        contact: "",
        motDePasse: "",
        confirmationMotDePasse: "",
    });
    const { user } = useUser();
    const [currentUser, setCurrentUser] = useState(user);
    const ok = ""

    useEffect(() => {
        const user = authService.getCurrentUser();
        setCurrentUser(user);
    }, []);

    const togglePopup = () => {
        setIsOpen(!isOpen);
        setIsRegistering(false);
        setIsLoggingIn(false);
    };

    const handleRegister = () => {
        setIsRegistering(true);
        setIsLoggingIn(false);
    };

    const handleLogin = () => {
        setIsLoggingIn(true);
        setIsRegistering(false);
    };

    const handleInputChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        authService.saveUser(formData);
        setCurrentUser(formData);
        console.log("Compte créé et connecté:", formData);
        togglePopup();
    };

    const handleLogout = () => {
        authService.logout();
        setCurrentUser(null);
    };

    return (<>
        <div className="auth-button-container">
            {user ? (
                <div onClick={e=>{
                    // alert('ok')
                    setTimeout(()=>{
                        const tmp_ = document.querySelector(".cl-userButtonPopoverActions")
                        const btn = tmp_.querySelector("button").cloneNode(true)
                        console.log(tmp_);
                        console.log(btn);
                        btn.className = "btn"
                        btn.querySelector('span').textContent = "Admin"
                        btn.onclick = ee => {
                            router.push('/admin', { scroll: false })
                        }
                        tmp_.append(btn)
                    },1000)
                }}>
                    <UserButton />
                </div>
            ) : (
                <>
                    {!isOpen ? (
                        <button onClick={togglePopup} className="auth-button">
                            <ClerkLoading>
                                ...Clerk is loading...
                                {/* Compte */}
                            </ClerkLoading>
                            <ClerkLoaded>
                                Compte
                            </ClerkLoaded>
                        </button>
                    ) : (
                        <button onClick={e=>{
                            document.querySelector(".cl-signUp-root")?.classList?.remove("on")
                            document.querySelector(".cl-signIn-root")?.classList?.remove("on")
                            setIsOpen(false)
                        }} className="auth-button">X</button>
                    )}
                </>
            )}
            {isOpen && !currentUser && (
                <div className={`auth-popup ${isRegistering || isLoggingIn ? "auth-popup-large" : ""}`}>
                    {!isRegistering && !isLoggingIn && (
                    // {!isRegistering && !isLoggingIn ? (
                        <>
                            {/* <button onClick={handleLogin} className="auth-option"> */}
                            <button onClick={e=>{
                                    document.querySelector(".cl-signIn-root")?.classList?.add("on")
                                }} className="auth-option"
                            >
                                Se connecter
                            </button>
                            <div className="auth-separator">ou</div>
                            <button onClick={e=>{
                                    document.querySelector(".cl-signUp-root")?.classList?.add("on")
                                }} className="auth-option"
                            >
                                Créer un compte
                            </button>
                        </>
                    ) 
                    // ) : isRegistering ? (
                    //     <div className="register-form-container">
                    //         <button onClick={togglePopup} className="close-button">
                    //             &times;
                    //         </button>
                    //         <form onSubmit={handleSubmit} className="register-form">
                    //             <h2 className="form-title">Création de compte</h2>
                    //             <input type="text" name="nom" placeholder="Nom" onChange={handleInputChange} required />
                    //             <input type="text" name="prenom" placeholder="Prénom" onChange={handleInputChange} required />
                    //             <input type="number" name="age" placeholder="Âge" onChange={handleInputChange} required />
                    //             <input type="text" name="contact" placeholder="Numéro de téléphone ou email" onChange={handleInputChange} required />
                    //             <input type="password" name="motDePasse" placeholder="Mot de passe" onChange={handleInputChange} required />
                    //             <input type="password" name="confirmationMotDePasse" placeholder="Confirmer le mot de passe" onChange={handleInputChange} required />
                    //             <button type="submit" className="register-button">
                    //                 S'inscrire
                    //             </button>
                    //         </form>
                    //     </div>
                    // ) : (
                    //     <LoginForm onClose={togglePopup} onLogin={setCurrentUser} />
                    // )
                    }
                </div>
            )}
        </div>
        <ClerkLoaded>
            <SignedOut>
                <SignIn />
                <SignUp />
            </SignedOut>
        </ClerkLoaded>
    </>);
}
