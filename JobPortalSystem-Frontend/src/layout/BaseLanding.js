import * as React from "react";
import CssBaseline from "@mui/material/CssBaseline";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Outlet } from "react-router-dom";
import CardHelp from "../components/commons/CardHelp";
import Header from "../components/headers/Header";
import Footer from "../components/footers/Footer";
import GoToTopButton from "../components/commons/GoToTopButton";

const theme = createTheme({
  palette: {
    background: {
      default: "#fafaff",
    },
  },
});

const BaseLanding = () => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Header />
      <main>
        <Outlet />
      </main>
      <CardHelp />
      <GoToTopButton />
      <Footer />
    </ThemeProvider>
  );
};

export default BaseLanding;
