import LandscapeOverlay from "@components/landscape_overlay";
import About from "./components/about";
import FeaturesShowcase from "./components/features_showcase";
import Header from "./components/header";
import HeroBanner from "./components/hero_banner";
import LampCreations from "./components/lamp_creations";
import CTA from "./components/landing_cta";
import LandingFooter from "./components/landing_footer";
import LandingExperience from "./landing_experience";

export default function LandingModule() {
  return (
    <div className="relative h-screen w-full">
      <LandscapeOverlay />
      <LandingExperience />

      <Header />

      <main className="relative z-10 grid h-full mx-auto">
        {/* Hero Banner */}
        <HeroBanner />
        {/* Picture explanation section */}
        <FeaturesShowcase />
        <About />
        <LampCreations />

        {/* Image of the configurator */}
        {/* preload it as well as read only */}
        {/* Click => scroll object => redirect page with configurator without loading */}
        <CTA />
        <LandingFooter />
      </main>
    </div>
  );
}
