import Container from "@/components/container";
import Link from "next/link";
import { FiExternalLink, FiZap, FiCpu, FiDroplet } from "react-icons/fi";

const projects = [
  {
    id: 1,
    title: "x402X",
    subtitle: "Programmable Settlement for x402",
    tagline: "Pay and Execute Any Smart Contract",
    description:
      "x402X (short for x402-exec) extends x402 payments with hooks and a settlement router so your agents can mint, trade, split revenue and more — all in one atomic transaction.",
    features: [
      "Atomic pay-and-execute transactions",
      "Support for Base and X Layer networks",
      "Extended x402-exec protocol",
      "Smart contract interactions via x402",
    ],
    url: "https://x402x.dev/",
    icon: FiZap,
    gradient: "from-blue-500 to-cyan-500",
  },
  {
    id: 2,
    title: "x402AI",
    subtitle: "Your One-Stop Shop for AI Agents on X Layer",
    tagline: "Interact with On-Chain AI Agents",
    description:
      "x402AI lets you interact with AI agents registered on-chain via the ERC8004 protocol and pay seamlessly using the x402 payment protocol. Built on X Layer and leveraging the x402x project.",
    features: [
      "ERC8004 on-chain agent registration",
      "Seamless x402 payment integration",
      "X Layer Testnet USDC payments",
      "Custom facilitator support",
    ],
    url: "https://x402ai.app/",
    icon: FiCpu,
    gradient: "from-purple-500 to-pink-500",
  },
  {
    id: 3,
    title: "USDC Faucet",
    subtitle: "Test USDC for OKX X Layer Testnet",
    tagline: "Fuel Your Development",
    description:
      "Top up your OKX X Layer Testnet wallet with test USDC for DApp development, QA, and demo showcase.",
    features: [
      "Instant testnet USDC distribution",
      "Support for X Layer Testnet",
      "Perfect for DApp development",
      "Easy wallet integration",
    ],
    url: "#",
    icon: FiDroplet,
    gradient: "from-green-500 to-emerald-500",
  },
];

export default function HomePage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-950 dark:to-gray-900">
        <div className="absolute inset-0 bg-grid-slate-100 [mask-image:linear-gradient(0deg,white,rgba(255,255,255,0.6))] dark:bg-grid-slate-700/25 dark:[mask-image:linear-gradient(0deg,rgba(255,255,255,0.1),rgba(255,255,255,0.05))]"></div>
        <Container>
          <div className="relative px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
            <div className="mx-auto max-w-4xl text-center">
              <h1 className="text-4xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-5xl md:text-6xl">
                Building the Future of{" "}
                <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  Programmable Payments
                </span>
              </h1>
              <p className="mx-auto mt-6 max-w-2xl text-lg text-gray-600 dark:text-gray-300">
                Explore our suite of tools and protocols that enable seamless
                integration of payments with smart contracts and AI agents on
                blockchain networks.
              </p>
              <div className="mt-10 flex items-center justify-center gap-4">
                <Link
                  href="/archive"
                  className="rounded-lg bg-blue-600 px-6 py-3 text-sm font-semibold text-white shadow-md transition hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                >
                  Read Our Blog
                </Link>
                <Link
                  href="/about"
                  className="rounded-lg border border-gray-300 bg-white px-6 py-3 text-sm font-semibold text-gray-700 shadow-sm transition hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-200 dark:hover:bg-gray-700"
                >
                  Learn More
                </Link>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-20">
        <Container>
          <div className="mb-16 text-center">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white sm:text-4xl">
              Our Projects
            </h2>
            <p className="mt-4 text-lg text-gray-600 dark:text-gray-400">
              Innovative solutions for the decentralized ecosystem
            </p>
          </div>

          <div className="grid gap-8 lg:grid-cols-3">
            {projects.map((project) => {
              const Icon = project.icon;
              return (
                <div
                  key={project.id}
                  className="group relative overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-lg transition-all hover:shadow-2xl dark:border-gray-800 dark:bg-gray-900"
                >
                  {/* Gradient Header */}
                  <div
                    className={`h-2 bg-gradient-to-r ${project.gradient}`}
                  ></div>

                  <div className="p-8">
                    {/* Icon */}
                    <div
                      className={`inline-flex rounded-xl bg-gradient-to-r ${project.gradient} p-3 text-white shadow-lg`}
                    >
                      <Icon className="h-6 w-6" />
                    </div>

                    {/* Title */}
                    <h3 className="mt-6 text-2xl font-bold text-gray-900 dark:text-white">
                      {project.title}
                    </h3>
                    <p className="mt-2 text-sm font-medium text-gray-600 dark:text-gray-400">
                      {project.subtitle}
                    </p>

                    {/* Tagline */}
                    <div className="mt-4 inline-block rounded-full bg-gray-100 px-4 py-1 text-sm font-medium text-gray-700 dark:bg-gray-800 dark:text-gray-300">
                      {project.tagline}
                    </div>

                    {/* Description */}
                    <p className="mt-4 text-gray-600 dark:text-gray-400">
                      {project.description}
                    </p>

                    {/* Features */}
                    <ul className="mt-6 space-y-2">
                      {project.features.map((feature, idx) => (
                        <li
                          key={idx}
                          className="flex items-start text-sm text-gray-600 dark:text-gray-400"
                        >
                          <svg
                            className="mr-2 mt-0.5 h-5 w-5 flex-shrink-0 text-green-500"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M5 13l4 4L19 7"
                            />
                          </svg>
                          {feature}
                        </li>
                      ))}
                    </ul>

                    {/* CTA Button */}
                    <a
                      href={project.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`mt-8 inline-flex w-full items-center justify-center rounded-lg bg-gradient-to-r ${project.gradient} px-6 py-3 text-sm font-semibold text-white shadow-md transition hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2`}
                    >
                      Visit Project
                      <FiExternalLink className="ml-2 h-4 w-4" />
                    </a>
                  </div>
                </div>
              );
            })}
          </div>
        </Container>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-r from-blue-600 to-purple-600 py-16">
        <Container>
          <div className="text-center">
            <h2 className="text-3xl font-bold text-white sm:text-4xl">
              Ready to Get Started?
            </h2>
            <p className="mt-4 text-lg text-blue-100">
              Explore our documentation and join our community to learn more
            </p>
            <div className="mt-8 flex items-center justify-center gap-4">
              <Link
                href="/contact"
                className="rounded-lg bg-white px-8 py-3 text-sm font-semibold text-blue-600 shadow-md transition hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-blue-600"
              >
                Contact Us
              </Link>
              <Link
                href="/archive"
                className="rounded-lg border-2 border-white px-8 py-3 text-sm font-semibold text-white transition hover:bg-white hover:text-blue-600 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-blue-600"
              >
                View All Posts
              </Link>
            </div>
          </div>
        </Container>
      </section>
    </div>
  );
}
