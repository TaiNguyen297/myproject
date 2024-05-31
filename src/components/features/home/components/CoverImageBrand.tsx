/* eslint-disable @next/next/no-img-element */
import { Box, Stack, Typography } from "@mui/material";
import "react-alice-carousel/lib/alice-carousel.css";
import React from "react";

import brandImages from "../../../../utils/data/json/teams/bannerListNew/banner-list-new.json";

const overlayStyle = {
  backgroundColor: "black",
  position: "absolute",
  top: 0,
  right: 0,
  zIndex: 101,
  transition: "opacity 0.3s",
};

type CoverImageBrandType = {
  team?: string;
};

export const CoverImageBrand: React.FC<CoverImageBrandType> = ({ team }) => {
  const imageUrl = brandImages[team as keyof typeof brandImages];

  return (
    <Box
      className="relative w-full h-[90vh]"
      position="relative"
    >
      <Box
        position="absolute"
        sx={{ top: 0, right: 0, zIndex: 100 }}
        component="img"
        width="100%"
        height="100%"
        src="https://thuthuatnhanh.com/wp-content/uploads/2023/06/hinh-nen-4k-cho-may-tinh.jpg"
      />
      <Stack
        width="100%"
        height="100%"
        justifyContent="center"
        alignItems="center"
        sx={{ ...overlayStyle, opacity: 0.7}}
      >
        <Typography sx={{ color: "#e4e6eb", fontSize: "50px", fontWeight: "700" }}>
          DANH SÁCH BÀI VIẾT {" "}
        </Typography>
      </Stack>
    </Box>
  );
};
