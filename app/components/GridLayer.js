import { useEffect, useRef } from "react";
import L from "leaflet";

export default function GridLayer({ map }) {
    const gridLayerRef = useRef(null);

    useEffect(() => {
        if (!map) return;

        const addFixedGrid = () => {
            if (gridLayerRef.current) {
                map.removeLayer(gridLayerRef.current);
            }

            gridLayerRef.current = L.layerGroup();

            const mapBounds = map.getBounds();
            const cellWidth = (mapBounds.getEast() - mapBounds.getWest()) / 5;
            const cellHeight = (mapBounds.getNorth() - mapBounds.getSouth()) / 5;

            for (let i = 0; i <= 5; i++) {
                L.polyline(
                    [
                        [mapBounds.getSouth(), mapBounds.getWest() + i * cellWidth],
                        [mapBounds.getNorth(), mapBounds.getWest() + i * cellWidth],
                    ],
                    { color: "rgba(255, 255, 255, 1)", weight: 1 }
                ).addTo(gridLayerRef.current);

                L.polyline(
                    [
                        [mapBounds.getSouth() + i * cellHeight, mapBounds.getWest()],
                        [mapBounds.getSouth() + i * cellHeight, mapBounds.getEast()],
                    ],
                    { color: "rgba(255, 255, 255, 1)", weight: 1 }
                ).addTo(gridLayerRef.current);
            }

            gridLayerRef.current.addTo(map);
        };

        addFixedGrid();

        map.on("moveend", addFixedGrid);

        return () => {
            if (gridLayerRef.current) {
                map.removeLayer(gridLayerRef.current);
            }
            map.off("moveend", addFixedGrid);
        };
    }, [map]);

    return null;
}
