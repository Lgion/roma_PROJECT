"use client"
import { useEffect } from 'react';
import L from 'leaflet';
//import 'leaflet/dist/leaflet.css';

export default function MapComponent() {
  useEffect(() => {
    // Vérifier si la carte existe déjà
    if (typeof window !== 'undefined') {
      if (!document.getElementById('map-container').innerHTML) {
        // Initialiser la carte
        const map = L.map('map-container').setView([48.8566, 2.3522], 13);

        // Ajouter la couche de tuiles OpenStreetMap
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
          attribution: '© OpenStreetMap contributors'
        }).addTo(map);
      }
    }

    // Nettoyage
    return () => {
      if (typeof window !== 'undefined') {
        if (document.getElementById('map-container')?._leaflet_id) {
          document.getElementById('map-container')._leaflet_id = null;
        }
      }
    };
  }, []);

  return <div id="map-container" style={{ width: '100%', height: '100%' }} />;
}