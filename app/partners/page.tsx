import Footer from "../components/Footer";

export default function PartnersPage() {
  const partners = [
    {
      name: "Tech Innovations Inc.",
      category: "Technology Partner",
      description: "Provides mentorship and internship opportunities for club members interested in tech.",
      logo: "🏢",
      website: "#"
    },
    {
      name: "Community Development Foundation",
      category: "Community Partner",
      description: "Collaborates with us on service projects and community initiatives.",
      logo: "🤝",
      website: "#"
    },
    {
      name: "Global Education Network",
      category: "Educational Partner",
      description: "Offers scholarships and educational resources for club members.",
      logo: "📚",
      website: "#"
    },
    {
      name: "Young Leaders Council",
      category: "Leadership Partner",
      description: "Provides leadership training and professional development programs.",
      logo: "👥",
      website: "#"
    }
  ];

  const sponsors = [
    {
      tier: "Platinum Sponsor",
      companies: [
        { name: "Premier Tech Solutions", logo: "💼" }
      ]
    },
    {
      tier: "Gold Sponsor",
      companies: [
        { name: "Excellence in Education", logo: "🎓" },
        { name: "Community First Bank", logo: "🏦" }
      ]
    },
    {
      tier: "Silver Sponsor",
      companies: [
        { name: "Local Business Hub", logo: "🏪" },
        { name: "Innovation Labs", logo: "🔬" },
        { name: "Future Leaders Inc.", logo: "🚀" }
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
            <li><a href="/resources" className="hover:text-blue-600 dark:hover:text-blue-400 transition">Resources</a></li>
            <li><a href="/partners" className="hover:text-blue-600 dark:hover:text-blue-400 transition font-medium">Partners</a></li>
            <li><a href="/contact" className="hover:text-blue-600 dark:hover:text-blue-400 transition">Contact</a></li>
          </ul>
        </nav>
      </header>

      <main className="flex-1">
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 dark:text-white mb-4">Partners & Sponsors</h1>
          <p className="text-xl text-gray-600 dark:text-gray-400">Organizations supporting the Mikaelson School Club</p>
        </section>

        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-12">Our Partners</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {partners.map((partner, index) => (
              <div key={index} className="border border-gray-200 dark:border-gray-800 p-6 rounded-lg hover:shadow-lg transition">
                <div className="flex items-start gap-4">
                  <div className="text-5xl">{partner.logo}</div>
                  <div className="flex-1">
                    <span className="inline-block bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-300 px-3 py-1 rounded-full text-sm font-medium mb-2">
                      {partner.category}
                    </span>
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">{partner.name}</h3>
                    <p className="text-gray-600 dark:text-gray-400 mb-4">{partner.description}</p>
                    <a href={partner.website} className="text-blue-600 dark:text-blue-400 hover:underline font-medium">
                      Learn More →
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="bg-gray-50 dark:bg-gray-900 py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-12">Our Sponsors</h2>
            <div className="space-y-12">
              {sponsors.map((sponsorLevel, index) => (
                <div key={index}>
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">{sponsorLevel.tier}</h3>
                  <div className={`grid gap-6 ${
                    sponsorLevel.companies.length === 1
                      ? "grid-cols-1"
                      : sponsorLevel.companies.length === 2
                      ? "grid-cols-1 md:grid-cols-2"
                      : "grid-cols-1 md:grid-cols-3"
                  }`}>
                    {sponsorLevel.companies.map((company, idx) => (
                      <div key={idx} className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md hover:shadow-lg transition text-center">
                        <div className="text-5xl mb-3">{company.logo}</div>
                        <h4 className="font-bold text-gray-900 dark:text-white">{company.name}</h4>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="bg-gradient-to-r from-blue-600 to-blue-800 dark:from-blue-900 dark:to-blue-950 p-8 rounded-lg text-white">
            <h2 className="text-3xl font-bold mb-4">Interested in Partnering?</h2>
            <p className="text-lg mb-6">We're always looking for organizations and businesses that share our commitment to student development and community growth.</p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div>
                <h3 className="font-bold mb-2 text-blue-100">Partner Benefits</h3>
                <ul className="text-blue-50 text-sm space-y-1">
                  <li>✓ Brand visibility</li>
                  <li>✓ Student engagement</li>
                  <li>✓ Community impact</li>
                </ul>
              </div>
              <div>
                <h3 className="font-bold mb-2 text-blue-100">Sponsorship Tiers</h3>
                <ul className="text-blue-50 text-sm space-y-1">
                  <li>✓ Platinum</li>
                  <li>✓ Gold</li>
                  <li>✓ Silver</li>
                </ul>
              </div>
              <div>
                <h3 className="font-bold mb-2 text-blue-100">Collaboration Types</h3>
                <ul className="text-blue-50 text-sm space-y-1">
                  <li>✓ Mentorship</li>
                  <li>✓ Internships</li>
                  <li>✓ Events</li>
                </ul>
              </div>
            </div>

            <button className="px-8 py-3 bg-white text-blue-600 rounded-lg hover:bg-gray-100 transition font-bold">
              Contact Us About Partnership
            </button>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
