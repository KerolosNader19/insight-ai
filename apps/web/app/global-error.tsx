"use client";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html>
      <body>
        <div className="min-h-screen bg-brand-primary text-foreground flex flex-col items-center justify-center px-6">
          <h1 className="text-6xl font-bold text-brand-accent mb-4">500</h1>
          <p className="text-xl text-foreground/60 mb-4">Something went wrong</p>
          <p className="text-sm text-foreground/40 mb-8 max-w-md text-center">
            {error.message || "An unexpected error occurred"}
          </p>
          <button onClick={reset} className="btn-premium">
            Try Again
          </button>
        </div>
      </body>
    </html>
  );
}
