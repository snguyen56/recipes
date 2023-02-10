import Skeleton from "@mui/material/Skeleton";
import { Container, Stack } from "@mui/material";

export default function Loading() {
  return (
    <section>
      <Container>
        <Skeleton />
        <Skeleton variant="rectangular" height={300} />
        <Stack
          direction={{ xs: "column", lg: "row" }}
          gap={3}
          justifyContent="space-evenly"
          my={3}
        >
          <Skeleton
            variant="rectangular"
            sx={{ width: { xs: "100%", lg: "50%" } }}
            height={300}
          />
          <Skeleton
            variant="rectangular"
            sx={{ width: { xs: "100%", lg: "50%" } }}
            height={300}
          />
        </Stack>
      </Container>
    </section>
  );
}
