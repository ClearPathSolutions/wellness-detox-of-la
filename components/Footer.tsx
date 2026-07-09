import Image from "next/image";
import Link from "next/link";
import { nav, site } from "@/lib/site";
import {
  Button,
  FacebookIcon,
  InstagramIcon,
  LinkedInIcon,
  MailIcon,
  MapPinIcon,
  PhoneIcon,
} from "./ui";

const socials = [
  { label: "Facebook", href: site.social.facebook, Icon: FacebookIcon },
  { label: "Instagram", href: site.social.instagram, Icon: InstagramIcon },
  { label: "LinkedIn", href: site.social.linkedin, Icon: LinkedInIcon },
];

export function Footer() {
  return (
    <footer className="bg-ink text-white/70">
      {/* CTA band */}
      <div className="border-b border-white/10">
        <div className="mx-auto flex max-w-[1600px] flex-col items-start gap-6 px-5 py-12 sm:px-6 lg:flex-row lg:items-center lg:justify-between lg:px-8 lg:py-14">
          <div className="max-w-xl">
            <h2 className="text-2xl text-white sm:text-3xl">Your journey to wellness begins today</h2>
            <p className="mt-3 text-white/70">
              Reach out for a confidential conversation. Our admissions team is here 24/7 to answer
              your questions and help you take the next step.
            </p>
          </div>
          <div className="flex flex-shrink-0 flex-col gap-3 sm:flex-row">
            <Button href={site.phoneHref} size="lg">
              <PhoneIcon width={18} height={18} />
              Call {site.phone}
            </Button>
            <Button href="/contact" variant="white" size="lg">
              Contact Us
            </Button>
          </div>
        </div>
      </div>

      {/* Main footer */}
      <div className="mx-auto grid max-w-[1600px] gap-10 px-5 py-14 sm:px-6 lg:grid-cols-[1.4fr_1fr_1fr_1fr] lg:px-8">
        <div>
          <Image
            src="/images/logo-white.png"
            alt={site.name}
            width={640}
            height={438}
            className="h-16 w-auto"
          />
          <p className="mt-4 max-w-xs text-sm leading-relaxed">
            A licensed drug &amp; alcohol detox and residential treatment center providing safe,
            compassionate, evidence-based care in the Los Angeles area.
          </p>
          <p className="mt-4 text-xs text-white/60">
            {site.license} · Expires {site.licenseExpires}
          </p>
          <div className="mt-5 flex items-center gap-2.5">
            {socials.map(({ label, href, Icon }) => (
              <a
                key={label}
                href={href}
                aria-label={label}
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-9 w-9 items-center justify-center rounded-full border border-white/15 text-white/70 transition-colors hover:border-rose hover:text-white"
              >
                <Icon width={17} height={17} />
              </a>
            ))}
          </div>
        </div>

        <div>
          <h3 className="mb-4 font-display text-sm font-semibold uppercase tracking-wider text-white">
            Explore
          </h3>
          <ul className="space-y-2.5 text-sm">
            {nav.map((n) => (
              <li key={n.label}>
                <Link href={n.href} className="transition-colors hover:text-white">
                  {n.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="mb-4 font-display text-sm font-semibold uppercase tracking-wider text-white">
            Programs
          </h3>
          <ul className="space-y-2.5 text-sm">
            <li><Link href="/treatment/detox" className="hover:text-white">Detox</Link></li>
            <li><Link href="/treatment/residential" className="hover:text-white">Residential Inpatient</Link></li>
            <li><Link href="/treatment/dual-diagnosis" className="hover:text-white">Dual Diagnosis</Link></li>
            <li><Link href="/treatment/aftercare" className="hover:text-white">Aftercare</Link></li>
            <li><Link href="/blog" className="hover:text-white">Blog</Link></li>
          </ul>
        </div>

        <div>
          <h3 className="mb-4 font-display text-sm font-semibold uppercase tracking-wider text-white">
            Contact
          </h3>
          <ul className="space-y-3 text-sm">
            <li>
              <a href={site.phoneHref} className="flex items-start gap-2.5 hover:text-white">
                <PhoneIcon width={16} height={16} className="mt-0.5 flex-shrink-0 text-rose" />
                {site.phone}
              </a>
            </li>
            <li>
              <a href={`mailto:${site.email}`} className="flex items-start gap-2.5 hover:text-white">
                <MailIcon width={16} height={16} className="mt-0.5 flex-shrink-0 text-rose" />
                {site.email}
              </a>
            </li>
            <li className="flex items-start gap-2.5">
              <MapPinIcon width={16} height={16} className="mt-0.5 flex-shrink-0 text-rose" />
              <span>{site.address.street}<br />{site.address.city}, {site.address.state} {site.address.zip}</span>
            </li>
          </ul>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/10">
        <div className="mx-auto flex max-w-[1600px] flex-col items-center justify-between gap-3 px-5 py-6 text-xs text-white/60 sm:flex-row sm:px-6 lg:px-8">
          <p>© {new Date().getFullYear()} {site.name}. All rights reserved.</p>
          <div className="flex items-center gap-5">
            <Link href="/privacy-policy" className="hover:text-white">Privacy Policy</Link>
            <Link href="/contact" className="hover:text-white">Contact</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
