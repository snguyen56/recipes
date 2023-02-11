import { AppBar, Toolbar, Typography, Switch } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import Link from "next/link";
import RestaurantIcon from "@mui/icons-material/Restaurant";
import LightModeIcon from "@mui/icons-material/LightMode";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import { useThemeContext } from "@/context/ThemeContext";
type Props = {
  children: React.ReactNode;
};

export default function Layout({ children }: Props) {
  const { toggleTheme } = useThemeContext();
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
            <LightModeIcon />
            <Switch onChange={toggleTheme} color="default" />
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
