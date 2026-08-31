"use client";

import { useLanyard } from "use-lanyard";
import { motion, AnimatePresence } from "framer-motion";
import { Music, ExternalLink, Disc3 } from "lucide-react";
import Image from "next/image";

const DISCORD_ID = process.env.NEXT_PUBLIC_DISCORD_ID || "1542099662574456913";

export default function SpotifyCard() {
  const { data: presence } = useLanyard(DISCORD_ID as `${bigint}`);
  const spotify = presence?.spotify;

  // Filter out Spotify advertisements and check for valid song info
  const isAd = Boolean(
    spotify &&
      (!spotify.track_id ||
        spotify.song?.toLowerCase().includes("advertisement") ||
        spotify.artist?.toLowerCase().includes("spotify"))
  );

  const isLive = Boolean(
    presence?.listening_to_spotify && spotify && spotify.song && !isAd
  );

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="w-full max-w-md p-4 sm:p-5 rounded-3xl bg-neutral-900/80 backdrop-blur-xl border border-neutral-800 shadow-2xl overflow-hidden"
    >
      {/* Header */}
      <div className="flex justify-between items-center mb-3">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded-full bg-[#1DB954] flex items-center justify-center shadow-md shadow-[#1DB954]/30">
            <Music className="w-3.5 h-3.5 text-black" />
          </div>
          <span className="text-[11px] font-mono uppercase tracking-widest text-[#1DB954] font-bold">
            {isLive ? "Listening on Spotify" : "Spotify • Offline"}
          </span>
        </div>

        {isLive ? (
          <div className="flex items-end gap-0.5 h-4">
            <motion.span
              animate={{ height: ["30%", "100%", "20%", "90%", "30%"] }}
              transition={{ repeat: Infinity, duration: 1.1, ease: "easeInOut" }}
              className="w-1 rounded-full bg-[#1DB954]"
            />
            <motion.span
              animate={{ height: ["90%", "20%", "100%", "40%", "90%"] }}
              transition={{ repeat: Infinity, duration: 0.9, ease: "easeInOut" }}
              className="w-1 rounded-full bg-[#1DB954]"
            />
            <motion.span
              animate={{ height: ["40%", "100%", "50%", "100%", "40%"] }}
              transition={{ repeat: Infinity, duration: 1.3, ease: "easeInOut" }}
              className="w-1 rounded-full bg-[#1DB954]"
            />
          </div>
        ) : (
          <a
            href="https://open.spotify.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs font-mono text-neutral-400 hover:text-[#1DB954] flex items-center gap-1 transition-colors cursor-pointer"
          >
            Open Spotify <ExternalLink className="w-3 h-3" />
          </a>
        )}
      </div>

      <AnimatePresence mode="wait">
        {isLive && spotify ? (
          <motion.div
            key={spotify.track_id || spotify.song}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="flex items-center gap-3 bg-neutral-950/60 p-3 rounded-2xl border border-neutral-800"
          >
            <div className="relative w-14 h-14 rounded-xl overflow-hidden shrink-0 shadow-lg border border-white/10 bg-neutral-800 flex items-center justify-center">
              {spotify.album_art_url ? (
                <>
                  <Image
                    src={spotify.album_art_url}
                    alt={spotify.album || "Album Art"}
                    fill
                    className="object-cover"
                    unoptimized
                  />
                  <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
                    <Disc3 className="w-6 h-6 text-white animate-spin" />
                  </div>
                </>
              ) : (
                <Disc3 className="w-7 h-7 text-[#1DB954] animate-spin" />
              )}
            </div>

            <div className="flex-1 min-w-0">
              <a
                href={
                  spotify.track_id
                    ? `https://open.spotify.com/track/${spotify.track_id}`
                    : "https://open.spotify.com"
                }
                target="_blank"
                rel="noopener noreferrer"
                className="font-bold text-white hover:text-[#1DB954] transition-colors truncate block text-sm sm:text-base cursor-pointer"
              >
                {spotify.song}
              </a>
              <p className="text-xs text-neutral-400 font-mono truncate">
                {spotify.artist || "Spotify Artist"}
              </p>
              <p className="text-[10px] text-neutral-500 font-mono truncate">
                {spotify.album || "Spotify Single / Album"}
              </p>
            </div>
          </motion.div>
        ) : (
          /* Native Clean Offline Card (No 404 iframes) */
          <motion.div
            key="offline-card"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="flex items-center gap-3 bg-neutral-950/60 p-3 rounded-2xl border border-neutral-800/80"
          >
            <div className="relative w-14 h-14 rounded-xl shrink-0 shadow-inner bg-neutral-900 border border-neutral-800 flex items-center justify-center">
              <Disc3 className="w-7 h-7 text-neutral-600" />
            </div>

            <div className="flex-1 min-w-0">
              <h4 className="font-semibold text-neutral-300 text-sm truncate">
                Not Playing Right Now
              </h4>
              <p className="text-xs text-neutral-500 font-mono truncate">
                Spotify is currently idle
              </p>
              <p className="text-[10px] text-neutral-600 font-mono truncate">
                Will auto-update when music starts
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

