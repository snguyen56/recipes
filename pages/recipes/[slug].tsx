import React from "react";
import { createClient } from "contentful";
import { Box, Container, Typography, Stack } from "@mui/material";
import Image from "next/image";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import { GetStaticProps, GetStaticPaths } from "next";
import Head from "next/head";

type Props = {};

const client = createClient({
  space: process.env.CONTENTFUL_SPACE_ID as string,
  accessToken: process.env.CONTENTFUL_ACCESS_TOKEN ?? "",
});

export const getStaticPaths: GetStaticPaths = async () => {
  const res = await client.getEntries({ content_type: "recipe" });

  const paths = res.items.map((item: any) => {
    return { params: { slug: item.fields.slug } };
  });

  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = async ({ params }: any) => {
  const { items } = await client.getEntries({
    content_type: "recipe",
    "fields.slug": params.slug,
  });

  return {
    props: { recipe: items[0] },
  };
};

export default function Recipe({ recipe }: any) {
  const { name, image, cookingTime, ingredients, instructions } = recipe.fields;

  console.log(recipe);
  return (
    <article>
      <Head>
        <title>{name}</title>
      </Head>
      <Typography variant="h2" component="h1" textAlign="center" my={5}>
        {name}
      </Typography>
      <Container>
        <Box width="100%" height="300px" position="relative" textAlign="center">
          <Image
            src={"https:" + image.fields.file.url}
            fill
            alt={name}
            style={{
              objectFit: "cover",
              aspectRatio: 16 / 9,
              objectPosition: "70% 20%",
            }}
          ></Image>
        </Box>
        <Stack
          direction={{ xs: "column", lg: "row" }}
          gap={3}
          justifyContent="space-evenly"
          my={5}
        >
          <Box sx={{ maxWidth: { xs: "100%", lg: "50%" } }}>
            <Typography variant="h4" component="h2">
              Cooking Time:
            </Typography>
            <Typography variant="body1" pl={3} my={2} gutterBottom>
              {cookingTime} Minutes
            </Typography>
            <Typography variant="h4" component="h2">
              Ingredients:
            </Typography>
            <Typography variant="body1" component="div" my={2}>
              {documentToReactComponents(ingredients)}
            </Typography>
          </Box>
          <Box sx={{ maxWidth: { xs: "100%", lg: "50%" } }}>
            <Typography variant="h4" component="h2">
              Instructions:
            </Typography>
            <Typography variant="body1" component="div">
              {documentToReactComponents(instructions)}
            </Typography>
          </Box>
        </Stack>
      </Container>
    </article>
  );
}
