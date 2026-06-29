# <img src="project-final-submission/img/FourSidesIcon.jpg" alt="" height="32" align="center"> FourSides Studio — IT3240 Final Project

A multi-page website for **FourSides Studio**, a fictional Chicago-based creative collective spanning film production, graphic design, fine art, and open-source software development. Built over 10 weeks for **IT3240: Introduction to Web Development** at **Capella University**.

The company concept is modeled after collectives like Glitch — a hub where creators support each other's creative endeavors through open-source solutions and filmmaking, free from the constraints of major corporate interests.

## Tech Stack

- HTML5 (semantic landmarks, forms, metadata)
- CSS3 (Grid, Flexbox, animations, responsive design)
- JavaScript (DOM API, Fetch API, Constraint Validation API, event-driven navigation)

## Pages

| Page | Description |
|------|-------------|
| **Home** (`index.html`) | Brand identity, studio ecosystem, featured work areas as card grid |
| **About** (`about.html`) | Origin story, core values (no AI, freedom, FOSS, fellowship), disciplines |
| **Contact** (`contact.html`) | Project inquiry form with radio/checkbox/select/datalist controls, client-side validation |
| **Tools** (`tools.html`) | Open-source software portfolio — tool list dynamically injected from a JS array |
| **Weather** (`weather.html`) | Live weather lookup via OpenWeatherMap API for film crews scouting shooting locations |

## Features

- **CSS Grid** layout with `auto-fit`/`minmax` for responsive card reflow
- **Floating pill navigation** — bottom-center nav with a sliding green indicator that tracks cursor position in real time via `getBoundingClientRect()`, snaps back to the active page on mouseleave
- **HTML5 Constraint Validation API** — field-level error messages for name, email, phone, and message fields using `setCustomValidity()` / `checkValidity()`
- **DOM access methods** — `getElementById()`, `getElementsByName()`, `getElementsByTagName()` demonstrated for form data extraction
- **Fetch API** — asynchronous weather data from OpenWeatherMap with loading/success/error states and °F/°C unit toggle
- **Responsive design** — single breakpoint at 600px; ecosystem flex row collapses naturally

## Branch Structure

This `pages-site` branch contains only the final deliverable (`project-final-submission/`), representing the completed 10-week project. Earlier weekly working directories have been removed.
