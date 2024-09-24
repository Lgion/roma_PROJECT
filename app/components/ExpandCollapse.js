"use client";
import React, { useState, useCallback } from "react";
import OptionsForm from "./OptionsForm";
import MapComponent from "./MapComponent";

export default function ExpandCollapse() {
    const [isExpanded, setIsExpanded] = useState(false);
    const [coordinates, setCoordinates] = useState(["", ""]);

    const toggleExpand = useCallback((e) => {
        e.preventDefault();
        setIsExpanded((prev) => !prev);
    }, []);

    const handleMarkerPlace = useCallback((latlng, index) => {
        setCoordinates((prev) => {
            const newCoords = [...prev];
            newCoords[index] = `${latlng.lat.toFixed(6)}, ${latlng.lng.toFixed(6)}`;
            return newCoords;
        });
    }, []);

    return (
        <>
            <div className="map-container">
                <MapComponent onMarkerPlace={handleMarkerPlace} />
            </div>
            {isExpanded && <OptionsForm coordinates={coordinates} />}
            <div className="expand-collapse-container">
                <button className={isExpanded ? "options-collapse-button" : "options-expand-button"} onClick={toggleExpand}>
                    {isExpanded ? (
                        <svg xmlns="http://www.w3.org/2000/svg" className="options-collapse-svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    ) : (
                        <svg xmlns="http://www.w3.org/2000/svg" className="options-expand-svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
                        </svg>
                    )}
                </button>
            </div>
        </>
    );
}
