import { AppBar, Toolbar, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import Link from "next/link";
import RestaurantIcon from "@mui/icons-material/Restaurant";

type Props = {
  children: React.ReactNode;
};

export default function Layout({ children }: Props) {
  return (
    <div className="layout">
      <header>
        <AppBar position="static" component="nav" elevation={0}>
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
