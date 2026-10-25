import Image from "next/image";

type BrandLogoProps = {
  size?: "small" | "large";
};

export function BrandLogo({ size = "small" }: BrandLogoProps) {
  return (
    <span className={`brand-lockup brand-lockup--${size}`}>
      <Image
        src="/images/brand/logo-header.png"
        alt="Hafsat Ahmed Ala Textile Ventures"
        width={200}
        height={68}
        className="brand-logo-image"
        sizes={size === "large" ? "230px" : "200px"}
        priority={size === "small"}
      />
    </span>
  );
}
