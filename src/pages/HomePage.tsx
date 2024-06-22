import React, { useState, useEffect } from 'react';
import Sidebar from '../components/Sidebar';
import GoogleMapComponent from '../components/GoogleMapComponent';
import { useJsApiLoader } from '@react-google-maps/api';
import { getAllSekolah, getAllKompetensi } from '../api/sekolah-api';

interface School {
  id: string;
  nama: string;
  kota: string;
  lat: number;
  lng: number;
  kecocokan?: string;
  kompetensi?: Kompetensi[];
}

interface Kompetensi {
  kode: string;
  nama: string;
  unit_kompetensi: {
    id: string;
    nama: string;
  }[];
}

const libraries: any[] = ['places'];

const HomePage: React.FC = () => {
  const [selectedSchool, setSelectedSchool] = useState<School | null>(null);
  const [initialSchools, setInitialSchools] = useState<School[]>([]);
  const [filteredSchools, setFilteredSchools] = useState<School[]>([]);
  const [center, setCenter] = useState<{ lat: number, lng: number }>({ lat: -6.200000, lng: 106.816666 });

  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: import.meta.env.VITE_MAPS_API_KEY,
    libraries,
  });

  useEffect(() => {
    const fetchInitialSchools = async () => {
      try {
        const response = await getAllSekolah();
        if (response && Array.isArray(response.data)) {
          const schoolsWithCoords = await Promise.all(response.data.map(async (school: School) => {
            const address = `${school.nama}, ${school.kota}, Indonesia`;
            const coordinates = await geocodeAddress(address);
            const kompetensiData = await getAllKompetensi(school.id);
            return { ...school, ...coordinates, kompetensi: kompetensiData.data };
          }));

          setInitialSchools(schoolsWithCoords);

          if (schoolsWithCoords.length > 0) {
            const avgLat = schoolsWithCoords.reduce((sum, school) => sum + school.lat, 0) / schoolsWithCoords.length;
            const avgLng = schoolsWithCoords.reduce((sum, school) => sum + school.lng, 0) / schoolsWithCoords.length;
            setCenter({ lat: avgLat, lng: avgLng });
          }
        } else {
          console.error('Expected an array but got:', response);
        }
      } catch (error) {
        console.error('Error fetching initial schools:', error);
      }
    };

    fetchInitialSchools();
  }, []);

  const geocodeAddress = async (address: string) => {
    try {
      const response = await fetch(`https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(address)}&key=${import.meta.env.VITE_MAPS_API_KEY}`);
      const data = await response.json();
      if (data && data.results && data.results.length > 0) {
        const { lat, lng } = data.results[0].geometry.location;
        return { lat, lng };
      }
      throw new Error('Address not found');
    } catch (error) {
      console.error('Geocoding failed:', error);
      throw error;
    }
  };

  const handleMarkerClick = (school: School) => {
    setSelectedSchool(school);
    setCenter({ lat: school.lat, lng: school.lng });
  };

  const handleSidebarClick = (school: School) => {
    setSelectedSchool(school);
    setCenter({ lat: school.lat, lng: school.lng });
  };

  const handleBackClick = () => {
    setFilteredSchools([]);  
    setSelectedSchool(null);
  };

  if (!isLoaded) {
    return <div>Loading...</div>;
  }

  return (
    <div className="relative flex flex-col sm:flex-row h-screen overflow-hidden">
      <div className="flex-grow sm:mt-0">
        <GoogleMapComponent
          lat={center.lat}
          lng={center.lng}
          filteredSchools={filteredSchools}  
          zoom={12}
          onMarkerClick={handleMarkerClick}
          selectedSchool={selectedSchool}
        />
      </div>
      <Sidebar
        onSelectSchool={handleSidebarClick}
        setFilteredSchools={setFilteredSchools}
        schools={initialSchools}
        onBackClick={handleBackClick} 
      />
    </div>
  );
};

export default HomePage;
