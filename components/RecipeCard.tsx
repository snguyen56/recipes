import {
  Card,
  CardActions,
  CardContent,
  Button,
  CardMedia,
  Typography,
} from "@mui/material";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import Link from "next/link";
import Image from "next/image";

type Props = {
  recipe: any;
};

export default function RecipeCard({ recipe }: Props) {
  const { name, image, slug, cookingTime } = recipe.fields;
  return (
    <Card>
      <CardMedia>
        <Link href={`/recipes/${slug}`}>
          <Image
            src={"https:" + image.fields.file.url}
            width="0"
            height="0"
            alt={name}
            sizes="100vw"
            style={{ objectFit: "contain", width: "100%", height: "100%" }}
          ></Image>
        </Link>
      </CardMedia>
      <CardContent>
        <Typography variant="h4" component="h2" gutterBottom>
          {name}
        </Typography>
        <Typography display="inline-flex" alignItems="center">
          <AccessTimeIcon /> &nbsp;
          {cookingTime} minutes
        </Typography>
      </CardContent>
      <CardActions>
        <Link href={`/recipes/${slug}`}>
          <Button>view recipe</Button>
        </Link>
      </CardActions>
    </Card>
  );
}
