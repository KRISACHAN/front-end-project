import { AppRouterCacheProvider } from "@mui/material-nextjs/v14-appRouter";
import "@/styles/globals.css";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <AppRouterCacheProvider options={{ key: "css" }}>
          {children}
        </AppRouterCacheProvider>
      </body>
    </html>
  );
}
