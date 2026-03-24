import Link from "next/link";
import Logo from "./Logo";

export default function Footer() {
  return (
    <footer className="bg-black text-white">
      <div className="max-w-[1400px] mx-auto px-6 md:px-10 py-16 md:py-24">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 md:gap-8">
          {/* Brand */}
          <div className="md:col-span-2">
            <Link href="/" className="flex items-center gap-3 mb-6">
              <Logo size={32} className="text-white" />
              <span className="text-base font-bold tracking-tight uppercase">
                Blanzo Creative
              </span>
            </Link>
            <p className="text-gray-400 text-sm leading-relaxed max-w-md">
              A creative shop crafting visual experiences through motion,
              design, and storytelling. We bring brands to life with bold,
              purposeful creativity.
            </p>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-widest text-gray-500 mb-6">
              Navigation
            </h4>
            <div className="flex flex-col gap-3">
              <Link href="/" className="text-sm text-gray-300 hover:text-white transition-colors">Home</Link>
              <Link href="/projects" className="text-sm text-gray-300 hover:text-white transition-colors">Projects</Link>
              <Link href="/shop" className="text-sm text-gray-300 hover:text-white transition-colors">Shop</Link>
              <Link href="/info" className="text-sm text-gray-300 hover:text-white transition-colors">Who</Link>
              <Link href="/contact" className="text-sm text-gray-300 hover:text-white transition-colors">Contact</Link>
            </div>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-widest text-gray-500 mb-6">
              Get in touch
            </h4>
            <div className="flex flex-col gap-3">
              <a
                href="mailto:hello@blanzocreative.com"
                className="text-sm text-gray-300 hover:text-white transition-colors"
              >
                hello@blanzocreative.com
              </a>
              <div className="flex gap-4 mt-4">
                <a href="#" className="text-gray-400 hover:text-white transition-colors text-sm font-semibold">
                  Instagram
                </a>
                <a href="#" className="text-gray-400 hover:text-white transition-colors text-sm font-semibold">
                  Behance
                </a>
                <a href="#" className="text-gray-400 hover:text-white transition-colors text-sm font-semibold">
                  LinkedIn
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-gray-800 mt-16 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-xs text-gray-500">
            &copy; {new Date().getFullYear()} Blanzo Creative. All rights reserved.
          </p>
          <p className="text-xs text-gray-500">
            Crafted with purpose.
          </p>
        </div>
      </div>
    </footer>
  );
}
