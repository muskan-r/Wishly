import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowLeft,
  Heart,
  Music,
  Pause,
  Play,
  Sparkles,
  Share2,
  Copy,
  Check,
} from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

/* ======================================================
   MUSIC HELPERS — mp3 / wav / mp4 direct links only
====================================================== */

const isSupportedAudioUrl = (url) => {
  if (!url) return false;
  const value = url.toLowerCase().split("?")[0]; // ignore query strings
  return (
    value.endsWith(".mp3") ||
    value.endsWith(".wav") ||
    value.endsWith(".mp4")
  );
};

/* ======================================================
   MUSIC SECTION
====================================================== */

const MusicSection = ({ songUrl }) => {
  const [playing, setPlaying] = useState(false);
  const supported = isSupportedAudioUrl(songUrl);

  useEffect(() => {
    if (!supported) return;

    const audio = document.getElementById("wishly-direct-audio");
    if (!audio) return;

    audio
      .play()
      .then(() => setPlaying(true))
      .catch(() => {
        const startOnInteraction = () => {
          audio
            .play()
            .then(() => setPlaying(true))
            .catch(() => { });
          document.removeEventListener("click", startOnInteraction);
        };
        document.addEventListener("click", startOnInteraction, { once: true });
      });
  }, [songUrl, supported]);

  const toggleAudio = () => {
    const audio = document.getElementById("wishly-direct-audio");
    if (!audio) return;
    if (playing) {
      audio.pause();
      setPlaying(false);
    } else {
      audio
        .play()
        .then(() => setPlaying(true))
        .catch(() => { });
    }
  };

  // Unsupported link (Spotify/YouTube/anything not a direct file) —
  // quietly skip rather than showing a broken embed.
  if (!supported) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, delay: 0.8 }}
      className="mt-7 rounded-[24px] border border-white/[0.08] bg-white/[0.02] p-5 shadow-[0_20px_60px_rgba(0,0,0,0.25)]"
    >
      <div className="flex items-center gap-4">
        <motion.div
          animate={playing ? { scale: [1, 1.08, 1] } : {}}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-fuchsia-500/20 to-pink-500/10"
        >
          <Music size={17} className="text-pink-300" />
        </motion.div>

        <div className="min-w-0 flex-1">
          <p className="font-serif text-base text-white/75">A song for this moment</p>
          <p className="mt-1 text-[8px] uppercase tracking-[0.2em] text-white/25">
            {playing ? "Now playing" : "Play the music"}
          </p>
        </div>

        <button
          onClick={toggleAudio}
          className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gradient-to-r from-fuchsia-500 to-pink-500 text-white shadow-[0_8px_25px_rgba(236,72,153,0.2)] transition hover:scale-105"
        >
          {playing ? <Pause size={14} /> : <Play size={14} className="ml-0.5" />}
        </button>
      </div>

      <audio
        id="wishly-direct-audio"
        src={songUrl}
        loop
        onEnded={() => setPlaying(false)}
        className="hidden"
      />
    </motion.div>
  );
};

/* ======================================================
   PHOTO CAROUSEL — cycles through page.photoUrls
====================================================== */

const PhotoCarousel = ({ photoUrls, name }) => {
  const [index, setIndex] = useState(0);
  const hasMultiple = photoUrls.length > 1;

  useEffect(() => {
    if (!hasMultiple) return;
    const timer = setInterval(() => {
      setIndex((i) => (i + 1) % photoUrls.length);
    }, 3500);
    return () => clearInterval(timer);
  }, [hasMultiple, photoUrls.length]);

  if (photoUrls.length === 0) {
    return (
      <motion.div
        animate={{ y: [0, -7, 0] }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-[55px]"
      >
        🎂
      </motion.div>
    );
  }

  return (
    <div className="absolute left-1/2 top-1/2 max-w-[85%] -translate-x-1/2 -translate-y-1/2">
      <AnimatePresence mode="wait">
        <motion.div
          key={index}
          initial={{ opacity: 0, scale: 0.85, rotate: -5 }}
          animate={{ opacity: 1, scale: 1, rotate: -3 }}
          exit={{ opacity: 0, scale: 0.9 }}
          transition={{ duration: 0.6 }}
          className="relative inline-block max-w-full rounded-[8px] bg-[#f5eee8] p-2 pb-9 shadow-[0_20px_45px_rgba(0,0,0,0.4)]"
        >
          <img
            src={photoUrls[index]}
            alt={name}
            className="block h-auto max-h-[250px] max-w-[250px] w-auto rounded-[3px] object-contain sm:max-h-[280px] sm:max-w-[280px]"
          />
          <p className="absolute bottom-2 left-0 right-0 text-center font-serif text-[11px] italic text-[#554b4d]">
            a little memory
          </p>
        </motion.div>
      </AnimatePresence>

      {hasMultiple && (
        <div className="mt-3 flex justify-center gap-1.5">
          {photoUrls.map((_, i) => (
            <span
              key={i}
              className={`h-1.5 w-1.5 rounded-full transition ${i === index ? "bg-pink-300" : "bg-white/20"
                }`}
            />
          ))}
        </div>
      )}
    </div>
  );
};

/* ======================================================
   FLOATING BALLOON
====================================================== */

const FloatingBalloon = ({ className = "", delay = 0, color = "pink" }) => {
  const colors = {
    pink: "bg-pink-400",
    purple: "bg-purple-400",
    fuchsia: "bg-fuchsia-400",
    rose: "bg-rose-400",
    white: "bg-white/70",
  };

  return (
    <motion.div
      className={`pointer-events-none fixed bottom-[-100px] z-[2] ${className}`}
      initial={{ y: 0, opacity: 0, scale: 0.7 }}
      animate={{
        y: [-20, -window.innerHeight - 180],
        x: [0, 20, -15, 10, 0],
        opacity: [0, 0.9, 0.85, 0.7, 0],
        scale: [0.7, 1, 1.05, 0.95, 0.8],
      }}
      transition={{ duration: 10, delay, repeat: Infinity, ease: "easeInOut" }}
    >
      <div className="relative">
        <div className={`h-12 w-10 rounded-[50%_50%_45%_45%] ${colors[color]} shadow-[0_8px_30px_rgba(236,72,153,0.2)]`} />
        <div className="absolute left-2 top-2 h-2 w-1.5 rounded-full bg-white/50" />
        <div className={`absolute left-1/2 top-[46px] h-2 w-2 -translate-x-1/2 rotate-45 ${colors[color]}`} />
        <div className="absolute left-1/2 top-[48px] h-28 w-px -translate-x-1/2 bg-white/20" />
      </div>
    </motion.div>
  );
};

/* ======================================================
   CONFETTI
====================================================== */

const ConfettiBurst = () => {
  const [pieces] = useState(() =>
    Array.from({ length: 55 }, (_, index) => ({
      id: index,
      left: Math.random() * 100,
      rotation: Math.random() * 360,
      delay: Math.random() * 0.6,
      duration: 3 + Math.random() * 1.5,
      x1: Math.random() * 100 - 50,
      x2: Math.random() * 140 - 70,
    }))
  );

  return (
    <div className="pointer-events-none fixed inset-0 z-[50] overflow-hidden">
      {pieces.map((piece) => (
        <motion.span
          key={piece.id}
          className="absolute top-[-20px] h-3 w-1.5 rounded-sm bg-pink-300"
          style={{ left: `${piece.left}%`, rotate: piece.rotation }}
          initial={{ y: -30, opacity: 0 }}
          animate={{
            y: "110vh",
            opacity: [0, 1, 1, 0],
            rotate: piece.rotation + 720,
            x: [0, piece.x1, piece.x2],
          }}
          transition={{ duration: piece.duration, delay: piece.delay, ease: "easeOut" }}
        />
      ))}
    </div>
  );
};

/* ======================================================
   FLOATING PHOTO — now cycles through multiple photos
====================================================== */

const FloatingPhoto = ({ photoUrl, className = "", delay = 0, rotate = "-6deg" }) => {
  if (!photoUrl) return null;

  return (
    <motion.div
      className={`pointer-events-none fixed z-[3] hidden sm:block ${className}`}
      initial={{ opacity: 0, scale: 0.5, y: 40, rotate }}
      animate={{
        opacity: [0, 0.65, 0.65, 0],
        y: [40, -20, -50, -120],
        rotate: [rotate, "2deg", rotate],
        scale: [0.5, 0.8, 0.75, 0.5],
      }}
      transition={{ duration: 7, delay, repeat: Infinity, ease: "easeInOut" }}
    >
      <div className="rounded-[7px] bg-[#f5eee8] p-1.5 pb-5 shadow-[0_15px_40px_rgba(0,0,0,0.35)]">
        <img src={photoUrl} alt="" className="h-[105px] w-[85px] rounded-[3px] object-cover" />
      </div>
    </motion.div>
  );
};

/* ======================================================
   OPENING GLOW
====================================================== */

const OpeningGlow = () => (
  <motion.div
    className="pointer-events-none fixed inset-0 z-[40] bg-[#07050b]"
    initial={{ opacity: 1 }}
    animate={{ opacity: 0 }}
    transition={{ duration: 1.8, ease: "easeOut" }}
  >
    <motion.div
      className="absolute left-1/2 top-1/2 h-[350px] w-[350px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-fuchsia-500/20 blur-[100px]"
      initial={{ scale: 0.3, opacity: 0 }}
      animate={{ scale: 1.4, opacity: 1 }}
      transition={{ duration: 1.4, ease: "easeOut" }}
    />
  </motion.div>
);

/* ======================================================
   VIEW PAGE
====================================================== */

const View = () => {
  const { slug } = useParams();
  const navigate = useNavigate();

  const [page, setPage] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [showSurprise, setShowSurprise] = useState(false);
  const [showOpening, setShowOpening] = useState(true);
  const [linkCopied, setLinkCopied] = useState(false);

  const handleShare = async () => {
    const shareUrl = window.location.href;

    try {
      if (navigator.share) {
        await navigator.share({
          title: `A birthday wish for ${page.name} 🎂`,
          text: `I made a little birthday surprise for ${page.name} 💖`,
          url: shareUrl,
        });
      } else {
        await navigator.clipboard.writeText(shareUrl);

        setLinkCopied(true);

        setTimeout(() => {
          setLinkCopied(false);
        }, 2000);
      }
    } catch (error) {
      // User closed the share menu
      if (error?.name !== "AbortError") {
        console.error("Share failed:", error);
      }
    }
  };

  useEffect(() => {
    const fetchPage = async () => {
      try {
        const { data } = await axios.get(`${API_URL}/api/pages/${slug}`);
        setPage(data.page);
      } catch (err) {
        console.error(err);
        setError("This birthday page could not be found.");
      } finally {
        setLoading(false);
      }
    };
    fetchPage();
  }, [slug]);

  useEffect(() => {
    const timer = setTimeout(() => setShowOpening(false), 1800);
    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#07050b] text-white">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
          className="text-pink-300"
        >
          <Sparkles size={25} />
        </motion.div>
      </main>
    );
  }

  if (error || !page) {
    return (
      <main className="flex min-h-screen flex-col items-center justify-center bg-[#07050b] px-6 text-center text-white">
        <Heart className="mb-5 text-pink-300" size={32} />
        <h1 className="font-serif text-3xl">Something went wrong</h1>
        <p className="mt-3 text-sm text-white/50">{error}</p>
        <button
          onClick={() => navigate("/")}
          className="mt-7 rounded-full border border-white/10 px-6 py-3 text-sm text-white/70 transition hover:bg-white/5"
        >
          Go back
        </button>
      </main>
    );
  }

  const traits = page.traits
    ? page.traits.split(",").map((t) => t.trim()).filter(Boolean)
    : [];

  // Supports both the old single photoUrl and the new photoUrls array,
  // so pages created before the gallery feature still render fine.
  const photoUrls = page.photoUrls?.length
    ? page.photoUrls
    : page.photoUrl
      ? [page.photoUrl]
      : [];

  return (
    <main className="relative min-h-screen overflow-hidden bg-[#07050b] text-white">
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="absolute left-[-15%] top-[-10%] h-[500px] w-[500px] rounded-full bg-fuchsia-700/10 blur-[150px]" />
        <div className="absolute right-[-15%] top-[15%] h-[600px] w-[600px] rounded-full bg-violet-700/10 blur-[170px]" />
        <div className="absolute bottom-[-15%] left-[20%] h-[500px] w-[500px] rounded-full bg-rose-700/10 blur-[160px]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(168,85,247,0.06),transparent_55%)]" />
      </div>

      {showOpening && <OpeningGlow />}
      <ConfettiBurst />

      <FloatingBalloon className="left-[8%]" delay={0} color="pink" />
      <FloatingBalloon className="left-[25%]" delay={1.8} color="purple" />
      <FloatingBalloon className="left-[48%]" delay={3.2} color="fuchsia" />
      <FloatingBalloon className="left-[70%]" delay={1} color="rose" />
      <FloatingBalloon className="left-[88%]" delay={2.5} color="white" />

      {/* Floating photos — cycle through whatever photos were uploaded */}
      {photoUrls.length > 0 && (
        <>
          <FloatingPhoto
            photoUrl={photoUrls[0 % photoUrls.length]}
            className="left-[5%] top-[35%]"
            delay={2}
            rotate="-8deg"
          />
          <FloatingPhoto
            photoUrl={photoUrls[1 % photoUrls.length]}
            className="right-[5%] top-[42%]"
            delay={4}
            rotate="7deg"
          />
          <FloatingPhoto
            photoUrl={photoUrls[2 % photoUrls.length]}
            className="left-[10%] top-[70%]"
            delay={6}
            rotate="5deg"
          />
          <FloatingPhoto
            photoUrl={photoUrls[3 % photoUrls.length]}
            className="right-[10%] top-[72%]"
            delay={3}
            rotate="-6deg"
          />
        </>
      )}

      <FloatingStar className="left-[18%] top-[24%]" delay={0} />
      <FloatingStar className="left-[67%] top-[20%]" delay={1.2} />
      <FloatingStar className="right-[14%] top-[54%]" delay={2} />
      <FloatingStar className="left-[36%] bottom-[18%]" delay={0.8} />
      <FloatingHeart className="right-[10%] top-[72%]" delay={1.5} />

      <header className="relative z-20 flex items-center justify-between px-5 py-5 sm:px-10 lg:px-14">
        <button
          onClick={() => navigate("/")}
          className="group flex items-center gap-2 text-white/70 transition hover:text-white"
        >
          <span className="flex h-8 w-8 items-center justify-center rounded-full border border-white/10 bg-white/[0.02] transition group-hover:bg-white/10">
            <ArrowLeft size={14} />
          </span>
          <span className="font-serif text-sm">Wishly</span>
        </button>
      </header>

      <section className="relative z-10 mx-auto flex max-w-6xl flex-col items-center px-5 pb-12 pt-12 text-center sm:pt-16">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-6 flex items-center gap-2 rounded-full border border-fuchsia-300/20 bg-fuchsia-300/[0.03] px-4 py-2 text-[9px] font-medium uppercase tracking-[0.2em] text-pink-200/70"
        >
          <Heart size={10} fill="currentColor" />
          A little surprise for you
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.1 }}
          className="font-serif text-[clamp(3.8rem,8vw,7rem)] leading-[0.82] tracking-[-0.055em]"
        >
          <span className="block text-white">Happy Birthday,</span>
          <span className="block bg-gradient-to-r from-pink-200 via-fuchsia-300 to-pink-400 bg-clip-text font-serif italic text-transparent">
            {page.name}.
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mt-7 text-[8px] uppercase tracking-[0.35em] text-white/25"
        >
          Made with love by your {page.relationship || "someone special"}
        </motion.p>
      </section>

      <section className="relative z-10 mx-auto w-[92%] max-w-[560px] pb-10">
        <motion.div
          initial={{ opacity: 0, y: 35, scale: 0.97 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.9, delay: 0.3 }}
          className="rounded-[28px] border border-white/[0.10] bg-white/[0.015] p-5 shadow-[0_35px_100px_rgba(0,0,0,0.45)] backdrop-blur-xl sm:p-6"
        >
          <div className="grid overflow-hidden rounded-[20px] border border-white/[0.07] bg-[#0b080e] md:grid-cols-2">
            <div className="relative min-h-[330px] overflow-hidden border-b border-white/[0.07] bg-[#110817] md:border-b-0 md:border-r">
              <div className="absolute left-1/2 top-1/2 h-[230px] w-[230px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-fuchsia-700/10 blur-[70px]" />
              <div className="absolute left-1/2 top-1/2 h-[170px] w-[170px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-fuchsia-300/10" />
              <div className="absolute left-1/2 top-1/2 h-[135px] w-[135px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-fuchsia-300/[0.07]" />

              <PhotoCarousel photoUrls={photoUrls} name={page.name} />

              <Sparkles size={13} className="absolute left-[25%] top-[25%] text-pink-300/70" />
              <Sparkles size={10} className="absolute right-[24%] top-[31%] text-fuchsia-300/50" />
              <Heart size={12} fill="currentColor" className="absolute bottom-[23%] left-[25%] text-pink-300/60" />
            </div>

            <div className="flex flex-col justify-center p-7 sm:p-8">
              <div className="mb-5 flex items-center gap-3">
                <div className="flex h-7 w-7 items-center justify-center rounded-full bg-fuchsia-500/10 text-pink-300">
                  <Heart size={12} fill="currentColor" />
                </div>
                <div>
                  <p className="text-[7px] uppercase tracking-[0.22em] text-white/25">A little message</p>
                  <p className="font-serif text-[12px] text-white/70">Just for you</p>
                </div>
              </div>

              <p className="font-serif text-[19px] leading-[1.55] text-white/75">"{page.message}"</p>

              <div className="my-6 flex items-center gap-3">
                <span className="h-px w-8 bg-fuchsia-300/20" />
                <Heart size={9} fill="currentColor" className="text-pink-300" />
                <span className="h-px w-8 bg-fuchsia-300/20" />
              </div>

              {traits.length > 0 && (
                <div>
                  <p className="mb-2 text-[7px] uppercase tracking-[0.25em] text-white/20">Because you're</p>
                  <div className="flex flex-wrap gap-2">
                    {traits.map((trait, index) => (
                      <motion.span
                        key={index}
                        initial={{ opacity: 0, y: 5 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.4, delay: 0.8 + index * 0.1 }}
                        className="rounded-full border border-fuchsia-300/15 bg-fuchsia-300/[0.03] px-3 py-1 text-[7px] text-pink-200/70"
                      >
                        {trait}
                      </motion.span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </motion.div>

        {page.songUrl && <MusicSection songUrl={page.songUrl} />}

        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.8 }}
          className="flex justify-center pt-6"
        >
          <motion.button
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.97 }}
            onClick={handleShare}
            className="flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-5 py-3 text-[10px] font-medium text-white/60 backdrop-blur-md transition hover:border-pink-300/30 hover:bg-pink-300/[0.05] hover:text-pink-200"
          >
            {linkCopied ? (
              <>
                <Check size={12} />
                Link copied
              </>
            ) : (
              <>
                <Share2 size={12} />
                Share this wish
              </>
            )}
          </motion.button>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.9 }}
          className="flex justify-center pt-8"
        >
          <motion.button
            whileHover={{ scale: 1.04, boxShadow: "0 15px 40px rgba(236,72,153,0.25)" }}
            whileTap={{ scale: 0.97 }}
            onClick={() => setShowSurprise(true)}
            className="flex items-center gap-2 rounded-full bg-gradient-to-r from-fuchsia-500 to-pink-500 px-6 py-3 text-[10px] font-medium text-white shadow-[0_10px_30px_rgba(236,72,153,0.15)]"
          >
            <Sparkles size={12} />
            Open one more surprise
          </motion.button>
        </motion.div>
      </section>

      {showSurprise && (
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative z-10 mx-auto w-[92%] max-w-[560px] pb-20"
        >
          <div className="rounded-[28px] border border-pink-300/10 bg-white/[0.02] px-7 py-10 text-center backdrop-blur-xl">
            <Heart size={22} fill="currentColor" className="mx-auto mb-5 text-pink-300" />
            <p className="font-serif text-2xl italic leading-relaxed text-white/80">
              Some people deserve a little more magic.
            </p>
            <p className="mx-auto mt-5 max-w-md text-xs leading-6 text-white/35">
              And today is a perfect excuse to remind you just how loved, appreciated and special you are.
            </p>
            <div className="mt-7 text-[8px] uppercase tracking-[0.35em] text-pink-300/40">With love, always</div>
          </div>
        </motion.section>
      )}

      <footer className="relative z-10 pb-8 text-center">
        <div className="text-[7px] uppercase tracking-[0.4em] text-white/15">Made with love · Wishly</div>
        <p className="mt-3 font-serif text-[10px] italic text-white/20">Some wishes deserve a little magic.</p>
      </footer>
    </main>
  );
};

const FloatingStar = ({ className = "", delay = 0 }) => (
  <motion.div
    className={`pointer-events-none fixed z-[1] ${className}`}
    animate={{ y: [0, -10, 0], opacity: [0.3, 0.8, 0.3] }}
    transition={{ duration: 3, repeat: Infinity, delay, ease: "easeInOut" }}
  >
    <Sparkles size={10} className="text-fuchsia-300/60" />
  </motion.div>
);

const FloatingHeart = ({ className = "", delay = 0 }) => (
  <motion.div
    className={`pointer-events-none fixed z-[1] ${className}`}
    animate={{ y: [0, -15, 0], opacity: [0.2, 0.6, 0.2] }}
    transition={{ duration: 4, repeat: Infinity, delay, ease: "easeInOut" }}
  >
    <Heart size={12} fill="currentColor" className="text-pink-300/60" />
  </motion.div>
);

export default View;
