import { Heart } from "lucide-react";

const Footer = () => {
  return (
    <footer className="relative mt-10 border-t border-white/10 bg-zinc-950/80 px-6 py-12">

      <div className="mx-auto flex max-w-6xl flex-col items-center gap-6">

        {/* Logo */}
        <div className="flex items-center gap-2">

          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-fuchsia-500/10">
            <Heart
              size={15}
              fill="currentColor"
              className="text-pink-300"
            />
          </div>

          <span className="font-serif text-xl text-white/90">
            Wishly
          </span>

        </div>

        {/* Message */}
        <p className="text-center text-sm text-white/40">
          Made with love, for the people who matter.
        </p>

        {/* Decorative line */}
        <div className="flex items-center gap-3">

          <span className="h-px w-12 bg-fuchsia-400/20" />

          <Heart
            size={10}
            fill="currentColor"
            className="text-pink-300/60"
          />

          <span className="h-px w-12 bg-fuchsia-400/20" />

        </div>

        {/* Copyright */}
        <p className="text-[10px] uppercase tracking-[0.2em] text-white/20">
          © {new Date().getFullYear()} Wishly · Made with a little magic
        </p>

      </div>

    </footer>
  );
};

export default Footer;