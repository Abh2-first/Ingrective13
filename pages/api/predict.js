export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Only POST requests allowed" });
  }

  try {
    const { image } = req.body;

    // Connect to your new Hugging Face Space
    const response = await fetch(
      "https://api-inference.huggingface.co/models/Gamger6/Ingrective",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${process.env.HUGGINGFACE_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ inputs: image }),
      }
    );

    const result = await response.json();
    res.status(200).json(result);
  } catch (error) {
    console.error("Error calling Hugging Face API:", error);
    res.status(500).json({ error: "Failed to analyze image." });
  }
}
