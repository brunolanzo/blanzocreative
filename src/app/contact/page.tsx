"use client";

import { useState, FormEvent } from "react";
import FadeIn from "@/components/FadeIn";

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <section className="py-16 md:py-24 px-6 md:px-10">
      <div className="max-w-[1400px] mx-auto">
        <FadeIn>
          <h1 className="text-5xl md:text-7xl font-black uppercase tracking-tight">
            Contact
          </h1>
        </FadeIn>

        <div className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-24">
          {/* Left - Info */}
          <div>
            <FadeIn delay={100}>
              <p className="text-2xl md:text-3xl font-bold leading-tight">
                Have a project in mind? Let&apos;s talk about it.
              </p>
            </FadeIn>

            <FadeIn delay={200}>
              <div className="mt-12 space-y-8">
                <div>
                  <h3 className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-3">
                    Email
                  </h3>
                  <a
                    href="mailto:hello@blanzocreative.com"
                    className="text-lg font-semibold hover:text-gray-500 transition-colors"
                  >
                    hello@blanzocreative.com
                  </a>
                </div>

                <div>
                  <h3 className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-3">
                    Social
                  </h3>
                  <div className="flex flex-col gap-2">
                    <a href="#" className="text-base font-semibold hover:text-gray-500 transition-colors">
                      Instagram
                    </a>
                    <a href="#" className="text-base font-semibold hover:text-gray-500 transition-colors">
                      Behance
                    </a>
                    <a href="#" className="text-base font-semibold hover:text-gray-500 transition-colors">
                      LinkedIn
                    </a>
                  </div>
                </div>

                <div>
                  <h3 className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-3">
                    Location
                  </h3>
                  <p className="text-base font-semibold">
                    Remote-first studio
                  </p>
                </div>
              </div>
            </FadeIn>
          </div>

          {/* Right - Form */}
          <FadeIn delay={300}>
            {submitted ? (
              <div className="flex items-center justify-center h-full">
                <div className="text-center">
                  <h3 className="text-2xl font-bold uppercase tracking-tight">
                    Thank you!
                  </h3>
                  <p className="mt-3 text-gray-500">
                    We&apos;ll get back to you shortly.
                  </p>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label
                    htmlFor="name"
                    className="block text-xs font-bold uppercase tracking-widest text-gray-400 mb-2"
                  >
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    className="w-full border-b-2 border-gray-200 py-3 text-base font-medium focus:border-black outline-none transition-colors bg-transparent"
                    placeholder="Your name"
                  />
                </div>

                <div>
                  <label
                    htmlFor="email"
                    className="block text-xs font-bold uppercase tracking-widest text-gray-400 mb-2"
                  >
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    className="w-full border-b-2 border-gray-200 py-3 text-base font-medium focus:border-black outline-none transition-colors bg-transparent"
                    placeholder="your@email.com"
                  />
                </div>

                <div>
                  <label
                    htmlFor="company"
                    className="block text-xs font-bold uppercase tracking-widest text-gray-400 mb-2"
                  >
                    Company
                  </label>
                  <input
                    type="text"
                    id="company"
                    name="company"
                    className="w-full border-b-2 border-gray-200 py-3 text-base font-medium focus:border-black outline-none transition-colors bg-transparent"
                    placeholder="Your company"
                  />
                </div>

                <div>
                  <label
                    htmlFor="message"
                    className="block text-xs font-bold uppercase tracking-widest text-gray-400 mb-2"
                  >
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={5}
                    required
                    className="w-full border-b-2 border-gray-200 py-3 text-base font-medium focus:border-black outline-none transition-colors bg-transparent resize-none"
                    placeholder="Tell us about your project..."
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-black text-white py-4 text-sm font-bold uppercase tracking-widest hover:bg-gray-800 transition-colors mt-4"
                >
                  Send Message
                </button>
              </form>
            )}
          </FadeIn>
        </div>
      </div>
    </section>
  );
}
