import { createTheme } from "@mui/material/styles";

// Krunch & Cane color palette
export const colors = {
  leafGreen: "#0F8A3C",
  deepGreen: "#0B5D2A",
  emerald: "#10B981",
  sugarcaneYellow: "#FFD24A",
  orangeAccent: "#FF8A00",
  cream: "#FFF7E6",
  creamLight: "#FFFBF0",
  white: "#FFFFFF",
  textDark: "#1F2937",
  textMedium: "#4B5563",
  textLight: "#6B7280",
} as const;

export const appTheme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: colors.leafGreen,
      dark: colors.deepGreen,
      contrastText: colors.white,
    },
    secondary: {
      main: colors.sugarcaneYellow,
      contrastText: colors.textDark,
    },
    background: {
      default: colors.creamLight,
      paper: colors.white,
    },
    text: {
      primary: colors.textDark,
      secondary: colors.textMedium,
    },
  },
  shape: {
    borderRadius: 14,
  },
  typography: {
    fontFamily:
      'system-ui, -apple-system, BlinkMacSystemFont, "SF Pro Text", "Helvetica Neue", Arial, sans-serif',
    h1: {
      fontWeight: 700,
    },
    h2: {
      fontWeight: 700,
    },
    h3: {
      fontWeight: 700,
    },
    button: {
      textTransform: "none",
      fontWeight: 600,
    },
  },
});

