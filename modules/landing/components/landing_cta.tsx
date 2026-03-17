"use client";

import Link from "next/link";

export default function LandingCta() {
  return (
    <footer
      style={{
        backgroundImage: "url('/footer.png')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
      className="relative size-full md:h-screen  grid grid-cols-2 md:grid-cols-3 gap-3 py-8 px-4"
    >
      {/* Column 1 */}
      <div className="col-span-1 md:col-span-2" />
      <div className="col-span-1 md:col-span-1 flex items-start gap-3 justify-center">
        {/* <Link href="/shop" className="text-primary text-sm ms-auto">
          <button className="px-4 py-2 bg-secondary text-primary rounded-lg border border-primary hover:bg-secondary/90 ml-auto">
            Shop now
          </button>
        </Link> */}
      </div>
      {/* Column 2 */}
      <div className="col-span-2 lg:col-span-1 size-full flex items-end ">
        <p
          className="text-primary text-lg"
          style={{
            textShadow:
              "-1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000, 1px 1px 0 #000",
          }}
        >
          Bringing warmth into everyday spaces.
        </p>
      </div>
      <div className="col-span-0 lg:col-span-1" />
      {/* Column 3 */}
      <div className="col-span-0 lg:col-span-2" />
      <div className="size-full col-span-2 lg:col-span-1 flex items-end gap-3 justify-center">
        <Link href="/configurator" className="text-primary text-sm ms-auto">
          <button className="px-4 py-2 border border-primary bg-secondary text-primary rounded-lg hover:bg-secondary/90 ml-auto">
            Customize
          </button>
        </Link>
        <a
          href="mailto:contact@redicreate.com"
          target="_blank"
          rel="noopener noreferrer"
        >
          <button className="px-4 py-2 bg-primary text-secondary rounded-lg hover:bg-primary/90 border border-secondary">
            Contact us
          </button>
        </a>
      </div>
      {/* CTAs */}
    </footer>
  );
}
