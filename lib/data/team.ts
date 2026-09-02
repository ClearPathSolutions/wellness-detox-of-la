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
    // Network medical oversight, shared across every Quadrant facility. The bio
    // is the approved copy from the parent site and is identical there and on
    // the other facility sites, so this page canonicals to Quadrant's — see the
    // route's metadata. Without that, 13 near-identical pages compete.
    slug: "pamela-tambini",
    name: "Dr. Pamela Tambini",
    role: "Medical Oversight",
    photo: "/images/team-pamela-tambini.webp",
    bio: [
      "Dr. Pamela Tambini is a board-certified physician in Internal Medicine and Addiction Medicine, entrepreneur, and healthcare executive dedicated to advancing evidence-based treatment for individuals with substance use and co-occurring mental health disorders. She is the Founder and Chief Executive Officer of The Sober Connection, a physician-led medical services organization that partners with behavioral healthcare facilities nationwide to provide comprehensive medical leadership, provider staffing, quality assurance, and regulatory compliance solutions.",
      "With extensive experience across the continuum of addiction treatment\u2014including medical detoxification, residential treatment, partial hospitalization, intensive outpatient, and outpatient care\u2014Dr. Tambini has developed scalable clinical programs that improve patient outcomes while helping organizations maintain regulatory excellence and operational efficiency. Her expertise includes addiction medicine, psychopharmacology, withdrawal management, medical stabilization, utilization review, physician leadership, and multi-state healthcare operations.",
      "Prior to founding The Sober Connection, Dr. Tambini served as a hospitalist within the Veterans Health Administration, where she managed medically complex patients and collaborated with multidisciplinary teams to deliver high-quality inpatient care. Her clinical expertise, combined with her operational leadership, provides a unique perspective on integrating medical excellence with sustainable healthcare systems.",
      "Under Dr. Tambini's leadership, The Sober Connection has grown into a multi-state organization supporting behavioral healthcare facilities through physician staffing, medical directorships, quality improvement initiatives, provider education, credentialing, policy development, and clinical oversight. She is recognized for building high-performing medical teams, implementing standardized clinical processes, and helping treatment centers navigate accreditation, licensing, and payer requirements.",
      "Dr. Tambini is passionate about raising the standard of addiction medicine by combining compassionate patient care with innovative operational strategies. Her leadership philosophy emphasizes clinical integrity, accountability, and collaboration, with a focus on creating systems that support both providers and the patients they serve.",
      "She remains actively involved in medical education, physician mentorship, and the ongoing advancement of best practices in behavioral healthcare while continuing to care for patients and advise organizations on clinical program development, healthcare operations, and quality improvement initiatives.",
    ],
  },
  {
    // Regional: Shawn covers every Southern California facility, not Pomona
    // alone. The staff-bios doc writes him in the first person; rendered here in
    // the third-person voice the rest of the roster uses. Facts unchanged.
    slug: "shawn-young",
    name: "Shawn Young",
    role: "Executive Director",
    photo: "/images/team-shawn-young.webp",
    bio: [
      "As Executive Director of Southern California, Shawn Young leads a team of dedicated professionals across several substance abuse treatment facilities — but at the heart of what he does is people. Whether it is helping a client take their first step toward recovery or supporting a staff member as they grow into leadership, his passion lies in developing others and building environments where people can thrive.",
      "He did not get here by accident. Shawn worked his way up through this field — from cooking in the kitchen and working as a tech, to becoming a clinician, and now serving in executive leadership. That journey gave him a deep understanding of what this work really takes: grit, heart, and an unwavering commitment to showing up for people when they need it most.",
      "Shawn believes recovery is more than just treatment. It is a lifelong journey, and his teams have the privilege of helping people build that foundation.",
      "At the end of the day, Shawn is a husband and a father. His family is his foundation and the reason he leads with heart. The way he shows up at home is how he tries to show up in this work — grounded, honest, and fully present. This isn't just a job to him; it's a calling, and he is all in.",
    ],
  },
  {
    // Regional, as above: first-person source copy rendered in third person.
    slug: "michael-mcarthur",
    name: "Michael McArthur",
    role: "Nursing Director",
    photo: "/images/team-michael-mcarthur.webp",
    bio: [
      "Michael McArthur is the Director of Nursing for Quadrant Health Group's California facilities, overseeing all medical staff and client care operations. His journey into nursing was inspired by a personal desire to provide hope and compassion during life's most challenging moments. Watching nurses care for his family during a difficult time, he realized how powerful a little hope and dedicated care can be — and knew he could make a difference when people need it most.",
      "He loves working in addiction recovery because it lets him witness clients grow and thrive within our walls. The staff's client-focused approach creates a positive, motivating environment that makes coming to work truly rewarding.",
      "Outside of his professional life, Michael is a proud father of four wonderful kids. They are his greatest inspiration, teaching him patience, resilience, and the importance of hope every day. His own recovery journey has strengthened his understanding of overcoming adversity, and it fuels his dedication to helping others find their path to healing.",
      "Michael works in this industry because he believes substance use disorder and behavioral health are underserved populations that deserve attention, compassion, and support. He is glad to be on the front lines helping to reduce stigma and provide clients with genuine opportunities for recovery.",
    ],
  },
  {
    // Listed as "Riky Hanaumi" per the requested roster; her bio opens with the
    // full "Erika “Riky” Hanaumi" as the staff-bios doc has it.
    slug: "riky-hanaumi",
    name: "Riky Hanaumi",
    role: "Clinical Director",
    photo: "/images/team-riky-hanaumi.webp",
    bio: [
      "Erika “Riky” Hanaumi is a Licensed Clinical Social Worker with more than 20 years of experience in behavioral health and addiction treatment. She serves as Clinical Director for Quadrant Health Group's California facilities, where she oversees clinical programming, mentors and supports therapists in developing effective treatment strategies, and ensures the delivery of compassionate, individualized, and clinically sound care.",
      "Riky began her career working with individuals experiencing homelessness, providing intensive support, advocacy, and resource coordination to help clients overcome barriers and access essential services. That experience fueled her passion for serving vulnerable populations and inspired her to pursue a Master of Social Work from California State University, Fullerton, which she earned in 2013.",
      "Throughout her career, Riky has worked in both inpatient and outpatient settings, providing therapy, crisis intervention, case management, and recovery-oriented services. She has extensive experience supporting adults with complex behavioral health needs, including co-occurring mental health and substance use disorders, while helping individuals navigate the challenges of recovery and major life transitions.",
      "She is trained in evidence-based treatment modalities including Cognitive Behavioral Therapy (CBT) and Dialectical Behavior Therapy (DBT), and is passionate about helping clients build resilience, strengthen coping skills, improve interpersonal relationships, and achieve lasting recovery.",
      "At the heart of Riky's work is a belief in the power of human connection and personal transformation. She is committed to empowering individuals to recognize their strengths, cultivate self-worth, and build fulfilling lives grounded in purpose, integrity, and hope.",
    ],
  },
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
    slug: "jacob-cameron",
    name: "Jacob Cameron",
    role: "Client Care Director",
    photo: "/images/team-jacob-cameron.webp",
    bio: [
      "Jacob Cameron serves as Client Care Director at Quadrant Health Group and is a Registered Substance Use Disorder Counselor (SUDCC I). Passionate about helping individuals navigate the recovery process, Jacob is dedicated to creating a treatment experience that is both meaningful and engaging. He believes lasting recovery is built through genuine connection, compassionate support, and an environment where clients feel valued every step of the way.",
      "In his role, Jacob works to ensure that each client receives personalized care and experiences a sense of belonging throughout their treatment journey. His goal is to help individuals not only achieve recovery but also discover that life in recovery can be fulfilling, rewarding, and enjoyable. Through his commitment to client-centered care, Jacob strives to make a lasting positive impact on the lives of those he serves.",
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
    // The approved headshot filename reads "Olivires"; the staff-bios doc spells
    // it Olivares and is authoritative on names.
    slug: "monica-olivares",
    name: "Monica Olivares",
    role: "Clinical Supervisor",
    photo: "/images/team-monica-olivares.webp",
    bio: [
      "Monica Olivares serves as Clinical Supervisor for Quadrant Health Group's California facilities, bringing over 11 years of experience in the behavioral health field and a deeply personal passion for recovery and healing. Throughout her career, Monica has worked across nearly every level of care — detox, residential, IOP, PHP, and outpatient — while holding a wide range of roles from Behavioral Health Technician and Case Manager to Program Manager and Program Director.",
      "Monica holds a CADC II certification and has extensive experience supporting individuals struggling with substance use disorders, co-occurring mental health conditions, and eating disorders. Her leadership style is rooted in compassion, authenticity, accountability, and connection, helping create treatment environments where clients feel genuinely supported, understood, and empowered throughout their recovery journey.",
      "In addition to her professional experience, Monica brings 13 years of personal recovery experience to the work she does each day. Her lived experience allows her to connect with clients on a deeper level while helping foster hope, trust, and meaningful change. She believes recovery should be individualized, engaging, and centered around human connection, and that healing can happen while still embracing joy, humor, and community.",
      "Known for her energy, heart, and dedication, Monica is passionate about helping both clients and staff grow while cultivating strong, supportive treatment teams across the California programs.",
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
  {
    // Network-wide alumni role, like Dr. Tambini: this is the parent's approved
    // copy, identical on every California facility site, so the route canonicals
    // to Quadrant's page rather than competing with it.
    slug: "bj-thome",
    name: "BJ Thome",
    role: "Alumni Coordinator",
    photo: "/images/team-bj-thome.webp",
    bio: [
      "BJ Thome serves as the Alumni Coordinator for Quadrant Health Group's California facilities, where his purpose is to ensure that no one feels they have to walk the road of recovery alone. His passion for this work is deeply personal. Having experienced the struggles of addiction firsthand, BJ understands both the courage it takes to begin recovery and the importance of continued support long after treatment ends.",
      "BJ focuses on building genuine, trusting relationships with clients while they are still in treatment, helping establish a sense of connection and community before they transition back into everyday life. He believes recovery does not end at discharge — and neither should the support. His goal is for every client to know they have somewhere to turn, people who understand, and a community that continues to stand behind them.",
      "Drawing from his own lived experience, BJ is passionate about meeting people where they are without judgment and reminding them that their story does not have to end where addiction once took them. He strives to make every person he encounters feel seen, heard, valued, and welcomed.",
      "For BJ, alumni coordination is about more than building a program. It is about creating lasting connection, belonging, and purpose while helping individuals stay engaged in a recovery community that genuinely wants to see them succeed.",
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
