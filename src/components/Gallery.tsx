/** Gallery section on home: product/food images and short captions. */
import { Box, Card, CardContent, Container, Stack, Typography } from "@mui/material";

export function Gallery() {
  return (
    <Box component="section" sx={{ py: { xs: 8, md: 11 } }}>
      <Container>
        <Stack direction={{ xs: "column", sm: "row" }} spacing={3} sx={{ mb: 6 }}>
          <Box
            component="img"
            src="/images/working.jpg"
            alt="Gallery product"
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
            src="/images/pastel2.jpg"
            alt="Gallery dough"
            sx={{
              width: "100%",
              height: { xs: 260, sm: 320 },
              objectFit: "cover",
              borderRadius: 3,
              boxShadow: 4,
            }}
          />
        </Stack>

        <Card elevation={6} sx={{ borderRadius: 4 }}>
          <CardContent sx={{ p: { xs: 3, md: 5 } }}>
            <Typography variant="body1" sx={{ color: "text.secondary", lineHeight: 1.8 }}>
              Experience the vibrant atmosphere of our food stall at markets and events across the
              UK. From corporate gatherings to festival crowds, we bring authentic Brazilian street
              food wherever we go. Our freshly made pastéis and refreshing sugarcane juice create
              memorable moments for every customer.
            </Typography>
          </CardContent>
        </Card>
      </Container>
    </Box>
  );
}
