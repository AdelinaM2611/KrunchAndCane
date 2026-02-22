export function Navbar() {
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const offset = 100; // Account for sticky header
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
  };

  return (
    <nav className="sticky top-0 z-50 bg-white shadow-sm">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        {/* Logo/Text */}
        <div className="text-2xl font-bold text-leaf-green">Krunch &amp; Cane</div>

        {/* Navigation Links */}
        <div className="flex items-center gap-8">
          <button
            onClick={() => scrollToSection("about")}
            className="text-lg font-medium text-gray-800 transition-colors hover:text-leaf-green"
          >
            About Us
          </button>
          <button
            onClick={() => scrollToSection("contact")}
            className="text-lg font-medium text-gray-800 transition-colors hover:text-leaf-green"
          >
            Contact Us
          </button>
        </div>
      </div>
    </nav>
  );
}

