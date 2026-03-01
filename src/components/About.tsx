import { Box, Card, CardContent, Container, Stack, Typography } from "@mui/material";

export function About() {
  return (
    <Box component="section" id="about" sx={{ py: { xs: 8, md: 11 } }}>
      <Container>
        <Box
          sx={{
            display: "grid",
            gap: 4,
            alignItems: "center",
            gridTemplateColumns: { xs: "1fr", md: "1fr 1.3fr" },
          }}
        >
          <Typography variant="h2" sx={{ color: "primary.dark" }}>
            How it started
          </Typography>

          <Card elevation={6} sx={{ borderRadius: 4 }}>
            <CardContent sx={{ p: { xs: 3, md: 5 } }}>
              <Typography variant="body1" sx={{ color: "text.secondary", lineHeight: 1.8 }}>
                Krunch &amp; Cane was born from a passion for authentic Brazilian street food and
                a desire to bring vibrant flavors to the UK. What started as a small market stall
                has grown into a beloved food experience, serving freshly fried pastéis and
                refreshing pressed sugarcane juice at markets, festivals, and private events across
                the country.
              </Typography>
              <Typography
                variant="body1"
                sx={{ color: "text.secondary", lineHeight: 1.8, mt: 3 }}
              >
                Our journey began with a simple mission: to share the authentic taste of Brazil's
                street food culture. Every pastel is made fresh to order, and our sugarcane juice
                is pressed daily, ensuring the highest quality and most authentic experience for our
                customers.
              </Typography>
            </CardContent>
          </Card>
        </Box>

        <Stack direction={{ xs: "column", sm: "row" }} spacing={3} sx={{ mt: 6 }}>
          <Box
            component="img"
            src="/images/products.jpg"
            alt="Pastel close up"
            sx={{
              width: "100%",
              height: { xs: 260, sm: 320 },
              objectFit: "cover",
              borderRadius: 3,
              boxShadow: 4,
            }}
          />
          <Box
            component="img"
            src="/images/dough.jpg"
            alt="Working with dough"
            sx={{
              width: "100%",
              height: { xs: 260, sm: 320 },
              objectFit: "cover",
              borderRadius: 3,
              boxShadow: 4,
            }}
          />
        </Stack>
      </Container>
    </Box>
  );
}