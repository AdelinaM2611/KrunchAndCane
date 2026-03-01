import KeyboardArrowDownRoundedIcon from "@mui/icons-material/KeyboardArrowDownRounded";
import { Box, Button, Container, Stack, Typography } from "@mui/material";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

export function Hero() {
  const scrollToAbout = () => {
    const aboutSection = document.getElementById("about");
    if (!aboutSection) return;

    const offset = 100;
    const top = aboutSection.getBoundingClientRect().top + window.scrollY - offset;
    window.scrollTo({ top, behavior: "smooth" });
  };

  return (
    <Box
      component="section"
      sx={{
        position: "relative",
        height: "calc(100vh - 72px)",
        minHeight: 0,
        display: "flex",
        flexDirection: "column",
        backgroundImage: {
          xs: "url('/images/hero-mobile.jpg')",
          md: "url('/images/hero.jpg')",
        },
        backgroundSize: "cover",
        backgroundPosition: { xs: "center", md: "center 35%" },
        overflow: "hidden",
      }}
    >
      <Box
        sx={{
          position: "absolute",
          inset: 0,
          backgroundColor: "rgba(0, 0, 0, 0.45)",
        }}
      />

      {/* Scrollable content area so CTA + arrow always visible below fold */}
      <Box
        sx={{
          position: "relative",
          zIndex: 1,
          flex: "1 1 auto",
          minHeight: 0,
          display: "flex",
          alignItems: "center",
          overflowY: "auto",
        }}
      >
        <Container sx={{ py: { xs: 3, md: 4 } }}>
          <Stack spacing={2.5} sx={{ maxWidth: 700 }}>
            <Box
              component="img"
              src="/images/logo3.png"
              alt="Krunch & Cane logo"
              sx={{
                width: "100%",
                maxWidth: { xs: 240, sm: 360, md: 460 },
                height: "auto",
              }}
            />

            <Typography variant="h5" sx={{ color: "rgba(255,255,255,0.94)", lineHeight: 1.4, fontSize: { xs: "1.1rem", sm: "1.25rem" } }}>
              Authentic Brazilian street-food energy, crafted for UK markets, festivals, and private
              events.
            </Typography>

            <Typography variant="body1" sx={{ color: "rgba(255,255,255,0.85)", maxWidth: 620, fontSize: { xs: "0.9rem", sm: "1rem" } }}>
              We serve hand-made pastéis and freshly pressed sugarcane juice with bold flavour,
              quick service, and a standout setup that keeps your guests coming back for more.
            </Typography>

            <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
              <Button component={Link} to="/events" variant="contained" size="large" color="primary">
                See Upcoming Events
              </Button>
              <Button onClick={scrollToAbout} variant="outlined" size="large" color="secondary">
                Learn Our Story
              </Button>
            </Stack>
          </Stack>
        </Container>
      </Box>

      {/* Arrow fixed at bottom of hero so always visible on load */}
      <Box
        component={motion.button}
        onClick={scrollToAbout}
        aria-label="Scroll to next section"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
        sx={{
          flexShrink: 0,
          position: "relative",
          zIndex: 2,
          border: "none",
          background: "transparent",
          color: "white",
          display: "grid",
          placeItems: "center",
          cursor: "pointer",
          opacity: 0.92,
          py: 1.5,
        }}
      >
        <KeyboardArrowDownRoundedIcon sx={{ fontSize: 44 }} />
      </Box>
    </Box>
  );
}