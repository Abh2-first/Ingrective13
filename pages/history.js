import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function History() {
  return (
    <>
      <Navbar />
      <main className="max-w-5xl mx-auto py-16 px-4">
        <h2 className="text-3xl font-bold text-brand-700 mb-6 text-center">
          Scan History 📜
        </h2>
        <div className="bg-white shadow-md rounded-xl p-6">
          <p className="text-gray-600 text-center">
            Your scanned items will appear here once you start using Ingrective.
          </p>
        </div>
      </main>
      <Footer />
    </>
  );
}
