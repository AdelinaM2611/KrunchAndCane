export function Hero() {
  return (
    <section className="py-12 sm:py-16 lg:py-20">
  <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
    
    {/* Top: Text + Logo */}
    <div className="grid gap-8 lg:grid-cols-2 lg:items-center lg:gap-12">
      
      <div>
        <img
          src="/images/logo3.png"
          alt="Krunch & Cane"
          className="w-full max-w-2xl h-auto"
        />

        <p className="mt-4 text-xl text-gray-700 sm:text-2xl">
          Freshly fried Brazilian pastéis & pressed sugarcane juice
        </p>
      </div>

      <div className="flex justify-center">
        {/* You can keep logo here or remove duplicate */}
      </div>

    </div>
  </div>

  {/* FULL WIDTH HERO IMAGE */}
  <div className="mt-12 w-full">
    <div className="relative w-full overflow-hidden"> { /*/h-[1150px]*/}
      <picture>
        {/* Mobile (portrait) */}
      <source media="(max-width: 768px)" srcSet="/images/hero-mobile.jpg" />
      {/* Desktop (landscape) */}
      <img
        src="/images/hero.jpg"
        alt="Krunch & Cane Pastel"
        className="w-full object-cover object-[center_20%] h-[70vh] sm:h-[80vh] lg:h-[1150px]"
      />
      </picture>
    </div>
  </div>
</section>
  ) }