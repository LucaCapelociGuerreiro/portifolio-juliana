"use client";

import React from "react";

const Header = () => {
  return (
    <header className="bg-gradient-to-r from-purple-700 via-purple-800 to-purple-900 text-white py-12 shadow-lg">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h1 className="text-5xl font-extrabold tracking-tight">
          Developer Portfolio
        </h1>
        <p className="mt-4 text-xl font-medium text-purple-100">
          Full Stack Developer
        </p>
        <p className="mt-2 max-w-2xl mx-auto text-gray-200">
          I build modern, responsive web applications with React, Next.js, and
          Node.js. Passionate about creating clean, efficient, and
          user-friendly experiences.
        </p>
        <div className="mt-8">
          <a
            href="#contact"
            className="inline-block px-6 py-3 bg-white text-purple-700 font-semibold rounded-lg shadow hover:bg-purple-100 hover:scale-105 transition-all duration-300"
          >
            Get In Touch
          </a>
        </div>
      </div>
    </header>
  );
};

export default Header;
