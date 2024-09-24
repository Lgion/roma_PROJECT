"use client";
import { useEffect, useRef, useCallback, useState } from "react";
import L from "leaflet";
import GridLayer from "./GridLayer";

export default function MapComponent({ onMarkerPlace }) {
    const mapRef = useRef(null);
    const markersRef = useRef([]);
    const iconIndexRef = useRef(0);
    const [map, setMap] = useState(null);

    useEffect(() => {
        if (typeof window !== "undefined" && !mapRef.current) {
            // Définir la classe d'icône personnalisée
            const LeafIcon = L.Icon.extend({
                options: {
                    shadowUrl: "/images/leaf-shadow.png",
                    iconSize: [38, 95],
                    shadowSize: [50, 64],
                    iconAnchor: [22, 94],
                    shadowAnchor: [4, 62],
                    popupAnchor: [-3, -76],
                },
            });

            // Créer deux icônes différentes
            const blueIcon = new LeafIcon({ iconUrl: "/images/leaf-green.png" });
            const redIcon = new LeafIcon({ iconUrl: "/images/leaf-red.png" });

            mapRef.current = L.map("map-container").setView([5.6333, -4.0833], 13);
            L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
                attribution: "© OpenStreetMap contributors",
            }).addTo(mapRef.current);

            setMap(mapRef.current);

            mapRef.current.on("click", function (e) {
                const icon = iconIndexRef.current % 2 === 0 ? blueIcon : redIcon;
                addMarker(e.latlng, icon);
                iconIndexRef.current++; // Incrémenter l'index après chaque placement
            });
        }

        return () => {
            if (mapRef.current) {
                markersRef.current.forEach((marker) => mapRef.current.removeLayer(marker));
                mapRef.current.remove();
                mapRef.current = null;
                markersRef.current = [];
                setMap(null);
            }
        };
    }, []);

    const addMarker = useCallback(
        (latlng, icon) => {
            if (markersRef.current.length === 2) {
                mapRef.current.removeLayer(markersRef.current[0]);
                markersRef.current.shift();
            }
            const newMarker = L.marker(latlng, { icon: icon }).addTo(mapRef.current);
            markersRef.current.push(newMarker);
            onMarkerPlace(latlng, markersRef.current.length - 1);
        },
        [onMarkerPlace]
    );

    return (
        <div id="map-container" style={{ width: "100%", height: "100%" }}>
            {map && <GridLayer map={map} />}
        </div>
    );
}
