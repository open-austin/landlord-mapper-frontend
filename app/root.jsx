import { isRouteErrorResponse, Links, Meta, Outlet, Scripts, ScrollRestoration } from "react-router";
import appStylesHref from "./app.css?url";
import Header from "./components/common/Header";
import Footer from "./components/common/Footer";

export const links = () => [{ rel: "stylesheet", href: appStylesHref }];

// The framework automatically uses this Layout to wrap your app
export function Layout({ children }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body className="font-sans text-gray-800 bg-gray-50">
        <div className="flex flex-col min-h-screen">
          <Header />
          <main className="flex-grow flex flex-col">{children}</main>
          <Footer />
        </div>
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export default function App() {
  // FIX: Just return Outlet. Do NOT wrap it in Layout again.
  return <Outlet />;
}

export function ErrorBoundary({ error }) {
  let message = "Oops!";
  let details = "An unexpected error occurred.";
  let stack;

  if (isRouteErrorResponse(error)) {
    message = error.status === 404 ? "404" : "Error";
    details = error.status === 404 ? "The requested page could not be found." : error.statusText || details;
  } else if (import.meta.env.DEV && error && error instanceof Error) {
    details = error.message;
    stack = error.stack;
  }

  return (
    <main className="pt-16 p-4 container mx-auto">
      <h1 className="text-2xl font-bold mb-2">{message}</h1>
      <p className="text-gray-600 mb-4">{details}</p>
      {stack && (
        <pre className="w-full p-4 overflow-x-auto bg-gray-100 rounded text-sm">
          <code>{stack}</code>
        </pre>
      )}
    </main>
  );
}
