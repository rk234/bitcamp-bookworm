import { Link, useNavigate } from "react-router-dom";
import React, { useState } from "react";

export default function HelpPage() {
    const navigate = useNavigate();
    const [isTableCollapsed, setIsTableCollapsed] = useState(true); // State to toggle table visibility

    return (
        <React.Fragment>
            <header className="bg-gray-900 shadow">
                <div className="container mx-auto px-4 py-4 flex justify-between items-center">
                    <h1 className="text-2xl font-bold text-white">Book Worm</h1>
                    <nav>
                        <ul className="flex space-x-4">
                            <li><a href="#" className="text-gray-300 hover:text-blue-400" onClick={() => navigate('/')}>Home</a></li>
                            <li><a href="#" className="text-gray-300 hover:text-blue-400" onClick={() => navigate('/help')}>Help</a></li>
                            <li><a href="#" className="text-gray-300 hover:text-blue-400">Contact</a></li>
                        </ul>
                    </nav>
                </div>
            </header>

            <section className="bg-gray-800 text-gray-100">
                <div className="flex flex-col items-center h-screen p-6">
                    <h1 className="text-3xl font-bold text-center mb-6">Markdown Help Page</h1>
                    <h2 className="text-3xl font-bold text-center mb-6">Headings</h2>
                    <button
                        className="mb-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 w-full max-w-4xl"
                        onClick={() => setIsTableCollapsed(!isTableCollapsed)}
                    >
                    Here's a quick reference for Markdown syntax and its HTML equivalent for Headings 
                    {isTableCollapsed ? "  ↓" : "  ↑"}
                    </button>
                    <table className="table-auto border border-white text-gray-100 w-full max-w-4xl">
                        <thead>
                            <tr>
                                <th className="border border-white px-6 py-3 w-1/3">Markdown Syntax</th>
                                <th className="border border-white px-6 py-3 w-1/3">HTML Equivalent</th>
                                <th className="border border-white px-6 py-3 w-1/3">Display</th>
                            </tr>
                        </thead>
                        <tbody className={`${isTableCollapsed ? "hidden" : ""}`}>
                            <tr>
                                <td className="border border-white px-6 py-3"># Heading 1</td>
                                <td className="border border-white px-6 py-3">&lt;h1&gt;Heading 1&lt;/h1&gt;</td>
                                <td className="border border-white px-6 py-3"><h1 className="text-4xl">Heading 1</h1></td>
                            </tr>
                            <tr>
                                <td className="border border-white px-6 py-3">## Heading 2</td>
                                <td className="border border-white px-6 py-3">&lt;h2&gt;Heading 2&lt;/h2&gt;</td>
                                <td className="border border-white px-6 py-3"><h2 className="text-3xl">Heading 2</h2></td>
                            </tr>
                            <tr>
                                <td className="border border-white px-6 py-3">### Heading 3</td>
                                <td className="border border-white px-6 py-3">&lt;h3&gt;Heading 3&lt;/h3&gt;</td>
                                <td className="border border-white px-6 py-3"><h3 className="text-2xl">Heading 3</h3></td>
                            </tr>
                            <tr>
                                <td className="border border-white px-6 py-3">#### Heading 4</td>
                                <td className="border border-white px-6 py-3">&lt;h4&gt;Heading 4&lt;/h4&gt;</td>
                                <td className="border border-white px-6 py-3"><h4 className="text-xl">Heading 4</h4></td>
                            </tr>
                            <tr>
                                <td className="border border-white px-6 py-3">##### Heading 5</td>
                                <td className="border border-white px-6 py-3">&lt;h5&gt;Heading 5&lt;/h5&gt;</td>
                                <td className="border border-white px-6 py-3"><h5 className="text-lg">Heading 5</h5></td>
                            </tr>
                            <tr>
                                <td className="border border-white px-6 py-3">###### Heading 6</td>
                                <td className="border border-white px-6 py-3">&lt;h6&gt;Heading 6&lt;/h6&gt;</td>
                                <td className="border border-white px-6 py-3"><h6 className="text-base">Heading 6</h6></td>
                            </tr>
                        </tbody>
                    </table>
                    <button
                        className="mb-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 w-full max-w-4xl"
                        onClick={() => setIsTableCollapsed(!isTableCollapsed)}
                    >
                    Here's a quick reference for Markdown syntax and its HTML equivalent for Headings 
                    {isTableCollapsed ? "  ↓" : "  ↑"}
                    </button>
                    <table className="table-auto border border-white text-gray-100 w-full max-w-4xl">
                        <thead>
                            <tr>
                                <th className="border border-white px-6 py-3 w-1/3">Markdown Syntax</th>
                                <th className="border border-white px-6 py-3 w-1/3">HTML Equivalent</th>
                                <th className="border border-white px-6 py-3 w-1/3">Display</th>
                            </tr>
                        </thead>
                        <tbody className={`${isTableCollapsed ? "hidden" : ""}`}>
                            <tr>
                                <td className="border border-white px-6 py-3"># Heading 1</td>
                                <td className="border border-white px-6 py-3">&lt;h1&gt;Heading 1&lt;/h1&gt;</td>
                                <td className="border border-white px-6 py-3"><h1 className="text-4xl">Heading 1</h1></td>
                            </tr>
                            <tr>
                                <td className="border border-white px-6 py-3">## Heading 2</td>
                                <td className="border border-white px-6 py-3">&lt;h2&gt;Heading 2&lt;/h2&gt;</td>
                                <td className="border border-white px-6 py-3"><h2 className="text-3xl">Heading 2</h2></td>
                            </tr>
                            <tr>
                                <td className="border border-white px-6 py-3">### Heading 3</td>
                                <td className="border border-white px-6 py-3">&lt;h3&gt;Heading 3&lt;/h3&gt;</td>
                                <td className="border border-white px-6 py-3"><h3 className="text-2xl">Heading 3</h3></td>
                            </tr>
                            <tr>
                                <td className="border border-white px-6 py-3">#### Heading 4</td>
                                <td className="border border-white px-6 py-3">&lt;h4&gt;Heading 4&lt;/h4&gt;</td>
                                <td className="border border-white px-6 py-3"><h4 className="text-xl">Heading 4</h4></td>
                            </tr>
                            <tr>
                                <td className="border border-white px-6 py-3">##### Heading 5</td>
                                <td className="border border-white px-6 py-3">&lt;h5&gt;Heading 5&lt;/h5&gt;</td>
                                <td className="border border-white px-6 py-3"><h5 className="text-lg">Heading 5</h5></td>
                            </tr>
                            <tr>
                                <td className="border border-white px-6 py-3">###### Heading 6</td>
                                <td className="border border-white px-6 py-3">&lt;h6&gt;Heading 6&lt;/h6&gt;</td>
                                <td className="border border-white px-6 py-3"><h6 className="text-base">Heading 6</h6></td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </section>
        </React.Fragment>
    );
}