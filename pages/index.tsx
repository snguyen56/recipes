import Head from "next/head";
import Layout from "@/components/Layout";
import { Container, Typography, Grid, TextField } from "@mui/material";
import { createClient } from "contentful";
import { GetStaticProps } from "next";
import RecipeCard from "@/components/RecipeCard";
import SearchIcon from "@mui/icons-material/Search";
import InputAdornment from "@mui/material/InputAdornment";
import { useState } from "react";

export const getStaticProps: GetStaticProps = async () => {
  const client = createClient({
    space: process.env.CONTENTFUL_SPACE_ID as string,
    accessToken: process.env.CONTENTFUL_ACCESS_TOKEN ?? "",
  });

  const res = await client.getEntries({ content_type: "recipe" });

  return {
    props: {
      recipes: res.items,
    },
  };
};
export default function Home({ recipes }: any) {
  const [search, setSearch] = useState<string>("");
  console.log(recipes);

  return (
    <>
      <Head>
        <title>Recipes</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <section>
        <Container>
          <Typography
            variant="h2"
            component="h1"
            sx={{ textAlign: "center", my: 5 }}
          >
            Find your <span id="header">Perfect</span> Recipe!
          </Typography>
          <TextField
            fullWidth
            sx={{ mb: 3 }}
            placeholder="Search recipes"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              ),
            }}
            onChange={(event) => setSearch(event.target.value)}
          ></TextField>
          <Grid container spacing={3}>
            {recipes
              .filter((recipe: any) => {
                if (!search) return true;
                let name = recipe.fields.name.toLowerCase();
                return name.includes(search);
              })
              .map((recipe: any) => (
                <Grid key={recipe.sys.id} item lg={4}>
                  <RecipeCard recipe={recipe}></RecipeCard>
                </Grid>
              ))}
          </Grid>
        </Container>
      </section>
    </>
  );
}
