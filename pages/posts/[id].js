import Layout from '../../components/layout';
import { getAllPostIds, getPostData } from '../../lib/posts';
import Head from 'next/head';
import Date from '../../components/date';
import utilStyles from '../../styles/utils.module.css';
import dynamic from "next/dynamic";
import Link from 'next/link';
const ThemeToggle = dynamic(() => import("../../components/ThemeToggle"), {
  ssr: false,
});
import styled from "@emotion/styled";
import { FaEdit } from 'react-icons/fa'; // Import the edit icon

const Container = styled.div`
  display: flex;
  justify-content: center;
  padding-top: 5vh;
`;

const TitleContainer = styled.div`
  display: flex;
  align-items: center;
`;

const Title = styled.h1`
  font-size: 24px;
  margin-right: 10px; // Add spacing between title and Edit button
`;

const EditButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  font-size: 20px;
  margin-right: 50px;
`;
export default function Post({ postData }) {
  return (
    <Layout>
      <Head>
        <title>{postData.title}</title>
      </Head>
      <ThemeToggle/>
      <article>
      <TitleContainer>
      <h1 className={utilStyles.headingXl}>{postData.title}</h1>
        <Link href={`/posts/edit/${postData.id}`}>
              <EditButton>
                <FaEdit /> {/* Render the edit icon */}
              </EditButton>
          </Link>
        </TitleContainer>
        <div className={utilStyles.lightText}>
          <Date dateString={postData.date} />
        </div>
        <div dangerouslySetInnerHTML={{ __html: postData.contentHtml }} />
      </article>
    </Layout>
  )
}

export async function getStaticPaths() {
  const paths = getAllPostIds()
  return {
    paths,
    fallback: false
  }
}

export async function getStaticProps({ params }) {
  const postData = await getPostData(params.id)
  return {
    props: {
      postData
    }
  }
}
