// lib/ratingDb.js
import fs from 'fs/promises';
import path from 'path';

const filePath = path.join(process.cwd(), 'data', 'ratings.json');

export async function getRatings() {
  try {
    const data = await fs.readFile(filePath, 'utf-8');
    return JSON.parse(data);
  } catch {
    return [];
  }
}

export async function addRating(rating) {
  const ratings = await getRatings();
  ratings.push(rating);
  await fs.writeFile(filePath, JSON.stringify(ratings, null, 2), 'utf-8');
}
