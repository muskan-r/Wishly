import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";

const Navbar = () => {
  return (
    <motion.nav
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7 }}
      className="relative z-50 mx-auto mt-4 w-[92%] max-w-7xl"
    >
      <div className="flex h-[68px] items-center justify-between rounded-full border border-white/[0.08] bg-[#100c15]/75 px-5 shadow-[0_15px_50px_rgba(0,0,0,0.35)] backdrop-blur-2xl sm:px-7">

        {/* LEFT — LOGO */}

        <a
          href="/"
          className="group flex items-center gap-3"
        >
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-fuchsia-500 via-pink-500 to-violet-500 shadow-[0_0_25px_rgba(217,70,239,0.25)] transition-transform duration-300 group-hover:scale-105">
            <Sparkles
              size={17}
              className="text-white"
            />
          </div>

          <span className="font-serif text-[24px] tracking-[-0.03em] text-white">
            Wishly
          </span>
        </a>


        {/* CENTER NAVIGATION */}

        <div className="absolute left-1/2 hidden -translate-x-1/2 items-center gap-9 md:flex">

          <a
            href="#how-it-works"
            className="relative text-[13px] text-zinc-500 transition-colors duration-300 hover:text-fuchsia-200"
          >
            How it works

            <span className="absolute -bottom-2 left-1/2 h-px w-0 -translate-x-1/2 bg-fuchsia-400 transition-all duration-300 group-hover:w-full" />
          </a>

          <a
            href="#create"
            className="text-[13px] text-zinc-500 transition-colors duration-300 hover:text-fuchsia-200"
          >
            Create a wish
          </a>

        </div>


        {/* RIGHT BUTTON */}

        <motion.a
          href="#create"
          whileHover={{
            scale: 1.03,
            boxShadow: "0 0 30px rgba(217,70,239,0.25)",
          }}
          whileTap={{ scale: 0.97 }}
          className="flex h-10 items-center gap-2 rounded-full border border-fuchsia-400/10 bg-gradient-to-r from-fuchsia-500/90 to-violet-500/90 px-4 text-[12px] font-semibold text-white shadow-[0_8px_25px_rgba(168,85,247,0.15)] sm:px-5"
        >
          <Sparkles size={14} />

          <span className="hidden sm:inline">
            Make a wish
          </span>

          <span className="sm:hidden">
            Wish
          </span>
        </motion.a>

      </div>

      {/* subtle glow underneath navbar */}

      <div className="pointer-events-none absolute -bottom-5 left-1/2 -z-10 h-12 w-1/2 -translate-x-1/2 rounded-full bg-fuchsia-600/10 blur-2xl" />
    </motion.nav>
  );
};

export default Navbar;