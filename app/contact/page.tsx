import Footer from "../components/Footer";

export default function ContactPage() {
  return (
    <div className="flex flex-col min-h-screen bg-white dark:bg-black">
      <header className="sticky top-0 z-40 border-b border-gray-200 dark:border-gray-800 bg-white dark:bg-black">
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <a href="/" className="text-2xl font-bold text-blue-600 dark:text-blue-400">
            Mikaelson School Club
          </a>
          <ul className="hidden md:flex gap-8 text-gray-700 dark:text-gray-300">
            <li><a href="/about" className="hover:text-blue-600 dark:hover:text-blue-400 transition">About</a></li>
            <li><a href="/events" className="hover:text-blue-600 dark:hover:text-blue-400 transition">Events</a></li>
            <li><a href="/leadership" className="hover:text-blue-600 dark:hover:text-blue-400 transition">Leadership</a></li>
            <li><a href="/get-involved" className="hover:text-blue-600 dark:hover:text-blue-400 transition">Get Involved</a></li>
            <li><a href="/resources" className="hover:text-blue-600 dark:hover:text-blue-400 transition">Resources</a></li>
            <li><a href="/partners" className="hover:text-blue-600 dark:hover:text-blue-400 transition">Partners</a></li>
            <li><a href="/contact" className="hover:text-blue-600 dark:hover:text-blue-400 transition font-medium">Contact</a></li>
          </ul>
        </nav>
      </header>

      <main className="flex-1">
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 dark:text-white mb-4">Get in Touch</h1>
          <p className="text-xl text-gray-600 dark:text-gray-400">We'd love to hear from you. Reach out anytime!</p>
        </section>

        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 grid grid-cols-1 md:grid-cols-2 gap-12">
          <div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-8">Contact Information</h2>

            <div className="space-y-8">
              <div className="flex gap-4">
                <div className="text-3xl">📧</div>
                <div>
                  <h3 className="font-bold text-gray-900 dark:text-white mb-1">Email</h3>
                  <p className="text-gray-600 dark:text-gray-400">For general inquiries:</p>
                  <a href="mailto:info@mikaelsonclub.edu" className="text-blue-600 dark:text-blue-400 hover:underline">
                    info@mikaelsonclub.edu
                  </a>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="text-3xl">📞</div>
                <div>
                  <h3 className="font-bold text-gray-900 dark:text-white mb-1">Phone</h3>
                  <p className="text-gray-600 dark:text-gray-400">Club President:</p>
                  <a href="tel:+1-555-0123" className="text-blue-600 dark:text-blue-400 hover:underline">
                    (555) 0123
                  </a>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="text-3xl">📍</div>
                <div>
                  <h3 className="font-bold text-gray-900 dark:text-white mb-1">Location</h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    Room 301<br />
                    Main School Building<br />
                    123 School Street
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="text-3xl">⏰</div>
                <div>
                  <h3 className="font-bold text-gray-900 dark:text-white mb-1">Office Hours</h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    Tuesday & Thursday: 3:30 PM - 5:00 PM<br />
                    Or by appointment
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-8 pt-8 border-t border-gray-200 dark:border-gray-800">
              <h3 className="font-bold text-gray-900 dark:text-white mb-4">Follow Us</h3>
              <div className="flex gap-4">
                <a href="#" className="w-10 h-10 bg-blue-600 text-white rounded-full flex items-center justify-center hover:bg-blue-700 transition">f</a>
                <a href="#" className="w-10 h-10 bg-blue-400 text-white rounded-full flex items-center justify-center hover:bg-blue-500 transition">𝕏</a>
                <a href="#" className="w-10 h-10 bg-pink-600 text-white rounded-full flex items-center justify-center hover:bg-pink-700 transition">📷</a>
                <a href="#" className="w-10 h-10 bg-blue-600 text-white rounded-full flex items-center justify-center hover:bg-blue-700 transition">in</a>
              </div>
            </div>
          </div>

          <div className="bg-gray-50 dark:bg-gray-900 p-8 rounded-lg">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Send us a Message</h2>
            <form className="space-y-4">
              <div>
                <label className="block text-gray-700 dark:text-gray-300 font-medium mb-2">Name</label>
                <input type="text" className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg focus:outline-none focus:border-blue-600 dark:bg-gray-800 dark:text-white" placeholder="Your name" />
              </div>

              <div>
                <label className="block text-gray-700 dark:text-gray-300 font-medium mb-2">Email</label>
                <input type="email" className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg focus:outline-none focus:border-blue-600 dark:bg-gray-800 dark:text-white" placeholder="your@email.com" />
              </div>

              <div>
                <label className="block text-gray-700 dark:text-gray-300 font-medium mb-2">Subject</label>
                <input type="text" className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg focus:outline-none focus:border-blue-600 dark:bg-gray-800 dark:text-white" placeholder="How can we help?" />
              </div>

              <div>
                <label className="block text-gray-700 dark:text-gray-300 font-medium mb-2">Message</label>
                <textarea rows={5} className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg focus:outline-none focus:border-blue-600 dark:bg-gray-800 dark:text-white" placeholder="Your message here..."></textarea>
              </div>

              <button type="submit" className="w-full px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-bold">
                Send Message
              </button>
            </form>
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-4">
              We'll get back to you within 24 hours during school days.
            </p>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
