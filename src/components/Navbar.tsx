/**
 * App navbar: public links (About, Contact, Events), Login or Dashboard + Log out when host token exists.
 * Mobile: drawer; desktop: buttons. Log out clears token and redirects to /login.
 */
import { useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
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
import { clearToken, getToken } from "../lib/auth";

const NAV_LINKS_PUBLIC = [
  { to: "/?section=about", label: "About Us" },
  { to: "/?section=contact", label: "Contact Us" },
  { to: "/events", label: "Upcoming Events" },
] as const;

export function Navbar() {
  const navigate = useNavigate();
  const [mobileOpen, setMobileOpen] = useState(false);
  const isHost = !!getToken();

  const handleDrawerToggle = () => setMobileOpen((o) => !o);
  /** Clear JWT and redirect to login. */
  const handleLogout = () => {
    clearToken();
    setMobileOpen(false);
    navigate("/login", { replace: true });
  };

  const navLinks = [
    ...NAV_LINKS_PUBLIC,
    ...(isHost
      ? [
          { to: "/host", label: "Dashboard" },
          { to: "", label: "Log out", isLogout: true },
        ]
      : [{ to: "/login", label: "Login" }]),
  ];

  const drawer = (
    <Box sx={{ width: 280, pt: 2, pb: 2 }} role="presentation">
      <List disablePadding>
        {navLinks.map((item) =>
          "isLogout" in item && item.isLogout ? (
            <ListItem key="logout" disablePadding>
              <ListItemButton onClick={handleLogout} sx={{ py: 1.5, color: "text.primary" }}>
                Log out
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

            {/* Desktop nav */}
            <Box sx={{ display: { xs: "none", md: "flex" }, alignItems: "center", gap: 1.5 }}>
              {navLinks.map((item) =>
                "isLogout" in item && item.isLogout ? (
                  <Button key="logout" onClick={handleLogout} color="inherit">
                    Log out
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
                href="mailto:Info@krunchandcane.co.uk"
                aria-label="Email"
                color="primary"
                size="small"
              >
                <EmailOutlinedIcon fontSize="small" />
              </IconButton>
            </Box>

            {/* Mobile hamburger */}
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
