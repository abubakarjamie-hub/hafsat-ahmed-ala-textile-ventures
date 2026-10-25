import type { SVGProps } from "react";

export type IconName =
  | "menu"
  | "search"
  | "user"
  | "bag"
  | "heart"
  | "close"
  | "plus"
  | "minus"
  | "chevron-down"
  | "chevron-right"
  | "arrow-right"
  | "arrow-down"
  | "zoom"
  | "truck"
  | "refresh"
  | "shield"
  | "sparkle"
  | "mail"
  | "check"
  | "trash"
  | "ruler"
  | "leaf"
  | "needle";

type IconProps = SVGProps<SVGSVGElement> & {
  name: IconName;
  size?: number;
  strokeWidth?: number;
};

export function Icon({ name, size = 20, strokeWidth = 1.7, ...props }: IconProps) {
  const shared = {
    fill: "none",
    stroke: "currentColor",
    strokeWidth,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
  };

  return (
    <svg
      aria-hidden="true"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      {...shared}
      {...props}
    >
      {name === "menu" && <><path d="M4 7h16" /><path d="M4 12h16" /><path d="M4 17h16" /></>}
      {name === "search" && <><circle cx="10.8" cy="10.8" r="6.4" /><path d="m16 16 4.1 4.1" /></>}
      {name === "user" && <><circle cx="12" cy="7.5" r="3.4" /><path d="M4.6 20c.6-3.7 3.4-5.7 7.4-5.7s6.8 2 7.4 5.7" /></>}
      {name === "bag" && <><path d="M5 8.5h14l1 12H4l1-12Z" /><path d="M9 9V6a3 3 0 0 1 6 0v3" /></>}
      {name === "heart" && <path d="M20.5 8.8c0 5-8.5 10.1-8.5 10.1S3.5 13.8 3.5 8.8A4.6 4.6 0 0 1 12 6.5a4.6 4.6 0 0 1 8.5 2.3Z" />}
      {name === "close" && <><path d="m6 6 12 12" /><path d="M18 6 6 18" /></>}
      {name === "plus" && <><path d="M12 5v14" /><path d="M5 12h14" /></>}
      {name === "minus" && <path d="M5 12h14" />}
      {name === "chevron-down" && <path d="m6 9 6 6 6-6" />}
      {name === "chevron-right" && <path d="m9 5 7 7-7 7" />}
      {name === "arrow-right" && <><path d="M4 12h15" /><path d="m13 5 7 7-7 7" /></>}
      {name === "arrow-down" && <><path d="M12 4v15" /><path d="m5 13 7 7 7-7" /></>}
      {name === "zoom" && <><circle cx="10.5" cy="10.5" r="5.8" /><path d="m15 15 5 5M10.5 8v5M8 10.5h5" /></>}
      {name === "truck" && <><path d="M3 7h11v10H3z" /><path d="M14 10h4l3 3v4h-7" /><circle cx="7" cy="18" r="1.8" /><circle cx="18" cy="18" r="1.8" /></>}
      {name === "refresh" && <><path d="M20 7v5h-5" /><path d="M4.7 9A7.7 7.7 0 0 1 18 6l2 1" /><path d="M4 17v-5h5" /><path d="M19.3 15A7.7 7.7 0 0 1 6 18l-2-1" /></>}
      {name === "shield" && <><path d="M12 3 19 6v5.5c0 4.4-2.8 7.7-7 9.5-4.2-1.8-7-5.1-7-9.5V6l7-3Z" /><path d="m9 12 2 2 4-4" /></>}
      {name === "sparkle" && <><path d="m12 3 1.6 5.4L19 10l-5.4 1.6L12 17l-1.6-5.4L5 10l5.4-1.6L12 3Z" /><path d="m19 16 .8 2.2L22 19l-2.2.8L19 22l-.8-2.2L16 19l2.2-.8L19 16Z" /></>}
      {name === "mail" && <><rect x="3" y="5" width="18" height="14" rx="2" /><path d="m4 7 8 6 8-6" /></>}
      {name === "check" && <path d="m5 12 4.5 4.5L19 7" />}
      {name === "trash" && <><path d="M4 7h16" /><path d="M10 11v6M14 11v6" /><path d="m6 7 1 14h10l1-14M9 7V4h6v3" /></>}
      {name === "ruler" && <><path d="m4 17 13-13 4 4L8 21H4v-4Z" /><path d="m14 7 3 3M11 10l2 2M8 13l3 3" /></>}
      {name === "leaf" && <><path d="M20 4c-7.5.2-13.4 2.1-14.8 7.2-.8 3.1 1.1 5.5 4 5.6C15 17 19.5 11.7 20 4Z" /><path d="M4 21c2.7-5.4 6.1-8.5 11-11" /></>}
      {name === "needle" && <><path d="m5 19 11-11" /><path d="M14.7 4.7a2.5 2.5 0 0 1 3.5 3.5l-1.5 1.5-3.5-3.5 1.5-1.5Z" /><path d="m13.2 6.2 3.5 3.5" /><path d="m4 20 3-1-2-2-1 3Z" /></>}
    </svg>
  );
}
