import Head from "next/head";
import { Container, Typography, Grid, TextField } from "@mui/material";
import { createClient } from "contentful";
import { GetStaticProps } from "next";
import RecipeCard from "@/components/RecipeCard";
import SearchIcon from "@mui/icons-material/Search";
import InputAdornment from "@mui/material/InputAdornment";
import { useEffect, useState } from "react";
import { useBlogContext } from "@/context/BlogContext";

export const getStaticProps: GetStaticProps = async () => {
  const client = createClient({
    space: process.env.CONTENTFUL_SPACE_ID as string,
    accessToken: process.env.CONTENTFUL_ACCESS_TOKEN ?? "",
  });

  const res = await client.getEntries({
    content_type: "recipe",
    order: "fields.name",
  });

  return {
    props: { recipes: res.items },
    revalidate: 1,
  };
};
export default function Home({ recipes }: any) {
  const [search, setSearch] = useState<string>("");
  // console.log(recipes);

  const names = recipes.map((recipe: any) => ({
    label: recipe.fields.name,
    slug: recipe.fields.slug,
  }));
  const { saveNames } = useBlogContext();

  useEffect(() => {
    saveNames(names);
  }, []);

  return (
    <>
      <Head>
        <title>Recipes</title>
        <meta name="description" content="Recipes by chef Stefan" />
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
          <Grid container spacing={3} pb={3}>
            {recipes
              .filter((recipe: any) => {
                if (!search) return true;
                let name = recipe.fields.name.toLowerCase();
                return name.includes(search.toLowerCase());
              })
              .map((recipe: any) => (
                <Grid key={recipe.sys.id} item xs={12} sm={6} lg={4}>
                  <RecipeCard recipe={recipe}></RecipeCard>
                </Grid>
              ))}
          </Grid>
        </Container>
      </section>
    </>
  );
}
