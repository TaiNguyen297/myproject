/* eslint-disable @next/next/no-img-element */

import { imageAbsolute, imageRelative } from "@/styles/commonStyles";
import { ellipsisText } from "@/utils/common";
import { Box, Grid, Stack, Typography } from "@mui/material";
import Link from "next/link";
import logoImg from "../../../../../public/ktcb-logo-512.png";

export const SmallNews = ({ post }: { post: any }) => {
  console.log(post);
  return (
    <Grid container spacing={1}>
      <Grid item xs={4}>
        <Link
          href={`blog/${post.slug}`}
          style={{
            ...imageRelative,

            background: "#f4f4f4",
            paddingBottom: "60%",
            borderRadius: "10px",
          }}
        >
          <Box
            component="img"
            alt="banner_url"
            sizes="100vw"
            sx={{
              ...imageAbsolute,

              left: "50%",
              transform: "translateX(-50%)",
            }}
          />
        </Link>
      </Grid>
      <Grid item xs={8}>
        <Stack>
          <Link href={`blog/${post.slug}`}>
            <Typography
              sx={{
                fontSize: "18px",
                fontWeight: 700,
                marginBottom: "4px",
                ...ellipsisText(),
              }}
            >
              {post.data.title}
            </Typography>
          </Link>

          <Typography
            sx={{
              fontSize: "18px",
              color: "#4f4f4f",
              textAlign: "justify",
              ...ellipsisText(4),
            }}
          >
            <Link href={`blog/${post.slug}`}>{post.data.author}</Link>
          </Typography>
        </Stack>
      </Grid>
    </Grid>
  );
};
