export function Contact() {
  return (
    <section className="py-16 sm:py-20 lg:py-24" id="contact">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Headings Layout */}
        <div className="mb-12 grid gap-8 sm:grid-cols-2 lg:mb-16">
          <h2 className="text-5xl font-bold leading-tight text-leaf-green sm:text-6xl lg:text-7xl">
            QUESTION?
          </h2>
          <h2 className="text-5xl font-bold leading-tight text-leaf-green sm:text-6xl lg:text-7xl">
            REACH OUT
          </h2>
        </div>

        {/* Contact Pills/Badges */}
        <div className="flex flex-col items-center gap-6 sm:flex-row sm:justify-center sm:gap-8">
          {/* Email Badge */}
          <a
            href="mailto:Info@krunchandcane.co.uk"
            className="rounded-full bg-leaf-green px-8 py-4 text-lg font-semibold text-white shadow-lg transition-all hover:scale-105 hover:bg-leaf-deep hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-leaf-green focus:ring-offset-2"
          >
            Info@krunchandcane.co.uk
          </a>

          {/* Phone Badge */}
          <a
            href="tel:+447405903381"
            className="rounded-full border-2 border-dashed border-leaf-green bg-cream px-8 py-4 text-lg font-semibold text-leaf-green transition-all hover:scale-105 hover:bg-leaf-green hover:text-white focus:outline-none focus:ring-2 focus:ring-leaf-green focus:ring-offset-2"
          >
            +44 7405 903381
          </a>

          {/* Instagram Icon */}
          <a
            href="https://instagram.com/krunchandcane"
            target="_blank"
            rel="noopener noreferrer"
            className="flex h-14 w-14 items-center justify-center rounded-full border-2 border-dashed border-pink-400 bg-pink-100 text-pink-600 transition-all hover:scale-110 hover:bg-pink-200 focus:outline-none focus:ring-2 focus:ring-pink-400 focus:ring-offset-2"
            aria-label="Instagram"
          >
            <svg
              className="h-6 w-6"
              fill="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.23 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
}
