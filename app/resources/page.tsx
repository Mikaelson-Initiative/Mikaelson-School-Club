import Footer from "../components/Footer";

export default function ResourcesPage() {
  const documents = [
    {
      title: "Club Constitution",
      description: "Official bylaws and governance structure",
      format: "PDF",
      date: "Updated May 2026"
    },
    {
      title: "Meeting Minutes - May 2026",
      description: "Summary of monthly leadership meeting",
      format: "PDF",
      date: "May 28, 2026"
    },
    {
      title: "Member Handbook",
      description: "Guide for new and existing members",
      format: "PDF",
      date: "Updated March 2026"
    },
    {
      title: "Event Planning Template",
      description: "Template for organizing club events",
      format: "Google Doc",
      date: "Updated April 2026"
    }
  ];

  const usefulLinks = [
    {
      category: "School Resources",
      links: [
        { name: "School Website", url: "#" },
        { name: "Student Portal", url: "#" },
        { name: "Academic Calendar", url: "#" },
        { name: "Campus Map", url: "#" }
      ]
    },
    {
      category: "External Resources",
      links: [
        { name: "Leadership Development", url: "#" },
        { name: "Career Exploration", url: "#" },
        { name: "Community Service", url: "#" },
        { name: "Online Learning", url: "#" }
      ]
    },
    {
      category: "Club Tools",
      links: [
        { name: "Club Calendar", url: "#" },
        { name: "Member Directory", url: "#" },
        { name: "Event Registration", url: "#" },
        { name: "Feedback Form", url: "#" }
      ]
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
            <li><a href="/about" className="hover:text-blue-600 dark:hover:text-blue-400 transition">About</a></li>
            <li><a href="/events" className="hover:text-blue-600 dark:hover:text-blue-400 transition">Events</a></li>
            <li><a href="/leadership" className="hover:text-blue-600 dark:hover:text-blue-400 transition">Leadership</a></li>
            <li><a href="/get-involved" className="hover:text-blue-600 dark:hover:text-blue-400 transition">Get Involved</a></li>
            <li><a href="/resources" className="hover:text-blue-600 dark:hover:text-blue-400 transition font-medium">Resources</a></li>
            <li><a href="/partners" className="hover:text-blue-600 dark:hover:text-blue-400 transition">Partners</a></li>
            <li><a href="/contact" className="hover:text-blue-600 dark:hover:text-blue-400 transition">Contact</a></li>
          </ul>
        </nav>
      </header>

      <main className="flex-1">
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 dark:text-white mb-4">Resources</h1>
          <p className="text-xl text-gray-600 dark:text-gray-400">Documents, links, and tools for club members</p>
        </section>

        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">Club Documents</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {documents.map((doc, index) => (
              <div key={index} className="border border-gray-200 dark:border-gray-800 p-6 rounded-lg hover:shadow-lg transition">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h3 className="text-lg font-bold text-gray-900 dark:text-white">{doc.title}</h3>
                    <p className="text-gray-600 dark:text-gray-400">{doc.description}</p>
                  </div>
                  <span className="bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-300 px-3 py-1 rounded text-sm font-medium">
                    {doc.format}
                  </span>
                </div>
                <p className="text-gray-500 dark:text-gray-500 text-sm mb-4">{doc.date}</p>
                <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition text-sm">
                  Download
                </button>
              </div>
            ))}
          </div>
        </section>

        <section className="bg-gray-50 dark:bg-gray-900 py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-12">Useful Links</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {usefulLinks.map((section, index) => (
                <div key={index}>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">{section.category}</h3>
                  <ul className="space-y-3">
                    {section.links.map((link, idx) => (
                      <li key={idx}>
                        <a href={link.url} className="text-blue-600 dark:text-blue-400 hover:underline flex items-center gap-2">
                          🔗 {link.name}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">FAQ</h2>
          <div className="space-y-4">
            {[
              {
                q: "When are club meetings held?",
                a: "We meet every Tuesday at 3:30 PM in Room 301. Everyone is welcome!"
              },
              {
                q: "Do I need prior experience to join?",
                a: "No! We welcome members of all experience levels. Come as you are."
              },
              {
                q: "Are there membership fees?",
                a: "Membership is free for all students at our school."
              },
              {
                q: "How can I get involved in leadership?",
                a: "Leadership positions open each fall. Check our Get Involved page for more details."
              }
            ].map((item, index) => (
              <details key={index} className="border border-gray-200 dark:border-gray-800 p-4 rounded-lg cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-900 transition">
                <summary className="font-semibold text-gray-900 dark:text-white">{item.q}</summary>
                <p className="text-gray-600 dark:text-gray-400 mt-3">{item.a}</p>
              </details>
            ))}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
