import fs from "fs";
import matter from "gray-matter";
import md from "markdown-it";
import path from "path";
import { Box, Container, Stack } from "@mui/material";
import { SlideNews } from "@/components/features/news/components/SlideNews";
import {
  getNewsBySlug,
  getNewsByTags,
  getOtherNewWithoutTags,
} from "@/utils/common";
import { format } from "date-fns";
const innerHtmlStyle = {
  textAlign: "justify",
  fontSize: "20px",

  "& .image-wrapper": {
    background: "#ffffff",
    position: "relative",

    marginTop: "20px",
    marginBottom: "20px",
    maxWidth: "700px",
    width: "100%",
    maxHeight: "675px",
    height: "auto",
    marginLeft: "auto",
    marginRight: "auto",

    "& .logo": {
      position: "absolute",
      top: "10px",
      left: "10px",
      width: "50px",
      height: "50px"
    },
  },

  "& ul": {
    listStyleType: "disc",
    listStylePosition: "inside",

    display: "block",
    marginBlockStart: "0.5em",
    marginBlockEnd: "0.5em",
    marginInlineStart: "0px",
    marginInlineEnd: "0px",
    paddingInlineStart: "40px",
    margin: 0,
    marginBottom: "8px",
  },
  "& ol": {
    listStyleType: "decimal",
    listStylePosition: "inside",

    display: "block",
    marginBlockStart: "1em",
    marginBlockEnd: "1em",
    marginInlineStart: "0px",
    marginInlineEnd: "0px",
    paddingInlineStart: "40px",
  },
  "& ul ul, ol ul": {
    listStyleType: "circle",
    listStylePosition: "inside",
    marginLeft: "15px",
  },
  "& ol ol, ul ol": {
    listStyleType: "lower-latin",
    listStylePosition: "inside",
    marginLeft: "15px",
  },
  "& h2, h3, h4, blockquote": {
    fontWeight: "bold",
    fontSize: "1.3em",
    marginTop: "20px",
    marginBottom: "10px",
  },
  "& p": {
    marginTop: "15px"
  },
  "& em": {
    fontStyle: "italic",
  },
};

export default function Blog({ frontmatter, content }: { frontmatter: any, content: any }) {

  console.log(frontmatter);
  console.log(content);
  const slideNewsData = getOtherNewWithoutTags(frontmatter.tags);

  return (
    <div className="w-100">
      <Container maxWidth="xl">
        <section className="news lg:pt-4 pt-4 mb-5">
          <div className="flex flex-wrap">
            <div className="flex flex-col align-center justify-start gap-4 lg:ps-6 lg:pe-6 lg:w-3/4 pr-4 pl-4 w-full">
              <div className="flex justify-between items-center w-full">
                <span className="news-posted">
                  {frontmatter.date &&
                    format(new Date(frontmatter.date), "dd/MM/yyyy")}
                </span>
                <strong>{frontmatter.author}</strong>
              </div>
              <h1 className="news-title text-4xl">{frontmatter.title}</h1>
              {content ? (
                 <Box
                 id="content"
                 sx={innerHtmlStyle}
                 dangerouslySetInnerHTML={{
                   __html: md().render(content),
                 }}
               />
              ) : null}
            </div>
          </div>
        </section>
      </Container>
    </div>
  );
}

export async function getStaticPaths() {
  // Get all the directories from the root directory
  const root = 'ai-lectures'; // replace with your root directory
  const dirs = fs.readdirSync(root).filter((file) => fs.statSync(path.join(root, file)).isDirectory());

  // Loop over each directory to get all the paths
  const paths = dirs.flatMap((dir) => {
    // Get all the files from the current directory
    const files = fs.readdirSync(path.join(root, dir));

    // Map each file to a path
    return files.map((file) => ({
      params: {
        id: file.replace(".md", ""),
      },
    }));
  });

  console.log("paths", paths)
  return {
    paths,
    fallback: false
  }
}

export async function getStaticProps({ params: { id } }: { params: { id: string } }) {
  // Get all the directories from the root directory
  const root = 'ai-lectures'; // replace with your root directory
  const dirs = fs.readdirSync(root).filter((file) => fs.statSync(path.join(root, file)).isDirectory());

  // Find the directory that contains the file
  const dir = dirs.find((dir) => fs.existsSync(path.join(root, dir, `${id}.md`)));

  // Read the file from the directory if dir is not undefined
  const fileName = dir ? fs.readFileSync(path.join(root, dir, `${id}.md`), "utf-8") : '';
  const { data: frontmatter, content } = matter(fileName);
  return {
    props: {
      frontmatter,
      content,
    },
  };
}