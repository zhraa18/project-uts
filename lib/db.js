// lib/db.js
import fs from 'fs/promises';
import path from 'path';

const filePath = path.join(process.cwd(), 'data', 'comments.json');

export async function getComments() {
  try {
    const data = await fs.readFile(filePath, 'utf-8');
    return JSON.parse(data);
  } catch (error) {
    return []; // jika file belum ada
  }
}

export async function addComment(comment) {
  const comments = await getComments();
  comments.push(comment);
  await fs.writeFile(filePath, JSON.stringify(comments, null, 2), 'utf-8');
}
