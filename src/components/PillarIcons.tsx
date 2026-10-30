import type { SVGProps } from 'react';

export function RescueCareIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round" {...props}>
      {/* Cat face outline */}
      <path d="M14 26 L12 14 L24 20 C26.5 19 29.2 18.5 32 18.5 C34.8 18.5 37.5 19 40 20 L52 14 L50 26 C53 30 54.5 34.5 54.5 39 C54.5 48.5 44.5 55 32 55 C19.5 55 9.5 48.5 9.5 39 C9.5 34.5 11 30 14 26 Z" />
      {/* Eyes */}
      <circle cx="24" cy="36" r="2" fill="currentColor" stroke="none" />
      <circle cx="40" cy="36" r="2" fill="currentColor" stroke="none" />
      {/* Nose */}
      <polygon points="32,41 29.5,38 34.5,38" fill="currentColor" stroke="none" />
      {/* Mouth */}
      <path d="M29 42 Q32 45 32 42 Q32 45 35 42" strokeWidth={2} />
      {/* Whiskers */}
      <line x1="8" y1="36" x2="19" y2="37" strokeWidth={2} />
      <line x1="8" y1="42" x2="19" y2="40" strokeWidth={2} />
      <line x1="56" y1="36" x2="45" y2="37" strokeWidth={2} />
      <line x1="56" y1="42" x2="45" y2="40" strokeWidth={2} />
    </svg>
  );
}

export function FindHomeIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round" {...props}>
      {/* House outline */}
      <path d="M12 28 L32 12 L52 28 V52 H12 Z" />
      {/* Arch door */}
      <path d="M26 52 V36 C26 32.7 28.7 30 32 30 C35.3 30 38 32.7 38 36 V52" />
      {/* Heart on top right of roof */}
      <path
        d="M45 13 C45 10.8 46.8 9 49 9 C50.2 9 51.3 9.6 52 10.5 C52.7 9.6 53.8 9 55 9 C57.2 9 59 10.8 59 13 C59 16.5 52 21 52 21 C52 21 45 16.5 45 13 Z"
        fill="#E75A3C"
        stroke="#E75A3C"
        strokeWidth={1}
      />
    </svg>
  );
}

export function CommunityIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round" {...props}>
      {/* Center person */}
      <circle cx="32" cy="27" r="6" />
      <path d="M21 51 C21 43 25.5 39 32 39 C38.5 39 43 43 43 51" />
      {/* Left person */}
      <circle cx="17" cy="30" r="4.5" />
      <path d="M9 51 C9 45 12.5 42 17 42 C19.5 42 21.7 43.1 23 45" />
      {/* Right person */}
      <circle cx="47" cy="30" r="4.5" />
      <path d="M41 45 C42.3 43.1 44.5 42 47 42 C51.5 42 55 45 55 51" />
      {/* Heart above center person */}
      <path
        d="M27 15 C27 13.3 28.3 12 30 12 C30.9 12 31.7 12.4 32 13 C32.3 12.4 33.1 12 34 12 C35.7 12 37 13.3 37 15 C37 17.5 32 21 32 21 C32 21 27 17.5 27 15 Z"
        fill="#E75A3C"
        stroke="#E75A3C"
        strokeWidth={1}
      />
    </svg>
  );
}

export function SupportHandsIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round" {...props}>
      {/* Heart floating above */}
      <path
        d="M24 19 C24 15.5 27 13 30 13 C31.2 13 32.3 13.7 32 14.5 C31.7 13.7 32.8 13 34 13 C37 13 40 15.5 40 19 C40 23.5 32 29 32 29 C32 29 24 23.5 24 19 Z"
        fill="#E75A3C"
        stroke="#E75A3C"
        strokeWidth={1}
      />
      {/* Hands holding/cupping from below */}
      <path d="M12 36 C16 33 22 34 26 37 L31 41 C32 41.8 33 41.8 34 41 L39 37 C43 34 49 33 53 36" />
      <path d="M14 41 C18 39 24 41 27 44 L31 48 C32 48.8 33 48.8 34 48 L38 44 C41 41 47 39 51 41" />
      <path d="M21 47 C24 49 28 53 32 53 C36 53 40 49 43 47" />
    </svg>
  );
}

