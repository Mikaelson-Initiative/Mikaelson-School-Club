import Footer from "../components/Footer";

export default function LeadershipPage() {
  const officers = [
    {
      name: "Sarah Johnson",
      role: "President",
      bio: "Senior, passionate about building community and fostering academic excellence.",
      email: "sarah.johnson@school.edu"
    },
    {
      name: "Michael Chen",
      role: "Vice President",
      bio: "Junior, leads event planning and member engagement initiatives.",
      email: "michael.chen@school.edu"
    },
    {
      name: "Aisha Patel",
      role: "Secretary",
      bio: "Junior, manages communications and club documentation.",
      email: "aisha.patel@school.edu"
    },
    {
      name: "James Williams",
      role: "Treasurer",
      bio: "Senior, oversees budgets and financial planning.",
      email: "james.williams@school.edu"
    }
  ];

  const advisors = [
    {
      name: "Dr. Emily Rodriguez",
      role: "Faculty Advisor",
      department: "Academic Affairs",
      bio: "Mentor to the club leadership team."
    },
    {
      name: "Mr. David Park",
      role: "Co-Advisor",
      department: "Student Life",
      bio: "Supports club activities and student development."
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
            <li><a href="/leadership" className="hover:text-blue-600 dark:hover:text-blue-400 transition font-medium">Leadership</a></li>
            <li><a href="/get-involved" className="hover:text-blue-600 dark:hover:text-blue-400 transition">Get Involved</a></li>
            <li><a href="/resources" className="hover:text-blue-600 dark:hover:text-blue-400 transition">Resources</a></li>
            <li><a href="/partners" className="hover:text-blue-600 dark:hover:text-blue-400 transition">Partners</a></li>
            <li><a href="/contact" className="hover:text-blue-600 dark:hover:text-blue-400 transition">Contact</a></li>
          </ul>
        </nav>
      </header>

      <main className="flex-1">
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 dark:text-white mb-4">Leadership Team</h1>
          <p className="text-xl text-gray-600 dark:text-gray-400">Meet the dedicated students leading our community</p>
        </section>

        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-12">Club Officers</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {officers.map((officer, index) => (
              <div key={index} className="bg-gray-50 dark:bg-gray-900 p-6 rounded-lg text-center hover:shadow-lg transition">
                <div className="w-24 h-24 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full mx-auto mb-4 flex items-center justify-center">
                  <span className="text-4xl text-white">👤</span>
                </div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white">{officer.name}</h3>
                <p className="text-blue-600 dark:text-blue-400 font-semibold mb-3">{officer.role}</p>
                <p className="text-gray-600 dark:text-gray-400 mb-4 text-sm">{officer.bio}</p>
                <a href={`mailto:${officer.email}`} className="text-blue-600 dark:text-blue-400 hover:underline text-sm">
                  {officer.email}
                </a>
              </div>
            ))}
          </div>
        </section>

        <section className="bg-gray-50 dark:bg-gray-900 py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-12">Faculty Advisors</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {advisors.map((advisor, index) => (
                <div key={index} className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
                  <div className="flex items-start gap-4">
                    <div className="w-16 h-16 bg-gradient-to-br from-green-400 to-green-600 rounded-full flex items-center justify-center flex-shrink-0">
                      <span className="text-2xl">👨‍🏫</span>
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-gray-900 dark:text-white">{advisor.name}</h3>
                      <p className="text-blue-600 dark:text-blue-400 font-semibold mb-2">{advisor.role}</p>
                      <p className="text-gray-600 dark:text-gray-400 text-sm mb-2">{advisor.department}</p>
                      <p className="text-gray-700 dark:text-gray-300">{advisor.bio}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="bg-blue-600 dark:bg-blue-900 p-8 rounded-lg text-white">
            <h2 className="text-2xl font-bold mb-4">Interested in Leadership?</h2>
            <p className="mb-6">We're always looking for passionate members to join our leadership team. Applications open in September!</p>
            <a href="/get-involved" className="inline-block px-6 py-2 bg-white text-blue-600 rounded-lg hover:bg-gray-100 transition font-medium">
              Learn More
            </a>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
