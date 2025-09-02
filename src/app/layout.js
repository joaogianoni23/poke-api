import "./globals.css";
import 'react-toastify/dist/ReactToastify.css';

export const metadata = {
  title: "Pokemon",
  description: "Projeto sobre a API de Pokemon",
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="pt-br">
      <body>
        {children}
      </body>
    </html>
  );
}
