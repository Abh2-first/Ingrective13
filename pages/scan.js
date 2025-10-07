import { useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function Scan() {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState("");

  const handleUpload = (e) => {
    setFile(e.target.files[0]);
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

  const getScoreColor = (score) => {
    if (score > 75) return "bg-green-500";
    if (score > 50) return "bg-yellow-400";
    if (score > 25) return "bg-orange-500";
    return "bg-red-500";
  };

  return (
    <>
      <Navbar />
      <main className="max-w-6xl mx-auto py-16 px-4">
        <h2 className="text-3xl font-bold text-brand-700 mb-6 text-center">
          Smart Food Label Scanner 🍎
        </h2>

        <div className="bg-white shadow-xl rounded-2xl p-8 text-center border border-gray-100">
          <p className="text-gray-600 mb-6">
            Upload your food label to get a simple breakdown of ingredients and health score.
          </p>

          <input
            type="file"
            accept="image/*"
            onChange={handleUpload}
            className="block mx-auto mb-4 border rounded-lg p-2"
          />

          <button
            onClick={handleAnalyze}
            disabled={loading}
            className="bg-brand-500 hover:bg-brand-700 text-white px-6 py-3 rounded-lg font-semibold disabled:opacity-60"
          >
            {loading ? "Analyzing..." : "Analyze Label"}
          </button>

          {error && <p className="text-red-500 mt-4">{error}</p>}

          {result && (
            <div className="mt-10 text-left bg-gradient-to-br from-blue-50 to-purple-100 p-8 rounded-2xl shadow-inner">
              <h3 className="text-2xl font-semibold mb-4 text-brand-700">🧾 Analysis Result</h3>

              {/* Example health score display */}
              <div className="mb-6">
                <p className="text-gray-800 font-medium mb-2">Overall Health Score</p>
                <div className="w-full bg-gray-200 rounded-full h-4">
                  <div
                    className={`${getScoreColor(68)} h-4 rounded-full`}
                    style={{ width: `68%` }}
                  ></div>
                </div>
                <p className="text-sm text-gray-500 mt-1">Example: 68 / 100 (Moderate)</p>
              </div>

              {/* Ingredient Breakdown */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
                <div className="p-4 bg-green-100 border-l-4 border-green-500 rounded-lg">
                  <h4 className="font-semibold text-green-700">✅ Healthy Ingredients</h4>
                  <ul className="list-disc ml-5 text-sm text-gray-700">
                    <li>Whole grains</li>
                    <li>Natural flavors</li>
                    <li>Vitamin B12</li>
                  </ul>
                </div>

                <div className="p-4 bg-yellow-100 border-l-4 border-yellow-500 rounded-lg">
                  <h4 className="font-semibold text-yellow-700">⚠️ Caution</h4>
                  <ul className="list-disc ml-5 text-sm text-gray-700">
                    <li>Added sugar (3%)</li>
                    <li>Sodium (150mg)</li>
                  </ul>
                </div>

                <div className="p-4 bg-red-100 border-l-4 border-red-500 rounded-lg">
                  <h4 className="font-semibold text-red-700">🚫 Harmful</h4>
                  <ul className="list-disc ml-5 text-sm text-gray-700">
                    <li>Artificial preservatives</li>
                    <li>High fructose syrup</li>
                  </ul>
                </div>
              </div>

              {/* Raw AI Output */}
              <div className="mt-10">
                <h4 className="font-semibold text-gray-700 mb-2">Raw AI Output</h4>
                <pre className="bg-white text-gray-800 p-4 rounded-lg text-sm overflow-x-auto">
                  {typeof result === "string" ? result : JSON.stringify(result, null, 2)}
                </pre>
              </div>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}
