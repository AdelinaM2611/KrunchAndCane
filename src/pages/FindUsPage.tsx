/**
 * Static "Find us" page at /find-us: market location and image. No API calls.
 */
const IMAGE_SRC = "/images/pastel2.jpg";
const IMAGE_FALLBACK = "/images/pastel.jpg";

export function FindUsPage() {
  return (
    <main className="px-4 py-12 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-3xl">
        <h1 className="mb-6 text-4xl font-bold text-leaf-green sm:text-5xl">Find us</h1>

        <div className="space-y-6 rounded-2xl border border-green-200 bg-white p-6 shadow-sm sm:p-8">
          <p className="text-lg leading-relaxed text-gray-700 sm:text-xl">
            Backyard Market, 146 Brick Lane, London E1 6QL
          </p>

          <div className="overflow-hidden rounded-xl border border-green-200 shadow-sm">
            <img
              src={IMAGE_SRC}
              alt="Krunch & Cane pastel"
              className="h-auto w-full object-cover"
              onError={(e) => {
                (e.target as HTMLImageElement).src = IMAGE_FALLBACK;
              }}
            />
          </div>
        </div>
      </div>
    </main>
  );
}
