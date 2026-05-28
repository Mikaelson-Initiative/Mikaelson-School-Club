import Footer from "./components/Footer";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-white dark:bg-black">
      <header className="sticky top-0 z-40 border-b border-cyan-200 dark:border-gray-800 bg-white dark:bg-black">
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <a href="/" className="text-2xl font-bold text-teal-600 dark:text-teal-400">
            Mikaelson School Club
          </a>
          <ul className="hidden md:flex gap-8 text-gray-700 dark:text-gray-300">
            <li>
              <a href="/about" className="hover:text-teal-600 dark:hover:text-teal-400 transition">
                About
              </a>
            </li>
            <li>
              <a href="/events" className="hover:text-teal-600 dark:hover:text-teal-400 transition">
                Events
              </a>
            </li>
            <li>
              <a href="/leadership" className="hover:text-teal-600 dark:hover:text-teal-400 transition">
                Leadership
              </a>
            </li>
            <li>
              <a href="/get-involved" className="hover:text-teal-600 dark:hover:text-teal-400 transition">
                Get Involved
              </a>
            </li>
            <li>
              <a href="/resources" className="hover:text-teal-600 dark:hover:text-teal-400 transition">
                Resources
              </a>
            </li>
            <li>
              <a href="/partners" className="hover:text-teal-600 dark:hover:text-teal-400 transition">
                Partners
              </a>
            </li>
            <li>
              <a href="/contact" className="hover:text-teal-600 dark:hover:text-teal-400 transition">
                Contact
              </a>
            </li>
          </ul>
          <button className="md:hidden">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </nav>
      </header>

      <main className="flex-1">
        <section className="bg-gradient-to-br from-cyan-100 via-cyan-50 to-teal-50 dark:from-gray-900 dark:via-gray-900 dark:to-gray-900 py-24 sm:py-32">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              <div>
                <h1 className="text-5xl sm:text-6xl font-bold text-gray-900 dark:text-white mb-6 leading-tight">
                  Welcome to the<br />
                  <span className="text-teal-600 dark:text-teal-400">Mikaelson</span><br />
                  School Club
                </h1>
                <p className="text-xl text-gray-700 dark:text-gray-300 mb-8 max-w-xl">
                  Join us in building a vibrant community dedicated to learning, growth, and meaningful connections among students.
                </p>
                <div className="flex gap-4 flex-col sm:flex-row">
                  <button className="px-8 py-3 bg-teal-600 hover:bg-teal-700 text-white rounded-full transition font-semibold shadow-lg hover:shadow-xl">
                    Join Us
                  </button>
                  <button className="px-8 py-3 border-2 border-teal-600 text-teal-600 dark:text-teal-400 dark:border-teal-400 rounded-full hover:bg-teal-50 dark:hover:bg-gray-800 transition font-semibold">
                    Learn More
                  </button>
                </div>
              </div>
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-teal-400 to-cyan-400 rounded-2xl blur-3xl opacity-20"></div>
                <div className="relative bg-gradient-to-br from-teal-400 to-cyan-400 rounded-2xl p-8 text-white shadow-2xl">
                  <div className="space-y-4">
                    <div className="text-4xl font-bold">500+</div>
                    <p className="text-lg">Active Members</p>
                    <div className="border-t border-teal-300 pt-4">
                      <div className="text-2xl font-bold">50+</div>
                      <p className="text-sm">Events Annually</p>
                    </div>
                    <div className="border-t border-teal-300 pt-4">
                      <div className="text-2xl font-bold">15</div>
                      <p className="text-sm">Partner Organizations</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="about" className="bg-white dark:bg-black py-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-12 text-center">
              About Us
            </h2>
            <p className="text-lg text-gray-700 dark:text-gray-300 max-w-3xl mx-auto text-center">
              The Mikaelson School Club is a student-led organization committed to fostering academic excellence,
              personal development, and community engagement. We organize seminars, workshops, and social events
              that inspire students to achieve their full potential.
            </p>
          </div>
        </section>

        <section id="features" className="bg-gray-50 dark:bg-gray-900 py-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-12 text-center">
              Our Activities
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  title: "Workshops & Seminars",
                  description: "Monthly educational sessions featuring industry experts and peer learning opportunities.",
                  icon: "🎓"
                },
                {
                  title: "Networking Events",
                  description: "Connect with fellow students, mentors, and professionals in a welcoming environment.",
                  icon: "🤝"
                },
                {
                  title: "Community Service",
                  description: "Give back to society through meaningful volunteer projects and community initiatives.",
                  icon: "❤️"
                }
              ].map((item, index) => (
                <div
                  key={index}
                  className="p-6 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl hover:shadow-lg hover:border-teal-300 dark:hover:border-teal-600 transition group"
                >
                  <div className="text-4xl mb-4 group-hover:scale-110 transition">{item.icon}</div>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
                    {item.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    {item.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="contact" className="bg-gradient-to-r from-teal-600 to-cyan-500 dark:from-teal-900 dark:to-cyan-900 py-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6">
              Ready to Join?
            </h2>
            <p className="text-lg text-cyan-50 mb-8 max-w-2xl mx-auto">
              Get in touch with us to learn more about membership and upcoming events.
            </p>
            <button className="px-8 py-3 bg-white text-teal-600 hover:bg-cyan-50 rounded-full transition font-semibold shadow-lg hover:shadow-xl">
              Contact Us
            </button>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
