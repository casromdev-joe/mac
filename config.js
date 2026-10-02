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
 *  4. Paste it into FORMSPREE_QUOTE_ENDPOINT and FORMSPREE_CONTACT_ENDPOINT below.
 *  5. Formspree will email every submission directly to that Gmail.
 *  ───────────────────────────────────────────────────────────────────
 *  GOOGLE MAPS EMBED:
 *  1. Go to https://www.google.com/maps
 *  2. Search for your business address.
 *  3. Click Share → Embed a map → Copy the HTML src URL.
 *  4. Paste it into GOOGLE_MAPS_EMBED_URL below.
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
  streetAddress: '[Street address here]',     // full street address
  city:          'Azusa',
  state:         'CA',
  zip:           '91702',
  founded:       '2009',
  license:       '[CSLB License #]',          // e.g. #1098765
  website:       'https://www.maccontracting.com',

  // ── BUSINESS HOURS ──────────────────────────────────────────────────
  hours: [
    { day: 'Monday – Friday', time: '7:00 AM – 5:00 PM' },
    { day: 'Saturday',        time: '8:00 AM – 2:00 PM' },
    { day: 'Sunday',          time: 'Closed'             },
  ],

  // ── STATS (hero section) ─────────────────────────────────────────────
  stats: [
    { num: '15+',  label: 'Years Experience'   },
    { num: '4',    label: 'Counties Served'     },
    { num: '500+', label: 'Projects Complete'   },
  ],

  // ── SOCIAL / REVIEW LINKS ────────────────────────────────────────────
  yelpUrl:       'https://www.yelp.com/biz/mac-contracting',

  // ── FORM ENDPOINTS (Formspree → delivers to Gmail) ─────────────────
  // See instructions at the top of this file.
  FORMSPREE_QUOTE_ENDPOINT:   'https://formspree.io/f/YOUR_FORM_ID',
  FORMSPREE_CONTACT_ENDPOINT: 'https://formspree.io/f/YOUR_FORM_ID',

  // ── GOOGLE MAPS EMBED ────────────────────────────────────────────────
  // Replace the src URL below with your own embed URL from Google Maps.
  GOOGLE_MAPS_EMBED_URL: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3305.5!2d-117.906!3d34.133!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x80c32b9c0d8c9b7f%3A0x1!2sAzusa%2C+CA!5e0!3m2!1sen!2sus!4v1',

};
