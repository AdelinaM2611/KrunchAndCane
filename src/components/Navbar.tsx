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

const NAV_LINKS = [
  { to: "/?section=about", label: "About Us" },
  { to: "/?section=contact", label: "Contact Us" },
  { to: "/events", label: "Upcoming Events" },
  { to: "/login", label: "Login" },
] as const;

export function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleDrawerToggle = () => setMobileOpen((o) => !o);

  const drawer = (
    <Box sx={{ width: 280, pt: 2, pb: 2 }} role="presentation">
      <List disablePadding>
        {NAV_LINKS.map(({ to, label }) => (
          <ListItem key={to} disablePadding>
            <ListItemButton
              component={Link}
              to={to}
              onClick={handleDrawerToggle}
              sx={{ py: 1.5, color: "text.primary" }}
            >
              {label}
            </ListItemButton>
          </ListItem>
        ))}
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
              {NAV_LINKS.map(({ to, label }) => (
                <Button key={to} component={Link} to={to} color="inherit">
                  {label}
                </Button>
              ))}
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
