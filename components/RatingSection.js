import { useState, useEffect } from "react";

export default function RatingSection() {
  const [rating, setRating] = useState(0);
  const [hovered, setHovered] = useState(0);
  const [average, setAverage] = useState(0);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    fetchRating();
  }, []);

  const fetchRating = async () => {
    const res = await fetch('/api/ratings');
    const data = await res.json();
    setAverage(data.average);
    setTotal(data.total);
  };

  const submitRating = async (val) => {
    setRating(val);
    await fetch('/api/ratings', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ rating: val })
    });
    fetchRating();
  };

  return (
    <div className="text-white text-center mt-10">
      <h2 className="text-xl font-semibold mb-2">Rate This Website</h2>
      <div className="flex justify-center space-x-1 mb-2">
        {[1, 2, 3, 4, 5].map((star) => (
          <span
            key={star}
            onClick={() => submitRating(star)}
            onMouseEnter={() => setHovered(star)}
            onMouseLeave={() => setHovered(0)}
            className={`cursor-pointer text-2xl ${
              (hovered || rating) >= star ? "text-yellow-400" : "text-gray-500"
            }`}
          >
            ★
          </span>
        ))}
      </div>
      <p className="text-sm text-white/80">Rating: {average} (from {total} voters)</p>
    </div>
  );
}
