import LandscapeOverlay from "@components/landscape_overlay";
import ConfiguratorLoading from "./components/configurator_loading";
import ReturnToHome from "./components/return_to_home";
import ConfiguratorSidebar from "./components/sidebar";
import ConfiguratorExperience from "./configurator_experience";

export default function ConfiguratorModule() {
  return (
    <div className="relative h-screen w-full">
      <LandscapeOverlay />

      <div className="absolute size-full p-4 top-0 left-0 z-50 pointer-events-none">
        <ReturnToHome />
      </div>
      <ConfiguratorLoading />
      <ConfiguratorSidebar />
      <main className="relative z-10 grid h-full mx-auto">
        <ConfiguratorExperience />
      </main>
    </div>
  );
}
