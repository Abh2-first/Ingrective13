import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function Scan() {
  return (
    <>
      <Navbar />
      <main className="max-w-5xl mx-auto py-16 px-4">
        <h2 className="text-3xl font-bold text-brand-700 mb-6 text-center">
          Scan Food Labels 🍎
        </h2>

        <div className="bg-white shadow-md rounded-xl p-8 text-center">
          <p className="text-gray-600 mb-6">
            Upload a picture of your food label to get instant health insights.
          </p>

          <input
            type="file"
            accept="image/*"
            className="block mx-auto mb-4"
          />

          <button className="bg-brand-500 hover:bg-brand-700 text-white px-6 py-3 rounded-lg font-semibold">
            Analyze Label
          </button>

          <div className="mt-8">
            <h3 className="text-xl font-semibold text-gray-800 mb-2">Results</h3>
            <p className="text-gray-500 italic">Results will appear here after scanning...</p>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
