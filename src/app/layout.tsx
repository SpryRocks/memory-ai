import type {Metadata} from "next";
import {FC, PropsWithChildren} from "react";
import {Box, CssBaseline, ThemeProvider} from "@mui/material";
import {AppRouterCacheProvider} from "@mui/material-nextjs/v16-appRouter";
import {IStyleSheet} from "@/types";
import {roboto, theme} from "@/resources";

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

            <Box sx={styles.layout} children={children} />
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
