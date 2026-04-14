# THECOLECTION

Portfolio and booking website for Cole — a creative director specializing in musical, authentic, and atmospheric visual imagery.

## Overview

THECOLECTION is a static HTML/CSS/JS website that showcases Cole's creative work across branding, UI/UX design, photography, videography, and event coverage. It includes a home page, a filterable projects gallery, individual project case-study pages, and a contact/booking page.

## Pages

| File | Description |
|---|---|
| `index.html` | Home — hero, about, services, stats, pricing, and CTA |
| `projects.html` | Filterable project gallery |
| `contact.html` | Contact form + booking info |
| `jcole.html` | Project: J. Cole shoot |
| `misstsu.html` | Project: Miss Tsu |
| `paperchasers.html` | Project: Real Paper Chasers |
| `mscarter.html` | Project: Ms. Carter |
| `egypt.html` | Project: Egypt |
| `octoberlondon.html` | Project: October London |

## Tech Stack

- **HTML5** — semantic markup, no framework
- **CSS3** — single stylesheet at `css/style.css` (~2,200 lines), custom properties, responsive grid
- **Vanilla JS** — `js/main.js`; handles nav, scroll animations, project filtering, and contact form UX
- **Google Fonts** — Cormorant Garamond (display) + Inter (body)
- No build tools, no dependencies, no package manager required

## Project Structure

```
The Colection/
├── index.html
├── projects.html
├── contact.html
├── jcole.html
├── misstsu.html
├── paperchasers.html
├── mscarter.html
├── egypt.html
├── octoberlondon.html
├── css/
│   └── style.css
├── js/
│   └── main.js
└── images/
    └── *.webp / *.jpg / *.avif
```

## Running Locally

No build step needed. Open any HTML file directly in a browser, or serve the folder with any static file server:

```bash
# Python
python3 -m http.server 8080

# Node (npx)
npx serve .
```

Then visit `http://localhost:8080`.

## Booking & Contact

- **Email:** thecolectionprod@gmail.com
- **Booking form:** [form.jotform.com/253236239169058](https://form.jotform.com/253236239169058)
- Response time: within 24–48 hours

### Pricing (quick reference)

| Service | Rate |
|---|---|
| Solo / Small Group | $150 / hr |
| Events | $225 / hr |

A 50% deposit is required to confirm all bookings.

> **Note:** The "Send a Message" form on `contact.html` is currently a UI placeholder. On submit it redirects to the Jotform booking link rather than sending an email. To wire up real email delivery, integrate a service such as [Formspree](https://formspree.io) or [EmailJS](https://www.emailjs.com).
