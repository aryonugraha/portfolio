# Aryo Nugraha – Portfolio

Single-page personal portfolio for Aryo Nugraha (Principal Solutions Architect / Senior Technical Project Manager), built as a static site with smooth animations and skills visualizations.

## Page Structure

- **Overview / Hero**
	- Introduction, role summary, and short narrative about "Experience-First Architecture".
	- Call-to-action buttons linking to the Experience and Capabilities sections.
	- Portrait photo (foto.jpeg) with a card-style presentation.

- **Professional Experience**
	- Vertical timeline presenting key roles (Technical Project Manager, Principal Solution Architect, Head of Project & Solution, etc.).
	- Each item includes role, company, dates, and a short description of responsibilities and impact.

- **Capabilities & Skills**
	- Two analytics-style charts rendered with Chart.js:
		- **Technical Skills (bar chart)** – Omnichannel, Conversational AI, Generative AI, Data Analytics, Solution & Architecture.
		- **Managerial Skills (radar chart)** – Project Management, Operational Support, Presales Support.

- **Footer**
	- Copyright notice.
	- Links to LinkedIn and GitHub.
	- Email call-to-action ("Work with me").

## JavaScript Behaviour

All behaviour is in script.js and is written in vanilla JavaScript:

- **Scroll-based animations**
	- Uses the Intersection Observer API to fade and slide in timeline items and skills cards when they enter the viewport.
- **Skills charts** (Chart.js)
	- Initializes a bar chart for technical skills and a radar chart for managerial skills when the DOM is ready and Chart.js is available.
	- Both charts are responsive and styled with custom colors, tooltips, and grid/tick options.
- **Responsive navigation**
	- Mobile navigation toggle button opens/closes the main menu and updates ARIA attributes.
	- Clicking a navigation link on mobile closes the menu.
- **Smooth section scrolling**
	- All internal anchor links (href starting with #) scroll smoothly to their target section, offsetting by the navbar height.
- **Active link + navbar effects**
	- Throttled scroll handler (via a custom throttle function) updates the active navigation link based on the section in view.
	- Adds/removes a subtle shadow on the navbar after scrolling.
	- Applies a gentle parallax and fade effect to the hero content on desktop/tablet.
- **Skills bar animation hooks**
	- Observes elements with the class .skill-bar (if present in the DOM) and triggers a CSS keyframe animation when they come into view.
- **Page load fade-in**
	- Fades in the entire page body shortly after window load, creating a soft loading effect.

## How to Run Locally

You can open the site directly or use a simple static server:

1. **Direct open**  
	 Open `index.html` in your browser (double-click or drag into a tab).

2. **Using a local server (recommended for CSP and relative paths)**  
	 From the project directory:

	 ```bash
	 # Example with Python 3
	 python -m http.server 8080
	 ```

	 Then visit: http://localhost:8080

## Customization Guide

- **Text & content**
	- Edit the hero copy, job titles, and descriptions in `index.html`.
	- Update company names, dates, and role descriptions in the Experience section.

- **Skills & charts**
	- In `script.js`, adjust the labels and data arrays for:
		- `technicalSkillsChart` – update the `labels` and `data` values to match your technical stack.
		- `managerialSkillsChart` – update the `labels` and `data` values to reflect your managerial strengths.

- **Branding & assets**
	- Replace `foto.jpeg` with your own portrait (keeping the filename or updating the src in `index.html`).
	- Replace `logo.png` / `logo.svg` with a personal logo; update `alt` text accordingly.

- **Meta tags & SEO**
	- In the `<head>` of `index.html`, update:
		- `<title>` and `<meta name="description">` for your name and summary.
		- Open Graph and Twitter meta tags for your final domain and preview image.
		- The canonical URL (`<link rel="canonical" href="https://your-domain.com/">`).

## Technologies Used

- HTML5
- CSS3 (responsive layout, transitions, and animations)
- Vanilla JavaScript (Intersection Observer API, smooth scrolling, throttled scroll handling)
- Chart.js (loaded via CDN) for bar and radar skills visualizations