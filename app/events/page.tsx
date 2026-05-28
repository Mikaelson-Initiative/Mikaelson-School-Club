export default function EventsPage() {
  const upcomingEvents = [
    {
      title: "Monthly Networking Dinner",
      date: "June 15, 2026",
      time: "6:00 PM - 8:00 PM",
      location: "School Auditorium",
      description: "Connect with fellow club members and industry professionals over dinner."
    },
    {
      title: "Leadership Workshop",
      date: "June 22, 2026",
      time: "3:30 PM - 5:00 PM",
      location: "Room 301",
      description: "Learn essential leadership skills from experienced mentors."
    },
    {
      title: "Career Fair",
      date: "July 10, 2026",
      time: "2:00 PM - 5:00 PM",
      location: "School Gymnasium",
      description: "Meet representatives from top companies and explore career opportunities."
    }
  ];

  const pastEvents = [
    {
      title: "Orientation Event",
      date: "May 1, 2026",
      attendees: "125 students"
    },
    {
      title: "Spring Volunteer Drive",
      date: "April 20, 2026",
      attendees: "80 volunteers"
    },
    {
      title: "Winter Seminar Series",
      date: "March 15, 2026",
      attendees: "200+ attendees"
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
            <li><a href="/events" className="hover:text-blue-600 dark:hover:text-blue-400 transition font-medium">Events</a></li>
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
          <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 dark:text-white mb-4">Events & Activities</h1>
          <p className="text-xl text-gray-600 dark:text-gray-400">Join us for engaging events throughout the year</p>
        </section>

        <section className="bg-gray-50 dark:bg-gray-900 py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-12">Upcoming Events</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {upcomingEvents.map((event, index) => (
                <div key={index} className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md hover:shadow-lg transition">
                  <div className="flex items-center gap-2 mb-3">
                    <span className="text-blue-600 dark:text-blue-400">📅</span>
                    <span className="font-semibold text-gray-900 dark:text-white">{event.date}</span>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">{event.title}</h3>
                  <p className="text-gray-600 dark:text-gray-400 mb-2">⏰ {event.time}</p>
                  <p className="text-gray-600 dark:text-gray-400 mb-4">📍 {event.location}</p>
                  <p className="text-gray-700 dark:text-gray-300">{event.description}</p>
                  <button className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">
                    Learn More
                  </button>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">Past Events</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {pastEvents.map((event, index) => (
              <div key={index} className="border-l-4 border-blue-600 pl-6 py-4">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">{event.title}</h3>
                <p className="text-gray-600 dark:text-gray-400 mb-2">{event.date}</p>
                <p className="text-gray-700 dark:text-gray-300">👥 {event.attendees}</p>
              </div>
            ))}
          </div>
        </section>
      </main>

      <footer className="border-t border-gray-200 dark:border-gray-800 bg-white dark:bg-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 text-center text-gray-600 dark:text-gray-400">
          <p>&copy; 2026 Mikaelson School Club. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
