import Footer from "../components/Footer";

export default function GetInvolvedPage() {
  const steps = [
    {
      number: "1",
      title: "Attend an Event",
      description: "Join us at any of our upcoming events to meet members and learn more about the club."
    },
    {
      number: "2",
      title: "Fill Out the Form",
      description: "Complete our membership application with your basic information and interests."
    },
    {
      number: "3",
      title: "Get Approved",
      description: "Our leadership team reviews your application and gets back to you within 5 business days."
    },
    {
      number: "4",
      title: "Welcome Aboard!",
      description: "Receive your member welcome packet and start attending exclusive member-only events."
    }
  ];

  const opportunities = [
    {
      title: "General Member",
      description: "Participate in all club events and activities.",
      benefits: ["Attend all events", "Network with peers", "Access resources", "Member discounts"]
    },
    {
      title: "Committee Member",
      description: "Take on more responsibility and help organize events.",
      benefits: ["Leadership experience", "Event planning", "Mentorship", "Special recognition"]
    },
    {
      title: "Volunteer",
      description: "Contribute your skills to community service projects.",
      benefits: ["Community impact", "Service hours", "Team collaboration", "Certificate"]
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
            <li><a href="/get-involved" className="hover:text-blue-600 dark:hover:text-blue-400 transition font-medium">Get Involved</a></li>
            <li><a href="/resources" className="hover:text-blue-600 dark:hover:text-blue-400 transition">Resources</a></li>
            <li><a href="/partners" className="hover:text-blue-600 dark:hover:text-blue-400 transition">Partners</a></li>
            <li><a href="/contact" className="hover:text-blue-600 dark:hover:text-blue-400 transition">Contact</a></li>
          </ul>
        </nav>
      </header>

      <main className="flex-1">
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 dark:text-white mb-4">Get Involved</h1>
          <p className="text-xl text-gray-600 dark:text-gray-400">Multiple ways to join and contribute to our community</p>
        </section>

        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-12">How to Join</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {steps.map((step, index) => (
              <div key={index} className="relative">
                <div className="bg-blue-600 text-white w-12 h-12 rounded-full flex items-center justify-center text-xl font-bold mb-4">
                  {step.number}
                </div>
                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">{step.title}</h3>
                <p className="text-gray-600 dark:text-gray-400">{step.description}</p>
                {index < 3 && (
                  <div className="hidden md:block absolute top-6 left-12 w-full h-1 bg-blue-200 dark:bg-blue-800 -z-10"></div>
                )}
              </div>
            ))}
          </div>
        </section>

        <section className="bg-gray-50 dark:bg-gray-900 py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-12">Membership Levels</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {opportunities.map((opp, index) => (
                <div key={index} className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md hover:shadow-lg transition">
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">{opp.title}</h3>
                  <p className="text-gray-600 dark:text-gray-400 mb-6">{opp.description}</p>
                  <h4 className="font-semibold text-gray-900 dark:text-white mb-3">Benefits:</h4>
                  <ul className="space-y-2 mb-6">
                    {opp.benefits.map((benefit, idx) => (
                      <li key={idx} className="flex items-center text-gray-700 dark:text-gray-300">
                        <span className="text-blue-600 dark:text-blue-400 mr-2">✓</span>
                        {benefit}
                      </li>
                    ))}
                  </ul>
                  <button className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-medium">
                    Learn More
                  </button>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="bg-gradient-to-r from-blue-600 to-blue-800 dark:from-blue-900 dark:to-blue-950 p-8 rounded-lg text-white">
            <h2 className="text-3xl font-bold mb-4">Ready to Join?</h2>
            <p className="text-lg mb-6">Fill out the membership form below and we'll get back to you shortly!</p>
            <form className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input type="text" placeholder="First Name" className="px-4 py-2 rounded-lg text-gray-900" />
                <input type="text" placeholder="Last Name" className="px-4 py-2 rounded-lg text-gray-900" />
              </div>
              <input type="email" placeholder="Email Address" className="w-full px-4 py-2 rounded-lg text-gray-900" />
              <select className="w-full px-4 py-2 rounded-lg text-gray-900">
                <option>Select Grade Level</option>
                <option>Freshman</option>
                <option>Sophomore</option>
                <option>Junior</option>
                <option>Senior</option>
              </select>
              <textarea placeholder="Tell us about your interests..." rows={4} className="w-full px-4 py-2 rounded-lg text-gray-900"></textarea>
              <button type="submit" className="w-full px-4 py-3 bg-white text-blue-600 rounded-lg hover:bg-gray-100 transition font-bold">
                Submit Application
              </button>
            </form>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
