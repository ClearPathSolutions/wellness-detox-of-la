/**
 * Central content + configuration for Wellness Detox of LA.
 * Single source of truth so pages, header, footer and metadata stay in sync.
 */

export const site = {
  name: "Wellness Detox of LA",
  shortName: "Wellness Detox LA",
  tagline: "Your Journey to Wellness Begins Today",
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
  yearsExperience: "15+",
  social: {
    facebook: "https://www.facebook.com/wellnessdetoxla",
    instagram: "https://www.instagram.com/wellnessdetoxla/",
    linkedin: "https://www.linkedin.com/company/wellness-detox-la/",
  },
  analyticsId: "GT-WP5ML73R",
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
};

export const programs: Program[] = [
  {
    title: "Alcohol & Drug Detox",
    blurb:
      "Medically supervised detox that keeps you safe and comfortable as your body clears substances, with 24/7 clinical monitoring.",
    points: ["24/7 medical monitoring", "Withdrawal management", "Comfort-focused care"],
  },
  {
    title: "Residential Inpatient",
    blurb:
      "Structured, home-like residential care that surrounds you with therapy, routine, and round-the-clock support during early recovery.",
    points: ["Structured daily routine", "Evidence-based therapy", "Safe, home-like setting"],
  },
  {
    title: "Dual Diagnosis",
    blurb:
      "Integrated treatment for addiction and co-occurring mental health conditions such as anxiety, depression, and trauma.",
    points: ["Co-occurring care", "Psychiatric support", "Whole-person healing"],
  },
  {
    title: "Aftercare Program",
    blurb:
      "Ongoing support and relapse-prevention planning that helps you carry your progress forward long after you leave.",
    points: ["Relapse prevention", "Continued support", "Long-term recovery focus"],
  },
];

export const substances: string[] = [
  "Alcohol",
  "Benzodiazepines",
  "Cocaine",
  "Fentanyl",
  "Heroin",
  "Methamphetamine",
  "Opioids",
  "Prescription Drugs",
];

export type Therapy = { title: string; blurb: string };

export const therapies: Therapy[] = [
  { title: "Cognitive Behavioral Therapy (CBT)", blurb: "Identify harmful thought patterns and build healthier coping strategies." },
  { title: "Dialectical Behavior Therapy (DBT)", blurb: "Strengthen emotional regulation and resilience under stress." },
  { title: "Individual Therapy", blurb: "One-on-one sessions focused on your personal history and healing." },
  { title: "Group Therapy", blurb: "Peer-supported accountability and connection in a safe space." },
  { title: "Family Support Programs", blurb: "Rebuild trust and communication with the people who matter most." },
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

export const featuredAreas: string[] = [
  "Los Angeles, CA",
  "North Hollywood, CA",
  "Burbank, CA",
  "Pomona, CA",
  "Orange County, CA",
  "Southern California",
];

export const moreAreas: string[] = [
  "Pasadena",
  "Beverly Hills",
  "Santa Monica",
  "San Bernardino County",
  "Long Beach",
  "Sherman Oaks",
  "Studio City",
  "West Hollywood",
];

export type GalleryImage = { src: string; alt: string };
export type GalleryCategory = { label: string; images: GalleryImage[] };

/**
 * The facility tour, organized into the same three sections as the live site.
 * These are the real professional photographs of the Pomona residence.
 */
export const galleryCategories: GalleryCategory[] = [
  {
    label: "Outdoor Spaces",
    images: [
      { src: "/images/DSC_6218-HDR.webp", alt: "The gated Spanish-style exterior of the Wellness Detox of LA residential facility in Pomona" },
      { src: "/images/DSC_6224-HDR.webp", alt: "Landscaped front lawn and walkway outside the facility" },
      { src: "/images/DSC_6289-HDR.webp", alt: "Private outdoor courtyard at the residential facility" },
      { src: "/images/DSC_6278-HDR.webp", alt: "Peaceful outdoor seating area for clients" },
      { src: "/images/DJI_20250325110211_0107_D.webp", alt: "Aerial view of the tree-lined neighborhood surrounding the facility" },
      { src: "/images/DSC_6265-HDR.webp", alt: "Sunlit patio space outside the residence" },
      { src: "/images/DJI_20250325105814_0096_D.webp", alt: "Aerial view of the Wellness Detox of LA property with the San Gabriel Mountains beyond" },
      { src: "/images/DSC_6236-HDR.webp", alt: "Exterior grounds of the residential treatment home" },
      { src: "/images/DSC_6274-HDR.webp", alt: "Quiet outdoor area for rest and reflection" },
      { src: "/images/DSC_6233-HDR.webp", alt: "Brick walkway leading to the arched front entrance across a green lawn" },
      { src: "/images/DSC_6283-HDR.webp", alt: "Landscaped backyard with a winding brick path behind the residence" },
      { src: "/images/DSC_6293-HDR.webp", alt: "Front of the home with private driveway and attached garage" },
    ],
  },
  {
    label: "Living Room & Common Spaces",
    images: [
      { src: "/images/DSC_6116-HDR.webp", alt: "Bright, comfortable shared living room inside the facility" },
      { src: "/images/DSC_6113-HDR.webp", alt: "Welcoming common area with natural light" },
      { src: "/images/DSC_6119-HDR.webp", alt: "Cozy seating in a shared common space" },
      { src: "/images/DSC_6248-HDR.webp", alt: "Open communal gathering area for clients" },
      { src: "/images/DSC_6296-HDR.webp", alt: "Relaxed lounge space for group connection" },
      { src: "/images/DSC_6257-HDR.webp", alt: "Warm, home-like interior common room" },
      { src: "/images/DSC_6268-HDR.webp", alt: "Dining and shared living space inside the residence" },
      { src: "/images/DSC_6301-HDR-1.webp", alt: "Comfortable common area designed for calm and rest" },
      { src: "/images/DSC_6302-HDR.webp", alt: "Open dining area and fully equipped kitchen with stainless appliances" },
    ],
  },
  {
    label: "Bedrooms",
    images: [
      { src: "/images/DSC_6122-HDR.webp", alt: "A bright, home-like bedroom with fresh linens and welcome amenities" },
      { src: "/images/DSC_6209-HDR.webp", alt: "Restful private bedroom with natural light" },
      { src: "/images/DSC_6254-HDR-1.webp", alt: "Comfortable client bedroom in the residential facility" },
      { src: "/images/DSC_6143-HDR-1.webp", alt: "Clean, calming bedroom prepared for a new client" },
      { src: "/images/DSC_6254-HDR.webp", alt: "Shared bedroom with two beds, dresser, and a wall-mounted television" },
    ],
  },
];

/** Curated flat mix used for the homepage tour preview. */
export const gallery: GalleryImage[] = [
  { src: "/images/DSC_6218-HDR.webp", alt: "The gated Spanish-style exterior of the Wellness Detox of LA residential facility in Pomona" },
  { src: "/images/DSC_6116-HDR.webp", alt: "Bright, comfortable shared living room inside the facility" },
  { src: "/images/DSC_6122-HDR.webp", alt: "A bright, home-like bedroom with fresh linens and welcome amenities" },
  { src: "/images/DJI_20250325105814_0096_D.webp", alt: "Aerial view of the Wellness Detox of LA property with the San Gabriel Mountains beyond" },
  { src: "/images/DSC_6265-HDR.webp", alt: "Sunlit patio space outside the residence" },
  { src: "/images/DSC_6257-HDR.webp", alt: "Warm, home-like interior common room" },
  { src: "/images/DSC_6209-HDR.webp", alt: "Restful private bedroom with natural light" },
  { src: "/images/DSC_6274-HDR.webp", alt: "Quiet outdoor area for rest and reflection" },
];
