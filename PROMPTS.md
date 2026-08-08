# AI Usage Log

## Tools Used
- Antigravity IDE (Gemini 3.1 Pro High)
- Stitch by Google (UI Design)

## Data Files
### Prompt 1 (Antigravity):
Created student.json with mock student data including name, streak, achievements, and standing. Created tasks.json with today's task and day12 task data.

## Dashboard Page (/dashboard)
### Prompt 1 (Antigravity):
Create a file app/dashboard/page.tsx. Build a mobile-first student dashboard page for ABTalks 60-day coding challenge with max width 390px, dark theme, orange/amber accent colors. Import student data from @/data/student.json and task data from @/data/tasks.json. Include navbar with avatar, streak counter with fire emoji, progress bar, today's task card, achievements section, standing badge, and conditional banners for missed days and zero streak. Use Tailwind CSS only.

### Prompt 2 (Antigravity):
In app/dashboard/page.tsx, make the Today's Task card clickable. When clicked it should navigate to /day/12 using Next.js Link component.

## Challenge Day Page (/day/12)
### Prompt 1 (Antigravity):
Create a file app/day/12/page.tsx. Build a mobile-first challenge day page for ABTalks with max width 390px, dark theme matching dashboard. Import from @/data/tasks.json day12 object. Include back arrow, task title, difficulty badge, description, what to build checklist, tags, GitHub and LinkedIn URL inputs, submit button with validation, and success card on completion. Use Tailwind CSS only.

## Landing Page (/)
### Prompt 1 (Stitch):
Design a mobile-first landing page for ABTalks, a 60-day coding challenge platform for Indian college students. Dark theme with orange/amber accent colors. Include navbar, hero section with Build your coding habit Get discovered headline, stats row 500+ Students 60 Days Top Companies, feature cards Pick a Track Build Daily Get Discovered, How it Works 3 steps, two student testimonials, big orange CTA button Start Your 60-Day Journey, and footer.

### Prompt 2 (Antigravity):
Replace the content of app/page.tsx with a proper Next.js React component for ABTalks landing page with dark theme, orange colors, hero section, stats, feature cards, how it works, testimonials and footer. Use Tailwind CSS only. Make it a proper Next.js page component with export default.

## Landing Page Improvements
### Prompt 3 (Antigravity):
In app/page.tsx, add late night banner, sticky navbar with Join Now button, scrolling marquee ticker, avatar row, countdown timer, track cards, feature cards with glow effects and hover animations.

### Prompt 4 (Antigravity):
In app/page.tsx add floating particle effect, hero headline letter animation, shimmer on CTA button, count up stats animation, glowing countdown timer, typed text effect cycling through Web Developer, App Developer, AI Engineer.

### Prompt 5 (Antigravity):
Fixed parsing error in app/page.tsx - missing closing JSX tag. Fixed hero headline showing unicode characters u00A0 instead of spaces between words.

### Prompt 6 (Antigravity):
Competitor analysis between my site and abtalks-redesign-hackathon.vercel.app from a hackathon judge perspective.

### Prompt 7 (Antigravity):
Identified landing page issues — broken countdown, zero stats, missing effects, weak testimonials, no FAQ.

### Prompt 8 (Antigravity):
Fixed metadata title, countdown timer, hardcoded stats, ticker expanded to 10 items.

### Prompt 9 (Antigravity):
Restored hero section — gradient headline, rotating typed text effect, orange glow.

### Prompt 10 (Antigravity):
Re-added all visual effects — track card hover glow, timeline cards, section underlines, CTA radial glow, count-up stats, testimonial star ratings, FAQ accordion.