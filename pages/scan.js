import { useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function Scan() {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState("");

  const handleUpload = async (e) => {
    const selected = e.target.files[0];
    setFile(selected);
    setResult(null);
    setError("");
  };

  const handleAnalyze = async () => {
    if (!file) {
      setError("Please choose an image first.");
      return;
    }

    try {
      setLoading(true);
      setError("");

      // prepare image as base64
      const base64 = await toBase64(file);

      const response = await fetch(
        "https://Tigerabhay-Ingrective5.hf.space/run/predict",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ data: [base64] }),
        }
      );

      const data = await response.json();
      setResult(data?.data ? data.data[0] : "No readable output.");
    } catch (err) {
      setError("Something went wrong while analyzing the image.");
    } finally {
      setLoading(false);
    }
  };

  const toBase64 = (file) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });

  return (
    <>
      <Navbar />
      <main className="max-w-5xl mx-auto py-16 px-4">
        <h2 className="text-3xl font-bold text-brand-700 mb-6 text-center">
          Scan Food Labels 🍎
        </h2>

        <div className="bg-white shadow-md rounded-xl p-8 text-center">
          <p className="text-gray-600 mb-6">
            Upload a food-label image to get instant ingredient analysis.
          </p>

          <input
            type="file"
            accept="image/*"
            onChange={handleUpload}
            className="block mx-auto mb-4"
          />

          <button
            onClick={handleAnalyze}
            disabled={loading}
            className="bg-brand-500 hover:bg-brand-700 text-white px-6 py-3 rounded-lg font-semibold disabled:opacity-60"
          >
            {loading ? "Analyzing..." : "Analyze Label"}
          </button>

          {error && (
            <p className="text-red-500 mt-4 font-medium">{error}</p>
          )}

          {result && (
            <div className="mt-8 text-left bg-brand-100 p-6 rounded-xl">
              <h3 className="text-xl font-semibold mb-3 text-brand-700">
                🧾 Analysis Result
              </h3>
              <pre className="text-sm text-gray-800 whitespace-pre-wrap">
                {typeof result === "string" ? result : JSON.stringify(result, null, 2)}
              </pre>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}

