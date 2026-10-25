import Link from "next/link";
import Image from "next/image";

const shopLinks = [
  { href: "/shop", label: "All Fabrics" },
  { href: "/shop?filter=new", label: "New Arrivals" },
  { href: "/shop?filter=bestsellers", label: "Best Sellers" },
  { href: "/shop?filter=sale", label: "Special Offers" },
];

const serviceLinks = [
  { href: "/contact", label: "Contact Us" },
  { href: "/shipping", label: "Shipping Information" },
  { href: "/returns", label: "Returns Policy" },
  { href: "/faq", label: "Frequently Asked Questions" },
];

const aboutLinks = [
  { href: "/about", label: "Our Story" },
  { href: "/about#quality", label: "Our Commitment to Quality" },
];

export function Footer() {
  return (
    <footer className="bg-navy text-white">
      <div className="container-page py-12 lg:py-16">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-12">
          {/* Brand */}
          <div className="lg:col-span-4">
            <Image
              src="/images/brand/logo-header.png"
              alt="Hafsat Ahmed Ala Textile Ventures"
              width={180}
              height={64}
              className="mb-4 h-14 w-auto object-contain brightness-0 invert"
            />
            <p className="mb-2 text-sm font-semibold tracking-wide text-gold">
              Hafsat Ahmed Ala Textile Ventures
            </p>
            <p className="max-w-sm text-sm leading-relaxed text-white/70">
              Quality Fabrics · Elegant Style · Endless Possibilities. Premium
              textiles carefully selected for traditional and contemporary
              fashion.
            </p>
            <div className="mt-6 flex gap-3">
              {["Instagram", "Facebook", "TikTok"].map((platform) => (
                <a
                  key={platform}
                  href="#"
                  aria-label={platform}
                  className="flex h-9 w-9 items-center justify-center rounded-full border border-white/20 text-xs text-white/80 transition hover:border-gold hover:text-gold"
                >
                  {platform[0]}
                </a>
              ))}
            </div>
          </div>

          {/* Shop */}
          <div className="lg:col-span-2">
            <h3 className="mb-4 text-xs font-semibold tracking-[0.15em] text-gold">
              SHOP
            </h3>
            <ul className="space-y-2.5">
              {shopLinks.map((l) => (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    className="text-sm text-white/75 transition hover:text-gold"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Customer Service */}
          <div className="lg:col-span-3">
            <h3 className="mb-4 text-xs font-semibold tracking-[0.15em] text-gold">
              CUSTOMER SERVICE
            </h3>
            <ul className="space-y-2.5">
              {serviceLinks.map((l) => (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    className="text-sm text-white/75 transition hover:text-gold"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
            <h3 className="mb-4 mt-8 text-xs font-semibold tracking-[0.15em] text-gold">
              ABOUT
            </h3>
            <ul className="space-y-2.5">
              {aboutLinks.map((l) => (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    className="text-sm text-white/75 transition hover:text-gold"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact + Newsletter */}
          <div className="lg:col-span-3">
            <h3 className="mb-4 text-xs font-semibold tracking-[0.15em] text-gold">
              CONTACT
            </h3>
            <ul className="space-y-2.5 text-sm text-white/75">
              <li>Phone: [Your Phone Number]</li>
              <li>WhatsApp: [Your WhatsApp Number]</li>
              <li>Email: [your@email.com]</li>
              <li>Address: [Business Address, Nigeria]</li>
            </ul>

            <h3 className="mb-3 mt-8 text-xs font-semibold tracking-[0.15em] text-gold">
              NEWSLETTER
            </h3>
            <p className="mb-3 text-sm text-white/70">
              Receive updates on new arrivals and exclusive offers.
            </p>
            <form
              className="flex flex-col gap-2 sm:flex-row"
              action="#"
            >
              <input
                type="email"
                required
                placeholder="Your email address"
                className="w-full rounded-md border border-white/20 bg-white/5 px-3 py-2.5 text-sm text-white placeholder:text-white/40 outline-none focus:border-gold"
              />
              <button
                type="submit"
                className="shrink-0 rounded-md bg-gold px-4 py-2.5 text-sm font-semibold text-navy transition hover:bg-gold-light"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-3 border-t border-white/10 pt-6 text-center text-xs text-white/50 sm:flex-row sm:text-left">
          <p>
            © {new Date().getFullYear()} Hafsat Ahmed Ala Textile Ventures. All
            rights reserved.
          </p>
          <p className="italic text-white/40">
            Quality Fabrics · Elegant Style · Endless Possibilities
          </p>
        </div>
      </div>
    </footer>
  );
}
