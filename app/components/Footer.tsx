export default function Footer() {
  return (
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
              <a href="#" className="text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 text-sm">Facebook</a>
              <a href="#" className="text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 text-sm">Twitter</a>
              <a href="#" className="text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 text-sm">Instagram</a>
              <a href="#" className="text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 text-sm">LinkedIn</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
