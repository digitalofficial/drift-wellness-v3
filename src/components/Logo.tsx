export default function Logo({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 200 60"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-label="Drift Wellness logo"
    >
      <defs>
        <linearGradient id="wave-grad" x1="0" y1="0" x2="50" y2="30" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#5EEAD4" />
          <stop offset="100%" stopColor="#3DBFB0" />
        </linearGradient>
      </defs>
      {/* Flowing wave/drift shape */}
      <path
        d="M8 28C12 18 20 12 28 14C36 16 38 26 44 24C50 22 48 14 56 16"
        stroke="url(#wave-grad)"
        strokeWidth="3.5"
        strokeLinecap="round"
        fill="none"
      />
      <path
        d="M8 34C14 28 22 24 30 27C38 30 40 22 48 24"
        stroke="url(#wave-grad)"
        strokeWidth="2.5"
        strokeLinecap="round"
        fill="none"
        opacity="0.5"
      />
      {/* Violet dot accent */}
      <circle cx="56" cy="16" r="3" fill="#A78BFA" />
      {/* DRIFT text */}
      <text
        x="68"
        y="30"
        fontFamily="var(--font-dm-sans), sans-serif"
        fontSize="24"
        fontWeight="700"
        fill="#F0F4FF"
        letterSpacing="-0.5"
      >
        DRIFT
      </text>
      {/* WELLNESS text */}
      <text
        x="68"
        y="46"
        fontFamily="var(--font-dm-sans), sans-serif"
        fontSize="11"
        fontWeight="500"
        fill="#94A3B8"
        letterSpacing="3"
      >
        WELLNESS
      </text>
    </svg>
  );
}
