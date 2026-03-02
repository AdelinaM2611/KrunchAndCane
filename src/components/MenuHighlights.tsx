/** Static menu highlights (pastels, juice, etc.) for marketing. */
type MenuItem = { name: string; description: string; price: string };

const MENU: MenuItem[] = [
  { name: "Pastel (Beef)", description: "Crispy pastry with seasoned beef", price: "£5.50" },
  { name: "Pastel (Cheese)", description: "Classic melty cheese filling", price: "£4.50" },
  { name: "Sugarcane Juice", description: "Fresh pressed cane juice", price: "£3.50" },
];

export function MenuHighlights() {
  return (
    <section className="py-8 sm:py-12">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <h2 className="mb-8 text-center">Menu Highlights</h2>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {MENU.map((item) => (
            <div
              key={item.name}
              className="group relative rounded-2xl border border-green-200 bg-white p-6 shadow-md transition-all hover:scale-105 hover:shadow-xl"
            >
              {/* Price badge */}
              <div className="absolute right-4 top-4 rounded-full bg-gradient-to-r from-sugarcane-yellow to-orange-accent px-3 py-1 text-sm font-bold text-gray-900">
                {item.price}
              </div>
              
              <h3 className="mb-2 pr-16 text-xl font-bold text-leaf-green">
                {item.name}
              </h3>
              <p className="text-gray-600">{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
