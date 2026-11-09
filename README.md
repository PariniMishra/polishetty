# Polishetty Foundation website

One-page site for Polishetty Foundation: Hero, About Us, Our Focus, Contact Us (with an enquiry form) and Footer.

**Stack:** Next.js 16 (App Router) · React 19 · Tailwind CSS v4 · Resend (email) · hosted on Vercel.

## Run locally

```bash
npm install
npm run dev
```

Open http://localhost:3000.

When email isn't set up yet, the form still works in development: each enquiry prints in the terminal instead of being emailed.

## Where to edit things

| What | File |
| --- | --- |
| Contact email, phone, address | `src/content/site.ts` |
| Navigation links, form "Support Needed" options | `src/content/site.ts` |
| Hero text | `src/components/Hero.tsx` |
| About Us text | `src/components/About.tsx` |
| Our Focus and Our Commitment text | `src/components/Focus.tsx` |
| Contact section and form | `src/components/Contact.tsx`, `src/components/ContactForm.tsx` |
| Footer | `src/components/Footer.tsx` |
| Brand colours and fonts | `src/app/globals.css`, `src/app/layout.tsx` |
| Logo | `public/logo.png` (dark), `public/logo-light.png` (for the dark footer) |
| Browser tab icon | `src/app/icon.svg` |

Brand colours, sampled from the logo: gold `#AB8018`, near-black `#1C1D18`, off-white `#F8F8F8`. A darker gold, `#8A6612`, is used for small text so it stays readable.

## Contact form email setup (Resend)

1. Create a free account at https://resend.com and create an API key.
2. To send from the foundation's own address (for example `website@polishettyfoundation.org`), add and verify the domain in Resend → Domains. Until then, the test sender `onboarding@resend.dev` can only deliver to the email you signed up to Resend with.
3. Set these environment variables (copy `.env.example` to `.env.local` for local testing):

| Variable | Example |
| --- | --- |
| `RESEND_API_KEY` | `re_xxxxxxxx` |
| `CONTACT_EMAIL` | `contact@polishettyfoundation.org` (separate several addresses with commas) |
| `FROM_EMAIL` | `Polishetty Foundation <website@polishettyfoundation.org>` |
| `NEXT_PUBLIC_SITE_URL` | `https://polishettyfoundation.org` |

Each enquiry arrives as an email. If the person entered their email address, pressing Reply goes straight to them.

**Spam protection:** a hidden honeypot field, server-side validation, and a limit of 5 enquiries per connection every 10 minutes.

## Deploy to Vercel

1. Push this folder to a GitHub repository.
2. In Vercel, choose **Add New → Project**, import the repository and keep the default settings (Vercel detects Next.js).
3. Under **Settings → Environment Variables**, add the four variables above, then redeploy.
4. Under **Settings → Domains**, add the foundation's domain and follow the DNS instructions.

## Scripts

- `npm run dev`: start the development server
- `npm run build`: create a production build
- `npm start`: serve the production build
- `npm run lint`: type-check the code
