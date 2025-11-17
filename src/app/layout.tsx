export const metadata = {
  title: "To-Do List ",
  description: "projet next.js avec typescript et tailwindcss",
};
import "./style.css";
//ajouter le context
import { ContexteProvider } from "./compenents/contexte/page";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <ContexteProvider>{children}</ContexteProvider>
      </body>
    </html>
  );
}
