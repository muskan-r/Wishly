import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import CreateSection from "./components/CreateSection";
import Footer from "./components/Footer";
import View from "./pages/View";

function Home() {
  return (
    <>
      <Navbar />
      <Hero />
      <CreateSection />
      <Footer />
    </>
  );
}

function App() {
  return (
    <main className="min-h-screen overflow-hidden bg-[#07050b] text-white">
      {/* Background */}
      <div className="fixed inset-0 -z-10 overflow-hidden">
        <div className="absolute left-[-15%] top-[-10%] h-[500px] w-[500px] rounded-full bg-fuchsia-700/10 blur-[140px]" />

        <div className="absolute right-[-15%] top-[15%] h-[550px] w-[550px] rounded-full bg-violet-700/10 blur-[150px]" />

        <div className="absolute bottom-[-20%] left-[30%] h-[500px] w-[500px] rounded-full bg-rose-700/10 blur-[150px]" />

        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(168,85,247,0.06),transparent_55%)]" />
      </div>

      {/* Routes */}
      <Routes>
        {/* Home */}
        <Route path="/" element={<Home />} />

        {/* Birthday Page */}
        <Route path="/birthday/:slug" element={<View />} />
      </Routes>
    </main>
  );
}

export default App;