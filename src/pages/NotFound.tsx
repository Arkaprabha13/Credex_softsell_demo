import { useLocation } from "react-router-dom";
import { useEffect } from "react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center relative z-10">
        <h1 className="text-6xl font-bold mb-4 text-blue-300">404</h1>
        <p className="text-xl text-blue-100 mb-6">Page Not Found</p>
        <a href="/" className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors">
          Return to Home
        </a>
      </div>
    </div>
  );
};

export default NotFound;
