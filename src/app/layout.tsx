"use client";

import "./globals.css";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-gray-100 text-gray-900 font-sans antialiased">
        <nav className="bg-white shadow-md">
          <div className="container mx-auto px-4 py-2 flex justify-between items-center">
            <a href="/" className="text-2xl font-bold text-purple-600">
              TempoTrack
            </a>
            <div className="flex items-center gap-4">
              <a
                href="/login"
                className="px-4 py-2 text-sm font-medium text-gray-600 hover:text-purple-600 transition"
              >
                Login
              </a>
              <a
                href="/register"
                className="px-4 py-2 bg-purple-600 text-white rounded-lg text-sm font-medium hover:bg-purple-700 transition"
              >
                Register
              </a>
            </div>
          </div>
        </nav>
        <main className="min-h-screen flex items-center justify-center p-6">
          {children}
        </main>
        <footer className="bg-gray-900 text-white text-center py-4">
          <p>© 2023 TempoTrack. All rights reserved.</p>
          <p className="text-sm text-gray-400">
            API URL: {process.env.NEXT_PUBLIC_API_URL || "Not Defined"}
          </p>
        </footer>
      </body>
    </html>
  );
}
