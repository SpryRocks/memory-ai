import type { Metadata } from "next";
import {FC, PropsWithChildren} from "react";

export const metadata: Metadata = {
  title: "Memory AI",
  description: 'Memory AI is an intelligent knowledge and chat management system that combines the power of cloud-based AI with local vector search.',
};

interface IRootLayoutProps extends PropsWithChildren {}

const RootLayout: FC<IRootLayoutProps> = ({children}) => {
  return (
    <html lang="en" style={{
      margin: 0,
    }}>
      <head>
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/normalize/8.0.1/normalize.min.css"
        />
      </head>

      <body>{children}</body>
    </html>
  );
}

export default RootLayout;
