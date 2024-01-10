import * as React from "react";
import Box from "@mui/material/Box";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import InboxIcon from "@mui/icons-material/Inbox";
import DraftsIcon from "@mui/icons-material/Drafts";
import Link from "next/link";
import { Divider } from "@mui/material";

interface ButtonProps {
  handleClick2: () => void;
}

export default function BasicList(props: ButtonProps) {
  return (
    <Box
      sx={{
        zIndex: 1,
        // position: "sticky",
        width: "100%",
      }}
    >
      <nav aria-label="main mailbox folders">
        <List>
          <ListItem
            component={(props) => (
              <Link style={{ color: "black" }} {...props} href="/prices" />
            )}
            onClick={props.handleClick2}
            disablePadding
          >
            <ListItemButton>
              <ListItemIcon>
                <InboxIcon />
              </ListItemIcon>
              <ListItemText primary="Pricing" />
            </ListItemButton>
          </ListItem>
          <ListItem
            component={(props) => (
              <Link style={{ color: "black" }} {...props} href="/config" />
            )}
            onClick={props.handleClick2}
            disablePadding
          >
            <ListItemButton>
              <ListItemIcon>
                <DraftsIcon />
              </ListItemIcon>
              <ListItemText primary="Config" />
            </ListItemButton>
          </ListItem>
          <ListItem
            component={(props) => (
              <Link style={{ color: "black" }} {...props} href="/calculate" />
            )}
            onClick={props.handleClick2}
            disablePadding
          >
            <ListItemButton>
              <ListItemIcon>
                <DraftsIcon />
              </ListItemIcon>
              <ListItemText primary="Calculate" />
            </ListItemButton>
          </ListItem>
        </List>
      </nav>
      <Divider light={false} />
    </Box>
  );
}
