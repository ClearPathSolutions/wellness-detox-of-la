import Image from "next/image";
import Link from "next/link";

export function Logo({
  tone = "dark",
  className = "",
}: {
  tone?: "dark" | "light";
  className?: string;
}) {
  const isLight = tone === "light";
  return (
    <Link
      href="/"
      aria-label="Wellness Detox of LA — home"
      className={`group flex items-center gap-2.5 ${className}`}
    >
      <Image
        src={isLight ? "/images/icon-white.png" : "/images/icon-dark.png"}
        alt=""
        width={240}
        height={133}
        priority
        className="h-8 w-auto sm:h-9 transition-transform duration-300 group-hover:scale-105"
      />
      <span className="flex flex-col leading-none">
        <span
          className={`font-display font-bold tracking-[0.14em] text-[0.95rem] sm:text-base ${
            isLight ? "text-white" : "text-ink"
          }`}
        >
          WELLNESS
        </span>
        <span
          className={`font-display font-medium tracking-[0.28em] text-[0.6rem] sm:text-[0.66rem] mt-0.5 ${
            isLight ? "text-white/70" : "text-rose-dark"
          }`}
        >
          DETOX OF LA
        </span>
      </span>
    </Link>
  );
}
