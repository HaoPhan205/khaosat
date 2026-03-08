import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Khảo sát tháng 3 – Sinh viên FPT",
  description: "Vui lòng nhập đúng họ tên để tiếp tục khảo sát.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="vi">
      <body className="antialiased">{children}</body>
    </html>
  );
}
