// pages/api/comments.js
import { getComments, addComment } from '../../lib/db';

export default async function handler(req, res) {
  if (req.method === 'GET') {
    try {
      const comments = await getComments(); // ✅ pakai await
      return res.status(200).json(comments);
    } catch (err) {
      console.error('Error reading comments:', err);
      return res.status(500).json({ error: 'Failed to load comments.' });
    }
  }

  if (req.method === 'POST') {
    const { name, message } = req.body;

    if (!name || !message) {
      return res.status(400).json({ error: 'Name and message are required.' });
    }

    const newComment = {
      id: Date.now(),
      name,
      message,
      createdAt: new Date().toISOString(),
    };

    try {
      await addComment(newComment); // ✅ pakai await
      return res.status(201).json(newComment);
    } catch (err) {
      console.error('Error saving comment:', err);
      return res.status(500).json({ error: 'Failed to save comment.' });
    }
  }

  return res.status(405).json({ error: 'Method not allowed' });
}
