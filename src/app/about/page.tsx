import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "Learn about Hafsat Ahmed Ala Textile Ventures — our story, commitment to quality fabrics, and elegant style.",
};

export default function AboutPage() {
  return (
    <div className="bg-white">
      <section className="border-b border-gray-50 bg-soft-gray/50">
        <div className="container-page py-12 lg:py-16">
          <p className="mb-2 text-xs font-semibold tracking-[0.15em] text-gold">
            OUR STORY
          </p>
          <h1 className="max-w-2xl text-3xl font-semibold tracking-tight text-navy sm:text-4xl">
            Hafsat Ahmed Ala Textile Ventures
          </h1>
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-gray-600">
            Quality Fabrics · Elegant Style · Endless Possibilities. We curate
            premium textiles for traditional attire, special occasions, and
            contemporary fashion design.
          </p>
        </div>
      </section>

      <section className="container-page py-12 lg:py-16">
        <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-14">
          <div className="relative aspect-[4/3] overflow-hidden rounded-2xl bg-soft-gray">
            <Image
              src="/images/products/market-1.jpg"
              alt="Premium African textiles display"
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          </div>
          <div>
            <h2 className="mb-4 text-2xl font-semibold text-navy">
              Crafted for elegance and lasting quality
            </h2>
            <p className="mb-4 text-sm leading-relaxed text-gray-600">
              Hafsat Ahmed Ala Textile Ventures was founded on a simple belief:
              beautiful clothing begins with exceptional fabric. We carefully
              select Ankara wax prints, luxury lace, brocade, silk blends, and
              traditional Hausa textiles that meet high standards of color,
              hand-feel, and durability.
            </p>
            <p className="text-sm leading-relaxed text-gray-600">
              Whether you are a designer, tailor, or individual creating a
              special look, our collection is chosen to support both cultural
              heritage and modern fashion expression.
            </p>
          </div>
        </div>
      </section>

      <section id="quality" className="border-t border-gray-100 bg-navy py-12 text-white lg:py-16">
        <div className="container-page">
          <h2 className="mb-8 text-center text-2xl font-semibold text-gold">
            Our Commitment to Quality
          </h2>
          <div className="grid gap-6 sm:grid-cols-3">
            {[
              {
                title: "Careful Selection",
                body: "Every fabric is reviewed for print clarity, texture, and suitability for premium garments.",
              },
              {
                title: "Honest Presentation",
                body: "Accurate descriptions, realistic photography, and transparent pricing you can trust.",
              },
              {
                title: "Customer Care",
                body: "Thoughtful support for Nigerian customers — from fabric advice to delivery guidance.",
              },
            ].map((item) => (
              <div
                key={item.title}
                className="rounded-xl border border-white/10 bg-white/5 p-6"
              >
                <h3 className="mb-2 font-semibold text-gold">{item.title}</h3>
                <p className="text-sm leading-relaxed text-white/75">
                  {item.body}
                </p>
              </div>
            ))}
          </div>
          <div className="mt-10 text-center">
            <Link
              href="/shop"
              className="inline-flex rounded-md bg-gold px-6 py-3 text-sm font-semibold text-navy transition hover:bg-gold-light"
            >
              Explore Our Fabrics
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
