import React, { useState } from 'react';
import { useRouter } from 'next/router';
import styled from "@emotion/styled";


const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
`;

const Heading = styled.h1`
  font-size: 24px;
  margin-bottom: 20px;
`;

const InputField = styled.input`
  width: 50%;
  padding: 10px;
  margin-bottom: 20px;
`;

const TextArea = styled.textarea`
  width: 50%;
  height: 200px;
  padding: 10px;
  margin-bottom: 20px;
`;

const SaveButton = styled.button`
  background-color: #2a72a6; /* Use the slightly darker variant color */
  color: #fff;
  padding: 10px 20px;
  border: none;
  cursor: pointer;
  border-radius: 5px; /* Add rounded corners */
  transition: background-color 0.3s; /* Add a smooth color transition */

  &:hover {
    background-color: #1a4665; /* Darker color on hover */
  }
`;

const Compose = () => {
  const router = useRouter();
  const [title, setTitle] = useState('');
  const [markdown, setMarkdown] = useState('');

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };

  const handleMarkdownChange = (e) => {
    setMarkdown(e.target.value);
  };

  const handleSave = async () => {
    try {
      const response = await fetch('/api/compose', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ title, markdown }),
      });

      if (response.ok) {
        // Post was successfully created
        console.log('Post created successfully');

        // Redirect to the home page
        router.push('/');
      } else {
        // Handle error if needed
        console.error('Error creating post');
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Container>
      <Heading>Compose a New Blog Post</Heading> 
      <InputField
        type="text"
        placeholder="Title"
        value={title}
        onChange={handleTitleChange}
      />
      <TextArea
        placeholder="Markdown Content"
        value={markdown}
        onChange={handleMarkdownChange}
      />
      <SaveButton onClick={handleSave}>Save</SaveButton>
    </Container>
  );
};

export default Compose;
