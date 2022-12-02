import * as React from "react";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Link } from "react-router-dom";
import LandingAppBar from "./LandingAppBar";
import Footer from "../components/Footer";

const theme = createTheme();

export default function Home() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <LandingAppBar />
      <main>
        <Box
          sx={{
            bgcolor: "background.paper",
            pt: 8,
            pb: 6,
          }}
        >
          <Container maxWidth="sm">
            <Typography
              component="h1"
              variant="h2"
              align="center"
              color="text.primary"
              gutterBottom
            >
              Welcome to B2ST
            </Typography>
            <Typography
              variant="h5"
              align="center"
              color="text.secondary"
              paragraph
            >
              We are a SMS Marketing B2B company. Our Machine Learning
              algorithms and seamless integratino give us a competitive
              advantage over our competitors.
            </Typography>

            <Typography
              variant="h5"
              align="center"
              color="primary"
              paragraph
            >
              
            </Typography>

            <Stack
              sx={{ pt: 4 }}
              direction="row"
              spacing={2}
              justifyContent="center"
            >
              {/* <Link to="/dashboard">
                <Button variant="contained">Dashboard</Button>
              </Link> */}
              <Link to="/">
                <Button variant="outlined">Developer Team</Button>
              </Link>
            </Stack>
          </Container>
        </Box>
      </main>
      <Footer />
    </ThemeProvider>
  );
}
