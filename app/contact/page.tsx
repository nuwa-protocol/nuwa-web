import Container from "@/components/container";
import ContactForm from "@/components/contact-form";
import PageTitle from "@/components/page-title";

export const metadata = {
  title: "Contact",
  description: "We are here to help.",
};

const contactDetails = [
  // {
  //   label: "1734 Sanfransico, CA 93063",
  //   icon: (
  //     <svg
  //       className="h-4 w-4 text-gray-400"
  //       xmlns="http://www.w3.org/2000/svg"
  //       viewBox="0 0 24 24"
  //       fill="currentColor"
  //     >
  //       <path d="M12 2a7 7 0 0 0-7 7c0 4.177 4.508 9.235 6.13 10.9a1.2 1.2 0 0 0 1.74 0C14.492 18.235 19 13.177 19 9a7 7 0 0 0-7-7Zm0 9.5a2.5 2.5 0 1 1 0-5 2.5 2.5 0 0 1 0 5Z" />
  //     </svg>
  //   ),
  // },
  {
    label: "hello@nuwa.dev",
    href: "mailto:hello@nuwa.dev",
    icon: (
      <svg
        className="h-4 w-4 text-gray-400"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="currentColor"
      >
        <path d="M3 5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5Zm2-.002V5l7 4.5L19 5v-.002H5Zm14 4.236-7 4.5-7-4.5V19h14V9.234Z" />
      </svg>
    ),
  },
  // {
  //   label: "+1 (987) 4587 899",
  //   href: "tel:+19874587899",
  //   icon: (
  //     <svg
  //       className="h-4 w-4 text-gray-400"
  //       xmlns="http://www.w3.org/2000/svg"
  //       viewBox="0 0 24 24"
  //       fill="currentColor"
  //     >
  //       <path d="M6.62 10.79a15.053 15.053 0 0 0 6.59 6.59l2.2-2.2a1 1 0 0 1 1.01-.24 11.72 11.72 0 0 0 3.68.59 1 1 0 0 1 1 1v3.6a1 1 0 0 1-1 1A17.62 17.62 0 0 1 2 6a1 1 0 0 1 1-1h3.61a1 1 0 0 1 1 1 11.72 11.72 0 0 0 .59 3.68 1 1 0 0 1-.24 1.01l-2.34 2.1Z" />
  //     </svg>
  //   ),
  // },
];

export default function ContactPage() {
  return (
    <Container>
      <PageTitle title="Contact" description="We are here to help." />

      <div className="mx-auto mt-16 grid max-w-4xl gap-10 md:grid-cols-2">
        <div>
          <h2 className="text-2xl font-medium text-gray-800 dark:text-gray-200">
            Contact Stablo
          </h2>
          <p className="mt-3 text-lg leading-relaxed text-gray-500 dark:text-gray-400">
            Have something to say? We are here to help. Fill up the form or send
            email or call phone.
          </p>
          <div className="mt-5 space-y-2">
            {contactDetails.map((detail) => (
              <div
                key={detail.label}
                className="flex items-center space-x-2 text-gray-600 dark:text-gray-300"
              >
                {detail.icon}
                {detail.href ? (
                  <a className="hover:text-blue-500" href={detail.href}>
                    {detail.label}
                  </a>
                ) : (
                  <span>{detail.label}</span>
                )}
              </div>
            ))}
          </div>
        </div>
        <div>
          <ContactForm />
        </div>
      </div>
    </Container>
  );
}
