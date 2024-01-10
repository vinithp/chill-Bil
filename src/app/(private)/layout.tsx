"use client";

import PrivateHeader from "@/components/header/PrivateHeader";
import BasicList from "@/components/sidebar/SideBar";
import { Box, Grid } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { useRouter } from "next/navigation";
import { hasCookie } from "cookies-next";

export default function PrivateLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isMenu, setMenu] = useState(false);
  function getMenu(): void {
    setMenu(!isMenu);
  }
  const route = useRouter();

  useEffect(() => {
    if (hasCookie("userName")) {
      route.push("/prices");
    } else {
      route.push("/login");
    }
  }, []);
  return (
    <>
      <PrivateHeader handleClick={getMenu} />
      <Grid container spacing={2} justifyContent="center">
        <Grid item xs={12} sm={3}>
          <Box
            sx={{
              top: "55px",
              position: isMenu ? "sticky" : { xs: "block", sm: "sticky" },
              display: isMenu ? "block" : { xs: "none", sm: "block" },
            }}
          >
            <BasicList handleClick2={getMenu} />
          </Box>
        </Grid>
        <Grid item sx={{ marginTop: 2 }} xs={11} sm={9}>
          {children}
        </Grid>
      </Grid>
    </>
  );
}
