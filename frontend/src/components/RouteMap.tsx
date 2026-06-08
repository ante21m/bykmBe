'use client';

import { useState } from 'react';
import { MapPin, Navigation, Car, Footprints, Loader2 } from 'lucide-react';

export function RouteMap({ lang }: { lang?: 'en' | 'am' }) {
  const [loadingGeo, setLoadingGeo] = useState(false);
  const [geoError, setGeoError] = useState('');

  const DEST_ENCODED = 'Yeka+Sub-City+Woreda+08+Addis+Ababa+Ethiopia';

  const openDirections = (mode?: 'driving' | 'walking') => {
    const base = `https://www.google.com/maps/dir/?api=1&destination=${DEST_ENCODED}`;
    const withMode = mode ? `${base}&travelmode=${mode}` : base;

    if (!navigator.geolocation) {
      window.open(withMode, '_blank', 'noopener,noreferrer');
      return;
    }

    setLoadingGeo(true);
    setGeoError('');

    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const { latitude, longitude } = pos.coords;
        const url = `${withMode}&origin=${latitude},${longitude}`;
        window.open(url, '_blank', 'noopener,noreferrer');
        setLoadingGeo(false);
      },
      () => {
        window.open(withMode, '_blank', 'noopener,noreferrer');
        setLoadingGeo(false);
      },
      { enableHighAccuracy: false, timeout: 5000 }
    );
  };

  return (
    <div>
      {/* Embedded Google Maps showing the BYKM office location */}
      <div className="w-full border border-white/10 overflow-hidden" style={{ height: '400px' }}>
        <iframe
          width="100%"
          height="100%"
          style={{ border: 0 }}
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          src={`https://www.google.com/maps?q=${DEST_ENCODED}&output=embed`}
          title="BYKM Trading PLC Headquarters"
        />
      </div>

      {/* Route buttons using Google Maps Directions */}
      <div className="mt-4">
        <p className="text-gold-400 text-xs sm:text-sm font-bold uppercase tracking-wider mb-3">
          {lang === 'am' ? 'አቅጣጫ ያግኙ' : 'Get Directions from Your Location'}
        </p>
        <div className="grid grid-cols-2 gap-3">
          <button
            onClick={() => openDirections('driving')}
            disabled={loadingGeo}
            className="flex items-center justify-center gap-2 py-3 px-4 bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white text-sm font-bold uppercase tracking-wider transition-colors"
          >
            {loadingGeo ? <Loader2 size={16} className="animate-spin" /> : <Car size={16} />}
            <span>{lang === 'am' ? 'በመኪና ይድረሱ' : 'Drive'}</span>
            <Navigation size={14} className="opacity-60" />
          </button>
          <button
            onClick={() => openDirections('walking')}
            disabled={loadingGeo}
            className="flex items-center justify-center gap-2 py-3 px-4 bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white text-sm font-bold uppercase tracking-wider transition-colors"
          >
            {loadingGeo ? <Loader2 size={16} className="animate-spin" /> : <Footprints size={16} />}
            <span>{lang === 'am' ? 'በእግር ይድረሱ' : 'Walk'}</span>
            <Navigation size={14} className="opacity-60" />
          </button>
        </div>
        {geoError && (
          <p className="text-red-400 text-xs mt-2 text-center">{geoError}</p>
        )}
        <p className="text-white/30 text-xs sm:text-sm text-center mt-3">
          <MapPin size={12} className="inline mr-1" />
          {lang === 'am' ? 'የአካባቢ ፈቃድ ሲሰጡ አሁን ያሉበት ቦታ እንደ መነሻ ይጠቀማል' : 'Opens Google Maps with your current location as origin'}
        </p>
      </div>

      <div className="text-center mt-4">
        <button
          onClick={() => openDirections()}
          disabled={loadingGeo}
          className="inline-block bg-transparent border-0 text-gold-400 text-xs font-bold uppercase tracking-wider hover:text-gold-300 transition-colors cursor-pointer disabled:opacity-50"
        >
          {loadingGeo ? (
            <span className="inline-flex items-center gap-1"><Loader2 size={12} className="animate-spin" /> {lang === 'am' ? 'በመከፈት ላይ...' : 'Opening...'}</span>
          ) : (
            lang === 'am' ? 'በጎግል ካርታ ይክፈቱ →' : 'Open in Google Maps →'
          )}
        </button>
      </div>
    </div>
  );
}
