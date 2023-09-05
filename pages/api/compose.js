// pages/api/compose.js
import fs from 'fs-extra';
import matter from 'gray-matter';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { title, markdown } = req.body;

    // Generate a unique filename based on the current timestamp
    const filename = `${Date.now()}.md`;

    // Construct the Markdown content with frontmatter
    const markdownWithFrontmatter = matter.stringify(markdown, {
      title,
      date: new Date().toISOString(),
    });

    // Save the Markdown content to the 'posts' folder on the server
    await fs.writeFile(`./posts/${filename}`, markdownWithFrontmatter);

    res.status(200).json({ message: 'Post created successfully' });
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}
