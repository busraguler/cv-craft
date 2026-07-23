import Link from "next/link";
import { getSiteUrl } from "@/lib/site";

const features = [
  {
    title: "Simple guided editor",
    description:
      "Add your experience, education, skills, certificates, languages, and references in one focused workspace.",
  },
  {
    title: "Live A4 preview",
    description:
      "See every change immediately in a clean, professional layout designed for PDF export.",
  },
  {
    title: "Private by default",
    description:
      "Your CV data is stored in your browser. You can build and manage resumes without creating an account.",
  },
];

const steps = [
  ["01", "Add your details", "Complete the guided CV sections."],
  ["02", "Review your CV", "Check the live A4 preview as you edit."],
  ["03", "Download the PDF", "Export a polished CV ready to share."],
];

const faqs = [
  {
    question: "Is CV Craft free?",
    answer:
      "Yes. You can create, edit, preview, and download your CV without paying or entering credit card details.",
  },
  {
    question: "Do I need to create an account?",
    answer:
      "No. CV Craft works without signup, and your CV data is saved locally in your browser.",
  },
  {
    question: "Can I download my CV as a PDF?",
    answer:
      "Yes. The builder includes an A4 preview and lets you save the finished CV as a PDF through your browser.",
  },
  {
    question: "Can I create more than one CV?",
    answer:
      "Yes. You can create and manage multiple CV versions from the same browser.",
  },
];

export default function Home() {
  const siteUrl = getSiteUrl();
  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        "@id": `${siteUrl}/#website`,
        url: siteUrl,
        name: "CV Craft",
        description:
          "A free online CV builder for creating and downloading professional PDF resumes.",
      },
      {
        "@type": "WebApplication",
        "@id": `${siteUrl}/#application`,
        name: "CV Craft",
        url: `${siteUrl}/builder`,
        description:
          "Create, edit, preview, and download a professional CV as a PDF for free.",
        applicationCategory: "BusinessApplication",
        operatingSystem: "Any",
        browserRequirements: "Requires a modern web browser",
        isAccessibleForFree: true,
        offers: {
          "@type": "Offer",
          price: "0",
          priceCurrency: "USD",
        },
        featureList: [
          "Guided CV editor",
          "Live A4 preview",
          "PDF export",
          "Multiple CV management",
          "Browser-based local storage",
        ],
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(structuredData).replace(/</g, "\\u003c"),
        }}
      />

      <header className="border-b border-slate-200 bg-white">
        <nav
          aria-label="Main navigation"
          className="mx-auto flex w-full max-w-6xl items-center justify-between px-6 py-4"
        >
          <Link href="/" className="text-lg font-bold tracking-tight text-slate-950">
            CV Craft
          </Link>
          <Link
            href="/builder"
            className="rounded-xl bg-slate-950 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-black focus:outline-none focus:ring-4 focus:ring-slate-200"
          >
            Build your CV
          </Link>
        </nav>
      </header>

      <main className="bg-slate-50">
        <section className="relative overflow-hidden border-b border-slate-200 px-6 py-24 sm:py-32">
          <div className="absolute inset-x-0 top-0 h-px bg-slate-200" />
          <div className="absolute left-1/2 top-0 h-80 w-[52rem] -translate-x-1/2 bg-gradient-to-b from-slate-100/80 to-transparent" />
          <div className="relative mx-auto flex w-full max-w-5xl flex-col items-center text-center">
            <div className="mb-7 inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700 shadow-sm">
              <span className="size-1.5 rounded-full bg-slate-900" />
              100% free — no credit card required
            </div>
            <p className="mb-4 text-sm font-bold uppercase tracking-[0.18em] text-slate-500">
              Free online CV builder
            </p>
            <h1 className="max-w-4xl text-5xl font-bold tracking-tight text-slate-950 sm:text-7xl">
              Create a professional CV with confidence
            </h1>
            <p className="mt-7 max-w-2xl text-lg leading-8 text-slate-600 sm:text-xl">
              Build, edit, and preview your resume online, then download a
              polished A4 PDF. No signup, no hidden fees, and no complicated
              design tools.
            </p>
            <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row">
              <Link
                href="/builder"
                className="inline-flex h-12 items-center justify-center rounded-xl bg-slate-950 px-7 text-base font-semibold text-white shadow-sm transition hover:-translate-y-0.5 hover:bg-black hover:shadow-md focus:outline-none focus:ring-4 focus:ring-slate-200"
              >
                Create your CV for free
              </Link>
              <span className="text-sm font-medium text-slate-500">
                Your work saves in your browser
              </span>
            </div>
          </div>
        </section>

        <section
          aria-labelledby="features-heading"
          className="mx-auto w-full max-w-6xl px-6 py-20 sm:py-24"
        >
          <div className="max-w-2xl">
            <p className="text-sm font-bold uppercase tracking-[0.16em] text-slate-500">
              Everything you need
            </p>
            <h2
              id="features-heading"
              className="mt-3 text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl"
            >
              A fast, focused way to build a better CV
            </h2>
            <p className="mt-4 text-base leading-7 text-slate-600">
              CV Craft keeps the process simple so you can focus on your
              experience and present it clearly.
            </p>
          </div>
          <div className="mt-10 grid gap-4 md:grid-cols-3">
            {features.map((feature) => (
              <article
                key={feature.title}
                className="rounded-2xl border border-slate-200 bg-white p-6"
              >
                <h3 className="text-lg font-semibold text-slate-950">
                  {feature.title}
                </h3>
                <p className="mt-3 text-sm leading-6 text-slate-600">
                  {feature.description}
                </p>
              </article>
            ))}
          </div>
        </section>

        <section
          aria-labelledby="how-it-works-heading"
          className="border-y border-slate-200 bg-white px-6 py-20 sm:py-24"
        >
          <div className="mx-auto w-full max-w-6xl">
            <div className="max-w-2xl">
              <p className="text-sm font-bold uppercase tracking-[0.16em] text-slate-500">
                How it works
              </p>
              <h2
                id="how-it-works-heading"
                className="mt-3 text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl"
              >
                From blank page to PDF in three steps
              </h2>
            </div>
            <ol className="mt-10 grid gap-4 md:grid-cols-3">
              {steps.map(([number, title, description]) => (
                <li
                  key={number}
                  className="rounded-2xl border border-slate-200 bg-slate-50 p-6"
                >
                  <span className="text-xs font-bold text-slate-400">
                    {number}
                  </span>
                  <h3 className="mt-4 font-semibold text-slate-950">{title}</h3>
                  <p className="mt-2 text-sm leading-6 text-slate-600">
                    {description}
                  </p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        <section
          aria-labelledby="faq-heading"
          className="mx-auto w-full max-w-4xl px-6 py-20 sm:py-24"
        >
          <div className="text-center">
            <p className="text-sm font-bold uppercase tracking-[0.16em] text-slate-500">
              Frequently asked questions
            </p>
            <h2
              id="faq-heading"
              className="mt-3 text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl"
            >
              Build your CV without the usual friction
            </h2>
          </div>
          <div className="mt-10 divide-y divide-slate-200 border-y border-slate-200">
            {faqs.map((faq) => (
              <article key={faq.question} className="py-6">
                <h3 className="font-semibold text-slate-950">{faq.question}</h3>
                <p className="mt-2 text-sm leading-6 text-slate-600">
                  {faq.answer}
                </p>
              </article>
            ))}
          </div>
          <div className="mt-12 text-center">
            <Link
              href="/builder"
              className="inline-flex h-12 items-center justify-center rounded-xl bg-slate-950 px-7 text-base font-semibold text-white transition hover:bg-black focus:outline-none focus:ring-4 focus:ring-slate-200"
            >
              Start building your CV
            </Link>
          </div>
        </section>
      </main>

      <footer className="border-t border-slate-200 bg-white">
        <div className="mx-auto flex w-full max-w-6xl flex-col gap-2 px-6 py-8 text-sm text-slate-500 sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} CV Craft</p>
          <p>Free online CV builder and PDF resume maker.</p>
        </div>
      </footer>
    </>
  );
}
