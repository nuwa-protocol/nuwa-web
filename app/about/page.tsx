import Container from "@/components/container";
import PageTitle from "@/components/page-title";

export const metadata = {
  title: "About",
  description: "Nuwa builds open tooling for resilient creator and dev ecosystems.",
};

const PROJECTS = [
  {
    title: "Nuwa Protocol",
    description:
      "A programmable coordination layer that lets builders compose governance, treasury, and membership primitives without touching Solidity.",
  },
  {
    title: "Creator OS",
    description:
      "A lightweight publishing stack for independent storytellers that stitches together token-gated drops, mailing lists, and cross-platform analytics.",
  },
  {
    title: "Guild Console",
    description:
      "Operational dashboards that keep distributed teams aligned with automated reporting, contributor insights, and alerting hooks.",
  },
];

export default function AboutPage() {
  return (
    <Container>
      <PageTitle
        title="About"
        description="Nuwa builds open tooling for resilient creator and dev ecosystems."
      />

      <section className="mx-auto mt-12 max-w-3xl space-y-6 text-lg leading-relaxed text-gray-600 dark:text-gray-300">
        <p>
          We experiment with modular protocols, human-friendly interfaces, and
          documentation patterns that let small teams ship ambitious products
          without heavyweight infrastructure. Each initiative starts as a
          research memo, becomes a working prototype, and graduates to a public
          release once the playbook feels repeatable.
        </p>
        <p>
          Below is the active stack of Nuwa projects. They evolve frequently, so
          expect fast iteration, shipped-in-public updates, and pragmatic focus
          on what unblocks contributors right now.
        </p>
      </section>

      <section className="mx-auto mt-12 grid max-w-5xl gap-6 lg:grid-cols-3">
        {PROJECTS.map((project) => (
          <article
            key={project.title}
            className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:border-gray-900 dark:border-gray-800 dark:bg-gray-900"
          >
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
              {project.title}
            </h3>
            <p className="mt-3 text-base text-gray-600 dark:text-gray-300">
              {project.description}
            </p>
          </article>
        ))}
      </section>
    </Container>
  );
}
