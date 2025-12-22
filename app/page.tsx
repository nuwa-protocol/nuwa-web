import Container from "@/components/container";
import PageTitle from "@/components/page-title";
import fs from "fs";
import Image from "next/image";
import path from "path";
import { FaGithub } from "react-icons/fa6";

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

type ProjectTag = "infra" | "app";

type Project = {
  title: string;
  href?: string;
  github?: string;
  description: string;
  tag: ProjectTag;
  logo?: string;
  illustration?: string;
  order?: number;
};

const TAG_META: Record<
  ProjectTag,
  { title: string; description: string; accent: string }
> = {
  infra: {
    title: "Infrastructure",
    description:
      "Protocols, payment rails, and identity layers that make agent-to-agent collaboration reliable.",
    accent: "bg-emerald-500",
  },
  app: {
    title: "Applications",
    description:
      "Agent-first experiences built on Nuwa rails, showing how the stack lands for people and teams.",
    accent: "bg-blue-500",
  },
};

function getAssetPath(dir: string, name: string) {
  const exts = ["png", "svg", "jpg", "jpeg", "webp"];
  for (const ext of exts) {
    const filePath = path.join(
      process.cwd(),
      "public",
      "projects",
      dir,
      `${name}.${ext}`,
    );
    if (fs.existsSync(filePath)) {
      return `/projects/${dir}/${name}.${ext}`;
    }
  }
  return undefined;
}

function loadProjects(): Project[] {
  const baseDir = path.join(process.cwd(), "public", "projects");
  if (!fs.existsSync(baseDir)) return [];

  const entries = fs
    .readdirSync(baseDir, { withFileTypes: true })
    .filter((f) => f.isDirectory());

  return entries
    .map((dir): Project | null => {
      try {
        const metadataPath = path.join(baseDir, dir.name, "metadata.json");
        if (!fs.existsSync(metadataPath)) return null;
        const raw = fs.readFileSync(metadataPath, "utf-8");
        const meta = JSON.parse(raw) as {
          name?: string;
          description?: string;
          url?: string;
          github?: string;
          tag?: string;
          order?: number;
        };

        const tag = (meta.tag ?? "app") as string;
        if (tag !== "infra" && tag !== "app") return null;
        const order = typeof meta.order === "number" ? meta.order : undefined;

        const project: Project = {
          title: meta.name ?? dir.name,
          href: meta.url,
          github: meta.github,
          description: meta.description ?? "",
          tag: tag as ProjectTag,
          logo: getAssetPath(dir.name, "logo"),
          illustration: getAssetPath(dir.name, "illustration"),
          order,
        };

        return project;
      } catch (e) {
        console.error("Failed to read project metadata", e);
        return null;
      }
    })
    .filter((project): project is Project => project !== null)
    .reduce<Project[]>((acc, project) => {
      const key =
        project.github ?? project.href ?? project.title.toLowerCase().trim();
      const existing = acc.find((p) => {
        const k = p.github ?? p.href ?? p.title.toLowerCase().trim();
        return k === key;
      });

      if (!existing) {
        acc.push(project);
        return acc;
      }

      const currentOrder = project.order ?? 9999;
      const existingOrder = existing.order ?? 9999;

      if (currentOrder < existingOrder) {
        acc[acc.indexOf(existing)] = project;
      }

      return acc;
    }, []);
}

export default function AboutPage() {
  const projects = loadProjects();

  return (
    <Container>
      <PageTitle
        title="About Nuwa AI"
        description="Open Economy Layer for AI"
      />
      <section className="mx-auto mt-12 max-w-5xl space-y-6 text-lg leading-relaxed text-gray-600 dark:text-gray-300">
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
          focus on what unblocks contributors right now. We keep them grouped
          into infrastructure and applications so it&apos;s obvious how the
          rails and the experiences fit together.
        </p>
      </section>

      <section className="mx-auto mt-12 max-w-5xl space-y-8">
        {(["infra", "app"] as ProjectTag[]).map((tag) => {
          const grouped = projects
            .filter((p) => p.tag === tag)
            .sort((a, b) => {
              const orderA = a.order ?? 9999;
              const orderB = b.order ?? 9999;
              if (orderA !== orderB) return orderA - orderB;
              return a.title.localeCompare(b.title);
            });
          if (grouped.length === 0) return null;
          const meta = TAG_META[tag];

          return (
            <div
              key={meta.title}
              className="rounded-3xl border border-gray-100/70 bg-gradient-to-b from-white via-white to-gray-50 p-6 shadow-sm transition dark:border-gray-800/60 dark:from-gray-950 dark:via-gray-950 dark:to-gray-900"
            >
              <div className="flex flex-col gap-2 border-b border-gray-100/80 pb-5 dark:border-gray-800/70">
                <div className="flex items-center gap-3">
                  <span
                    className={`h-8 w-1.5 rounded-full ${meta.accent}`}
                    aria-hidden="true"
                  />
                  <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">
                    {meta.title}
                  </h2>
                </div>
                <p className="text-sm md:text-base font-medium text-gray-600 dark:text-gray-300">
                  {meta.description}
                </p>
              </div>

              <div className="mt-6 grid gap-4 md:grid-cols-2">
                {grouped.map((p) => (
                  <div
                    key={p.title}
                    className="group relative h-full overflow-hidden rounded-2xl border border-gray-200/80 bg-white/80 shadow-sm ring-1 ring-transparent transition hover:-translate-y-1 hover:border-gray-900/60 hover:shadow-lg hover:ring-gray-900/10 dark:border-gray-800/80 dark:bg-gray-900/70 dark:hover:border-gray-600 dark:hover:ring-gray-700"
                  >
                    {p.github ? (
                      <a
                        href={p.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`${p.title} on GitHub`}
                        className="absolute bottom-3 right-3 z-10 inline-flex items-center justify-center rounded-full bg-white/90 p-2 text-gray-700 shadow-sm transition hover:bg-white hover:text-gray-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-900 dark:bg-gray-800/90 dark:text-gray-300 dark:hover:bg-gray-700 dark:hover:text-white dark:focus-visible:ring-gray-400"
                      >
                        <FaGithub className="h-4 w-4" />
                      </a>
                    ) : null}

                    {p.href ? (
                      <a
                        href={p.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex h-full flex-col focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-900/50"
                      >
                        <ProjectCardContent project={p} />
                      </a>
                    ) : (
                      <div className="flex h-full flex-col focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-900/50">
                        <ProjectCardContent project={p} isComingSoon />
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </section>
    </Container>
  );
}

function ProjectCardContent({
  project,
  isComingSoon = false,
}: {
  project: Project;
  isComingSoon?: boolean;
}) {
  const badgeText = isComingSoon ? "Coming soon" : "Visit";

  return (
    <>
      <div className="relative mx-4 mt-4 overflow-hidden rounded-2xl bg-gray-100 dark:bg-gray-800">
        <div className="relative aspect-[16/9]">
          {project.illustration ? (
            <Image
              src={project.illustration}
              alt={`${project.title} illustration`}
              fill
              sizes="(min-width: 1024px) 360px, (min-width: 768px) 45vw, 90vw"
              className="object-cover transition duration-500 group-hover:scale-105"
            />
          ) : (
            <div className="absolute inset-0 bg-gradient-to-br from-purple-500/20 via-blue-500/20 to-emerald-500/20" />
          )}
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-transparent via-black/0 to-black/10" />
          {project.logo ? (
            <div className="absolute bottom-3 left-3 flex h-12 w-12 items-center justify-center overflow-hidden rounded-xl bg-white/90 p-2 shadow-md ring-1 ring-gray-200 backdrop-blur dark:bg-gray-900/80 dark:ring-gray-700">
              <Image
                src={project.logo}
                alt={`${project.title} logo`}
                width={40}
                height={40}
                className="h-full w-full object-contain"
              />
            </div>
          ) : null}
        </div>
      </div>

      <div className="flex flex-1 flex-col px-6 pb-6 pt-4">
        <h3 className="text-xl font-semibold text-gray-900 transition-colors group-hover:text-gray-700 dark:text-white dark:group-hover:text-gray-100">
          {project.title}
        </h3>
        <p className="mt-2 text-base text-gray-600 dark:text-gray-300">
          {project.description}
        </p>
        <span className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-gray-700 transition group-hover:gap-3 dark:text-gray-200">
          {badgeText} {!isComingSoon && <span aria-hidden="true">→</span>}
        </span>
      </div>
    </>
  );
}
