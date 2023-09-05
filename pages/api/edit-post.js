import fs from 'fs';
import path from 'path';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { id, content } = req.body;

    try {
      // Find the file path for the post based on the 'id'
      const postFilePath = path.join(process.cwd(), 'posts', `${id}.md`);

      // Read the existing content
      const existingContent = await fs.promises.readFile(postFilePath, 'utf-8');
      const [frontMatter, existingBody] = existingContent.split('---\n');

      // Update only the content, keeping the title and date unchanged
      const updatedContent = `${frontMatter}---\n\n${content}`;

      // Write the updated content to the Markdown file
      await fs.promises.writeFile(postFilePath, updatedContent, 'utf-8');

      // Respond with a success message
      res.status(200).json({ message: 'Post content updated successfully' });
    } catch (error) {
      console.error('Error updating post content:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  } else {
    // Handle other HTTP methods if needed
    res.status(405).end();
  }
}
