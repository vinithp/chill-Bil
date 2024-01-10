"use client";

import {
  AppBar,
  Box,
  Button,
  IconButton,
  Toolbar,
  Typography,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import AdbIcon from "@mui/icons-material/Adb";
import React, { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { deleteCookie } from "cookies-next";

interface ButtonProps {
  handleClick: () => void;
}

export default function PrivateHeader(props: ButtonProps) {
  const route = useRouter();
  const onLogout = async () => {
    // await axios.get("/api/logout");
    deleteCookie("userName");
    route.push("/login");
  };
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="fixed">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
            onClick={props.handleClick}
          >
            <MenuIcon sx={{ display: { xs: "block", sm: "none" } }} />
            <AdbIcon sx={{ display: { xs: "none", sm: "block" } }} />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            chill-Bil
          </Typography>
          <Button color="inherit" onClick={onLogout}>
            Login
          </Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
