import React, { useEffect } from 'react';

const LandingPage = () => {
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
        timeoutId = setTimeout(type, 100); // Adjust typing speed here (in milliseconds)
        typingText.textContent += text.charAt(index);
        index++;
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
      <div className="bg-gray-50">
        {/* Header */}
        <header className="bg-gray-100 shadow">
          <div className="container mx-auto px-4 py-4 flex justify-between items-center">
            <h1 className="text-2xl font-bold" text-black>Book Worm</h1>
            <nav>
              <ul className="flex space-x-4">
                <li><a href="#" className="text-gray-800 hover:text-blue-500">Home</a></li>
                <li><a href="#" className="text-gray-800 hover:text-blue-500">About</a></li>
                <li><a href="#" className="text-gray-800 hover:text-blue-500">Contact</a></li>
              </ul>
            </nav>
          </div>
        </header>

        {/* Hero Section */}
        <section className="bg-white text-black text-center py-20">
          <h2 className="text-5xl font-bold typing-effect" id="typing-text"></h2>
          <p className="mt-4 text-lg">Create Your Own Visionary Whiteboard!</p>
          <a href="#" className="mt-6 inline-block bg-blue-500 text-white font-semibold py-2 px-4 rounded">Get Started!</a>
        </section>

        {/* Features Section */}
        <section className="bg-gray-100 container mx-auto px-4 py-10">
          <h3 className="text-black text-3xl font-bold text-center mb-6">Features</h3>
          <div className="text-black grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Feature Items */}
            {[
              { title: "Markdown & Drawing Support", description: "Format text with Markdown and freeform drawing on your canvas." },
              { title: "Live Collaboration", description: "Work together in real-time on the same whiteboard." },
              { title: "Networking", description: "Connect and collaborate with others in the community." },
              { title: "AI Assistance", description: "Edit, Draft Translate. Ask and AI will help." },
              { title: "Custom Viewing", description: "Visualize work in any format, from calendars to boards" },
              { title: "Feature 6", description: "Description of feature 6." }
            ].map((feature, index) => (
              <div key={index} className="relative bg-white p-6 rounded shadow overflow-hidden max-w-[500px] group">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 opacity-0 transition-opacity duration-300 group-hover:opacity-50"></div>
                <h4 className="text-xl font-semibold relative z-10">{feature.title}</h4>
                <p className="mt-2 relative z-10">{feature.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Testimonials Section */}
        <section className="bg-gray-100 py-10">
          <div className="swiper-container">
            <div className="swiper-wrapper">
              <div className="swiper-slide bg-white p-6 rounded shadow">
                <p className="italic">"This product changed my life! I'm proud of my students!"</p>
                <footer className="mt-4">— Nelson Padua-Perez</footer>
              </div>
              <div className="swiper-slide bg-white p-6 rounded shadow">
                <p className="italic">"A must-have tool for every educator!"</p>
                <footer className="mt-4">— Jane Doe</footer>
              </div>
            </div>
            <div className="swiper-pagination"></div>
          </div>
        </section>

        {/* Call to Action */}
        <section className="text-center py-10">
          <h3 className="text-2xl font-bold">Ready to Get Started?</h3>
          <a href="#" className="mt-4 inline-block bg-blue-500 text-white font-semibold py-2 px-4 rounded">Sign Up Now</a>
        </section>

        {/* Footer */}
        <footer className="bg-white py-4">
          <div className="container mx-auto text-center">
            <p className="text-gray-600">© 2025 Bitcamp. All rights reserved.</p>
            <div className="flex justify-center space-x-4 mt-2">
              <a href="#" className="text-gray-600 hover:text-blue-500">Privacy Policy</a>
              <a href="#" className="text-gray-600 hover:text-blue-500">Terms of Service</a>
            </div>
          </div>
        </footer>
      </div>
    </React.Fragment>
  );
};

export default LandingPage;