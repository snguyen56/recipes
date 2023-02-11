import {
  AppBar,
  Toolbar,
  Typography,
  Switch,
  Autocomplete,
} from "@mui/material";
import { Box } from "@mui/system";
import Link from "next/link";
import RestaurantIcon from "@mui/icons-material/Restaurant";
import LightModeIcon from "@mui/icons-material/LightMode";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import SearchIcon from "@mui/icons-material/Search";
import { useThemeContext } from "@/context/ThemeContext";
import { styled } from "@mui/system";
import { useBlogContext } from "@/context/BlogContext";
import { useRouter } from "next/router";

type Props = {
  children: React.ReactNode;
};

const CustomTextField = styled("input")(({ theme }) => ({
  color: theme.palette.primary.contrastText,
  backgroundColor: theme.palette.primary.main,
  padding: theme.spacing(1),
  outline: "none",
  border: "none",
  borderBottom: "2px solid white",
  marginRight: 16,
  fontSize: "16px",
}));

// const data = ["Matcha Latte", "Milk Tea", "Rib Roast (Prime Rib)"];

export default function Layout({ children }: Props) {
  const router = useRouter();
  const { darkMode, toggleTheme } = useThemeContext();
  const { blogNames } = useBlogContext();

  return (
    <div className="layout">
      <header>
        <AppBar
          position="static"
          component="nav"
          elevation={0}
          enableColorOnDark
        >
          <Toolbar>
            <Box flexGrow={1}>
              <Link href="/">
                <Box display="inline-flex" alignItems="center">
                  <RestaurantIcon />
                  <Typography variant="h6" component="div">
                    &nbsp; Recipes
                  </Typography>
                </Box>
              </Link>
            </Box>
            <Box
              sx={{ display: { xs: "none", sm: "flex" } }}
              alignItems="center"
            >
              <SearchIcon />
              <Autocomplete
                options={blogNames}
                onChange={(event: any, newValue: any) => {
                  router.push("/recipes/" + newValue?.slug);
                }}
                renderInput={(params) => (
                  <div ref={params.InputProps.ref}>
                    <CustomTextField
                      {...params.inputProps}
                      placeholder="Search..."
                    />
                  </div>
                )}
              />
            </Box>
            <LightModeIcon />
            <Switch checked={darkMode} onChange={toggleTheme} color="default" />
            <DarkModeIcon />
          </Toolbar>
        </AppBar>
        <Toolbar />
      </header>
      <main>{children}</main>
      <footer>
        <p>Copyright 2023</p>
      </footer>
    </div>
  );
}
