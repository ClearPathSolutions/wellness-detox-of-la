import type { ContentPageData, Stat } from "@/lib/content-types";

const sharedTherapies = {
  heading: "Programs & Therapies Offered",
  body: [
    "Recovery takes more than medical care. We combine proven therapies, whole-person practices, and family involvement so healing reaches every level. Every treatment plan is personal, and licensed clinicians deliver it.",
  ],
  // Cards rather than a flat bullet list — one shared object, so this satisfies
  // the same review note on all six area pages at once.
  subsections: [
    { heading: "Cognitive Behavioral Therapy (CBT)", body: "Identify harmful thought patterns and build healthier coping strategies.", icon: "spark" as const },
    { heading: "Dialectical Behavior Therapy (DBT)", body: "Emotional regulation, mindfulness, and resilience under stress.", icon: "heart" as const },
    { heading: "Individual Therapy", body: "One-on-one sessions focused on your personal history and healing.", icon: "users" as const },
    { heading: "Group Therapy", body: "Peer-supported connection and accountability in a safe space.", icon: "users" as const },
    { heading: "Family Support Programs", body: "Rebuild trust and strengthen support at home.", icon: "heart" as const },
    { heading: "Trauma-Informed Care", body: "Address unresolved trauma and reduce relapse risk.", icon: "shield" as const },
    { heading: "Holistic Healing Services", body: "Mindfulness, movement, and whole-person wellness.", icon: "leaf" as const },
    { heading: "Relapse Prevention Planning", body: "Practical tools and strategies to maintain sobriety.", icon: "check" as const },
  ],
};

type Area = {
  slug: string;
  name: string;
  h1: string;
  metaTitle: string;
  /** <=160 chars. Authored, never derived — `intro` is body prose and ran 178-246
   *  chars here, so search results truncated mid-sentence on every area page. */
  metaDescription: string;
  intro: string;
  aboutHeading: string;
  about: string[];
  whyHeading: string;
  why: string[];
  whyStats?: Stat[];
  hero: string;
};

const areas: Area[] = [
  {
    slug: "los-angeles",
    metaDescription:
      "Drug and alcohol detox and residential treatment serving Los Angeles. Licensed clinicians, 24/7 medical care, and personalized treatment plans.",
    name: "Los Angeles",
    h1: "Addiction Treatment & Detox in Los Angeles, CA",
    metaTitle: "Addiction Treatment in Los Angeles, CA",
    intro:
      "We're committed to providing exceptional drug and alcohol addiction treatment and medical detox services to individuals and families throughout the Los Angeles area, in a supportive, clinically driven environment with 24/7 professional care.",
    aboutHeading: "Leading Addiction Treatment Center in Los Angeles, California",
    about: [
      "We provide drug and alcohol detox, [residential addiction treatment](/treatment/residential), and [dual diagnosis programs](/treatment/dual-diagnosis). Every client gets a treatment plan built around their own history and needs.",
      "Our team includes licensed clinicians, nurses, and behavioral health specialists. They use proven therapies, adjusted to each person, to help recovery last.",
    ],
    whyHeading: "What Makes Wellness Detox LA a Trusted Rehab Center in Los Angeles",
    why: [
      "Our center sits in a quiet neighborhood in the greater Los Angeles area. It is private, easy to reach, and feels like a home rather than a hospital. That lets you focus on one thing: getting well, with licensed medical and behavioral health staff beside you.",
      "Our team brings more than 15 years of combined clinical experience through the Quadrant Health Group. We treat addiction and any mental health condition that comes with it, together rather than separately.",
    ],
    whyStats: [
      {
        value: "15+ years",
        label: "combined clinical expertise through the Quadrant Health Group",
      },
    ],
    hero: "/images/DSC_6218-HDR.webp",
  },
  {
    slug: "pomona",
    metaDescription:
      "Medical detox and residential addiction treatment in Pomona, CA. A warm, private setting with 24/7 clinical care and individualized treatment plans.",
    name: "Pomona",
    h1: "Detox and Addiction Treatment in Pomona, CA",
    metaTitle: "Addiction Treatment in Pomona, CA",
    intro:
      "We're proud to be part of the Pomona community, offering high-quality addiction treatment and medical detox services in a warm, compassionate setting created to provide hope and healing to individuals and families right here at home.",
    aboutHeading: "Comprehensive Drug & Alcohol Rehab Programs in Pomona",
    about: [
      "Our Pomona center sits in a quiet, easy-to-reach neighborhood. You get expert medical care in a comfortable, private setting. Our team knows this community and what people here are up against.",
      "Whether you are starting detox, moving into a residential program, or helping someone you love, we have the experience and the care to help recovery last.",
    ],
    whyHeading: "What Sets Our Pomona Treatment Center Apart",
    why: [
      "We are in a peaceful Pomona neighborhood, close to the greater Los Angeles area. It is private and easy to reach — a good place to focus fully on recovery.",
      "Our clinicians bring more than 15 years of combined experience through the Quadrant Health Group. Programs include [medical detox](/treatment/detox), [residential rehabilitation](/treatment/residential), and [dual diagnosis care](/treatment/dual-diagnosis).",
    ],
    whyStats: [
      {
        value: "15+ years",
        label: "combined experience through the Quadrant Health Group",
      },
    ],
    hero: "/images/DSC_6224-HDR.webp",
  },
  {
    slug: "north-hollywood",
    metaDescription:
      "Detox and residential addiction treatment near North Hollywood, CA. A calm, private setting with licensed clinicians and 24/7 medical support.",
    name: "North Hollywood",
    h1: "Addiction Treatment Near North Hollywood, CA",
    metaTitle: "Addiction Treatment in North Hollywood, CA",
    intro:
      "North Hollywood residents looking for high-quality addiction care turn to Wellness Detox LA for our compassionate approach and proven clinical expertise, in a private, supportive setting for detox, residential treatment, and individualized care.",
    aboutHeading: "Trusted Addiction Rehab for North Hollywood Residents",
    about: [
      "Clients from North Hollywood tell us the calm, distraction-free setting is what helps most. It lets them step away from daily pressure and focus on healing.",
      "Our licensed medical and behavioral health team offers 24/7 support, proven therapies, and a treatment plan shaped around each person.",
    ],
    whyHeading: "Why North Hollywood Residents Trust Wellness Detox LA",
    why: [
      "We are an easy drive from North Hollywood. The setting is private and structured, which is what real progress needs. You work with licensed medical and behavioral health staff who know your case.",
      "Our team brings more than 15 years of combined experience through the Quadrant Health Group. We help each person build a strong base for lasting sobriety and steadier mental health.",
    ],
    whyStats: [
      {
        value: "15+ years",
        label: "combined experience through the Quadrant Health Group",
      },
    ],
    hero: "/images/DSC_6265-HDR.webp",
  },
  {
    slug: "burbank",
    metaDescription:
      "Detox and residential addiction treatment a short drive from Burbank, CA. Licensed clinical care, dual diagnosis support, and aftercare planning.",
    name: "Burbank",
    h1: "Addiction Treatment & Detox in Burbank, CA",
    metaTitle: "Addiction Treatment in Burbank, CA",
    intro:
      "Burbank residents seeking reliable, professional addiction treatment choose Wellness Detox LA for our commitment to safety and long-term recovery success — a calm, private environment a short drive from Burbank.",
    aboutHeading: "Compassionate Detox & Addiction Treatment Near Burbank, CA",
    about: [
      "Our licensed clinical team cares for people at every stage of recovery — [medical detox](/treatment/detox), [residential treatment](/treatment/residential), and [dual diagnosis support](/treatment/dual-diagnosis). Families across Burbank rely on us.",
      "Clients point to three things: how they are treated, therapies that are proven to work, and a setting built for clarity and stability.",
    ],
    whyHeading: "Why Burbank Residents Choose Wellness Detox LA",
    why: [
      "Clients from Burbank value the calm, private setting and the close attention they get from licensed medical and behavioral health staff.",
      "We meet you wherever you are. That may mean medical detox, residential treatment, dual diagnosis support, or [aftercare planning](/treatment/aftercare) — or all of them in turn.",
    ],
    hero: "/images/DSC_6209-HDR.webp",
  },
  {
    slug: "los-angeles-county",
    metaDescription:
      "Addiction treatment for Los Angeles County: medical detox, residential care, and dual diagnosis support with 24/7 clinical oversight.",
    name: "Los Angeles County",
    h1: "Drug & Alcohol Addiction Treatment in Los Angeles County",
    metaTitle: "Addiction Treatment in Los Angeles County",
    intro:
      "Wellness Detox LA proudly serves individuals and families across Los Angeles County, offering compassionate, clinically grounded addiction treatment in a safe and supportive environment.",
    aboutHeading: "Trusted Drug & Alcohol Treatment for Los Angeles County Residents",
    about: [
      "Our licensed medical and behavioral health teams build each treatment plan around the person, using therapies proven to work. You may be starting [medical detox](/treatment/detox), moving into residential care, seeking [dual diagnosis support](/treatment/dual-diagnosis), or planning for the long term. Each stage has the structure and clinical expertise real progress needs.",
      "The facility is quiet, comfortable, and private, so you can focus on healing. Staff are attentive, medical oversight runs 24/7, and the setting is built for safety.",
    ],
    whyHeading: "Why Los Angeles County Residents Choose Wellness Detox LA",
    why: [
      "The environment is calm and private, so you can step away from distractions and focus on recovery. Medical oversight runs 24/7, plans are individual, and every staff member is licensed.",
      "We bring more than 15 years of combined experience through the Quadrant Health Group. Los Angeles County residents come to us for detox, [residential stabilization](/treatment/residential), dual diagnosis support, and long-term recovery planning.",
    ],
    whyStats: [
      {
        value: "15+ years",
        label: "combined experience within the Quadrant Health Group",
      },
    ],
    hero: "/images/DJI_20250325105814_0096_D.webp",
  },
  {
    slug: "southern-california",
    metaDescription:
      "Addiction treatment across Southern California: medical detox, residential rehab, and dual diagnosis care in a calm, private setting.",
    name: "Southern California",
    h1: "Drug & Alcohol Addiction Treatment in Southern California",
    metaTitle: "Addiction Rehab in Southern California",
    intro:
      "Wellness Detox LA proudly supports individuals and families across Southern California with high-quality, compassionate addiction treatment in a safe and restorative environment.",
    aboutHeading: "A Full Continuum of Evidence-Based Treatment",
    about: [
      "Our licensed medical and behavioral health staff build each plan around the person, using methods proven to work. Whether you are starting [medical detox](/treatment/detox), entering a residential program, or getting [dual diagnosis support](/treatment/dual-diagnosis), you get the structure and guidance that progress requires.",
      "Clients come from across Southern California for the calm setting, the 24/7 medical oversight, and a focus on sobriety that lasts.",
    ],
    whyHeading: "Why Southern California Residents Choose Wellness Detox LA",
    why: [
      "The setting is calm and private, so healing can be the only job. Plans are individual, clinical oversight runs 24/7, and the therapies are proven ones.",
      "We bring more than 15 years of combined experience through the Quadrant Health Group. Southern California residents come to us for detox, [residential stabilization](/treatment/residential), dual diagnosis support, and [relapse-prevention planning](/treatment/aftercare).",
    ],
    whyStats: [
      {
        value: "15+ years",
        label: "combined experience within the Quadrant Health Group",
      },
    ],
    // Regional page — an aerial of the actual neighbourhood with the San Gabriel
    // range behind it, rather than the stock beach photo this used to carry.
    hero: "/images/DJI_20250325105854_0099_D.webp",
  },
];

export const areaPages: ContentPageData[] = areas.map((a) => ({
  slug: a.slug,
  metaTitle: a.metaTitle,
  metaDescription: a.metaDescription,
  eyebrow: "Areas We Serve",
  h1: a.h1,
  intro: a.intro,
  hero: a.hero,
  crumb: `Areas We Serve / ${a.name}`,
  sections: [
    { heading: a.aboutHeading, body: a.about },
    sharedTherapies,
    { heading: a.whyHeading, body: a.why, ...(a.whyStats ? { stats: a.whyStats } : {}) },
  ],
  levelsOfCare: true,
  cta: { title: `Start recovery in ${a.name} today` },
}));

export function getAreaPage(slug: string) {
  return areaPages.find((p) => p.slug === slug);
}

export const areaSlugs = areaPages.map((p) => p.slug);
export const areaList = areas.map((a) => ({ slug: a.slug, name: a.name }));

/**
 * Communities served that do not have a dedicated page. Single canonical list —
 * the homepage and the Areas We Serve page previously kept two different
 * hand-maintained versions of this and contradicted each other.
 */
export const additionalCommunities: string[] = [
  "Pasadena", "Glendale", "Long Beach", "Santa Monica", "Torrance", "Beverly Hills",
  "Culver City", "Orange County", "West Covina", "El Monte", "Arcadia", "Alhambra",
  "Inglewood", "Whittier", "San Gabriel Valley", "La Puente", "Huntington Park",
  "Redondo Beach", "Manhattan Beach", "Riverside County", "Irvine", "Santa Ana",
  "Garden Grove", "Sherman Oaks", "Studio City", "West Hollywood",
  "San Bernardino County",
];
