import type { Metadata } from "next";
import {FC, PropsWithChildren} from "react";
import {Box, CssBaseline, ThemeProvider} from "@mui/material";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v16-appRouter";
import {theme} from "./theme";
import {roboto} from "./fonts";
import {IStyleSheet} from "@/types";

export const metadata: Metadata = {
  title: "Memory AI",
  description: 'Memory AI is an intelligent knowledge and chat management system that combines the power of cloud-based AI with local vector search.',
};

interface IRootLayoutProps extends PropsWithChildren {}

const RootLayout: FC<IRootLayoutProps> = ({children}) => {
  return (
    <html lang="en" className={roboto.variable}>
      <body>
        <AppRouterCacheProvider>
          <ThemeProvider theme={theme}>
            <CssBaseline />

            <Box sx={styles.layout}>
              {children}
            </Box>
          </ThemeProvider>
        </AppRouterCacheProvider>
      </body>
    </html>
  );
}

const styles = {
  layout: {
    height: '100dvh',
    width: '100vw',
    display: 'flex',
    overflow: 'hidden',
  }
} satisfies IStyleSheet

export default RootLayout;
