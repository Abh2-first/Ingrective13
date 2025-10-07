export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Only POST requests allowed" });
  }

  try {
    // Forward the uploaded image directly to your Hugging Face Space
    const response = await fetch(
      "https://Tigerabhay-Ingrective5.hf.space/run/predict",
      {
        method: "POST",
        headers: req.headers,
        body: req, // stream file directly
      }
    );

    const result = await response.text();
    res.status(200).send(result);
  } catch (err) {
    console.error("Proxy error:", err);
    res.status(500).json({ error: "Failed to reach Hugging Face API" });
  }
}
