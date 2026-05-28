import Footer from "./components/Footer";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-white dark:bg-black">
      <header className="sticky top-0 z-40 border-b border-gray-200 dark:border-gray-800 bg-white dark:bg-black">
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <a href="/" className="text-2xl font-bold text-blue-600 dark:text-blue-400">
            Mikaelson School Club
          </a>
          <ul className="hidden md:flex gap-8 text-gray-700 dark:text-gray-300">
            <li>
              <a href="/about" className="hover:text-blue-600 dark:hover:text-blue-400 transition">
                About
              </a>
            </li>
            <li>
              <a href="/events" className="hover:text-blue-600 dark:hover:text-blue-400 transition">
                Events
              </a>
            </li>
            <li>
              <a href="/leadership" className="hover:text-blue-600 dark:hover:text-blue-400 transition">
                Leadership
              </a>
            </li>
            <li>
              <a href="/get-involved" className="hover:text-blue-600 dark:hover:text-blue-400 transition">
                Get Involved
              </a>
            </li>
            <li>
              <a href="/resources" className="hover:text-blue-600 dark:hover:text-blue-400 transition">
                Resources
              </a>
            </li>
            <li>
              <a href="/partners" className="hover:text-blue-600 dark:hover:text-blue-400 transition">
                Partners
              </a>
            </li>
            <li>
              <a href="/contact" className="hover:text-blue-600 dark:hover:text-blue-400 transition">
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
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="text-center">
            <h1 className="text-5xl sm:text-6xl font-bold text-gray-900 dark:text-white mb-6">
              Welcome to the Mikaelson <span className="text-blue-600 dark:text-blue-400">School Club</span>
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-400 mb-8 max-w-2xl mx-auto">
              Join us in building a vibrant community dedicated to learning, growth, and meaningful connections among students.
            </p>
            <div className="flex gap-4 justify-center">
              <button className="px-8 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-medium">
                Join Us
              </button>
              <button className="px-8 py-3 border border-gray-300 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-900 transition font-medium">
                Learn More
              </button>
            </div>
          </div>
        </section>

        <section id="about" className="bg-gray-50 dark:bg-gray-900 py-24">
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

        <section id="features" className="py-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-12 text-center">
              Our Activities
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  title: "Workshops & Seminars",
                  description: "Monthly educational sessions featuring industry experts and peer learning opportunities."
                },
                {
                  title: "Networking Events",
                  description: "Connect with fellow students, mentors, and professionals in a welcoming environment."
                },
                {
                  title: "Community Service",
                  description: "Give back to society through meaningful volunteer projects and community initiatives."
                }
              ].map((item, index) => (
                <div
                  key={index}
                  className="p-6 border border-gray-200 dark:border-gray-800 rounded-lg hover:shadow-lg dark:hover:shadow-lg dark:hover:shadow-blue-500/20 transition"
                >
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

        <section id="contact" className="bg-blue-600 dark:bg-blue-900 py-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6">
              Ready to Join?
            </h2>
            <p className="text-lg text-blue-100 mb-8 max-w-2xl mx-auto">
              Get in touch with us to learn more about membership and upcoming events.
            </p>
            <button className="px-8 py-3 bg-white text-blue-600 rounded-lg hover:bg-gray-100 transition font-medium">
              Contact Us
            </button>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
