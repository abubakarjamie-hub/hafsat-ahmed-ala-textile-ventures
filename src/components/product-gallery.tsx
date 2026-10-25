"use client";

import Image from "next/image";
import { useState } from "react";
import { IconDownload, IconZoom } from "@/components/icons";
import { cn } from "@/lib/format";

export function ProductGallery({
  images,
  name,
}: {
  images: string[];
  name: string;
}) {
  const [active, setActive] = useState(0);
  const [zoomed, setZoomed] = useState(false);
  const safeImages = images.length > 0 ? images : ["/images/products/ankara-main.jpg"];
  const main = safeImages[Math.min(active, safeImages.length - 1)];

  return (
    <div className="flex gap-3 sm:gap-4">
      {/* Thumbnails - vertical on desktop */}
      <div className="hidden w-16 shrink-0 flex-col gap-2.5 sm:flex md:w-20">
        {safeImages.map((src, idx) => (
          <button
            key={`${src}-${idx}`}
            type="button"
            onClick={() => setActive(idx)}
            className={cn(
              "relative aspect-square overflow-hidden rounded-lg border-2 bg-soft-gray transition",
              active === idx
                ? "border-navy"
                : "border-transparent hover:border-gray-200"
            )}
            aria-label={`View image ${idx + 1}`}
          >
            <Image
              src={src}
              alt={`${name} thumbnail ${idx + 1}`}
              fill
              className="object-cover"
              sizes="80px"
            />
          </button>
        ))}
      </div>

      {/* Main image */}
      <div className="relative min-w-0 flex-1">
        <div className="relative aspect-[4/5] overflow-hidden rounded-2xl bg-soft-gray sm:aspect-[3/4]">
          <Image
            src={main}
            alt={name}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 45vw"
            priority
          />
          <button
            type="button"
            aria-label="Zoom image"
            onClick={() => setZoomed(true)}
            className="absolute bottom-3 right-3 rounded-full bg-white/95 p-2.5 text-navy shadow-sm transition hover:bg-white"
          >
            <IconZoom size={18} />
          </button>
          <a
            href={main}
            download
            aria-label="Download image"
            className="absolute bottom-3 left-3 rounded-full bg-white/95 p-2.5 text-navy shadow-sm transition hover:bg-white"
          >
            <IconDownload size={18} />
          </a>
        </div>

        {/* Mobile thumbnails */}
        <div className="mt-3 flex gap-2 overflow-x-auto pb-1 sm:hidden">
          {safeImages.map((src, idx) => (
            <button
              key={`m-${src}-${idx}`}
              type="button"
              onClick={() => setActive(idx)}
              className={cn(
                "relative h-16 w-16 shrink-0 overflow-hidden rounded-lg border-2 bg-soft-gray",
                active === idx ? "border-navy" : "border-transparent"
              )}
            >
              <Image
                src={src}
                alt={`${name} view ${idx + 1}`}
                fill
                className="object-cover"
                sizes="64px"
              />
            </button>
          ))}
        </div>
      </div>

      {/* Zoom modal */}
      {zoomed && (
        <div
          className="fixed inset-0 z-[90] flex items-center justify-center bg-black/80 p-4"
          onClick={() => setZoomed(false)}
        >
          <div className="relative h-[min(90vh,900px)] w-full max-w-4xl">
            <Image
              src={main}
              alt={`${name} zoomed`}
              fill
              className="object-contain"
              sizes="100vw"
            />
          </div>
        </div>
      )}
    </div>
  );
}
