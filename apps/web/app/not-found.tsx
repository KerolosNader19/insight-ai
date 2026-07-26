export default function NotFound() {
  return (
    <div className="min-h-screen bg-brand-primary text-foreground flex flex-col items-center justify-center px-6">
      <h1 className="text-6xl font-bold text-brand-accent mb-4">404</h1>
      <p className="text-xl text-foreground/60 mb-8">Page not found</p>
      <a href="/" className="inline-flex items-center justify-center px-6 py-3 rounded-xl font-bold transition-all duration-300 bg-brand-accent text-brand-primary">
        Go Home
      </a>
    </div>
  );
}
