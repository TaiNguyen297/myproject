import fs from 'fs'
import matter from "gray-matter";
import path from 'path';
import { DefaultSeo } from "next-seo";
import { SEO } from "@/configs/seo.config";
import { CardNews, HighlightNews } from "@/components/features/news";
import { CoverImageBrand } from "@/components/features/home/components/CoverImageBrand";
import { Box, Container, Grid, Stack, Typography } from "@mui/material";
import { SmallNews } from "@/components/features/news/components/SmallNews";

export default function Blog(props: { posts: any }) {
  console.log(props.posts.data)
  const { posts } = props
  return (
    <>
      <DefaultSeo {...SEO} title={"Danh sách bài viết"} />
      <Stack>
        <Box className="relative">
          {/* <img
        className="absolute top-1 left-1 w-12 h-12 object-cover z-10"
        src={logoImg.src}
        alt="banner"
      /> */}
          <CoverImageBrand />
        </Box>
        <Container maxWidth="xl">
          <Stack
            sx={{
              paddingTop: "40px",
              paddingBottom: "40px",
              gap: "30px",
            }}
          >

            <Grid container spacing={2}>
              {posts.map((post: any, index: any) => (
                <Grid item xs={12} md={6} lg={4} key={index}>
                  <CardNews key={index} post={post} />
                </Grid>
              ))}
            </Grid>
          </Stack>
        </Container>
      </Stack>

    </>
  );
}

export async function getStaticProps() {
  // Getting all our posts at build time

  // Get all the directories from the root directory
  const root = 'ai-lectures'; // replace with your root directory
  const dirs = fs.readdirSync(root).filter((file) => fs.statSync(path.join(root, file)).isDirectory());

  // Loop over each directory to get all the posts
const posts = dirs.flatMap((dir) => {
  // Get all the markdown files from the current directory
  const files = fs.readdirSync(path.join(root, dir)).filter(file => file.endsWith('.md'));

  // Loop over each post to extract the frontmatter which we need
  return files.map((file) => {
    // getting the slug here which we will need as a URL query parameter
    const slug = file.replace(".md", "");
    // Reading the contents of the file
    const filecontent = fs.readFileSync(path.join(root, dir, file), "utf-8");
    const parsedContent = matter(filecontent);
    //The parsed content contains data and content we only need the data which is the frontmatter
    const { data } = parsedContent
    return {
      slug,
      data,
    };
  });
});

  return {
    props: {
      posts
    }
  }
}