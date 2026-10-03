/**
 * ═══════════════════════════════════════════════════════════════════
 *  MAC CONTRACTING — SITE CONFIGURATION
 *  ───────────────────────────────────────────────────────────────────
 *  Edit this file to update ALL contact info, form settings, hours,
 *  and social links across the entire website.
 *
 *  HOW TO CONNECT FORMS TO GMAIL:
 *  1. Go to https://formspree.io and create a free account.
 *  2. Create a new form — enter the Gmail address you want leads sent to.
 *  3. Copy the form endpoint (looks like: https://formspree.io/f/xabc1234)
 *  4. Paste it into FORMSPREE_QUOTE_ENDPOINT below.
 *  5. Formspree will email every submission directly to that Gmail.
 *  ═══════════════════════════════════════════════════════════════════
 */

const SITE_CONFIG = {

  // ── BUSINESS INFO ──────────────────────────────────────────────────
  company:       'MAC Contracting',
  tagline:       'General Engineering Contractor',
  phone:         '(626) 388-6790',
  phoneLink:     'tel:+16263886790',          // used in <a href="tel:...">
  email:         'info@maccontracting.com',
  address:       'Azusa, CA 91702',
  city:          'Azusa',
  state:         'CA',
  zip:           '91702',
  founded:       '2014',
  website:       'https://www.maccontracting.com',

  // ── BUSINESS HOURS ──────────────────────────────────────────────────
  hours: [
    { day: 'Monday – Friday', time: '7:00 AM – 5:00 PM' },
    { day: 'Saturday',        time: '8:00 AM – 2:00 PM' },
    { day: 'Sunday',          time: 'Closed'             },
  ],

  // ── FORM ENDPOINTS (Formspree → delivers to Gmail) ─────────────────
  // See instructions at the top of this file.
  FORMSPREE_QUOTE_ENDPOINT:   'https://formspree.io/f/YOUR_FORM_ID',

};
