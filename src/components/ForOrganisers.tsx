/** "For Market Organisers" section: credentials and contact CTA. */
export function ForOrganisers() {
  return (
    <section className="py-8 sm:py-12">
      <div className="mx-auto max-w-4xl rounded-2xl bg-white p-8 shadow-lg sm:p-10 lg:p-12">
        <h2 className="mb-6">For Market Organisers</h2>
        <ul className="space-y-3 text-lg text-gray-700">
          <li className="flex items-start">
            <span className="mr-3 text-leaf-green">✓</span>
            <span>Registered food business (UK)</span>
          </li>
          <li className="flex items-start">
            <span className="mr-3 text-leaf-green">✓</span>
            <span>Public liability insured</span>
          </li>
          <li className="flex items-start">
            <span className="mr-3 text-leaf-green">✓</span>
            <span>Street food setup suitable for markets &amp; private events</span>
          </li>
          <li className="flex items-start">
            <span className="mr-3 text-leaf-green">✓</span>
            <span>Full allergen information available</span>
          </li>
        </ul>
      </div>
    </section>
  );
}
