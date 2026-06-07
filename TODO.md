# UI/UX Consistency Refactor — Checklist

- [x] Step 1: Update `frontend/src/index.css` with design tokens (radii, borders, shadows, focus ring, button/card/input styles).

- [x] Step 2: Update shared UI components to use standardized classes:
  - [ ] `frontend/src/components/DashboardLayout.jsx`
  - [x] `frontend/src/components/StatsCard.jsx`
  - [x] `frontend/src/components/TransactionCard.jsx`
  - [x] `frontend/src/components/PulseCard.jsx`
  - [x] `frontend/src/components/QuickActions.jsx`
  - [ ] `frontend/src/components/LanguageToggle.jsx` (as needed)

- [x] Step 3: Normalize page-level UI containers and headings:
  - [ ] `frontend/src/pages/LandingPage.jsx`
  - [ ] `frontend/src/pages/Dashboard.jsx`
  - [ ] `frontend/src/pages/AIInsights.jsx`
  - [ ] `frontend/src/pages/ReceiptScanner.jsx`
  - [ ] `frontend/src/pages/InvoiceDetails.jsx`
  - [ ] `frontend/src/pages/Settings.jsx`

- [ ] Step 4: Improve responsiveness + alignment across mobile/tablet/desktop (no layout breaking).
- [ ] Step 5: Add consistent focus-visible rings and improve contrast for tags/badges.
- [ ] Step 6: Polish loading/empty/error/success states (visual alignment with design system).
- [x] Step 7: Run `frontend` build/lint and do quick manual QA.
