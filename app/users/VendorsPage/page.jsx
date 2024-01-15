'use client';

import { useState, useEffect } from 'react';
import { GoogleMap, useLoadScript, Marker } from '@react-google-maps/api';
import usePlacesAutocomplete, {
  getGeocode,
  getLatLng,
} from 'use-places-autocomplete';
import {
  Combobox,
  ComboboxInput,
  ComboboxPopover,
  ComboboxList,
  ComboboxOption,
} from '@reach/combobox';
import '@reach/combobox/styles.css';
import { LoadingScreen } from '@/components';

export default function VendorsPage() {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY,
    libraries: ['places'],
  });

  if (!isLoaded) return <LoadingScreen />;
  return <Map />;
}

function Map() {
  const [center, setCenter] = useState({ lat: 43.45, lng: -80.49 });
  const [selected, setSelected] = useState(null);

  useEffect(() => {
    if (selected) {
      setCenter(selected);
    }
  }, [selected]);

  return (
    <>
      <div className="w-300">
        <h1 className="text-3xl font-bold mb-5">Search Vendors</h1>
        <PlacesAutocomplete setSelected={setSelected} />
      </div>

      <GoogleMap
        zoom={10}
        center={center}
        mapContainerClassName="w-full h-screen"
      >
        {selected && <Marker position={selected} />}
      </GoogleMap>
    </>
  );
}

const PlacesAutocomplete = ({ setSelected }) => {
  const {
    ready,
    value,
    setValue,
    suggestions: { status, data },
    clearSuggestions,
  } = usePlacesAutocomplete();

  const handleSelect = async (address) => {
    try {
      setValue(address, false);
      clearSuggestions();

      const results = await getGeocode({ address });
      const { lat, lng } = await getLatLng(results[0]);
      setSelected({ lat, lng });
    } catch (error) {
      throw new Error(error);
    }
  };

  return (
    <Combobox onSelect={handleSelect}>
      <ComboboxInput
        value={value}
        onChange={(e) => setValue(e.target.value)}
        disabled={!ready}
        className="w-full p-2 border-2 border-primary rounded-md border-opacity-60"
        placeholder="Search an address"
      />
      <ComboboxPopover>
        <ComboboxList>
          {status === 'OK' &&
            data.map(({ place_id, description }) => (
              <ComboboxOption key={place_id} value={description} />
            ))}
        </ComboboxList>
      </ComboboxPopover>
    </Combobox>
  );
};
