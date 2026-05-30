import { SVGProps } from 'react';

type IconProps = SVGProps<SVGSVGElement> & { size?: number };

const mk = (children: React.ReactNode, sw = 1.7) =>
  function Icon({ size = 22, ...props }: IconProps) {
    return (
      <svg
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth={sw}
        strokeLinecap="round"
        strokeLinejoin="round"
        {...props}
      >
        {children}
      </svg>
    );
  };

export const IconArrow = mk(<path d="M5 12h14M13 6l6 6-6 6" />);
export const IconCheck = mk(<path d="M5 12.5l4.2 4.2L19 7" />, 2);
export const IconBuild = mk(<><path d="M3 21h18" /><path d="M5 21V8l7-4 7 4v13" /><path d="M9 21v-6h6v6" /></>);
export const IconLead = mk(<><circle cx="9" cy="8" r="3" /><path d="M3.5 19a5.5 5.5 0 0 1 11 0" /><path d="M16 8.5a2.6 2.6 0 1 0 0-1" /><path d="M17 13.5c2 .4 3.5 2 3.5 4" /></>);
export const IconDigital = mk(<><rect x="6" y="6" width="12" height="12" rx="2" /><path d="M9.5 9.5h5v5h-5z" /><path d="M9 3v3M15 3v3M9 18v3M15 18v3M3 9h3M3 15h3M18 9h3M18 15h3" /></>);
export const IconCalendar = mk(<><rect x="4" y="5" width="16" height="16" rx="2" /><path d="M4 9h16M8 3v4M16 3v4" /></>);
export const IconTrack = mk(<><path d="M4 20V10M10 20V4M16 20v-7M22 20H2" /></>);
export const IconCompass = mk(<><circle cx="12" cy="12" r="9" /><path d="M15.5 8.5l-2 5-5 2 2-5z" /></>);
export const IconGlobe = mk(<><circle cx="12" cy="12" r="9" /><path d="M3 12h18M12 3c2.5 2.6 2.5 15.4 0 18M12 3c-2.5 2.6-2.5 15.4 0 18" /></>);
export const IconMentor = mk(<><path d="M12 13a4 4 0 1 0 0-8 4 4 0 0 0 0 8z" /><path d="M5 20a7 7 0 0 1 14 0" /></>);
export const IconMail = mk(<><rect x="3" y="5" width="18" height="14" rx="2" /><path d="M4 7l8 6 8-6" /></>);
export const IconLink = mk(<><path d="M10 14a3.5 3.5 0 0 0 5 0l3-3a3.5 3.5 0 0 0-5-5l-1 1" /><path d="M14 10a3.5 3.5 0 0 0-5 0l-3 3a3.5 3.5 0 0 0 5 5l1-1" /></>);
