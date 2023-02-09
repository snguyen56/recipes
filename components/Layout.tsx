import { AppBar, Toolbar, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import Link from "next/link";

type Props = {
  children: React.ReactNode;
};

export default function Layout({ children }: Props) {
  return (
    <div className="layout">
      <header>
        <AppBar position="fixed" component="nav" elevation={0}>
          <Toolbar>
            <Link href="/">
              <Typography variant="h6" component="div">
                Recipes
              </Typography>
            </Link>
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
