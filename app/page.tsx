import Container from "@/components/container";
import PageTitle from "@/components/page-title";
import Image from "next/image";

export const metadata = {
  title: "About Nuwa AI",
  description:
    "Open Economy Layer for AI. At Nuwa AI, we are building the foundational payment systems for AI agents.",
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    title: "About Nuwa AI",
    description:
      "Open Economy Layer for AI. At Nuwa AI, we are building the foundational payment systems for AI agents.",
    url: "/",
  },
};

// Project cards: linkable items with optional logo assets and graceful fallback
const PROJECTS = [
  {
    title: "Nuwa AI",
    href: "https://nuwa.dev",
    description:
      "Open AI capability community and marketplace. LLM and MCP payment enabled with Payment Channel.",
    logoLight: "/logo/light.svg",
    logoDark: "/logo/dark.svg",
    initials: "NA",
  },
  {
    title: "x402ai.app",
    href: "https://x402ai.app",
    description:
      "Open AI capability community and marketplace. Payments enabled by x402 protocol.",
    // Use the Nuwa AI logo for this project as requested
    logoLight: "/logo/light.svg",
    logoDark: "/logo/dark.svg",
    initials: "x402ai",
  },
  {
    title: "x402x.dev",
    href: "https://x402x.dev",
    description:
      "x402x (short for x402-exec) extends the original x402 payments protocol, and enables Gas-Free and Approval-Free smart contract interactions and DApps.",
    // Use the same logo for light/dark modes
    logoLight: "/projects/x402x.svg",
    logoDark: "/projects/x402x.svg",
    initials: "x402x",
  },
];

export default function AboutPage() {
  return (
    <Container>
      <PageTitle
        title="About Nuwa AI"
        description="Open Economy Layer for AI"
      />
      <section className="mx-auto mt-12 max-w-3xl space-y-6 text-lg leading-relaxed text-gray-600 dark:text-gray-300">
        <p>
          The future of AI isn&apos;t just about adding more agent apps —
          <span className="font-bold">
            it&apos;s about enabling agents to collaborate seamlessly on your
            behalf.
          </span>{" "}
          Achieving this vision depends on two core infrastructures:{" "}
          <span className="font-bold">Identity and Payment</span>. Nuwa AI
          delivers the open economic layer that brings this to life.
        </p>
        <p>
          <span className="font-bold">
            At Nuwa AI we are building the foundational payment systems for AI
            agents.{" "}
          </span>
          Below is the active stack of Nuwa AI projects. They evolve frequently,
          so expect fast iteration, shipped-in-public updates, and pragmatic
          focus on what unblocks contributors right now.
        </p>
      </section>

      <section className="mx-auto mt-12 grid max-w-5xl gap-6 lg:grid-cols-3">
        {PROJECTS.map((p) => (
          <a
            key={p.title}
            href={p.href}
            target="_blank"
            rel="noopener noreferrer"
            className="group block rounded-2xl border border-gray-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:border-gray-900 dark:border-gray-800 dark:bg-gray-900"
          >
            {/* Row 1: Logo (bigger, full logo if available) */}
            <div className="flex h-12 items-center justify-start">
              <ProjectLogo
                title={p.title}
                light={p.logoLight}
                dark={p.logoDark}
                initials={p.initials ?? p.title[0]}
              />
            </div>

            {/* Row 2: Project name */}
            <h3 className="mt-4 text-xl font-semibold text-gray-900 transition-colors group-hover:text-gray-700 dark:text-white dark:group-hover:text-gray-100">
              {p.title}
            </h3>

            {/* Row 3: Description */}
            <p className="mt-2 text-base text-gray-600 dark:text-gray-300">
              {p.description}
            </p>
          </a>
        ))}
      </section>
    </Container>
  );
}

// Lightweight logo renderer: prefers provided assets, falls back to initials badge
function ProjectLogo({
  title,
  light,
  dark,
  initials,
}: {
  title: string;
  light?: string;
  dark?: string;
  initials: string;
}) {
  if (light || dark) {
    return (
      <>
        {light ? (
          <Image
            src={light}
            alt={`${title} logo`}
            width={160}
            height={48}
            className={
              dark ? "block h-12 w-auto dark:hidden" : "block h-12 w-auto"
            }
          />
        ) : null}
        {dark ? (
          <Image
            src={dark}
            alt={`${title} logo dark`}
            width={160}
            height={48}
            className="hidden h-12 w-auto dark:block"
          />
        ) : null}
      </>
    );
  }

  // Fallback: simple rounded badge with initials
  return (
    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-purple-500 to-blue-500 text-sm font-bold text-white shadow-sm">
      {initials}
    </div>
  );
}
