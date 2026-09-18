# feedphilippines.org — redesign recommendations

Source: full mirror of the live Weebly/GoDaddy Website Builder site, 2026-09-18.
22 pages, 259 images, 6 YouTube videos, 3 Google Forms, 1 PayPal button.

Everything below is drawn from extracted page text. Items marked **VERIFY**
could not be resolved from the source and must be confirmed by ROFP — they are
not guesses.

---

## 1. Why the current site reads as dated

Measured, not opinion:

| Problem | Evidence |
|---|---|
| Text baked into images | `cc9694dd64` 1920×731, `63353014c8` 1920×834, `68fbf936e4`/`57d3362ac5` 971×422, `dedff84b08` 820×312 are banner graphics with headline text inside |
| Volunteer CTA is an image | `<a href="...forms..."><img ... width:314px;height:105px"></a>` — no text, no label |
| Images unoptimised | 259 images, **114.3 MB**; sliders shipped as 1920×1080 **PNG** at 2–3 MB each |
| Absolute positioning | every element carries `position:absolute; top:…px; left:…px` — breaks on mobile, and scrambles reading order for screen readers |
| Two overlapping sliders | home slider 2 is a subset of slider 1; 5 of its 6 images repeat |
| Brand teal fails contrast | `#6fbec6` on white = **2.13:1**, below WCAG AA 4.5:1 |
| Broken link | `/missing_page.html?page=00000000-0000-0000-0000-000472050743` |

Text-in-image is the most damaging: unreadable by screen readers, invisible to
search, blurry on retina displays, and impossible to translate or edit.

## 2. Colour — brand kept, contrast fixed

`#6fbec6` stays the brand colour but moves to surfaces only. A darkened variant
carries text. Computed ratios:

| Token | Value | On white | Use |
|---|---|---|---|
| `--teal-light` | `#6fbec6` | 2.13:1 | backgrounds, borders, accents — **never text** |
| `--teal` | `#44757a` | 5.16:1 PASS | buttons, links, eyebrows |
| `--teal-deep` | `#396266` | 6.75:1 PASS | hover, donation band |
| `--ink` | `#35283c` | 13.81:1 PASS | body text |
| `--coral` | `#ff5241` | 3.21:1 FAIL | large display only |
| `--coral-deep` | `#d63a2b` | — | donate button fill |

`#348bcf` (3.66:1) and `#ff5241` (3.21:1) from the old palette cannot carry body
text. Retained as accents only.

## 3. Image framing

Fixed aspect ratios with `object-fit: cover`, so mixed source dimensions stop
dictating layout. Every slot reserves space — no layout shift.

| Slot | Ratio | Source dims that fit | Treatment |
|---|---|---|---|
| Hero | 4/3 | `f9df209328` 1680×1080, `ae0ce76b7e` 1624×1080 | rounded 14px, no text overlay |
| Slider | 16/9 | photos only — `453d7f6fac` 1440×1080, `61fbf96420` 1024×768 | caption as real HTML over gradient |
| Programme card | 4/3 | any ≥ 800px wide | cover crop, top of card |
| Team portrait | 1/1 | any | circle, max 168px |
| Gallery tile | 1/1 | any | 10px radius, grid |
| Video poster | 16/9 | YouTube `hqdefault` | facade, iframe only on click |

**Excluded from all photo slots** — these are graphics, not photography:
`efcd6bfed5` (977×59, ar 16.56), `ec2ca0216c` (321×62), `94cc6c3611` (341×71,
the wordmark), and the five text banners listed in §1. Their headline text should
be re-typeset as HTML; the banners themselves are then unnecessary.

Conversion already done: **114.3 MB → 18.1 MB WebP, 84% smaller**, max width
1920, quality 82. 258 of 259 converted; the one failure was a JSON error
response, not an image.

## 4. Slider — consolidate two into one

Old settings: `GalleryTransition: Fade`, `GallerySpeed: 4`,
`GalleryAutoStart: true`, `GalleryCaption: true`, `GalleryAutoSize: false`.

Recommendation: **one** slider, 11 unique images (union of both, duplicates
removed), keeping fade and 4s. Required additions, none of which the old one had:

- pause/play control, and auto-pause on hover and focus
- prev/next buttons as keyboard equivalents, 44×44px
- dot indicators with `aria-selected`
- static first slide under `prefers-reduced-motion`
- captions as real text, not baked into the image

## 5. Content map

All copy below is verbatim from the live site.

### Home
- **Hero** — "Feed, Nourish, Empower!" + mission line: *"Our mission is to feed
  and nourish Filipino children and engage the country in the fight to end hunger
  and malnutrition."* Two CTAs: Donate (primary) / Volunteer (ghost).
- **Stat row** — `555,932+`, `28,441+`, `201+` with labels MEALS SERVED,
  CHILDREN REACHED, COMMUNITIES FED. **VERIFY: number↔label pairing.** The source
  positions these absolutely and extraction cannot prove which number goes with
  which label.
- **Slider** — consolidated, 11 photos.
- **#SaloSalo** — "Towards A Million Meals". Body: *"Around 2 to 3 in every 10
  Filipino children suffer from stunting…"* and the landfill-communities
  paragraph. Programme aims to *"nourish 5,000 individuals for 120 days"*.
- **Videos** — 3 embeds: `bKw6jxIohUw`, `GQJK451WSzo`, `rvwLumEozWU`.
  Context given on-site: a Brigada documentary (GMA News TV) on Sitio Dumpsite,
  Antipolo; and a Food to Go feature (Singaporean show). **VERIFY: which id is
  which.**
- **#ProjectBaon / Sponsor a child** — *"Your ₱500 or $12 can sponsor the meal of
  a child for a full month!"* → PayPal.
- **Founder quote** — *"Some of them are really looking forward to just this meal
  for the day."* — Dawn Cabigon, Founder, ROFP.
- **Vision** — *"Our vision is to see every Filipino child healthy, nourished and
  empowered to reach their maximum potential for growth and learning."*

### What We Do — "Updated as of August 2025"
Three programmes, each a card with full existing copy:
1. **#ProjectBaon** — *"'Baon' is a Filipino word that means a packed meal
   lovingly prepared by parents…"*; families earning *"less than ₱200 or $4 a day"*.
2. **Summer Meals for Kids** — *"When school ends, so do many feeding programs…"*
3. **Outreach Feeding Programs** — *"More families are going hungry…"*; runs
   *"1 to 3 times a week"*.

**What we serve** — *"We are not your usual feeding program."* Three components:
Carbohydrates (rice, breads, pastas), Proteins (fish, lean meats, poultry, eggs),
Fruits and vegetables (local farmers). All follow *"the Nutritional Guidelines for
Filipinos set by the FNRI-DOST"*.

**Feeding locations** — 7 sites extracted, as a table not a positioned collage:

| Location | Contact | Beneficiaries |
|---|---|---|
| Brgy. Tarece, EFSCC, San Carlos City, Pangasinan | Ptr. Junmark Jumetilco | 50–100 |
| Sitio Pinagminahan, Brgy. San Luis, Antipolo City | Ptr. Miguel Gallo | 50–100 |
| Sitio Dumpsite, Brgy. San Luis, Antipolo City | Ptr. Miguel Gallo | 100–300 |
| San Pablo Apostol Church, Velasquez St., Tondo, Manila | Lani Torres | 50–200 |
| Batu-Batu Central School, Panglima Sugala District | Mary Ann Oliva | 50–200 |
| Brgy. Libis, Eulogio Rodriguez Jr. Ave., Quezon City | Lorena Carlos | 50–200 |
| Damayang Lagi, 205 E. Rodriguez Sr. Blvd., Quezon City | Ptr. Herald Daculais | 50–150 |

**VERIFY: region↔site mapping.** Labels `Region I`, `NCR`, `Region IV-A`, `BARMM`
appear on the page but extraction cannot prove which site each belongs to.

### Our Story
Narrative, chronological — the copy already reads as a timeline:
April 2013 vision → founders Pastor Choi Titong, Dawn Cabigon, Benedict Francisco
with Pastor Buddy Gallo (Reaching Out Christian Ministry) → **FEED RIZAL launched
June 8, 2013**, seed funding ₱10,000 from church mates and friends of Benedict in
Doha, Qatar → ~60 undernourished children as first beneficiaries → thousands of
meals per week by end of 2014 → incorporated as **Reach Out Feed Philippines Inc.,
December 2014**.

### Team
Core team, 1:1 circular portraits. Names found: **Dawn Marie F. Cabigon** (Founder,
Acting Executive Director), Chelsea Del Rosario, Miguel & Glenda Gallo,
Elmer & Xenia Diez, Christina Bustos, Benjamin Bustos.
Roles found: Regional Coordinators NCR, Regional Coordinators North Luzon,
Admin/Volunteer/Marketing Staff, Program Director, Regional Coordinator
Visayas & Mindanao.

**VERIFY: person↔role pairing.** Only Dawn Cabigon's title is unambiguous in the
source. The rest are positioned separately and cannot be paired reliably.

Programme partners: Children's Garden of the Philippines, Action International
Ministries.

### Ways to Give
Card grid, one card per route, each an outbound button:
Give Monthly · Share-A-Meal · #ProjectBaon School Meals · Donate In-Kind ·
Bank Account · Donate Now.

### Volunteer
*"It's time for us to do something! Join us and be a volunteer. Teach, cook or
serve! Get involved and let's feed more children!"*
Real button, not an image → Google Form. 3 videos: `j21_cQnuBic`,
`rvwLumEozWU`, `VaT3mF3Zlxg`.

### Contact — keep simple, no form
No form backend on GitHub Pages, and none needed. Details only:

- Reach Out Feed Philippines Inc., 27th Floor IBM Plaza Building,
  E. Rodriguez Jr. Avenue, Eastwood City, Bagumbayan 1110 Quezon City,
  NCR Second District, Philippines
- Xenia Diez — WhatsApp/Viber +639670995089
- Mae Guarina — WhatsApp/Viber +639362210501
- team@feedphilippines.org · rofpcares@feedphilippines.org

The old page promised *"you will hear back within 48-72 hours"* — drop that line
unless ROFP still commits to it, since there is no form to route.

### Campaign pages
Salo-Salo, Covid-19 Relief Operations, Typhoon Food Relief, Kamuning Donation
Drive, Summer Meals, Nourishing Not Just Feeding, News & Events, Thank You.
These carry the large photo sets (51, 42, 36, 20, 19 images) → gallery grid,
lazy-loaded below the fold.

## 6. Outbound links — canonical URLs

| Purpose | URL |
|---|---|
| Donate | PayPal `hosted_button_id=4DXRZYDAS4MKG`, `cmd=_s-xclick` |
| Volunteer form | `docs.google.com/forms/d/e/1FAIpQLSeGAEW47Q_OMSi8rGEC1PT-LIh34NfLOZkkRm-TcHAPQKzr4A/viewform` |
| Share-A-Meal form | `docs.google.com/forms/d/e/1FAIpQLSdhkX1lZ4GGe6pwcfnBgH1ahWLk7XRUnT0DqiAVBdHLlIyotA/viewform` |
| Third form | `docs.google.com/forms/d/e/1FAIpQLScrThGqahCGrAuL_fD7Q4y-RoWjYntcjxoJnKXldqAsqFH7nQ/viewform` |
| Facebook | `facebook.com/FeedPhilippines` |
| Twitter/X | `twitter.com/FeedPhilippines` |
| Instagram | `instagram.com/feedphilippines/` |

The site currently links two `goo.gl/forms/…` shorteners. Google deprecated that
shortener; both still 302 today but should be replaced with the canonical
`docs.google.com` URLs above.

## 7. Typography

Inter (UI, body) + Playfair Display (headings). Base 16px, line-height 1.65,
measure capped at 68ch. Heading scale fluid via `clamp()`.

## 8. Accessibility work this redesign must do

- every image gets real `alt`; decorative graphics get `alt=""`
- slider: pause control, keyboard prev/next, reduced-motion static fallback
- 44×44px minimum on every control
- visible 3px focus ring, never removed
- skip-to-content link
- headline text as HTML, never baked into images
- semantic document order instead of absolute positioning

## 9. Open questions for ROFP

1. Stat number↔label pairing (§5 Home)
2. Region↔feeding-site mapping (§5 What We Do)
3. Person↔role pairing for the team (§5 Team)
4. Which YouTube id is the Brigada documentary vs the Food to Go feature
5. Is the 48–72 hour response commitment still accurate
6. Current figures — page says "Updated as of August 2025"
