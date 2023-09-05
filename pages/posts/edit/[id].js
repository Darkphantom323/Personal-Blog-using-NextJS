import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Layout from '../../../components/layout';
import { getPostData, savePostContent } from '../../../lib/posts';
import Head from 'next/head';
import TurndownService from 'turndown';
import styled from "@emotion/styled"; 

// Create a new instance of TurndownService
const turndownService = new TurndownService();
const Container = styled.div` // Styled component for the container
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
`;

const Heading = styled.h1` // Styled component for the heading
  font-size: 24px;
  margin-bottom: 20px;
`;

const InputField = styled.input` // Styled component for the input field
  width: 400%;
  padding: 10px;
  margin-bottom: 20px;
`;

const TextArea = styled.textarea` // Styled component for the textarea
  width: 400%;
  height: 200px;
  padding: 10px;
  margin-bottom: 20px;
`;

const SaveButton = styled.button` // Styled component for the save button
  background-color: #2a72a6;
  color: #fff;
  padding: 10px 20px;
  border: none;
  cursor: pointer;
  border-radius: 5px;
  transition: background-color 0.3s;

  &:hover {
    background-color: #1a4665;
  }
`;

export default function EditPost({ postData }) {
  const router = useRouter();
  const { id } = router.query;
  const [title, setTitle] = useState(postData.title);
  const [content, setContent] = useState('');

  // Set the initial content to the existing content when the component mounts
  useEffect(() => {
    setContent(turndownService.turndown(postData.contentHtml));  
  }, []);

  const handleSave = async () => {
    try {
      // Construct the updated content with the existing title and date
      const updatedContent = 
      `title: ${title}
date: '${postData.date}'
---

${content}`;

      const response = await fetch(`/api/edit-post?id=${id}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id, content: updatedContent }),
      });

      if (response.ok) {
        // Post content was successfully updated
        console.log('Post content updated successfully');

        // Redirect back to the post page
        router.push(`/posts/${id}`);
      } else {
        // Handle error if needed
        console.error('Error updating post');
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Layout>
      <Head>
        <title>Edit Post - {title}</title>
      </Head>
      <Container>
        <Heading>Edit Blog Post</Heading>
        <InputField
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <TextArea
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
        <SaveButton onClick={handleSave}>Save</SaveButton>
      </Container>
    </Layout>
  );
}
export async function getServerSideProps({ params }) {
  const postData = await getPostData(params.id);

  return {
    props: {
      postData,
    },
  };
}
