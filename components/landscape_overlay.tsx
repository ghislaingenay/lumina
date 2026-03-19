"use client";

function LandscapeOverlay() {
  return (
    <div className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-secondary text-primary p-8 portrait:flex landscape:hidden !md:hidden">
      {/* Rotate icon */}
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
        className="w-20 h-20 mb-6 animate-pulse"
      >
        <rect x="4" y="2" width="16" height="20" rx="2" />
        <path d="M12 18h.01" />
        {/* Rotation arrow */}
        <path d="M22 12l-2-2m0 0l-2 2m2-2v4" />
      </svg>

      <h2 className="text-2xl font-semibold mb-3 text-center">
        Rotate your device
      </h2>
      <p className="text-base text-center opacity-80 max-w-xs">
        This experience is best viewed in landscape mode. Please rotate your
        phone to continue.
      </p>
    </div>
  );
}

export default LandscapeOverlay;
