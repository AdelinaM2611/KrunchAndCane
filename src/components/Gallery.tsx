export function Gallery() {
  return (
    <section className="py-16 sm:py-20 lg:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Gallery Images - Responsive Grid */}
        <div className="mb-12 grid gap-6 sm:grid-cols-2">
          <div className="overflow-hidden rounded-2xl shadow-xl">
            <img
              src="/images/working.jpg"
              alt="Gallery product"
              className="h-64 w-full object-cover sm:h-80"
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.style.display = "none";
                if (target.parentElement) {
                  target.parentElement.innerHTML =
                    '<div class="h-64 w-full bg-gradient-to-br from-leaf-green/20 to-sugarcane-yellow/20 flex items-center justify-center text-gray-500 sm:h-80">Add image 1</div>';
                }
              }}
            />
          </div>
          <div className="overflow-hidden rounded-2xl shadow-xl">
            <img
              src="/images/pastel2.jpg"
              alt="Gallery dough"
              className="h-64 w-full object-cover sm:h-80"
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.style.display = "none";
                if (target.parentElement) {
                  target.parentElement.innerHTML =
                    '<div class="h-64 w-full bg-gradient-to-br from-leaf-green/20 to-sugarcane-yellow/20 flex items-center justify-center text-gray-500 sm:h-80">Add image 2</div>';
                }
              }}
            />
          </div>
        </div>

        {/* Supporting Text Box */}
        <div className="rounded-3xl bg-white p-8 shadow-lg sm:p-10 lg:p-12">
          <p className="text-lg leading-relaxed text-gray-700 sm:text-xl">
            Experience the vibrant atmosphere of our food stall at markets and events
            across the UK. From corporate gatherings to festival crowds, we bring
            authentic Brazilian street food wherever we go. Our freshly made pastéis
            and refreshing sugarcane juice create memorable moments for every customer.
          </p>
        </div>
      </div>
    </section>
  );
}
