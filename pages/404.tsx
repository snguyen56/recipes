import { Box, Button, Container } from "@mui/material";
import Link from "next/link";

export default function Custom404() {
  return (
    <Container component="section">
      <Box textAlign="center">
        <h1>404 - Page not found</h1>
        <p>Sorry, the page you were looking for was not found. </p>
        <Link href="/">
          <Button variant="contained" size="large">
            Go to Homepage
          </Button>
        </Link>
      </Box>
    </Container>
  );
}
