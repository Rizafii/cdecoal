export default function Footer() {
  return (
    <footer className="bg-[#091426] text-white py-12">
      <div className="container mx-auto px-4">
        <div className="text-center text-gray-400 text-sm">
          <p>&copy; {new Date().getFullYear()} Training Center CDE CES.</p>
        </div>
      </div>
    </footer>
  );
}
