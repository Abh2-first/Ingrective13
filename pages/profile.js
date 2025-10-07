import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function Profile() {
  return (
    <>
      <Navbar />
      <main className="max-w-5xl mx-auto py-16 px-4">
        <h2 className="text-3xl font-bold text-brand-700 mb-6 text-center">
          Your Profile 👤
        </h2>

        <div className="bg-white shadow-md rounded-xl p-8 text-center">
          <p className="text-lg text-gray-600 mb-6">
            Welcome to your health dashboard!
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
            <div className="p-6 bg-brand-100 rounded-lg shadow">
              <h3 className="text-brand-700 font-bold text-xl">0</h3>
              <p className="text-gray-600">Average Health Score</p>
            </div>
            <div className="p-6 bg-brand-100 rounded-lg shadow">
              <h3 className="text-brand-700 font-bold text-xl">0</h3>
              <p className="text-gray-600">Weekly Average</p>
            </div>
            <div className="p-6 bg-brand-100 rounded-lg shadow">
              <h3 className="text-brand-700 font-bold text-xl">Stable</h3>
              <p className="text-gray-600">Trend</p>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
