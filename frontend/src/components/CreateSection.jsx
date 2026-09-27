import { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import {
  Sparkles,
  ArrowRight,
  ImagePlus,
  Music2,
  Heart,
} from "lucide-react";
import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

const CreateSection = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    relationship: "",
    traits: "",
    songUrl: "",
  });

  const [photoFile, setPhotoFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const fileToBase64 = (file) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();

      reader.onload = () => resolve(reader.result);
      reader.onerror = reject;

      reader.readAsDataURL(file);
    });

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.name.trim() || !form.traits.trim()) {
      setError("Add their name and at least one thing about them.");
      return;
    }

    setError("");
    setLoading(true);

    try {
      const photoUrl = photoFile
        ? await fileToBase64(photoFile)
        : null;

      const { data } = await axios.post(
        `${API_URL}/api/pages`,
        {
          ...form,
          photoUrl,
        }
      );

      navigate(`/birthday/${data.slug}`);
    } catch (err) {
      setError(
        "Something went wrong creating the page. Try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <section
      id="create"
      className="relative mx-auto w-[92%] max-w-5xl overflow-hidden py-28"
    >

      {/* =====================================================
          BACKGROUND GLOW
      ===================================================== */}

      <div className="pointer-events-none absolute inset-0">

        <div className="absolute left-[-15%] top-[15%] h-[400px] w-[400px] rounded-full bg-fuchsia-700/10 blur-[130px]" />

        <div className="absolute right-[-15%] bottom-[5%] h-[450px] w-[450px] rounded-full bg-violet-700/10 blur-[140px]" />

        <div className="absolute left-[35%] top-[40%] h-[300px] w-[300px] rounded-full bg-rose-600/5 blur-[120px]" />

      </div>


      {/* =====================================================
          SECTION HEADING
      ===================================================== */}

      <motion.div
        initial={{ opacity: 0, y: 25 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.7 }}
        className="relative z-10 mb-12 text-center"
      >

        {/* Badge */}

        <div className="mx-auto mb-5 flex w-fit items-center gap-2 rounded-full border border-fuchsia-400/15 bg-white/[0.035] px-4 py-2 text-[11px] font-medium tracking-wide text-fuchsia-200 backdrop-blur-xl">
          <Sparkles
            size={13}
            className="text-fuchsia-300"
          />

          Takes about a minute
        </div>


        {/* Heading */}

        <h2 className="font-serif text-[clamp(2.8rem,5vw,4.5rem)] font-medium leading-[0.95] tracking-[-0.05em] text-white">

          Create their{" "}

          <span className="bg-gradient-to-r from-fuchsia-300 via-pink-300 to-rose-300 bg-clip-text font-serif italic text-transparent">
            wish
          </span>

        </h2>


        <p className="mx-auto mt-5 max-w-xl text-[14px] leading-7 text-zinc-500">
          Tell us a little about them and we'll turn those
          little details into something they'll remember.
        </p>

      </motion.div>



      {/* =====================================================
          FORM
      ===================================================== */}

      <motion.form
        onSubmit={handleSubmit}
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{
          duration: 0.8,
          delay: 0.1,
        }}
        className="relative z-10 overflow-hidden rounded-[35px] border border-white/[0.08] bg-[#100c16]/75 p-6 shadow-[0_35px_100px_rgba(0,0,0,0.45)] backdrop-blur-2xl sm:p-9"
      >

        {/* Top glow */}

        <div className="pointer-events-none absolute left-1/2 top-0 h-px w-[70%] -translate-x-1/2 bg-gradient-to-r from-transparent via-fuchsia-400/40 to-transparent" />

        {/* Inner glow */}

        <div className="pointer-events-none absolute right-[-15%] top-[-20%] h-[250px] w-[250px] rounded-full bg-fuchsia-600/5 blur-[100px]" />



        {/* =================================================
            NAME + RELATIONSHIP
        ================================================= */}

        <div className="relative grid gap-5 sm:grid-cols-2">

          <Field label="Their name">
            <Input
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="Someone special"
            />
          </Field>


          <Field label="Your relationship">
            <Input
              name="relationship"
              value={form.relationship}
              onChange={handleChange}
              placeholder="Best friend"
            />
          </Field>

        </div>



        {/* =================================================
            TRAITS
        ================================================= */}

        <div className="relative mt-5">

          <Field label="3 things about them">

            <Input
              name="traits"
              value={form.traits}
              onChange={handleChange}
              placeholder="Crazy, caring, always hungry"
            />

          </Field>

        </div>



        {/* =================================================
            PHOTO + MUSIC
        ================================================= */}

        <div className="relative mt-5 grid gap-5 sm:grid-cols-2">

          {/* PHOTO */}

          <Field label="Photo · optional">

            <label className="group flex h-[52px] cursor-pointer items-center gap-3 rounded-2xl border border-white/[0.07] bg-white/[0.025] px-4 transition-all duration-300 hover:border-fuchsia-400/25 hover:bg-fuchsia-500/[0.03]">

              <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-fuchsia-500/10">
                <ImagePlus
                  size={15}
                  className="text-fuchsia-300"
                />
              </div>

              <span className="truncate text-[12px] text-zinc-500 group-hover:text-zinc-300">
                {photoFile
                  ? photoFile.name
                  : "Choose a memory"}
              </span>

              <input
                type="file"
                accept="image/*"
                onChange={(e) =>
                  setPhotoFile(e.target.files[0])
                }
                className="hidden"
              />

            </label>

          </Field>



          {/* SONG */}

          <Field label="Song · optional">

            <div className="relative">

              <Music2
                size={15}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-purple-300"
              />

              <input
                name="songUrl"
                value={form.songUrl}
                onChange={handleChange}
                placeholder="audio links (.mp3, .wav, etc.)"
                className="h-[52px] w-full rounded-2xl border border-white/[0.07] bg-white/[0.025] pl-11 pr-4 text-[13px] text-zinc-200 outline-none transition-all duration-300 placeholder:text-zinc-700 focus:border-fuchsia-400/30 focus:bg-fuchsia-500/[0.025] focus:ring-2 focus:ring-fuchsia-500/5"
              />

            </div>

          </Field>

        </div>



        {/* =================================================
            ERROR
        ================================================= */}

        {error && (
          <motion.p
            initial={{ opacity: 0, y: -5 }}
            animate={{ opacity: 1, y: 0 }}
            className="relative mt-5 rounded-xl border border-rose-400/10 bg-rose-500/5 px-4 py-3 text-[12px] text-rose-300"
          >
            {error}
          </motion.p>
        )}



        {/* =================================================
            SUBMIT
        ================================================= */}

        <motion.button
          type="submit"
          disabled={loading}
          whileHover={{
            scale: 1.015,
            boxShadow:
              "0 0 45px rgba(217,70,239,0.25)",
          }}
          whileTap={{
            scale: 0.98,
          }}
          className="group relative mt-7 flex h-[54px] w-full items-center justify-center gap-3 overflow-hidden rounded-full bg-gradient-to-r from-fuchsia-500 via-pink-500 to-rose-500 text-[13px] font-semibold text-white shadow-[0_15px_35px_rgba(217,70,239,0.15)] transition-all disabled:cursor-not-allowed disabled:opacity-50"
        >

          {/* button shine */}

          <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

          {loading ? (
            <>
              <motion.span
                animate={{
                  rotate: 360,
                }}
                transition={{
                  duration: 1,
                  repeat: Infinity,
                  ease: "linear",
                }}
                className="text-base"
              >
                ✦
              </motion.span>

              Writing the message...
            </>
          ) : (
            <>
              <Heart
                size={15}
                fill="currentColor"
              />

              Create & Share

              <ArrowRight
                size={16}
                className="transition-transform duration-300 group-hover:translate-x-1"
              />
            </>
          )}

        </motion.button>


        {/* Bottom note */}

        <div className="mt-5 flex items-center justify-center gap-2 text-[9px] tracking-wide text-zinc-700">

          <Sparkles size={10} />

          Your little surprise starts here

          <Heart
            size={9}
            className="text-fuchsia-500/50"
          />

        </div>

      </motion.form>

    </section>
  );
};



/* =========================================================
   FIELD COMPONENT
========================================================= */

const Field = ({ label, children }) => (
  <div>

    <label className="mb-2 block text-[9px] font-medium uppercase tracking-[0.25em] text-zinc-600">
      {label}
    </label>

    {children}

  </div>
);

/* =========================================================
   INPUT COMPONENT
========================================================= */

const Input = ({
  name,
  value,
  onChange,
  placeholder,
}) => (
  <input
    name={name}
    value={value}
    onChange={onChange}
    placeholder={placeholder}
    className="h-[52px] w-full rounded-2xl border border-white/[0.07] bg-white/[0.025] px-4 text-[13px] text-zinc-200 outline-none transition-all duration-300 placeholder:text-zinc-700 focus:border-fuchsia-400/30 focus:bg-fuchsia-500/[0.025] focus:ring-2 focus:ring-fuchsia-500/5"
  />
);


export default CreateSection;