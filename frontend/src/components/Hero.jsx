import { motion } from "framer-motion";
import {
  ArrowRight,
  Heart,
  Sparkles,
  Star,
} from "lucide-react";

const Hero = () => {
  return (
    <>
      {/* ================= HERO ================= */}

      <section className="relative mx-auto min-h-[calc(100vh-100px)] w-[92%] max-w-7xl overflow-hidden">

        {/* ================= BACKGROUND ================= */}

        <div className="pointer-events-none absolute inset-0">

          {/* Main ambient glows */}
          <div className="absolute left-[-15%] top-[10%] h-[500px] w-[500px] rounded-full bg-fuchsia-600/20 blur-[130px]" />

          <div className="absolute right-[-15%] top-[20%] h-[520px] w-[520px] rounded-full bg-violet-600/20 blur-[140px]" />

          <div className="absolute left-[35%] top-[-15%] h-[350px] w-[350px] rounded-full bg-pink-500/10 blur-[120px]" />

          <div className="absolute bottom-[-20%] left-[40%] h-[400px] w-[400px] rounded-full bg-indigo-600/10 blur-[130px]" />

          {/* Tiny stars */}
          <div className="absolute left-[8%] top-[18%] text-fuchsia-300/70">
            ✦
          </div>

          <div className="absolute right-[12%] top-[25%] text-purple-300/70">
            ✧
          </div>

          <div className="absolute bottom-[18%] left-[42%] text-pink-300/70">
            ✦
          </div>

        </div>


        {/* ================= MAIN CONTENT ================= */}

        <div className="relative z-10 grid min-h-[calc(100vh-100px)] items-center gap-12 py-16 lg:grid-cols-[1.05fr_0.95fr] lg:gap-4 lg:py-8">


          {/* ================= LEFT ================= */}

          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.9 }}
            className="relative z-10 text-center lg:text-left"
          >

            {/* Small label */}

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="mx-auto mb-7 flex w-fit items-center gap-2 rounded-full border border-fuchsia-400/20 bg-white/[0.04] px-4 py-2 text-[11px] font-medium tracking-wide text-fuchsia-200 shadow-[0_0_30px_rgba(217,70,239,0.08)] backdrop-blur-xl lg:mx-0"
            >
              <Sparkles size={13} className="text-fuchsia-300" />

              A little magic, made for them
            </motion.div>


            {/* Heading */}

            <h1 className="font-serif text-[clamp(4rem,7vw,6.7rem)] font-medium leading-[0.88] tracking-[-0.065em] text-white">

              Make their

              <br />

              birthday

              <br />

              <motion.span
                initial={{ opacity: 0, x: -15 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.45, duration: 0.8 }}
                className="relative inline-block bg-gradient-to-r from-fuchsia-300 via-pink-300 to-violet-300 bg-clip-text font-serif italic text-transparent"
              >
                unforgettable

                <span className="absolute -right-3 -top-3 text-[16px] not-italic text-fuchsia-300">
                  ✦
                </span>

              </motion.span>

              <span className="text-fuchsia-300">.</span>

            </h1>


            {/* Description */}

            <p className="mx-auto mt-8 max-w-[510px] text-[15px] leading-7 text-zinc-400 sm:text-[16px] lg:mx-0">
              Turn a simple birthday wish into a tiny world made just for
              them — complete with memories, music, magic and a little
              surprise.
            </p>


            {/* Buttons */}

            <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row lg:items-start">

              <motion.a
                href="#create"
                whileHover={{
                  scale: 1.035,
                  boxShadow: "0 0 40px rgba(217,70,239,0.28)",
                }}
                whileTap={{ scale: 0.97 }}
                className="group flex h-[52px] items-center justify-center gap-3 rounded-full bg-gradient-to-r from-fuchsia-500 via-pink-500 to-violet-500 px-7 text-[13px] font-semibold text-white shadow-[0_12px_35px_rgba(217,70,239,0.22)]"
              >
                Create their wish

                <ArrowRight
                  size={16}
                  className="transition-transform duration-300 group-hover:translate-x-1"
                />

              </motion.a>


              <motion.a
                href="#how-it-works"
                whileHover={{
                  scale: 1.025,
                  borderColor: "rgba(217,70,239,0.35)",
                }}
                className="flex h-[52px] items-center justify-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-6 text-[13px] text-zinc-300 shadow-sm backdrop-blur-xl"
              >

                <Heart
                  size={15}
                  strokeWidth={1.6}
                  className="text-pink-300"
                />

                See the magic

              </motion.a>

            </div>


            {/* Trust line */}

            <div className="mt-5 flex items-center justify-center gap-2 text-[10px] tracking-wide text-zinc-600 lg:justify-start">

              <span className="text-fuchsia-400">♡</span>

              No design skills needed

              <span>·</span>

              Just a little love

            </div>

          </motion.div>



          {/* ================= RIGHT ================= */}

          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{
              duration: 1,
              delay: 0.2,
              ease: "easeOut",
            }}
            className="relative flex min-h-[550px] items-center justify-center"
          >

            {/* Large glowing halo */}

            <motion.div
              animate={{
                scale: [1, 1.06, 1],
              }}
              transition={{
                duration: 7,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="absolute h-[440px] w-[440px] rounded-full bg-gradient-to-br from-fuchsia-500/20 via-purple-500/10 to-cyan-400/10 blur-[70px]"
            />


            {/* Orbit */}

            <div className="absolute h-[500px] w-[500px] rounded-full border border-fuchsia-400/[0.08]" />

            <div className="absolute h-[410px] w-[410px] rounded-full border border-dashed border-purple-400/[0.10]" />


            {/* Floating memory card */}

            <motion.div
              animate={{
                y: [0, -10, 0],
                rotate: [-4, -2, -4],
              }}
              transition={{
                duration: 6,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="absolute bottom-[16%] left-[2%] z-20 hidden w-[135px] rotate-[-4deg] rounded-2xl border border-white/10 bg-zinc-900/70 p-2 shadow-[0_20px_50px_rgba(0,0,0,0.4)] backdrop-blur-xl sm:block"
            >

              <div className="flex h-[105px] items-center justify-center rounded-xl bg-gradient-to-br from-fuchsia-500/20 via-purple-500/20 to-indigo-500/20">

                <span className="font-serif text-3xl italic text-fuchsia-200">
                  memories
                </span>

              </div>

              <p className="px-1 pt-2 text-[8px] tracking-widest text-zinc-500">
                LITTLE MOMENTS
              </p>

            </motion.div>



            {/* ================= MAIN BIRTHDAY CARD ================= */}

            <motion.div
              whileHover={{
                rotate: 0,
                y: -7,
              }}
              transition={{ duration: 0.5 }}
              className="relative z-10 flex h-[485px] w-[345px] flex-col items-center overflow-hidden rounded-[190px_190px_35px_35px] border border-white/10 bg-zinc-950/70 px-8 text-center shadow-[0_40px_100px_rgba(0,0,0,0.55),0_0_70px_rgba(168,85,247,0.10)] backdrop-blur-2xl sm:h-[510px] sm:w-[370px]"
            >

              {/* Gradient border glow */}

              <div className="pointer-events-none absolute inset-0 rounded-[190px_190px_35px_35px] bg-gradient-to-b from-fuchsia-500/10 via-transparent to-violet-500/10" />

              {/* Inner border */}

              <div className="pointer-events-none absolute inset-3 rounded-[180px_180px_27px_27px] border border-fuchsia-300/[0.08]" />


              {/* Decorations */}

              <div className="absolute left-9 top-16 text-[12px] text-fuchsia-300/70">
                ✦ · ✧
              </div>

              <div className="absolute right-9 top-20 text-[11px] text-purple-300/70">
                ✧
              </div>


              {/* Cake */}

              <motion.div
                animate={{
                  y: [0, -5, 0],
                  rotate: [0, 1, 0],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="relative mt-[75px] text-[65px] drop-shadow-[0_0_25px_rgba(236,72,153,0.25)]"
              >
                🎂
              </motion.div>


              {/* Label */}

              <p className="mt-5 text-[9px] font-medium uppercase tracking-[0.32em] text-zinc-500">
                A little something for
              </p>


              {/* Name */}

              <h2 className="mt-3 bg-gradient-to-r from-fuchsia-200 via-pink-200 to-purple-200 bg-clip-text font-serif text-[39px] font-medium leading-tight tracking-[-0.04em] text-transparent">
                Someone
                <br />
                Special
              </h2>


              {/* Divider */}

              <div className="my-6 flex items-center gap-3">

                <span className="h-px w-8 bg-fuchsia-400/20" />

                <span className="text-[13px] text-pink-300">
                  ♡
                </span>

                <span className="h-px w-8 bg-fuchsia-400/20" />

              </div>


              {/* Message */}

              <p className="max-w-[250px] font-serif text-[15px] leading-7 text-zinc-400">

                Because some people deserve more than just a

                <span className="italic text-fuchsia-300">
                  {" "}“Happy Birthday.”
                </span>

              </p>


              {/* Bottom */}

              <div className="absolute bottom-9 flex flex-col items-center">

                <div className="mb-2 text-[10px] text-fuchsia-300">
                  ✦
                </div>

                <p className="text-[8px] font-medium tracking-[0.28em] text-zinc-600">
                  MADE WITH LOVE · WISHLY
                </p>

              </div>

            </motion.div>



            {/* Floating note */}

            <motion.div
              animate={{
                y: [0, 9, 0],
                rotate: [5, 7, 5],
              }}
              transition={{
                duration: 5,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="absolute right-[1%] top-[14%] z-20 hidden rotate-[5deg] rounded-2xl border border-white/10 bg-zinc-900/70 px-4 py-3 shadow-[0_15px_40px_rgba(0,0,0,0.4)] backdrop-blur-xl sm:block"
            >

              <p className="font-serif text-[13px] italic text-fuchsia-200">
                made just for you ♡
              </p>

            </motion.div>


            {/* Floating heart */}

            <motion.div
              animate={{
                y: [0, -10, 0],
                scale: [1, 1.08, 1],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
              }}
              className="absolute bottom-[18%] right-[8%] text-fuchsia-300 drop-shadow-[0_0_12px_rgba(217,70,239,0.5)]"
            >
              ♡
            </motion.div>


            {/* Cyan accent */}

            <motion.div
              animate={{
                y: [0, -8, 0],
                opacity: [0.4, 1, 0.4],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
              }}
              className="absolute right-[15%] bottom-[12%] text-cyan-300/70"
            >
              ✦
            </motion.div>

          </motion.div>

        </div>


        {/* ================= SCROLL INDICATOR ================= */}

        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{
            duration: 2,
            repeat: Infinity,
          }}
          className="absolute bottom-4 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 text-[8px] uppercase tracking-[0.28em] text-zinc-600 lg:flex"
        >

          <span>Scroll to explore</span>

          <span className="h-8 w-px bg-fuchsia-400/20" />

        </motion.div>

      </section>


      {/* ================= HOW IT WORKS ================= */}

      <section
        id="how-it-works"
        className="relative mx-auto max-w-6xl px-6 py-24 sm:py-32"
      >

        <div className="mx-auto max-w-2xl text-center">

          <p className="text-[9px] uppercase tracking-[0.35em] text-pink-300/60">
            How it works
          </p>

          <h2 className="mt-4 font-serif text-4xl leading-tight text-white sm:text-5xl">
            A little magic,

            <span className="block italic text-pink-300">
              in three simple steps.
            </span>
          </h2>

          <p className="mx-auto mt-5 max-w-lg text-sm leading-7 text-white/40">
            Create a beautiful birthday surprise in just a few moments.
            Add the little details that make it feel personal, then share
            it with someone special.
          </p>

        </div>


        <div className="mt-14 grid gap-5 md:grid-cols-3">


          {/* Step 1 */}

          <motion.div
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="rounded-[24px] border border-white/[0.08] bg-white/[0.025] p-7"
          >

            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-fuchsia-500/10 text-sm text-pink-300">
              01
            </div>

            <h3 className="mt-6 font-serif text-xl text-white/85">
              Make a wish
            </h3>

            <p className="mt-3 text-sm leading-6 text-white/35">
              Enter their name, relationship and a few things that make
              them special.
            </p>

          </motion.div>


          {/* Step 2 */}

          <motion.div
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="rounded-[24px] border border-white/[0.08] bg-white/[0.025] p-7"
          >

            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-pink-500/10 text-sm text-pink-300">
              02
            </div>

            <h3 className="mt-6 font-serif text-xl text-white/85">
              Add your memories
            </h3>

            <p className="mt-3 text-sm leading-6 text-white/35">
              Add photos, a personal message and even a song to make
              their birthday page feel truly theirs.
            </p>

          </motion.div>


          {/* Step 3 */}

          <motion.div
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="rounded-[24px] border border-white/[0.08] bg-white/[0.025] p-7"
          >

            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-violet-500/10 text-sm text-pink-300">
              03
            </div>

            <h3 className="mt-6 font-serif text-xl text-white/85">
              Share the magic
            </h3>

            <p className="mt-3 text-sm leading-6 text-white/35">
              Wishly creates a beautiful birthday page that you can
              share with them through a simple link.
            </p>

          </motion.div>

        </div>

      </section>

    </>
  );
};

export default Hero;