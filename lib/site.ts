/**
 * Central content + configuration for Wellness Detox of LA.
 * Single source of truth so pages, header, footer and metadata stay in sync.
 */

export const site = {
  name: "Wellness Detox of LA",
  shortName: "Wellness Detox LA",
  description:
    "Wellness Detox of LA is a licensed drug & alcohol detox and residential treatment center in the Los Angeles area. Safe, compassionate, evidence-based care.",
  url: "https://wellnessdetoxla.com",
  phone: "866-591-0888",
  phoneHref: "tel:+18665910888",
  email: "info@wellnessdetoxla.com",
  address: {
    street: "625 E Phillips Blvd",
    city: "Pomona",
    state: "CA",
    zip: "91766",
    full: "625 E Phillips Blvd, Pomona, CA 91766",
  },
  license: "DHCS License #191425AP",
  licenseExpires: "4/30/2027",
  network: "Quadrant Health Group",
  /** Parent network site. The network is named 20+ times across the site and the
   *  "15+ years" claim rests on it, so the affiliation is linked rather than
   *  merely asserted. */
  networkUrl: "https://quadranthealthgroup.com",
  yearsExperience: "15+",
  social: {
    facebook: "https://www.facebook.com/wellnessdetoxla",
    instagram: "https://www.instagram.com/wellnessdetoxla/",
    linkedin: "https://www.linkedin.com/company/wellness-detox-la/",
  },
  analyticsId: "GT-WP5ML73R",
  /** Google Tag Manager container. Loaded by components/Analytics.tsx behind the
   *  same consent gate as gtag — see the note there on why it is not in <head>. */
  gtmId: "GTM-PFMWPSWC",
  widgets: {
    // Clarion Labs — chat widget + insurance/contact form capture.
    // Keys pulled from this site's Clarion snippet.
    clarion: {
      siteKey: "cpx_z3FKaToYcnTHoiq_DkjggXUUisaY3zfA",
      api: "https://api.clarionlabs.ai",
    },
  },
} as const;

export type NavChild = { label: string; href: string };
export type NavGroup = { heading: string; items: NavChild[] };
export type NavItem = {
  label: string;
  href: string;
  groups?: NavGroup[];
};

export const nav: NavItem[] = [
  {
    label: "About",
    href: "/about",
    groups: [
      {
        heading: "About Us",
        items: [
          { label: "Our Story", href: "/about/our-story" },
          { label: "Meet the Team", href: "/about/meet-the-team" },
          { label: "Blog", href: "/blog" },
        ],
      },
      {
        heading: "Areas We Serve",
        items: [
          { label: "Los Angeles, CA", href: "/about/areas-we-serve/los-angeles" },
          { label: "Pomona, CA", href: "/about/areas-we-serve/pomona" },
          { label: "North Hollywood, CA", href: "/about/areas-we-serve/north-hollywood" },
          { label: "Burbank, CA", href: "/about/areas-we-serve/burbank" },
          { label: "Los Angeles County", href: "/about/areas-we-serve/los-angeles-county" },
          { label: "Southern California", href: "/about/areas-we-serve/southern-california" },
        ],
      },
    ],
  },
  {
    label: "Treatment",
    href: "/treatment",
    groups: [
      {
        heading: "Programs",
        items: [
          { label: "Alcohol & Drug Detox", href: "/treatment/detox" },
          { label: "Residential Inpatient", href: "/treatment/residential" },
          { label: "Dual Diagnosis", href: "/treatment/dual-diagnosis" },
          { label: "Aftercare Program", href: "/treatment/aftercare" },
        ],
      },
      {
        heading: "What We Treat",
        items: [
          { label: "Alcohol Addiction", href: "/treatment/alcohol-addiction" },
          { label: "Benzodiazepine Addiction", href: "/treatment/benzo-addiction" },
          { label: "Cocaine Addiction", href: "/treatment/cocaine-addiction" },
          { label: "Fentanyl Addiction", href: "/treatment/fentanyl-addiction" },
          { label: "Heroin Addiction", href: "/treatment/heroin-addiction" },
          { label: "Meth Addiction", href: "/treatment/meth-addiction" },
          { label: "Opioid Addiction", href: "/treatment/opioid-addiction" },
          { label: "Prescription Drugs", href: "/treatment/prescription-drug-addiction" },
        ],
      },
      {
        heading: "Therapies",
        items: [
          { label: "Individual Therapy", href: "/treatment/individual-therapy" },
          { label: "Group Therapy", href: "/treatment/group-therapy" },
          { label: "Family Therapy", href: "/treatment/family-therapy" },
        ],
      },
    ],
  },
  { label: "Tour", href: "/tour" },
  {
    label: "Admissions",
    href: "/admissions",
    groups: [
      {
        heading: "Get Help",
        items: [
          { label: "Get Help For Yourself", href: "/admissions/help-for-yourself" },
          { label: "Get Help For a Loved One", href: "/admissions/help-for-loved-one" },
          { label: "Admissions Process", href: "/admissions/admissions-process" },
        ],
      },
      {
        heading: "Resources",
        items: [
          { label: "Verify Your Insurance", href: "/admissions/verify-your-insurance" },
          { label: "Substance Addiction FAQ", href: "/admissions/addiction-faq" },
          { label: "Admissions & Insurance FAQ", href: "/admissions/insurance-admissions-faq" },
          { label: "Addiction Treatment FAQ", href: "/admissions/treatment-faq" },
        ],
      },
    ],
  },
  { label: "Contact", href: "/contact" },
];

export type Program = {
  title: string;
  blurb: string;
  points: string[];
  /** Route slug under /treatment. Lives on the object so reordering `programs`
   *  can never silently repoint a card at the wrong page. */
  slug: string;
};

export const programs: Program[] = [
  {
    title: "Alcohol & Drug Detox",
    slug: "detox",
    blurb:
      "Medically supervised detox that keeps you safe and comfortable as your body clears substances, with 24/7 clinical monitoring.",
    points: ["24/7 medical monitoring", "Withdrawal management", "Comfort-focused care"],
  },
  {
    title: "Residential Inpatient",
    slug: "residential",
    blurb:
      "Structured, home-like residential care that surrounds you with therapy, routine, and round-the-clock support during early recovery.",
    points: ["Structured daily routine", "Evidence-based therapy", "Safe, home-like setting"],
  },
  {
    title: "Dual Diagnosis",
    slug: "dual-diagnosis",
    blurb:
      "Integrated treatment for addiction and co-occurring mental health conditions such as anxiety, depression, and trauma.",
    points: ["Co-occurring care", "Psychiatric support", "Whole-person healing"],
  },
  {
    title: "Aftercare Program",
    slug: "aftercare",
    blurb:
      "Ongoing support and relapse-prevention planning that helps you carry your progress forward long after you leave.",
    points: ["Relapse prevention", "Continued support", "Long-term recovery focus"],
  },
];

export type Substance = { name: string; slug: string };

/** Slug travels with the name so renaming a label cannot break its link. */
export const substances: Substance[] = [
  { name: "Alcohol", slug: "alcohol-addiction" },
  { name: "Benzodiazepines", slug: "benzo-addiction" },
  { name: "Cocaine", slug: "cocaine-addiction" },
  { name: "Fentanyl", slug: "fentanyl-addiction" },
  { name: "Heroin", slug: "heroin-addiction" },
  { name: "Methamphetamine", slug: "meth-addiction" },
  { name: "Opioids", slug: "opioid-addiction" },
  { name: "Prescription Drugs", slug: "prescription-drug-addiction" },
];

/** `slug` only where a dedicated /treatment page exists; the rest are descriptive. */
export type Therapy = { title: string; blurb: string; slug?: string };

export const therapies: Therapy[] = [
  { title: "Cognitive Behavioral Therapy (CBT)", blurb: "Identify harmful thought patterns and build healthier coping strategies." },
  { title: "Dialectical Behavior Therapy (DBT)", blurb: "Strengthen emotional regulation and resilience under stress." },
  { slug: "individual-therapy", title: "Individual Therapy", blurb: "One-on-one sessions focused on your personal history and healing." },
  { slug: "group-therapy", title: "Group Therapy", blurb: "Peer-supported accountability and connection in a safe space." },
  { slug: "family-therapy", title: "Family Support Programs", blurb: "Rebuild trust and communication with the people who matter most." },
  { title: "Trauma-Informed Care", blurb: "Address the unresolved trauma that often underlies addiction." },
  { title: "Holistic Healing Services", blurb: "Mindfulness and wellness practices that restore mind and body." },
  { title: "Relapse Prevention Planning", blurb: "Practical tools and a clear plan for maintaining lasting sobriety." },
];

export type Principle = { title: string; blurb: string };

export const principles: Principle[] = [
  { title: "Compassion First", blurb: "Every person is met with dignity, empathy, and respect from the first call." },
  { title: "Clinical Excellence", blurb: "Evidence-based treatment delivered by an experienced medical and clinical team." },
  { title: "Personalized Treatment", blurb: "Care plans built around your history, needs, and goals — never one-size-fits-all." },
  { title: "Integrity & Trust", blurb: "Honest guidance and transparent information at every step of the journey." },
  { title: "Lasting Recovery Focus", blurb: "We build the skills and support systems that sustain recovery for the long term." },
];

export type AdmissionStep = { step: string; title: string; blurb: string };

export const admissionSteps: AdmissionStep[] = [
  {
    step: "01",
    title: "Initial Call & Assessment",
    blurb:
      "Speak with an admissions specialist to discuss your situation, history, and treatment needs — confidentially and without pressure.",
  },
  {
    step: "02",
    title: "Insurance Verification",
    blurb:
      "We handle insurance verification for you, explain your coverage, and review financial options so there are no surprises.",
  },
  {
    step: "03",
    title: "Pre-Admission Planning",
    blurb:
      "We provide clear guidance on what to expect before you arrive, so you feel prepared and supported every step of the way.",
  },
  {
    step: "04",
    title: "Admission Day & Arrival",
    blurb:
      "On arrival you'll meet with compassionate staff who welcome you, settle you in, and begin your personalized care.",
  },
];

export type GalleryImage = { src: string; alt: string };
export type GalleryCategory = { label: string; images: GalleryImage[] };

/**
 * The facility tour, organized into the same three sections as the live site.
 * These are the real professional photographs of the Pomona residence.
 *
 * Alt text describes what is actually in each frame. Several entries previously
 * described a different room than the photograph showed (three kitchens labelled
 * as lounges, a building facade labelled a patio, and an outdoor lawn labelled an
 * interior dining space) — corrected against the source shoot.
 */
export const galleryCategories: GalleryCategory[] = [
  {
    label: "Outdoor Spaces",
    images: [
      { src: "/images/DSC_6233-HDR.webp", alt: "Brick walkway leading to the arched front entrance across a green lawn" },
      { src: "/images/DSC_6265-HDR.webp", alt: "Front elevation of the residence with its arched entry and stone detailing" },
      { src: "/images/DSC_6218-HDR.webp", alt: "The gated Spanish-style exterior of the Wellness Detox of LA residential facility in Pomona" },
      { src: "/images/DSC_6278-HDR.webp", alt: "Shaded pergola and picnic table on the back lawn" },
      { src: "/images/DSC_6274-HDR.webp", alt: "Back lawn and garden path beside the residence" },
      { src: "/images/DJI_20250325105814_0096_D.webp", alt: "Aerial view of the Wellness Detox of LA property with the San Gabriel Mountains beyond" },
    ],
  },
  {
    label: "Living, Dining & Common Spaces",
    images: [
      { src: "/images/DSC_6116-HDR.webp", alt: "Bright, comfortable shared living room with a fireplace and wall-mounted television" },
      { src: "/images/DSC_6257-HDR.webp", alt: "The same living room from the opposite corner, with sofas around a low table" },
      { src: "/images/DSC_6248-HDR.webp", alt: "Group therapy room set with armchairs arranged in a circle" },
      { src: "/images/DSC_6302-HDR.webp", alt: "Dining table and open kitchen beside the doors to the garden" },
      { src: "/images/DSC_6119-HDR.webp", alt: "Shared kitchen with breakfast bar, dishwasher, and gas range" },
      { src: "/images/DSC_6296-HDR.webp", alt: "Second kitchen with a full-size range, refrigerator, and generous counter space" },
    ],
  },
  {
    label: "Bedrooms",
    images: [
      { src: "/images/DSC_6122-HDR.webp", alt: "A bright, home-like bedroom with fresh linens and welcome amenities" },
      { src: "/images/DSC_6209-HDR.webp", alt: "Sunlit bedroom with two beds and a bedside table between the windows" },
      { src: "/images/DSC_6143-HDR-1.webp", alt: "Bedroom with two beds, a tall wooden dresser, and a wall-mounted television" },
      { src: "/images/DSC_6254-HDR.webp", alt: "Shared bedroom with two beds and a dresser beside the window" },
    ],
  },
];

/** Curated flat mix used for the homepage tour preview. */
export const gallery: GalleryImage[] = [
  { src: "/images/DSC_6233-HDR.webp", alt: "Brick walkway leading to the arched front entrance across a green lawn" },
  { src: "/images/DSC_6116-HDR.webp", alt: "Bright, comfortable shared living room with a fireplace and wall-mounted television" },
  { src: "/images/DSC_6122-HDR.webp", alt: "A bright, home-like bedroom with fresh linens and welcome amenities" },
  { src: "/images/DJI_20250325105814_0096_D.webp", alt: "Aerial view of the Wellness Detox of LA property with the San Gabriel Mountains beyond" },
  { src: "/images/DSC_6302-HDR.webp", alt: "Open dining area and fully equipped kitchen with stainless appliances" },
  { src: "/images/DSC_6257-HDR.webp", alt: "Warm, home-like common room with sectional seating" },
  { src: "/images/DSC_6209-HDR.webp", alt: "Bedroom with two beds and warm natural light" },
  { src: "/images/DSC_6274-HDR.webp", alt: "Quiet outdoor area for rest and reflection" },
];
