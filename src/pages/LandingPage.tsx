import React, { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

const LandingPage = () => {
    const navigate = useNavigate();
    const typingTextRef = useRef<HTMLHeadingElement>(null);

    useEffect(() => {
        const text = "Welcome to Tetherboard!";
        const element = typingTextRef.current;
        let index = 0;
        let timeoutId: NodeJS.Timeout;
    
        if (element) {
            element.textContent = ""; // Clear any existing content before starting
        }
    
        function type() {
            if (element && index < text.length) {
                element.textContent += text.charAt(index);
                index++;
                timeoutId = setTimeout(type, 100); // Adjust typing speed here (in milliseconds)
            } else if (element) {
                element.classList.remove("typing-effect"); // Remove cursor effect after typing
            }
        }
    
        // Start typing effect
        type();
    
        // Cleanup to clear timeout when the component unmounts
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
                        <h1 className="text-2xl font-bold text-white">Tetherboard</h1>
                        <nav>
                            <ul className="flex space-x-4">
                                <li><a href="#" className="text-gray-300 hover:text-blue-400">Home</a></li>
                                <li>
                                    <a href="#" className="text-gray-300 hover:text-blue-400" onClick={() => navigate('/help')}>
                                        Help
                                    </a>
                                </li>
                            </ul>
                        </nav>
                    </div>
                </header>
    
                <section
                    className="h-screen bg-center bg-cover"
                    style={{ backgroundImage: "url('/TetherImg.png')" }}
                >
                    {/* The section is intentionally left empty */}
                </section>
    
                {/* Hero Section */}
                <section className="bg-gray-800 text-gray-100 text-center h-[37.5vh]">
                    <div className="flex flex-col items-center justify-center h-full px-4">
                        <h2 id="typing-text" ref={typingTextRef} className="text-5xl font-bold typing-effect mb-12"></h2>
                        <button
                            className="inline-block bg-blue-500 text-white font-semibold py-2 px-4 rounded hover:bg-blue-600 animate-bounce hover:scale-105 transition-all duration-300"
                            onClick={() => navigate('/login')}
                        >
                            Get Started!
                        </button>
                    </div>
                </section>
    
                {/* Features Section */}
                <section className="bg-gray-900 container mx-auto px-4 py-10">
                    <h3 className="text-3xl font-bold text-white text-center mb-6">Features</h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mx-auto max-w-5xl justify-center">
                        {[
                            { title: "Markdown & Drawing Support", description: "Format text with Markdown and freeform drawing on your canvas." },
                            { title: "Live Collaboration", description: "Work together in real-time on the same whiteboard." },
                            { title: "Networking", description: "Link workspaces to craft innovative and dynamic visualizations" },
                            { title: "AI Assistance", description: "Edit, Draft Translate. Ask and AI will help." },
                            { title: "Custom Viewing", description: "Visualize work in any format, from calendars to boards" },
                            { title: "Integrated Task Management", description: "Organize and prioritize your tasks directly on the whiteboard." }
                        ].map((feature, index) => (
                            <div
                                key={index}
                                className="relative bg-gray-800 text-gray-100 p-6 rounded shadow overflow-hidden max-w-[400px] group hover:bg-gradient-to-r hover:from-blue-500 hover:to-black-500 group hover:scale-105 transition-all duration-300"
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
                        className="mt-4 inline-block bg-blue-500 text-white font-semibold py-2 px-4 rounded hover:bg-blue-600 hover:scale-105"
                        onClick={() => navigate('/login')}>
                        Sign Up Now
                    </button>
                </section>
    
                {/* Footer */}
                <footer className="bg-gray-800 text-gray-400 py-4">
                    <div className="container mx-auto text-center">
                        <p>© 2025 Bitcamp. All rights reserved.</p>
                        <div className="flex justify-center space-x-4 mt-2">
                        </div>
                    </div>
                </footer>
            </div>
        </React.Fragment>
    );
};
    
export default LandingPage;