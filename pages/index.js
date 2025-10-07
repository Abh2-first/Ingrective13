import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <main className="max-w-4xl mx-auto text-center py-20">
        <h1 className="text-4xl font-bold mb-6 text-brand-700">
          Welcome to Ingrective 👋
        </h1>
        <p className="text-lg text-gray-600 mb-10">
          Scan, understand, and eat smart — discover how ingredients match your health.
        </p>
        <a
          href="/scan"
          className="bg-brand-500 text-white px-6 py-3 rounded-lg font-semibold hover:bg-brand-700"
        >
          Start Scanning
        </a>
      </main>
      <Footer />
    </>
  );
}
