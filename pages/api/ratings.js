// pages/api/ratings.js
import { collection, getDocs, addDoc } from "firebase/firestore";
import { db } from "../../lib/firebase"; // Pastikan file ini export 'db' dengan benar

export default async function handler(req, res) {
  if (req.method === "GET") {
    try {
      const querySnapshot = await getDocs(collection(db, "ratings"));
      const ratingsData = querySnapshot.docs.map(doc => doc.data().value);

      const total = ratingsData.length;
      const avg = total > 0
        ? (ratingsData.reduce((sum, value) => sum + value, 0) / total).toFixed(1)
        : 0;

      return res.status(200).json({ average: Number(avg), total });
    } catch (error) {
      console.error("Error fetching ratings:", error);
      return res.status(500).json({ error: "Failed to fetch ratings", details: error.message });
    }
  }

  if (req.method === "POST") {
    const { rating } = req.body;

    if (typeof rating !== "number" || rating < 1 || rating > 5) {
      return res.status(400).json({ error: "Rating must be a number between 1 and 5." });
    }

    try {
      await addDoc(collection(db, "ratings"), {
        value: rating,
        timestamp: new Date()
      });

      return res.status(201).json({ message: "Rating added successfully" });
    } catch (error) {
      console.error("Error adding rating:", error);
      return res.status(500).json({ error: "Failed to add rating", details: error.message });
    }
  }

  return res.status(405).json({ error: "Method not allowed" });
}
