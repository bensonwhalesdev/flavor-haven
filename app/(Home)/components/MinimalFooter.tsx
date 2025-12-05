"use client";

export default function MinimalFooter() {
  return (
    <footer className="w-full border-t border-black/10 py-6 mt-10">
      <div className="max-w-6xl mx-auto flex items-center justify-between px-4 text-sm text-black/60">
        <p>© {new Date().getFullYear()} Thebomma_gourmet</p>

        <div className="flex items-center gap-4">
          <a
            href="/"
            className="hover:text-black transition"
          >
            Home
          </a>
          <a
            href="/browse"
            className="hover:text-black transition"
          >
            Browse
          </a>
          <a
            href="/contact"
            className="hover:text-black transition"
          >
            Contact
          </a>
        </div>
      </div>
    </footer>
  );
}
