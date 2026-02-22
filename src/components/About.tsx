export function About() {
  return (
    <section className="py-16 sm:py-20 lg:py-24" id="about">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Top 2-column section */}
        <div className="grid gap-8 lg:grid-cols-2 lg:items-center">
          
          {/* Left: Title */}
          <div>
            <h2 className="text-5xl font-bold leading-tight text-green-900 sm:text-6xl lg:text-7xl">
              How it started
            </h2>
          </div>

          {/* Right: Story */}
          <div className="rounded-3xl bg-white/90 p-8 shadow-lg sm:p-10 lg:p-12">
            <p className="text-lg leading-relaxed text-gray-700 sm:text-xl">
              Krunch &amp; Cane was born from a passion for authentic Brazilian street
              food and a desire to bring vibrant flavors to the UK. What started as a
              small market stall has grown into a beloved food experience, serving
              freshly fried pastéis and refreshing pressed sugarcane juice at markets,
              festivals, and private events across the country.
            </p>

            <p className="mt-6 text-lg leading-relaxed text-gray-700 sm:text-xl">
              Our journey began with a simple mission: to share the authentic taste of
              Brazil&apos;s street food culture. Every pastel is made fresh to order,
              and our sugarcane juice is pressed daily, ensuring the highest quality
              and most authentic experience for our customers.
            </p>
          </div>
        </div>

        {/* Images BELOW the 2-column layout */}
        <div className="mt-16 grid gap-6 sm:grid-cols-2">
          <div className="overflow-hidden rounded-2xl shadow-xl">
            <img
              src= "/images/products.jpg"//
              alt="Pastel close up"
              className="h-64 w-full object-cover sm:h-80"
            />
          </div>

          <div className="overflow-hidden rounded-2xl shadow-xl">
            <img
              src="/images/dough.jpg" //
              alt="Working"
              className="h-64 w-full object-cover sm:h-80"
            />
          </div>
        </div>

      </div>
    </section>
  );
}