import { Inter } from "next/font/google";
import { ClerkProvider } from '@clerk/nextjs'
import Header from "./header"
import Footer from "./footer"
import "./globals.css";
import "./styles/components.scss";
import "./styles/index.scss";
import "leaflet/dist/leaflet.css";
import AuthButton from "./components/AuthButton";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
    title: "Create Next App",
    description: "Generated by create next app",
};

export default function RootLayout({ children }) {
    return (
        <html lang="fr">
            <body className={inter.className}>
                <header className="app-header">
                    <AuthButton />
                </header>
                <ClerkProvider>
                <Header />
                {children}
                <Footer />
                </ClerkProvider>
            </body>
        </html>
    );
}

// Ajout de la localisation de la carte sur Azaguié
// export function MapInitialization() {
//     if (typeof window !== 'undefined') {
//         const map = L.map('map-container').setView([5.6333, -4.0833], 13); // Coordonnées d'Azaguié
//         L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
//             attribution: '© OpenStreetMap contributors'
//         }).addTo(map);
//     } MapComponent
// }
