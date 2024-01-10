"use client";

import Header from "@/components/header/Header";
import { Grid } from "@mui/material";
import { My_Soul } from "next/font/google";

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Header />
      <Grid container sx={{ my: 20 }}>
        <Grid item xs={12}>
          {children}
        </Grid>
      </Grid>
    </>
  );
}
