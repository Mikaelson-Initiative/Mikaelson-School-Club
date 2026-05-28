export default function AboutPage() {
  const values = [
    {
      icon: "🎯",
      title: "Excellence",
      description: "We strive for the highest standards in everything we do, from events to member support."
    },
    {
      icon: "🤝",
      title: "Community",
      description: "We believe in the power of building strong connections and supporting one another."
    },
    {
      icon: "💡",
      title: "Innovation",
      description: "We embrace creativity and new ideas to continuously improve our club and impact."
    },
    {
      icon: "🌱",
      title: "Growth",
      description: "We are committed to personal and professional development for all our members."
    }
  ];

  const milestones = [
    {
      year: "2020",
      title: "Club Founded",
      description: "Mikaelson School Club was established with a vision to unite students around shared values."
    },
    {
      year: "2021",
      title: "First Major Event",
      description: "Successfully organized the inaugural Annual Summit with over 200 attendees."
    },
    {
      year: "2022",
      title: "Partnership Expansion",
      description: "Established partnerships with 5 major organizations and began internship program."
    },
    {
      year: "2023",
      title: "500+ Members",
      description: "Reached milestone of 500 active members across the school."
    },
    {
      year: "2024",
      title: "Community Recognition",
      description: "Received Community Excellence Award for outstanding student initiatives."
    },
    {
      year: "2025-Present",
      title: "Digital Presence",
      description: "Launched official website and expanded reach through social media platforms."
    }
  ];

  return (
    <div className="flex flex-col min-h-screen bg-white dark:bg-black">
      <header className="sticky top-0 z-40 border-b border-gray-200 dark:border-gray-800 bg-white dark:bg-black">
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <a href="/" className="text-2xl font-bold text-blue-600 dark:text-blue-400">
            Mikaelson School Club
          </a>
          <ul className="hidden md:flex gap-8 text-gray-700 dark:text-gray-300">
            <li><a href="/about" className="hover:text-blue-600 dark:hover:text-blue-400 transition font-medium">About</a></li>
            <li><a href="/events" className="hover:text-blue-600 dark:hover:text-blue-400 transition">Events</a></li>
            <li><a href="/leadership" className="hover:text-blue-600 dark:hover:text-blue-400 transition">Leadership</a></li>
            <li><a href="/get-involved" className="hover:text-blue-600 dark:hover:text-blue-400 transition">Get Involved</a></li>
            <li><a href="/resources" className="hover:text-blue-600 dark:hover:text-blue-400 transition">Resources</a></li>
            <li><a href="/partners" className="hover:text-blue-600 dark:hover:text-blue-400 transition">Partners</a></li>
            <li><a href="/contact" className="hover:text-blue-600 dark:hover:text-blue-400 transition">Contact</a></li>
          </ul>
        </nav>
      </header>

      <main className="flex-1">
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 dark:text-white mb-4">About Us</h1>
          <p className="text-xl text-gray-600 dark:text-gray-400">Learn more about the Mikaelson School Club and our mission</p>
        </section>

        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">Our Mission</h2>
              <p className="text-lg text-gray-700 dark:text-gray-300 mb-4">
                The Mikaelson School Club is dedicated to fostering academic excellence, personal development, and meaningful community engagement among students. We create opportunities for connection, growth, and impact.
              </p>
              <p className="text-lg text-gray-700 dark:text-gray-300">
                Through our events, mentorship programs, and community initiatives, we empower students to discover their potential and make a positive difference in the world.
              </p>
            </div>
            <div className="bg-gradient-to-br from-blue-400 to-blue-600 dark:from-blue-900 dark:to-blue-950 rounded-lg p-8 text-white">
              <h3 className="text-2xl font-bold mb-4">Quick Facts</h3>
              <div className="space-y-4">
                <div>
                  <p className="text-4xl font-bold">500+</p>
                  <p className="text-blue-100">Active Members</p>
                </div>
                <div>
                  <p className="text-4xl font-bold">50+</p>
                  <p className="text-blue-100">Events Per Year</p>
                </div>
                <div>
                  <p className="text-4xl font-bold">15</p>
                  <p className="text-blue-100">Partner Organizations</p>
                </div>
                <div>
                  <p className="text-4xl font-bold">5+</p>
                  <p className="text-blue-100">Years of Excellence</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="bg-gray-50 dark:bg-gray-900 py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-12 text-center">Our Core Values</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {values.map((value, index) => (
                <div key={index} className="bg-white dark:bg-gray-800 p-6 rounded-lg text-center hover:shadow-lg transition">
                  <div className="text-5xl mb-3">{value.icon}</div>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">{value.title}</h3>
                  <p className="text-gray-600 dark:text-gray-400">{value.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-12">Our Journey</h2>
          <div className="space-y-8">
            {milestones.map((milestone, index) => (
              <div key={index} className="flex gap-6">
                <div className="flex flex-col items-center">
                  <div className="w-16 h-16 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold text-lg">
                    {milestone.year}
                  </div>
                  {index < milestones.length - 1 && (
                    <div className="w-1 h-12 bg-blue-300 dark:bg-blue-700 mt-2"></div>
                  )}
                </div>
                <div className="pb-8">
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">{milestone.title}</h3>
                  <p className="text-gray-600 dark:text-gray-400">{milestone.description}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="bg-blue-600 dark:bg-blue-900 py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white">
            <h2 className="text-3xl font-bold mb-4">Join Our Community Today</h2>
            <p className="text-lg text-blue-100 mb-8">Become part of something meaningful and grow with us</p>
            <a href="/get-involved" className="inline-block px-8 py-3 bg-white text-blue-600 rounded-lg hover:bg-gray-100 transition font-bold">
              Get Involved
            </a>
          </div>
        </section>
      </main>

      <footer className="border-t border-gray-200 dark:border-gray-800 bg-white dark:bg-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            <div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Mikaelson School Club</h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm">Building community, fostering excellence, and inspiring growth.</p>
            </div>
            <div>
              <h4 className="font-bold text-gray-900 dark:text-white mb-4">Quick Links</h4>
              <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
                <li><a href="/about" className="hover:text-blue-600 dark:hover:text-blue-400">About</a></li>
                <li><a href="/events" className="hover:text-blue-600 dark:hover:text-blue-400">Events</a></li>
                <li><a href="/get-involved" className="hover:text-blue-600 dark:hover:text-blue-400">Get Involved</a></li>
                <li><a href="/contact" className="hover:text-blue-600 dark:hover:text-blue-400">Contact</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold text-gray-900 dark:text-white mb-4">Resources</h4>
              <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
                <li><a href="/resources" className="hover:text-blue-600 dark:hover:text-blue-400">Documents</a></li>
                <li><a href="/leadership" className="hover:text-blue-600 dark:hover:text-blue-400">Leadership</a></li>
                <li><a href="/partners" className="hover:text-blue-600 dark:hover:text-blue-400">Partners</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold text-gray-900 dark:text-white mb-4">Contact</h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                <a href="mailto:info@mikaelsonclub.edu" className="hover:text-blue-600 dark:hover:text-blue-400">info@mikaelsonclub.edu</a><br />
                Room 301, Main Building<br />
                <a href="tel:+1-555-0123" className="hover:text-blue-600 dark:hover:text-blue-400">(555) 0123</a>
              </p>
            </div>
          </div>
          <div className="border-t border-gray-200 dark:border-gray-800 pt-8">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <p className="text-gray-600 dark:text-gray-400 text-sm">&copy; 2026 Mikaelson School Club. All rights reserved.</p>
              <div className="flex gap-4 mt-4 md:mt-0">
                <a href="#" className="text-gray-400 hover:text-blue-600 dark:hover:text-blue-400">Facebook</a>
                <a href="#" className="text-gray-400 hover:text-blue-600 dark:hover:text-blue-400">Twitter</a>
                <a href="#" className="text-gray-400 hover:text-blue-600 dark:hover:text-blue-400">Instagram</a>
                <a href="#" className="text-gray-400 hover:text-blue-600 dark:hover:text-blue-400">LinkedIn</a>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
