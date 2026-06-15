/**
 * Branded /pre-order route: redirects visitors to the SumUp store.
 */
import { useEffect } from "react";
import { SUMUP_STORE_URL } from "../lib/constants";

export function PreOrderPage() {
  useEffect(() => {
    window.location.replace(SUMUP_STORE_URL);
  }, []);

  return (
    <main className="px-4 py-12 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-3xl text-center">
        <p className="text-lg text-gray-700 sm:text-xl">Redirecting to our pre-order store…</p>
      </div>
    </main>
  );
}
