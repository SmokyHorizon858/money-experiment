# The $10 Experiment

A transparent, student-run internet and technology experiment built with Vue 3 and Vite.

## Local development

```sh
npm install
npm run dev
```

Open the local URL printed by Vite, normally `http://localhost:5173`.

## Production check

```sh
npm run build
npm run preview
```

The production-ready files are generated in `dist/`.

## Updating public progress

Edit `src/data/projectStats.js` after verifying a real payment:

- `supporterCount`: total number of verified supporters
- `amountRaised`: total amount received in US dollars
- `publicSupporters`: only people who explicitly agreed to appear publicly
- `showDemoSupporters`: keep `true` during development; set to `false` before launch

Do not infer a successful payment from a thank-you-page visit. For V1, confirm the
payment in Stripe before updating these numbers manually.

## Connecting Stripe Checkout

1. Copy `.env.example` to `.env`.
2. Replace the example value with your Stripe-hosted Payment Link.
3. Restart `npm run dev` after changing `.env`.

Vite exposes variables prefixed with `VITE_` to browser code. Never put a Stripe
secret API key, password, bank information, or other private credential in a
`VITE_` variable. The local `.env` file is ignored by Git.

## Vercel deployment

Vercel should detect this as a Vite project and use:

- Build command: `npm run build`
- Output directory: `dist`
- Environment variable: `VITE_STRIPE_PAYMENT_LINK`

`vercel.json` rewrites direct page requests such as `/thank-you` to the Vue app,
where Vue Router selects the correct view.
