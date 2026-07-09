import type { ContentPageData, Stat } from "@/lib/content-types";

const sharedTherapies = {
  heading: "Programs & Therapies Offered",
  body: [
    "Effective recovery requires more than medical support alone. Our Los Angeles addiction treatment center integrates evidence-based therapies, holistic practices, and family involvement to support healing on every level. Each client receives a personalized treatment plan delivered by licensed clinicians.",
  ],
  bullets: [
    "Cognitive Behavioral Therapy (CBT) — identify harmful thought patterns and build healthier coping strategies",
    "Dialectical Behavior Therapy (DBT) — emotional regulation, mindfulness, and resilience",
    "Individual Therapy — one-on-one sessions focused on personal healing",
    "Group Therapy — peer-supported connection and accountability",
    "Family Support Programs — rebuild trust and strengthen support at home",
    "Trauma-Informed Care — address unresolved trauma and reduce relapse risk",
    "Holistic Healing Services — mindfulness, movement, and whole-person wellness",
    "Relapse Prevention Planning — tools and strategies to maintain sobriety",
  ],
};

type Area = {
  slug: string;
  name: string;
  h1: string;
  metaTitle: string;
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
    name: "Los Angeles",
    h1: "Addiction Treatment & Detox in Los Angeles, CA",
    metaTitle: "Addiction Treatment in Los Angeles, CA | Wellness Detox LA",
    intro:
      "We're committed to providing exceptional drug and alcohol addiction treatment and medical detox services to individuals and families throughout the Los Angeles area, in a supportive, clinically driven environment with 24/7 professional care.",
    aboutHeading: "Leading Addiction Treatment Center in Los Angeles, California",
    about: [
      "We specialize in drug and alcohol detox, residential addiction treatment, and dual diagnosis programs, ensuring every client receives a treatment plan tailored to their unique needs.",
      "Our team of licensed clinicians, nurses, and behavioral health specialists uses proven therapeutic approaches and individualized care to help clients achieve long-term, sustainable recovery.",
    ],
    whyHeading: "What Makes Wellness Detox LA a Trusted Rehab Center in Los Angeles",
    why: [
      "Our treatment center, set in a quiet, easily accessible neighborhood within the greater Los Angeles area, offers the ideal balance of privacy, accessibility, and warmth. Clients can fully focus on their recovery in a home-like atmosphere supported by a dedicated team of licensed medical and behavioral health professionals.",
      "With more than 15 years of combined clinical expertise through the Quadrant Health Group, our team delivers evidence-based care that addresses both addiction and co-occurring mental health needs.",
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
    name: "Pomona",
    h1: "Detox and Addiction Treatment in Pomona, CA",
    metaTitle: "Addiction Treatment in Pomona, CA | Wellness Detox LA",
    intro:
      "We're proud to be part of the Pomona community, offering high-quality addiction treatment and medical detox services in a warm, compassionate setting created to provide hope and healing to individuals and families right here at home.",
    aboutHeading: "Comprehensive Drug & Alcohol Rehab Programs in Pomona",
    about: [
      "Located in a quiet, accessible neighborhood, our Pomona rehab center combines expert medical care with the comfort and privacy clients deserve. Our dedicated team understands the challenges faced by our local community and is committed to guiding each person toward a healthier, substance-free life.",
      "Whether you're beginning detox, continuing treatment through a residential program, or supporting a loved one, Wellness Detox LA offers the resources, experience, and heart to make lasting recovery possible.",
    ],
    whyHeading: "What Sets Our Pomona Treatment Center Apart",
    why: [
      "Our rehab center, located in a peaceful Pomona neighborhood with convenient access to the greater Los Angeles area, offers both accessibility and privacy — making it the ideal place to focus entirely on recovery.",
      "With more than 15 years of combined experience through the Quadrant Health Group, our clinicians deliver evidence-based addiction treatment programs that include medical detox, residential rehabilitation, and dual diagnosis care.",
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
    name: "North Hollywood",
    h1: "Addiction Treatment Near North Hollywood, CA",
    metaTitle: "Addiction Treatment in North Hollywood, CA | Wellness Detox LA",
    intro:
      "North Hollywood residents looking for high-quality addiction care turn to Wellness Detox LA for our compassionate approach and proven clinical expertise, in a private, supportive setting for detox, residential treatment, and individualized care.",
    aboutHeading: "Trusted Addiction Rehab for North Hollywood Residents",
    about: [
      "Our many clients from North Hollywood appreciate our calm, distraction-free environment, which allows them to step away from daily pressures and fully focus on healing.",
      "Our licensed medical and behavioral health team offers personalized treatment plans, 24/7 support, and evidence-based therapies tailored to each person's needs.",
    ],
    whyHeading: "Why North Hollywood Residents Trust Wellness Detox LA",
    why: [
      "Our treatment center, located within convenient reach of North Hollywood, offers the privacy and structure required for meaningful progress. Clients receive individualized attention from licensed medical and behavioral health professionals.",
      "With more than 15 years of combined experience through the Quadrant Health Group, our team is dedicated to helping every person build a strong foundation for lasting sobriety and emotional well-being.",
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
    name: "Burbank",
    h1: "Addiction Treatment & Detox in Burbank, CA",
    metaTitle: "Addiction Treatment in Burbank, CA | Wellness Detox LA",
    intro:
      "Burbank residents seeking reliable, professional addiction treatment choose Wellness Detox LA for our commitment to safety and long-term recovery success — a calm, private environment a short drive from Burbank.",
    aboutHeading: "Compassionate Detox & Addiction Treatment Near Burbank, CA",
    about: [
      "Our licensed clinical team delivers personalized care across every stage of recovery, including medical detox, residential treatment, and dual diagnosis support — making us a trusted resource for individuals and families throughout the Burbank community.",
      "Clients appreciate our compassionate approach, evidence-based therapies, and a treatment setting designed to promote clarity, stability, and lasting sobriety.",
    ],
    whyHeading: "Why Burbank Residents Choose Wellness Detox LA",
    why: [
      "Clients from Burbank appreciate our calm, private setting and the focused attention provided by licensed medical and behavioral health professionals.",
      "We meet you where you are in your journey, offering medical detox, residential treatment, dual diagnosis support, and aftercare planning to guide clients through every stage of recovery.",
    ],
    hero: "/images/DSC_6209-HDR.webp",
  },
  {
    slug: "los-angeles-county",
    name: "Los Angeles County",
    h1: "Drug & Alcohol Addiction Treatment in Los Angeles County",
    metaTitle: "Addiction Treatment in Los Angeles County | Wellness Detox LA",
    intro:
      "Wellness Detox LA proudly serves individuals and families across Los Angeles County, offering compassionate, clinically grounded addiction treatment in a safe and supportive environment.",
    aboutHeading: "Trusted Drug & Alcohol Treatment for Los Angeles County Residents",
    about: [
      "Our licensed medical and behavioral health teams create personalized treatment plans using evidence-based therapeutic approaches. Whether someone is beginning medical detox, transitioning into residential care, seeking dual diagnosis support, or preparing for long-term recovery planning, we offer the structure, guidance, and clinical expertise needed for meaningful progress.",
      "Our facility provides the peace, comfort, and privacy required to fully focus on healing — with attentive staff, 24/7 medical oversight, and a setting that promotes safety and stability.",
    ],
    whyHeading: "Why Los Angeles County Residents Choose Wellness Detox LA",
    why: [
      "We offer a calm, private environment that allows clients to step away from distractions and focus entirely on recovery, with 24/7 medical oversight, individualized treatment planning, and a staff of licensed professionals.",
      "With more than 15 years of combined experience within the Quadrant Health Group, Wellness Detox LA is a trusted resource for Los Angeles County residents seeking detox, residential stabilization, dual diagnosis support, and long-term recovery planning.",
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
    name: "Southern California",
    h1: "Drug & Alcohol Addiction Treatment in Southern California",
    metaTitle: "Addiction Rehab in Southern California | Wellness Detox LA",
    intro:
      "Wellness Detox LA proudly supports individuals and families across Southern California with high-quality, compassionate addiction treatment in a safe and restorative environment.",
    aboutHeading: "A Full Continuum of Evidence-Based Treatment",
    about: [
      "Our licensed medical and behavioral health professionals create personalized treatment plans using evidence-based therapeutic methods. Whether a client is beginning medical detox, entering a residential program, or receiving dual diagnosis support, we provide the structure and professional guidance required to make meaningful progress.",
      "Clients from all parts of Southern California appreciate our calm therapeutic setting, 24/7 medical oversight, and commitment to long-term sobriety.",
    ],
    whyHeading: "Why Southern California Residents Choose Wellness Detox LA",
    why: [
      "We offer a calm, private environment where clients can focus entirely on their healing, with individualized treatment plans, 24/7 clinical oversight, and evidence-based therapeutic care.",
      "Backed by more than 15 years of combined experience within the Quadrant Health Group, Wellness Detox LA is a trusted resource for Southern California residents seeking detox, residential stabilization, dual diagnosis support, and ongoing relapse-prevention planning.",
    ],
    whyStats: [
      {
        value: "15+ years",
        label: "combined experience within the Quadrant Health Group",
      },
    ],
    hero: "/images/nature-wide.webp",
  },
];

export const areaPages: ContentPageData[] = areas.map((a) => ({
  slug: a.slug,
  metaTitle: a.metaTitle,
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
