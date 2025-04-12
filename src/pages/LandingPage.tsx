import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const LandingPage = () => {
    const navigate = useNavigate();
  
    useEffect(() => {
      const text = "Welcome to Book Worm!";
      const typingText = document.getElementById("typing-text");
      let index = 0;
      let timeoutId: NodeJS.Timeout;
  
      if (typingText) {
        typingText.textContent = ""; // Clear any existing content before starting
      }
  
      function type() {
        if (typingText && index < text.length) {
          typingText.textContent += text.charAt(index);
          index++;
          timeoutId = setTimeout(type, 100); // Adjust typing speed here (in milliseconds)
        } else if (typingText) {
          typingText.classList.remove("typing-effect"); // Remove cursor effect after typing
        }
      }
  
      // Start typing effect
      type();
  
      // Cleanup function to clear timeout when the component unmounts
      return () => {
        clearTimeout(timeoutId);
      };
    }, []);

  return (
    <React.Fragment>
      <div className="bg-gray-900 text-gray-100">
        {/* Header */}
        <header className="bg-gray-900 shadow">
          <div className="container mx-auto px-4 py-4 flex justify-between items-center">
            <h1 className="text-2xl font-bold text-white">Book Worm</h1>
            <nav>
              <ul className="flex space-x-4">
                <li><a href="#" className="text-gray-300 hover:text-blue-400">Home</a></li>
                <li><a href="#" className="text-gray-300 hover:text-blue-400">About</a></li>
                <li><a href="#" className="text-gray-300 hover:text-blue-400">Contact</a></li>
              </ul>
            </nav>
          </div>
        </header>

        {/* Hero Section */}
        <section className="bg-gray-800 text-gray-100 text-center py-20">
          <h2 className="text-5xl font-bold typing-effect" id="typing-text"></h2>
          <p className="mt-4 text-lg">Create Your Own Visionary Whiteboard!</p>
          <button
            className="mt-6 inline-block bg-blue-500 text-white font-semibold py-2 px-4 rounded hover:bg-blue-600"
            onClick={() => navigate('/login')}
          >
            Get Started!
          </button>
        </section>

        {/* Features Section */}
        <section className="bg-gray-900 container mx-auto px-4 py-10">
          <h3 className="text-3xl font-bold text-white text-center mb-6">Features</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mx-auto max-w-5xl justify-center">
            {[
              { title: "Markdown & Drawing Support", description: "Format text with Markdown and freeform drawing on your canvas." },
              { title: "Live Collaboration", description: "Work together in real-time on the same whiteboard." },
              { title: "Networking", description: "Connect and collaborate with others in the community." },
              { title: "AI Assistance", description: "Edit, Draft Translate. Ask and AI will help." },
              { title: "Custom Viewing", description: "Visualize work in any format, from calendars to boards" },
              { title: "Feature 6", description: "Description of feature 6." }
            ].map((feature, index) => (
              <div
                key={index}
                className="relative bg-gray-800 text-gray-100 p-6 rounded shadow overflow-hidden max-w-[400px] group hover:bg-gradient-to-r hover:from-blue-500 hover:to-black-500 transition-all duration-300"
              >
                <h4 className="text-xl font-semibold">{feature.title}</h4>
                <p className="mt-2">{feature.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Testimonials Section */}
        <section className="bg-gray-800 py-10">
          <div className="swiper-container">
            <div className="swiper-wrapper">
              <div className="swiper-slide bg-gray-700 p-6 rounded shadow">
                <p className="italic text-gray-300">"This product changed my life! I'm proud of my students!"</p>
                <footer className="mt-4 text-gray-400">— Nelson Padua-Perez</footer>
              </div>
              <div className="swiper-slide bg-gray-700 p-6 rounded shadow">
                <p className="italic text-gray-300">"A must-have tool for every educator!"</p>
                <footer className="mt-4 text-gray-400">— Jane Doe</footer>
              </div>
            </div>
            <div className="swiper-pagination"></div>
          </div>
        </section>

        {/* Call to Action */}
        <section className="bg-gray-900 text-center py-10">
          <h3 className="text-2xl font-bold text-white">Ready to Get Started?</h3>
          <button
            className="mt-4 inline-block bg-blue-500 text-white font-semibold py-2 px-4 rounded hover:bg-blue-600"
            onClick={() => navigate('/login')}
          >
            Sign Up Now
          </button>
        </section>

        {/* Footer */}
        <footer className="bg-gray-800 text-gray-400 py-4">
          <div className="container mx-auto text-center">
            <p>© 2025 Bitcamp. All rights reserved.</p>
            <div className="flex justify-center space-x-4 mt-2">
              <a href="#" className="hover:text-blue-400">Privacy Policy</a>
              <a href="#" className="hover:text-blue-400">Terms of Service</a>
            </div>
          </div>
        </footer>
      </div>
    </React.Fragment>
  );
};

export default LandingPage;