import Link from "next/link";

export default function NotFound() {
  return (
    <div className="container-page flex min-h-[50vh] flex-col items-center justify-center py-20 text-center">
      <p className="mb-2 text-xs font-semibold tracking-[0.15em] text-gold">
        404
      </p>
      <h1 className="mb-3 text-3xl font-semibold text-navy">Page not found</h1>
      <p className="mb-8 max-w-md text-sm text-gray-600">
        The page you are looking for may have been moved or no longer exists.
      </p>
      <div className="flex gap-3">
        <Link
          href="/"
          className="rounded-md bg-navy px-5 py-2.5 text-sm font-semibold text-white hover:bg-navy-light"
        >
          Go Home
        </Link>
        <Link
          href="/shop"
          className="rounded-md border border-gray-200 px-5 py-2.5 text-sm font-medium text-navy hover:bg-soft-gray"
        >
          Shop Fabrics
        </Link>
      </div>
    </div>
  );
}
