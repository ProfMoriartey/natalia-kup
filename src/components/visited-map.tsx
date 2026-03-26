"use client";

import { useState } from "react";
import {
  ComposableMap,
  Geographies,
  Geography,
  ZoomableGroup,
} from "react-simple-maps";

const geoUrl = "https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json";

const visitedCountries: string[] = [
  "United States of America",
  "Germany",
  "France",
  "Spain",
  "Turkey",
  "Montanegro",
  "Serbia",
  "Georgia",
  "Vietnam",
  "Malaysia",
  "Philippines",
  "Kazakhstan",
];

type GeoProperties = {
  name: string;
};

type GeoFeature = {
  rsmKey: string;
  properties: GeoProperties;
};

export default function VisitedMap() {
  const [position, setPosition] = useState({
    coordinates: [0, 0] as [number, number],
    zoom: 1,
  });

  const handleZoomIn = () => {
    if (position.zoom >= 4) return;
    setPosition((pos) => ({ ...pos, zoom: pos.zoom * 1.5 }));
  };

  const handleZoomOut = () => {
    if (position.zoom <= 1) return;
    setPosition((pos) => ({ ...pos, zoom: pos.zoom / 1.5 }));
  };

  const handleMoveEnd = (newPosition: {
    coordinates: [number, number];
    zoom: number;
  }) => {
    setPosition(newPosition);
  };

  return (
    <div className="flex h-full flex-col rounded-xl border border-pink-200 bg-pink-100 p-6 shadow-sm">
      <h2 className="mb-4 text-xl font-bold text-pink-900 uppercase md:text-2xl">
        Been to
      </h2>
      <div className="relative flex w-full flex-1 items-center justify-center overflow-hidden rounded border border-pink-300 bg-pink-50 p-2">
        <ComposableMap
          projectionConfig={{ scale: 140 }}
          className="cursor-grab object-contain outline-none focus:outline-none active:cursor-grabbing"
        >
          <ZoomableGroup
            zoom={position.zoom}
            center={position.coordinates}
            onMoveEnd={handleMoveEnd}
          >
            <Geographies geography={geoUrl}>
              {({ geographies }: { geographies: GeoFeature[] }) =>
                geographies.map((geo) => {
                  const countryName = geo.properties.name;
                  const isVisited = visitedCountries.includes(countryName);

                  return (
                    <Geography
                      key={geo.rsmKey}
                      geography={geo}
                      fill={
                        isVisited ? "rgb(244, 63, 94)" : "rgb(251, 207, 232)"
                      }
                      stroke="rgb(253, 242, 248)"
                      strokeWidth={0.5 / position.zoom}
                      style={{
                        default: { outline: "none" },
                        hover: { fill: "rgb(225, 29, 72)", outline: "none" },
                        pressed: { outline: "none" },
                      }}
                    />
                  );
                })
              }
            </Geographies>
          </ZoomableGroup>
        </ComposableMap>

        <div className="absolute right-4 bottom-4 flex flex-col gap-2">
          <button
            onClick={handleZoomIn}
            className="flex h-8 w-8 items-center justify-center rounded-full border border-pink-200 bg-white text-xl font-bold text-pink-900 shadow-sm hover:bg-pink-50 focus:outline-none"
          >
            +
          </button>
          <button
            onClick={handleZoomOut}
            className="flex h-8 w-8 items-center justify-center rounded-full border border-pink-200 bg-white text-xl font-bold text-pink-900 shadow-sm hover:bg-pink-50 focus:outline-none"
          >
            -
          </button>
        </div>
      </div>
    </div>
  );
}
