"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  Sun,
  Moon,
  Cloud,
  CloudRain,
  CloudLightning,
  CloudSun,
  CloudMoon,
  MapPin,
} from "lucide-react";

interface WeatherState {
  temp: number | null;
  condition: string;
  isDay: boolean;
  code: number | null;
  loading: boolean;
}

export default function LocalTimeWeather() {
  const [time, setTime] = useState<string>("");
  const [dateStr, setDateStr] = useState<string>("");
  const [isWorkingHour, setIsWorkingHour] = useState<boolean>(false);
  const [weather, setWeather] = useState<WeatherState>({
    temp: null,
    condition: "Loading...",
    isDay: true,
    code: null,
    loading: true,
  });

  // Live Sri Lanka (Asia/Colombo) Clock
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      
      // Formatter for Sri Lanka Time (GMT+5:30)
      const timeFormatter = new Intl.DateTimeFormat("en-US", {
        timeZone: "Asia/Colombo",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: true,
      });

      const dateFormatter = new Intl.DateTimeFormat("en-US", {
        timeZone: "Asia/Colombo",
        weekday: "short",
        month: "short",
        day: "numeric",
      });

      const hourFormatter = new Intl.DateTimeFormat("en-US", {
        timeZone: "Asia/Colombo",
        hour: "numeric",
        hour12: false,
      });

      setTime(timeFormatter.format(now));
      setDateStr(dateFormatter.format(now));

      const currentHour = parseInt(hourFormatter.format(now), 10);
      setIsWorkingHour(currentHour >= 9 && currentHour < 22);
    };

    updateTime();
    const timer = setInterval(updateTime, 1000);
    return () => clearInterval(timer);
  }, []);

  // Fetch Live Weather for Kandy, Sri Lanka (Coordinates: 7.2906° N, 80.6337° E)
  useEffect(() => {
    const fetchWeather = async () => {
      try {
        const res = await fetch(
          "https://api.open-meteo.com/v1/forecast?latitude=7.2906&longitude=80.6337&current=temperature_2m,is_day,weather_code&timezone=Asia%2FColombo"
        );
        const data = await res.json();
        
        if (data && data.current) {
          const code = data.current.weather_code;
          const isDay = data.current.is_day === 1;
          const temp = Math.round(data.current.temperature_2m);

          let condition = "Clear";
          if (code === 0) condition = isDay ? "Sunny" : "Clear Night";
          else if (code >= 1 && code <= 3) condition = "Partly Cloudy";
          else if (code >= 45 && code <= 48) condition = "Foggy";
          else if (code >= 51 && code <= 67) condition = "Rainy";
          else if (code >= 80 && code <= 82) condition = "Showers";
          else if (code >= 95) condition = "Thunderstorm";

          setWeather({
            temp,
            condition,
            isDay,
            code,
            loading: false,
          });
        }
      } catch {
        // Fallback in case of network issue
        setWeather({
          temp: 27,
          condition: "Clear",
          isDay: true,
          code: 0,
          loading: false,
        });
      }
    };

    fetchWeather();
    // Refresh weather every 15 minutes
    const weatherInterval = setInterval(fetchWeather, 15 * 60 * 1000);
    return () => clearInterval(weatherInterval);
  }, []);

  // Weather icon selector
  const renderWeatherIcon = () => {
    const { code, isDay } = weather;
    if (code === null) return <Sun className="w-4 h-4 text-yellow-400" />;

    if (code === 0) {
      return isDay ? (
        <Sun className="w-4 h-4 text-amber-400 animate-spin-slow" />
      ) : (
        <Moon className="w-4 h-4 text-blue-300" />
      );
    }
    if (code >= 1 && code <= 3) {
      return isDay ? (
        <CloudSun className="w-4 h-4 text-amber-300" />
      ) : (
        <CloudMoon className="w-4 h-4 text-blue-300" />
      );
    }
    if (code >= 51 && code <= 82) {
      return <CloudRain className="w-4 h-4 text-blue-400" />;
    }
    if (code >= 95) {
      return <CloudLightning className="w-4 h-4 text-yellow-400" />;
    }
    return <Cloud className="w-4 h-4 text-zinc-300" />;
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="inline-flex flex-wrap items-center gap-3 px-4 py-2.5 rounded-2xl bg-neutral-900/80 backdrop-blur-md border border-neutral-800 shadow-xl text-neutral-300"
    >
    
      <div className="flex items-center gap-1.5 text-xs font-mono">
        <MapPin className="w-3.5 h-3.5 text-blue-500" />
        <span className="text-white font-medium">Kandy, LK</span>
      </div>

      <div className="w-px h-3.5 bg-neutral-700 hidden sm:block" />


      <div className="flex items-center gap-2 text-xs font-mono">
        <span className="text-white font-semibold tabular-nums">
          {time || "00:00:00 --"}
        </span>
        <span className="text-neutral-500 text-[10px] hidden sm:inline">
          {dateStr}
        </span>
      </div>

      <div className="w-px h-3.5 bg-neutral-700" />


      <div className="flex items-center gap-1.5 text-xs font-mono">
        {renderWeatherIcon()}
        <span className="text-white font-medium tabular-nums">
          {weather.temp !== null ? `${weather.temp}°C` : "--°C"}
        </span>
        <span className="text-neutral-400 text-[11px] hidden md:inline">
          ({weather.condition})
        </span>
      </div>

      <div className="w-px h-3.5 bg-neutral-700 hidden sm:block" />


      <div className="flex items-center gap-1.5 text-[11px] font-mono">
        <span
          className={`w-2 h-2 rounded-full ${
            isWorkingHour ? "bg-emerald-500 animate-pulse" : "bg-amber-500"
          }`}
        />
        <span className="text-neutral-400 text-[10px] uppercase tracking-wider hidden sm:inline">
          {isWorkingHour ? "Active" : "Away"}
        </span>
      </div>
    </motion.div>
  );
}
