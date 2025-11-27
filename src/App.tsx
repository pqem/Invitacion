import { useState, useEffect } from 'react';

// Types
interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

interface EventConfig {
  title: string;
  subtitle: string;
  dateIso: string;
  locationName: string;
  locationMapUrl: string;
  whatsappNumber: string;
  whatsappMessage: string;
  guests: string[];
}

// Constants
const EVENT_DETAILS: EventConfig = {
  title: "Gran Impacto Evangelístico",
  subtitle: "Culto Unido Juvenil",
  dateIso: "2025-11-29T19:00:00-03:00",
  locationName: "Plaza San Martín, Plottier, Neuquén",
  locationMapUrl: "https://www.google.com/maps/search/?api=1&query=Plaza%20San%20Martin%20Plottier%20Neuquen%20Argentina",
  whatsappNumber: "5492995046674",
  whatsappMessage: "¡Hola! Quiero confirmar que voy al Gran Impacto Evangelístico en Plaza San Martín.",
  guests: ["Maxi y Daniela Gianfelici", "Bandas en vivo"]
};

const GOOGLE_CALENDAR_LINK = "https://calendar.google.com/calendar/render?action=TEMPLATE&text=Gran+Impacto+Evangelistico&details=Culto+unido+juvenil+en+Plaza+San+Martin%2C+Plottier&location=Plaza+San+Martin%2C+Plottier%2C+Neuquen&dates=20251129T220000Z/20251130T000000Z";

// Countdown Component
const Countdown = ({ targetDate }: { targetDate: string }) => {
  const calculateTimeLeft = (): TimeLeft => {
    const difference = +new Date(targetDate) - +new Date();
    
    if (difference > 0) {
      return {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60)
      };
    }
    
    return { days: 0, hours: 0, minutes: 0, seconds: 0 };
  };

  const [timeLeft, setTimeLeft] = useState<TimeLeft>(calculateTimeLeft());

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, [targetDate]);

  const TimeUnit = ({ value, label }: { value: number; label: string }) => (
    <div className="flex flex-col items-center">
      <div className="bg-gradient-to-br from-slate-800 to-slate-900 border border-slate-700/50 rounded-xl p-3 sm:p-4 min-w-[70px] sm:min-w-[80px] shadow-xl">
        <div className="text-2xl sm:text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-b from-white to-slate-300">
          {value.toString().padStart(2, '0')}
        </div>
      </div>
      <div className="text-xs sm:text-sm text-slate-400 mt-2 font-medium uppercase tracking-wider">
        {label}
      </div>
    </div>
  );

  return (
    <div className="my-8">
      <h3 className="text-center text-sm font-bold text-slate-400 uppercase tracking-widest mb-4">
        Faltan
      </h3>
      <div className="flex justify-center gap-2 sm:gap-3">
        <TimeUnit value={timeLeft.days} label="Días" />
        <TimeUnit value={timeLeft.hours} label="Horas" />
        <TimeUnit value={timeLeft.minutes} label="Min" />
        <TimeUnit value={timeLeft.seconds} label="Seg" />
      </div>
    </div>
  );
};

// Icons
const MapPinIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
  </svg>
);

const CalendarIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
  </svg>
);

const ShareIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
  </svg>
);

const MusicIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3" />
  </svg>
);

const CheckCircleIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
);

const NavigationIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
  </svg>
);

// Calendar download function
const downloadICS = () => {
  const event = {
    title: EVENT_DETAILS.title,
    description: EVENT_DETAILS.subtitle,
    location: EVENT_DETAILS.locationName,
    start: new Date("2025-11-29T19:00:00-03:00"),
    end: new Date("2025-11-29T22:00:00-03:00")
  };

  const formatDate = (date: Date) => {
    return date.toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z';
  };

  const icsContent = [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//Gran Impacto//Event//ES',
    'BEGIN:VEVENT',
    `DTSTART:${formatDate(event.start)}`,
    `DTEND:${formatDate(event.end)}`,
    `SUMMARY:${event.title}`,
    `DESCRIPTION:${event.description}`,
    `LOCATION:${event.location}`,
    'END:VEVENT',
    'END:VCALENDAR'
  ].join('\r\n');

  const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
  const link = document.createElement('a');
  link.href = URL.createObjectURL(blob);
  link.download = 'gran-impacto-evangelistico.ics';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

// Main App Component
export default function App() {
  const [isShareSupported] = useState(typeof navigator !== 'undefined' && !!navigator.share);

  const handleShare = async () => {
    if (isShareSupported) {
      try {
        await navigator.share({
          title: EVENT_DETAILS.title,
          text: `${EVENT_DETAILS.title} - ${EVENT_DETAILS.subtitle}. ¡Te espero!`,
          url: window.location.href,
        });
      } catch (err) {
        console.error("Error sharing", err);
      }
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert("Enlace copiado al portapapeles");
    }
  };

  return (
    <div className="min-h-screen bg-[#020617] text-white overflow-x-hidden selection:bg-blue-500 selection:text-white">
      <div className="fixed inset-0 z-0 opacity-30 pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-blue-600 rounded-full blur-[120px] mix-blend-screen animate-pulse"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-orange-600 rounded-full blur-[120px] mix-blend-screen opacity-70"></div>
        <img 
          src="https://images.unsplash.com/photo-1459749411177-3c2ea0432499?q=80&w=1000&auto=format&fit=crop" 
          alt="Concert Ambience" 
          className="w-full h-full object-cover opacity-20 grayscale mix-blend-overlay"
        />
      </div>

      <div className="relative z-10 w-full max-w-md mx-auto min-h-screen flex flex-col p-4 sm:p-6">
        
        <header className="pt-6 pb-4 text-center flex flex-col items-center">
          <div className="inline-block px-3 py-1 mb-6 rounded-full bg-gradient-to-r from-blue-600/20 to-orange-500/20 border border-blue-500/30 backdrop-blur-md">
            <span className="text-xs font-bold tracking-widest text-blue-200 uppercase">
              Sábado 29 Nov · 19 hs
            </span>
          </div>

          <div className="relative group w-full mb-8 max-w-[360px]">
            <div className="absolute -inset-2 bg-gradient-to-tr from-blue-600 to-orange-600 rounded-2xl blur-lg opacity-30 group-hover:opacity-80 transition duration-500 group-hover:duration-300"></div>
            
            <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-slate-700/50 bg-slate-900">
              <img 
                src="preview.jpg" 
                alt="Flyer Gran Impacto Evangelístico - Culto Unido Juvenil" 
                className="w-full h-auto object-contain transform group-hover:scale-105 transition-transform duration-500 ease-out"
              />
              <div className="absolute inset-0 bg-gradient-to-tr from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
            </div>
          </div>
          
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight mb-2 text-transparent bg-clip-text bg-gradient-to-b from-white to-slate-400 drop-shadow-lg leading-tight">
            GRAN IMPACTO
          </h1>
          <h2 className="text-lg font-bold text-orange-400 uppercase tracking-wider mb-2">
            Evangelístico
          </h2>
          <p className="text-slate-300 font-medium text-base border-b border-slate-800 pb-6 mx-4">
            {EVENT_DETAILS.subtitle}
          </p>
        </header>

        <Countdown targetDate={EVENT_DETAILS.dateIso} />

        <div className="space-y-4 my-6">
          
          <div className="bg-slate-900/50 backdrop-blur-xl border border-slate-700/50 rounded-2xl p-4 flex items-start gap-4 hover:bg-slate-800/50 transition-colors group">
            <div className="bg-blue-600/20 p-2.5 rounded-full text-blue-400 shrink-0 group-hover:scale-110 transition-transform">
              <MapPinIcon />
            </div>
            <div>
              <h3 className="font-bold text-slate-100">Ubicación</h3>
              <p className="text-sm text-slate-400 leading-relaxed mb-2">
                {EVENT_DETAILS.locationName}
              </p>
              <a 
                href={EVENT_DETAILS.locationMapUrl}
                target="_blank" 
                rel="noreferrer"
                className="inline-flex items-center text-xs font-semibold text-blue-400 hover:text-blue-300 transition-colors"
              >
                Ver en mapa <span className="ml-1">→</span>
              </a>
            </div>
          </div>

          <div className="bg-slate-900/50 backdrop-blur-xl border border-slate-700/50 rounded-2xl p-4 flex items-start gap-4 hover:bg-slate-800/50 transition-colors group">
            <div className="bg-orange-600/20 p-2.5 rounded-full text-orange-400 shrink-0 group-hover:scale-110 transition-transform">
              <MusicIcon />
            </div>
            <div>
              <h3 className="font-bold text-slate-100">Invitados Especiales</h3>
              <ul className="text-sm text-slate-400 leading-relaxed list-disc list-inside marker:text-orange-500">
                {EVENT_DETAILS.guests.map((guest, idx) => (
                  <li key={idx}>{guest}</li>
                ))}
              </ul>
            </div>
          </div>

        </div>

        <div className="mt-auto space-y-3 pb-8">
          
          <a
            href={`https://wa.me/${EVENT_DETAILS.whatsappNumber}?text=${encodeURIComponent(EVENT_DETAILS.whatsappMessage)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="group relative w-full flex items-center justify-center gap-2 bg-gradient-to-r from-green-600 to-green-500 hover:from-green-500 hover:to-green-400 text-white font-bold py-3.5 px-4 rounded-xl shadow-lg shadow-green-900/20 transition-all transform hover:scale-[1.02] active:scale-[0.98]"
          >
            <CheckCircleIcon />
            <span>Confirmar Asistencia</span>
            <div className="absolute inset-0 rounded-xl ring-2 ring-white/20 group-hover:ring-white/40 transition-all"></div>
          </a>

          <div className="grid grid-cols-2 gap-3">
            <a
              href={EVENT_DETAILS.locationMapUrl}
              target="_blank" 
              rel="noreferrer"
              className="flex flex-col items-center justify-center gap-1.5 bg-slate-800 hover:bg-slate-700 text-white font-semibold py-3 px-4 rounded-xl border border-slate-600 transition-all active:scale-[0.98]"
            >
              <NavigationIcon />
              <span className="text-xs">Cómo llegar</span>
            </a>

            <button
              onClick={handleShare}
              className="flex flex-col items-center justify-center gap-1.5 bg-slate-800 hover:bg-slate-700 text-white font-semibold py-3 px-4 rounded-xl border border-slate-600 transition-all active:scale-[0.98]"
            >
              <ShareIcon />
              <span className="text-xs">Compartir</span>
            </button>
          </div>

          <div className="flex gap-2">
            <a 
              href={GOOGLE_CALENDAR_LINK}
              target="_blank"
              rel="noreferrer"
              className="flex-1 flex items-center justify-center gap-2 bg-transparent hover:bg-white/5 text-blue-300 font-medium py-3 rounded-xl border border-blue-500/30 transition-colors text-sm"
            >
              <CalendarIcon />
              Google Calendar
            </a>
            <button
              onClick={downloadICS}
              className="flex-1 flex items-center justify-center gap-2 bg-transparent hover:bg-white/5 text-slate-300 font-medium py-3 rounded-xl border border-slate-600 transition-colors text-sm"
            >
              <CalendarIcon />
              Apple / Outlook
            </button>
          </div>
        
        </div>

        <footer className="text-center text-slate-500 text-xs py-4">
          <p>Organiza CCE · Entrada libre y gratuita</p>
        </footer>

      </div>
    </div>
  );
}
