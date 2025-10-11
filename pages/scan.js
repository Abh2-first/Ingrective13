import React, { useState } from "react";

export default function ScanPage() {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState("");
  const [error, setError] = useState("");

  // Handle file selection
  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
    setResult("");
    setError("");
  };

  // Handle image analysis
  const handleAnalyze = async () => {
    if (!file) {
      setError("Please choose an image first!");
      return;
    }

    try {
      setLoading(true);
      setError("");
      setResult("");

      const reader = new FileReader();
      reader.onloadend = async () => {
        const base64 = reader.result.split(",")[1];

        const response = await fetch("/api/predict", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ image: base64 }),
        });

        if (!response.ok) {
          throw new Error("Failed to analyze image.");
        }

        const data = await response.json();
        setResult(JSON.stringify(data, null, 2));
      };

      reader.readAsDataURL(file);
    } catch (err) {
      console.error(err);
      setError("Something went wrong while analyzing.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 flex flex-col items-center justify-center p-6 text-white">
      <div className="max-w-xl w-full bg-white/10 backdrop-blur-lg rounded-2xl p-8 shadow-2xl">
        <h1 className="text-3xl font-extrabold text-center mb-6 text-yellow-300">
          🍽️ Ingrective Scanner
        </h1>

        <p className="text-center text-sm text-gray-200 mb-6">
          Upload the **backside of a product** to check ingredients and how they
          match your health preferences.
        </p>

        {/* File Input */}
        <div className="flex flex-col items-center mb-6">
          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="block w-full text-sm text-gray-300 bg-gray-800 border border-gray-700 rounded-lg cursor-pointer p-2"
          />
        </div>

        {/* Analyze Button */}
        <div className="flex justify-center">
          <button
            onClick={handleAnalyze}
            disabled={loading}
            className={`px-6 py-3 rounded-lg font-semibold transition-all duration-300 ${
              loading
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-yellow-400 hover:bg-yellow-500 text-gray-900"
            }`}
          >
            {loading ? "Analyzing..." : "🔍 Scan Product"}
          </button>
        </div>

        {/* Error Message */}
        {error && (
          <p className="text-red-400 text-center mt-4 font-medium">{error}</p>
        )}

        {/* Result Section */}
        {result && (
          <div className="mt-6 bg-gray-900/60 p-4 rounded-lg text-sm font-mono overflow-auto max-h-64">
            <h2 className="text-yellow-300 font-semibold mb-2">
              🧠 Analysis Result:
            </h2>
            <pre className="text-gray-200 whitespace-pre-wrap">{result}</pre>
          </div>
        )}
      </div>

      {/* Footer */}
      <footer className="mt-8 text-sm text-gray-200 opacity-80">
        Made with ❤️ by <span className="text-yellow-300">Team Ingrective</span>
      </footer>
    </div>
  );
}
