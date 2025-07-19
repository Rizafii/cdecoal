export default function TopNav() {
  return (
    <div className="bg-primary text-white py-2 px-4 sm:px-6 lg:px-8 hidden md:flex">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center text-sm">
        <div className="flex flex-wrap items-center gap-4 sm:gap-6">
          <a
            href="tel:+628133361064"
            className="flex items-center gap-2 hover:text-gray-300 transition-colors duration-200"
          >
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
            </svg>
            <span>082133361064</span>
          </a>
          <a
            href="tel:+6285227711087"
            className="flex items-center gap-2 hover:text-gray-300 transition-colors duration-200"
          >
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
            </svg>
            <span>085227711087</span>
          </a>
          <a
            href="mailto:achmadi.cde@gmail.com"
            className="flex items-center gap-2 hover:text-gray-300 transition-colors duration-200"
          >
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
              <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
            </svg>
            <span>achmadi.cde@gmail.com</span>
          </a>
        </div>
        <div className="mt-2 sm:mt-0">
          <a
            href="https://maps.app.goo.gl/34vmAGx2EG6vy9dz8"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 hover:text-gray-300 transition-colors duration-200"
          >
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path
                fillRule="evenodd"
                d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
                clipRule="evenodd"
              />
            </svg>
            <span>TDC CDE</span>
          </a>
        </div>
      </div>
    </div>
  );
}
