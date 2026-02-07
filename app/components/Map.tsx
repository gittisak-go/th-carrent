'use client'
import React, {useState, useEffect} from 'react';
import {MapContainer, TileLayer, Marker, useMapEvents} from 'react-leaflet';
import {LatLngTuple} from 'leaflet';
import 'leaflet/dist/leaflet.css';
import {toast} from "react-toastify";
import L from 'leaflet';

// Set up the map marker icon.
L.Marker.prototype.options.icon = L.icon({
    iconUrl: "/images/leaflet/marker-icon.png",
    shadowUrl: "/images/leaflet/marker-shadow.png",
    iconSize: [25,41], 
    iconAnchor: [12,41]
});

interface MapProps
{
    onLocationSelect?: (location: { lat: number, lng: number }) => void; // Callback to return selected location
    defaultLocation?: { lat: number, lng: number };
}

const defaults = {
    zoom: 19,
};

// Fallback center: อุดรธานี (Udon Thani) — ใช้เมื่อขอตำแหน่งไม่ได้หรือเครือข่ายล้มเหลว
const FALLBACK_CENTER: LatLngTuple = [17.4152, 102.7850];

function getLocationErrorMessage(error: GeolocationPositionError): string {
    if (error.code === error.PERMISSION_DENIED)
        return 'กรุณาอนุญาตการเข้าถึงตำแหน่งในเบราว์เซอร์ เพื่อช่วยเลือกจุดส่งรถ หรือเลือกตำแหน่งบนแผนที่ด้วยตนเอง';
    if (error.code === error.POSITION_UNAVAILABLE || error.message?.includes('network'))
        return 'ไม่สามารถดึงตำแหน่งจากเครือข่ายได้ แผนที่แสดงจุดอ้างอิงอุดรธานี — เลือกจุดส่งรถบนแผนที่ได้เลย';
    return 'ไม่สามารถใช้ตำแหน่งปัจจุบันได้ — เลือกจุดส่งรถบนแผนที่ได้เลย';
}

const Map = ({
                 defaultLocation, onLocationSelect = () =>
    {
    }
             }: MapProps) =>
{
    const [markerPosition, setMarkerPosition] = useState<LatLngTuple | null>(null);
    const [currentPosition, setCurrentPosition] = useState<LatLngTuple | null>(null);

    // Function to get user's current location (with fallback so map always loads)
    useEffect(() =>
    {
        // Use default location if specified.
        if (defaultLocation)
        {
            setCurrentPosition([defaultLocation.lat, defaultLocation.lng]);
            setMarkerPosition([defaultLocation.lat, defaultLocation.lng]);
            return;
        }

        if (navigator.geolocation)
        {
            navigator.geolocation.getCurrentPosition(
                (position) =>
                {
                    const {latitude, longitude} = position.coords;
                    setCurrentPosition([latitude, longitude]);
                },
                (error) =>
                {
                    toast.info(getLocationErrorMessage(error));
                    setCurrentPosition(FALLBACK_CENTER);
                },
                {enableHighAccuracy: true, timeout: 10000, maximumAge: 60000}
            );
        }
        else
        {
            setCurrentPosition(FALLBACK_CENTER);
        }
    }, [defaultLocation]);

    // Component to handle map clicks and set marker position
    const LocationMarker = () =>
    {
        useMapEvents({
            click(e)
            {
                const {lat, lng} = e.latlng;
                if (!defaultLocation)
                    setMarkerPosition([lat, lng]); // Set marker position on map click
                onLocationSelect({lat, lng}); // Return selected location as JSON
            },
        });

        return markerPosition === null ? null : (
            <Marker position={markerPosition}></Marker>
        );
    };

    // If currentPosition is still null, show a loading state
    if (!currentPosition) return <p>Loading map...</p>;

    return (
        <MapContainer
            center={currentPosition}
            zoom={defaults.zoom}
            scrollWheelZoom={false}
            style={{height: '100%', width: '100%'}}
        >
            <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <LocationMarker/>
        </MapContainer>
    );
};

export default React.memo(Map);
