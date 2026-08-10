/**
 * Team roster for /about/meet-the-team.
 *
 * Two groups, deliberately kept distinct:
 *   `facilityTeam`  — staff based at the Pomona residence.
 *   `regionalTeam`  — Quadrant Health Group leadership whose remit covers this
 *                     facility alongside other Southern California centers.
 *                     Their scope is labeled in the UI so no one reads them as
 *                     Pomona-exclusive.
 *
 * `bio` paragraphs are the approved copy supplied by the network. They are
 * stored here in full even though the current cards render only name + role —
 * the roster is the source for planned per-person pages, so the copy lives with
 * the person rather than in a component.
 */

export type TeamMember = {
  /** URL-safe id; reserved for per-person pages. */
  slug: string;
  name: string;
  role: string;
  /** Path in /public. Cards fall back to initials when absent. */
  photo?: string;
  /** Approved bio, one string per paragraph. */
  bio?: string[];
};

/** Staff based at the Pomona facility. */
export const facilityTeam: TeamMember[] = [
  {
    slug: "janee-young",
    name: "Janee Young, LMFT",
    role: "Clinical Director",
    photo: "/images/team-janee-young.webp",
  },
  {
    slug: "adrian-diaz",
    name: "Adrian Diaz, RADT",
    role: "Director of Operations",
    photo: "/images/team-adrian-diaz.webp",
  },
  {
    slug: "selin-simmonds",
    name: "Selin Simmonds",
    role: "Fitness Guru",
  },
  {
    slug: "crystal-clements",
    name: "Crystal Clements",
    role: "Fitness Guru",
  },
];

/**
 * Southern California regional leadership. Each bio below states the
 * multi-facility remit explicitly, which is why the section carries a scope
 * note in the UI.
 */
export const regionalTeam: TeamMember[] = [
  {
    slug: "justin-white",
    name: "Justin White",
    role: "Program Director",
    photo: "/images/team-justin-white.webp",
    bio: [
      "Justin White serves as Program Director for Quadrant Health Group's Southern California facilities, providing operational leadership and program oversight across the organization's behavioral health treatment centers. In this role, he works closely with multidisciplinary teams to ensure each facility delivers high-quality, individualized care while maintaining excellence in clinical programming, regulatory compliance, and day-to-day operations.",
      "A Registered Addiction Counselor, Justin brings extensive experience in both detoxification and residential treatment settings. His leadership is rooted in the belief that recovery is never one-size-fits-all, and he is committed to fostering treatment environments where every client feels respected, supported, and empowered throughout their healing journey.",
      "Known for his compassionate and collaborative leadership style, Justin is passionate about developing strong teams and creating programs that promote lasting recovery. He believes meaningful change begins with genuine human connection and is dedicated to helping both clients and staff reach their fullest potential. Through his leadership, he continues to advance Quadrant Health Group's mission of providing exceptional, evidence-based behavioral healthcare across Southern California.",
    ],
  },
  {
    slug: "elizabeth-wald",
    name: "Elizabeth Wald",
    role: "Program Director",
    photo: "/images/team-elizabeth-wald.webp",
    bio: [
      "Elizabeth Wald serves as Program Director for Quadrant Health Group's Southern California facilities, where she oversees program operations, clinical coordination, and day-to-day management across the organization's behavioral health treatment centers. She works closely with multidisciplinary teams to ensure each program delivers exceptional, individualized care while maintaining the highest standards of quality, compliance, and operational excellence.",
      "Since entering the behavioral health field in 2021, Elizabeth has been an integral part of Quadrant Health Group's growth, beginning with the opening of one of its Northern California facilities. Her leadership has been instrumental in fostering compassionate, client-centered treatment environments where individuals receive personalized support throughout every stage of their recovery journey.",
      "Elizabeth's passion for behavioral healthcare is deeply rooted in her own lived experience in recovery. She believes that meaningful healing begins by meeting individuals where they are, building genuine connections, and empowering them with the tools, education, and support needed to achieve lasting recovery. Her leadership is driven by empathy, authenticity, and an unwavering commitment to helping others reclaim their lives while supporting her teams in delivering the highest level of care.",
    ],
  },
  {
    slug: "jeremiah-ross",
    name: "Jeremiah Ross",
    role: "Nursing Supervisor",
    photo: "/images/team-jeremiah-ross.webp",
    bio: [
      "Jeremiah Ross is a dedicated healthcare professional with more than 10 years of patient care experience and a strong background in substance use disorder treatment, client care coordination, and clinical team leadership. As the Nursing Supervisor, Jeremiah plays an integral role in supporting both clients and staff, helping oversee day-to-day clinical operations, medication-assisted treatment (MAT) protocols, documentation compliance, staff development, and multidisciplinary collaboration to ensure the highest standards of care.",
      "Passionate about helping individuals navigate the recovery process, Jeremiah is committed to creating a safe, supportive, and structured treatment environment where clients can build stability, develop healthy coping skills, and work toward lasting recovery. His leadership style emphasizes compassion, accountability, and teamwork, helping foster positive outcomes for both clients and clinical staff.",
    ],
  },
  {
    slug: "alanna-mcmurtrey",
    name: "Alanna McMurtrey",
    role: "Lead Case Manager",
    photo: "/images/team-alanna-mcmurtrey.webp",
    bio: [
      "Alanna McMurtrey serves as the Lead Case Manager for the Southern California facilities of Quadrant Health Group, where she oversees case management services and supports clients through detox and residential levels of care. In her role, she coordinates client care, provides leadership and clinical support to case management staff, and helps ensure that each individual receives consistent, structured, and personalized support throughout their treatment journey.",
      "With several years of experience in behavioral health and addiction treatment, Alanna has developed a strong passion for helping individuals overcome substance use disorders and co-occurring mental health challenges. She is dedicated to fostering engagement in treatment, promoting personal growth, and supporting clients as they work toward sustainable, long-term recovery.",
      "Alanna takes a client-centered, strengths-based approach to care, meeting individuals where they are and helping them build upon their unique strengths. She is committed to creating a safe, respectful, and supportive environment where clients feel heard, valued, and empowered to make meaningful changes in their lives. Through collaboration, compassion, and clinical consistency, she strives to help clients develop the skills, confidence, and stability needed to achieve lasting recovery and improved well-being.",
    ],
  },
];

/** Initials fallback for members without a photo. Drops credential suffixes. */
export function initials(name: string): string {
  return name
    .replace(/,.*$/, "")
    .split(" ")
    .map((n) => n[0])
    .filter(Boolean)
    .slice(0, 2)
    .join("")
    .toUpperCase();
}
