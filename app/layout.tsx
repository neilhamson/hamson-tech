import type { Metadata } from "next";
import "./globals.css";
import SiteChatLauncher from "../components/SiteChatLauncher";

const siteUrl = "https://hamson.tech";

const websiteStructuredData = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": `${siteUrl}/#website`,
  url: siteUrl,
  name: "Neil Hamson",
  description:
    "Machine Intelligence (MI) and Artificial Intelligence (AI) software development by Dr Neil Hamson, including private MI research and independent technical services.",
  inLanguage: "en-GB",
};

export const metadata: Metadata = {
  metadataBase: new URL("https://hamson.tech"),
  title: { default: "Neil Hamson — Machine Intelligence & Software Development", template: "%s — Neil Hamson" },
  description: "Machine Intelligence (MI) and Artificial Intelligence (AI) software development by Dr Neil Hamson, including private MI research and independent technical services.",
  applicationName: "Neil Hamson",
  alternates: { canonical: "/" },
  openGraph: {
    title: "Neil Hamson — Machine Intelligence & Software Development",
    description: "Machine Intelligence (MI) and Artificial Intelligence (AI) software development by Dr Neil Hamson, including private MI research and independent technical services.",
    url: "/",
    siteName: "Neil Hamson",
    type: "website",
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en-GB">
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(websiteStructuredData).replace(/</g, "\\u003c"),
          }}
        />
        {children}
        <SiteChatLauncher />
      </body>
    </html>
  );
}
