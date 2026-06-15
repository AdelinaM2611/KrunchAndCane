/** Contact section (id="contact") for scroll target; social and email links. */
import InstagramIcon from "@mui/icons-material/Instagram";
import {
  Box,
  Button,
  Container,
  IconButton,
  Stack,
  Typography,
} from "@mui/material";
import { TIKTOK_URL } from "../lib/constants";
import { TikTokIcon } from "./icons/TikTokIcon";

export function Contact() {
  return (
    <Box component="section" id="contact" sx={{ py: { xs: 8, md: 11 } }}>
      <Container>
        <Stack
          direction={{ xs: "column", sm: "row" }}
          spacing={{ xs: 1, sm: 6 }}
          sx={{ mb: { xs: 4, md: 6 } }}
        >
          <Typography variant="h2" sx={{ color: "primary.main", lineHeight: 1 }}>
            QUESTION?
          </Typography>
          <Typography variant="h2" sx={{ color: "primary.main", lineHeight: 1 }}>
            REACH OUT
          </Typography>
        </Stack>

        <Stack
          direction={{ xs: "column", md: "row" }}
          spacing={2}
          justifyContent="center"
          alignItems="center"
        >
          <Button
            href="mailto:Info@krunchandcane.co.uk"
            variant="contained"
            color="primary"
            size="large"
          >
            Info@krunchandcane.co.uk
          </Button>

          <Button
            href="tel:+447405903381"
            variant="outlined"
            color="primary"
            size="large"
          >
            +44 7405 903381
          </Button>

          <IconButton
            href="https://instagram.com/krunchandcane"
            target="_blank"
            rel="noopener noreferrer"
            color="secondary"
            aria-label="Instagram"
            sx={{
              border: "1px solid",
              borderColor: "secondary.main",
              width: 52,
              height: 52,
            }}
          >
            <InstagramIcon />
          </IconButton>

          <IconButton
            href={TIKTOK_URL}
            target="_blank"
            rel="noopener noreferrer"
            color="secondary"
            aria-label="TikTok"
            sx={{
              border: "1px solid",
              borderColor: "secondary.main",
              width: 52,
              height: 52,
            }}
          >
            <TikTokIcon />
          </IconButton>
        </Stack>
      </Container>
    </Box>
  );
}
