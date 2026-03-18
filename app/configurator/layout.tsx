import type { Metadata } from "next";
import NoScroll from "./no-scroll";

export const metadata: Metadata = {
  title: "Lumina — Configure Your Lamp",
  metadataBase: new URL("https://lumina.redicreate.com/configurator"),
  icons: {
    icon: "/favicon.ico",
  },
  description:
    "Customize your handcrafted wood lamp. Choose your model, wood material, and varnish color to create a unique piece tailored to your space.",
};

export default function ConfiguratorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <NoScroll />
      {children}
    </>
  );
}
