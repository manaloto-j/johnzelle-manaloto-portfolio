# Personal Portfolio — Johnzelle Manaloto
**Live Website:** [johnzellem.netlify.app](https://johnzellem.netlify.app)

## Overview
This project is a personal portfolio website for **Johnzelle Manaloto**, a UI/UX Designer and Front-End Developer based in the Philippines. You can view the live website at [johnzellem.netlify.app](https://johnzellem.netlify.app). 

The site showcases creative works, technical skills, and professional certifications through an interactive digital experience built primarily with modern front-end technologies.

## Project Structure
The repository is organized into the following directory structure:

* **Root Directory**: Contains the main HTML pages:
    * `index.html`: The landing page featuring the hero section, about info, tool showcase, and featured projects.
    * `projects.html`: A gallery for detailed project case studies.
    * `resume.html`: An online version of the professional resume.
    * `blog.html`: A section for sharing insights and articles.
    * `contact.html`: A page for inquiries and collaboration requests.
* **`css/`**: Contains stylesheets for specific pages and shared layout components, such as `style.css`, `index.css`, and `featured.css`.
* **`scripts/`**: Includes JavaScript files for site functionality:
    * `main.js`: Handles core UI interactions like custom cursors, 3D tilt effects, and scroll reveals.
    * `shared.js` & `page-init.js`: Manage common site-wide scripts and initialization.
    * **Page-specific scripts**: Logic for `projects.js`, `resume.js`, `blog.js`, and `contact.js`.
* **`netlify/`**: Contains serverless functions, specifically for handling contact form submissions via `functions/contact.js`.
* **`images/` & `svg/`**: Assets including project screenshots, certification badges, and vector icons for tools like Figma, React, and JavaScript.

## Key Features
* **Interactive UI**: Features a custom cursor, 3D tilt effects on media frames, and letter-by-letter animations.
* **Responsive Design**: Optimized for various screen sizes with mobile-specific features like an auto-scrolling tool track and swipe-hints for certifications.
* **Scroll Reveal**: Sections animate into view as the user scrolls to enhance engagement.
* **Serverless Contact Form**: A functional contact system powered by Netlify Functions.

## Technologies Used
* **Design**: Figma, Framer, Photoshop.
* **Front-End**: HTML5, CSS3, JavaScript (ES6+), React.
* **Deployment & Backend**: Netlify (Hosting & Serverless Functions).
