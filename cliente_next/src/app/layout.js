import { NextUIProvider } from "@nextui-org/react";
import "./globals.css";

export const metadata = {
  title: "OVSAI",
  description: "SGC",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <NextUIProvider>{children}</NextUIProvider>
      </body>
    </html>
  );
}
