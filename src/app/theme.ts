"use client";

import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  cssVariables: true,
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: "none",
        },
      },
    },
    MuiInputBase: {
      styleOverrides: {
        input: {
          "&::placeholder": {
            fontWeight: "300",
            fontSize: "14px",
          },
        },
      },
    },
  },
  typography: {
    fontFamily: "var(--font-roboto)",
  },
});

export default theme;
