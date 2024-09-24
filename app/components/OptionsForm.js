import React, { useState } from "react";
import DatePicker, { registerLocale } from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import fr from "date-fns/locale/fr";
import { setHours, setMinutes } from "date-fns";

registerLocale("fr", fr);

export default function OptionsForm({ coordinates }) {
    const [packageSize, setPackageSize] = useState("petit");
    const [packageType, setPackageType] = useState({
        classique: false,
        lourd: false,
        fragile: false,
    });
    const [selectedDate, setSelectedDate] = useState(getInitialDate());
    const [location, setLocation] = useState("dans");

    function getInitialDate() {
        const now = new Date();
        now.setMinutes(Math.ceil(now.getMinutes() / 15) * 15);
        now.setSeconds(0);
        now.setMilliseconds(0);
        return now;
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Coordonnées soumises:", coordinates[0], coordinates[1]);
        console.log("Taille du colis:", packageSize);
        console.log("Type de colis:", packageType);
        console.log("Date et heure de la course:", selectedDate);
        console.log("Localisation:", location === "dans" ? "Dans Azaguié" : "Hors Azaguié");
    };

    const handlePackageSizeChange = (e) => {
        setPackageSize(e.target.value);
    };

    const handlePackageTypeChange = (e) => {
        setPackageType({
            ...packageType,
            [e.target.value]: e.target.checked,
        });
    };

    return (
        <div className="options-form">
            <h2>Itinéraire</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="coord1">Point de départ</label>
                    <input type="text" id="coord1" value={coordinates[0] || ""} readOnly />
                </div>
                <div className="form-group">
                    <label htmlFor="coord2">Point d'arrivée</label>
                    <input type="text" id="coord2" value={coordinates[1] || ""} readOnly />
                </div>
                <div className="form-group">
                    <label>Taille du colis</label>
                    <div className="radio-group">
                        <label>
                            <input type="radio" value="petit" checked={packageSize === "petit"} onChange={handlePackageSizeChange} />
                            Petit
                        </label>
                        <label>
                            <input type="radio" value="gros" checked={packageSize === "gros"} onChange={handlePackageSizeChange} />
                            Gros
                        </label>
                    </div>
                </div>
                <div className="form-group">
                    <label>Type de colis</label>
                    <div className="checkbox-group">
                        <label>
                            <input type="checkbox" value="classique" checked={packageType.classique} onChange={handlePackageTypeChange} />
                            Poids classique
                        </label>
                        <label>
                            <input type="checkbox" value="lourd" checked={packageType.lourd} onChange={handlePackageTypeChange} />
                            Objet lourd
                        </label>
                        <label>
                            <input type="checkbox" value="fragile" checked={packageType.fragile} onChange={handlePackageTypeChange} />
                            Objet fragile/conditionnage
                        </label>
                    </div>
                </div>
                <div className="form-group">
                    <label>Date et heure de la course</label>
                    <DatePicker
                        selected={selectedDate}
                        onChange={(date) => setSelectedDate(date)}
                        showTimeSelect
                        timeFormat="HH:mm"
                        timeIntervals={15}
                        dateFormat="dd/MM/yyyy HH:mm"
                        locale="fr"
                        minDate={new Date()}
                        minTime={setHours(setMinutes(new Date(), 0), 8)}
                        maxTime={setHours(setMinutes(new Date(), 0), 20)}
                    />
                </div>
                <div className="form-group">
                    <label>Localisation</label>
                    <div className="radio-group">
                        <label>
                            <input type="radio" value="dans" checked={location === "dans"} onChange={(e) => setLocation(e.target.value)} />
                            Dans Azaguié
                        </label>
                        <label>
                            <input type="radio" value="hors" checked={location === "hors"} onChange={(e) => setLocation(e.target.value)} />
                            Hors Azaguié
                        </label>
                    </div>
                </div>
                <button type="submit">Créer l'itinéraire</button>
            </form>
        </div>
    );
}
