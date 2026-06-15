/**
 * Public navbar: About, Contact, Pre-order (SumUp), Find us. Mobile drawer + desktop buttons.
 */
import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import InstagramIcon from "@mui/icons-material/Instagram";
import MenuIcon from "@mui/icons-material/Menu";
import {
  AppBar,
  Box,
  Button,
  Container,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  Toolbar,
  Typography,
} from "@mui/material";
import { SUMUP_STORE_URL, TIKTOK_URL } from "../lib/constants";
import { TikTokIcon } from "./icons/TikTokIcon";

type NavLinkItem =
  | { type: "internal"; to: string; label: string }
  | { type: "external"; href: string; label: string };

const NAV_LINKS: NavLinkItem[] = [
  { type: "internal", to: "/?section=about", label: "About Us" },
  { type: "internal", to: "/?section=contact", label: "Contact Us" },
  { type: "external", href: SUMUP_STORE_URL, label: "Pre-order" },
  { type: "internal", to: "/find-us", label: "Find us" },
];

export function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleDrawerToggle = () => setMobileOpen((o) => !o);

  const drawer = (
    <Box sx={{ width: 280, pt: 2, pb: 2 }} role="presentation">
      <List disablePadding>
        {NAV_LINKS.map((item) =>
          item.type === "external" ? (
            <ListItem key={item.label} disablePadding>
              <ListItemButton
                component="a"
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
                onClick={handleDrawerToggle}
                sx={{ py: 1.5, color: "text.primary" }}
              >
                {item.label}
              </ListItemButton>
            </ListItem>
          ) : (
            <ListItem key={item.to} disablePadding>
              <ListItemButton
                component={Link}
                to={item.to}
                onClick={handleDrawerToggle}
                sx={{ py: 1.5, color: "text.primary" }}
              >
                {item.label}
              </ListItemButton>
            </ListItem>
          )
        )}
      </List>
      <Box sx={{ display: "flex", gap: 1, pl: 2, pt: 1 }}>
        <IconButton
          href="https://instagram.com/krunchandcane"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Instagram"
          color="primary"
        >
          <InstagramIcon />
        </IconButton>
        <IconButton
          href={TIKTOK_URL}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="TikTok"
          color="primary"
        >
          <TikTokIcon />
        </IconButton>
        <IconButton href="mailto:Info@krunchandcane.co.uk" aria-label="Email" color="primary">
          <EmailOutlinedIcon />
        </IconButton>
      </Box>
    </Box>
  );

  return (
    <>
      <AppBar
        position="sticky"
        elevation={1}
        color="default"
        sx={{ bgcolor: "rgba(255, 255, 255, 0.95)", backdropFilter: "blur(6px)" }}
      >
        <Container>
          <Toolbar disableGutters sx={{ justifyContent: "space-between", minHeight: 72 }}>
            <Typography
              component={NavLink}
              to="/"
              sx={{
                textDecoration: "none",
                color: "primary.main",
                fontSize: { xs: "1.35rem", md: "1.6rem" },
                fontWeight: 700,
              }}
            >
              Krunch &amp; Cane
            </Typography>

            <Box sx={{ display: { xs: "none", md: "flex" }, alignItems: "center", gap: 1.5 }}>
              {NAV_LINKS.map((item) =>
                item.type === "external" ? (
                  <Button
                    key={item.label}
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    color="inherit"
                  >
                    {item.label}
                  </Button>
                ) : (
                  <Button key={item.to} component={Link} to={item.to} color="inherit">
                    {item.label}
                  </Button>
                )
              )}
              <IconButton
                href="https://instagram.com/krunchandcane"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                color="primary"
                size="small"
              >
                <InstagramIcon fontSize="small" />
              </IconButton>
              <IconButton
                href={TIKTOK_URL}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="TikTok"
                color="primary"
                size="small"
              >
                <TikTokIcon fontSize="small" />
              </IconButton>
              <IconButton
                href="mailto:Info@krunchandcane.co.uk"
                aria-label="Email"
                color="primary"
                size="small"
              >
                <EmailOutlinedIcon fontSize="small" />
              </IconButton>
            </Box>

            <IconButton
              color="inherit"
              aria-label="Open menu"
              onClick={handleDrawerToggle}
              sx={{ display: { xs: "block", md: "none" }, color: "text.primary" }}
            >
              <MenuIcon />
            </IconButton>
          </Toolbar>
        </Container>
      </AppBar>

      <Drawer
        variant="temporary"
        anchor="right"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{ keepMounted: true }}
        sx={{
          display: { xs: "block", md: "none" },
          "& .MuiDrawer-paper": { boxSizing: "border-box", width: 280 },
        }}
      >
        {drawer}
      </Drawer>
    </>
  );
}
