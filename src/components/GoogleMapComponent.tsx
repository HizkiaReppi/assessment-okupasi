import React, { useState, useCallback, useEffect, useRef } from 'react';
import { GoogleMap, InfoWindow } from '@react-google-maps/api';

const containerStyle = {
  width: '100%',
  height: '100%',
};

interface MapProps {
  lat: number;
  lng: number;
  selectedSchoolName: string;
  zoom: number;
}

const GoogleMapComponent: React.FC<MapProps> = ({ lat, lng, selectedSchoolName, zoom }) => {
  const [map, setMap] = useState<google.maps.Map | null>(null);
  const [infoWindowOpen, setInfoWindowOpen] = useState(true);
  const mapRef = useRef<google.maps.Map | null>(null);

  const onLoad = useCallback((map: google.maps.Map) => {
    setMap(map);
    mapRef.current = map;
    const position = new google.maps.LatLng(lat, lng);
    map.setCenter(position);
    map.setZoom(zoom);
  }, [lat, lng, zoom]);

  const onUnmount = useCallback(() => {
    setMap(null);
    mapRef.current = null;
  }, []);

  useEffect(() => {
    if (mapRef.current) {
      const position = new google.maps.LatLng(lat, lng);
      mapRef.current.setCenter(position);
      mapRef.current.setZoom(zoom);
      setInfoWindowOpen(true); // Membuka InfoWindow otomatis saat lokasi berubah
    }
  }, [lat, lng, zoom]);

  const handleMarkerClick = () => {
    setInfoWindowOpen(true);
  };

  const handleMapClick = () => {
    setInfoWindowOpen(false);
  };

  useEffect(() => {
    if (map) {
      const marker = new google.maps.Marker({
        position: { lat, lng },
        map,
        title: selectedSchoolName,
        label: {
          text: selectedSchoolName,
          color: 'black',
          fontWeight: 'bold',
        },
      });

      marker.addListener('click', handleMarkerClick);

      return () => {
        marker.setMap(null);
      };
    }
  }, [map, lat, lng, selectedSchoolName]);

  return (
    <GoogleMap
      mapContainerStyle={containerStyle}
      center={{ lat, lng }}
      zoom={zoom}
      onLoad={onLoad}
      onUnmount={onUnmount}
      onClick={handleMapClick}
    >
      {infoWindowOpen && (
        <InfoWindow position={{ lat, lng }} onCloseClick={() => setInfoWindowOpen(false)}>
          <div>
            <h3>{selectedSchoolName}</h3>
            <p>Koordinat: {lat}, {lng}</p>
          </div>
        </InfoWindow>
      )}
    </GoogleMap>
  );
};

export default React.memo(GoogleMapComponent);
