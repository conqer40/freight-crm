'use client';

import { MapContainer, TileLayer, Marker, Popup, Polyline } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { useEffect } from 'react';

// Fix Leaflet Default Icon Issue in Next.js
const icon = L.icon({
    iconUrl: '/images/marker-icon.png', // We'll just rely on CSS circles for now to avoid asset issues, or use a custom divIcon
    iconSize: [25, 41],
    iconAnchor: [12, 41],
});

// Custom PULSING DOT Icon for better visuals
const createPulsingIcon = (color: string) => L.divIcon({
    className: 'custom-div-icon',
    html: `<div style="background-color: ${color};" class="w-4 h-4 rounded-full border-2 border-white shadow-lg relative">
            <div style="background-color: ${color};" class="absolute inset-0 rounded-full animate-ping opacity-75"></div>
           </div>`,
    iconSize: [16, 16],
    iconAnchor: [8, 8]
});

const positions: any[] = [
    { name: 'Shanghai', coords: [31.2304, 121.4737], type: 'POL' },
    { name: 'Alexandria', coords: [31.2001, 29.9187], type: 'POD' },
    { name: 'Jebel Ali', coords: [24.9857, 55.0273], type: 'POL' },
    { name: 'Sokhna', coords: [29.6236, 32.3361], type: 'POD' },
];

const routes = [
    [positions[0].coords, positions[1].coords], // Shanghai -> Alex
    [positions[2].coords, positions[3].coords], // Jebel Ali -> Sokhna
];

export default function WorldMap() {

    return (
        <div className="glass-card p-0 overflow-hidden h-[400px] relative w-full">
            <div className="absolute top-4 right-4 z-[400] bg-slate-900/80 backdrop-blur-md px-4 py-2 rounded-xl border border-white/10">
                <h3 className="text-sm font-bold text-white flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                    Live Tracking
                </h3>
            </div>

            <MapContainer center={[30, 40]} zoom={2} style={{ height: '100%', width: '100%', background: '#0f172a' }}>
                <TileLayer
                    url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
                />

                {positions.map((pos, idx) => (
                    <Marker
                        key={idx}
                        position={pos.coords as [number, number]}
                        icon={createPulsingIcon(pos.type === 'POL' ? '#3b82f6' : '#10b981')}
                    >
                        <Popup className="glass-popup">
                            <div className="text-slate-800 font-bold">{pos.name}</div>
                            <div className="text-xs text-slate-500">{pos.type}</div>
                        </Popup>
                    </Marker>
                ))}

                {routes.map((route, idx) => (
                    <Polyline
                        key={idx}
                        positions={route as [number, number][]}
                        pathOptions={{ color: '#6366f1', weight: 2, dashArray: '5, 10', opacity: 0.6 }}
                    />
                ))}
            </MapContainer>
        </div>
    );
}
