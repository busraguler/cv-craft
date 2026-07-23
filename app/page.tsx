import Link from "next/link";

export default function Home() {
  return (
    <main className="relative flex min-h-screen overflow-hidden bg-slate-50 px-6 py-16">
      <div className="absolute inset-x-0 top-0 h-px bg-slate-200" />
      <div className="absolute left-1/2 top-0 h-80 w-[52rem] -translate-x-1/2 bg-gradient-to-b from-slate-100/80 to-transparent" />
      <section className="relative mx-auto flex w-full max-w-5xl flex-col items-center justify-center text-center">
        <div className="mb-7 inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700 shadow-sm">
          <span className="size-1.5 rounded-full bg-slate-900" />
          100% free — no credit card required
        </div>
        <p className="mb-4 text-sm font-bold uppercase tracking-[0.18em] text-slate-500">
          CV Craft
        </p>
        <h1 className="max-w-4xl text-5xl font-bold tracking-tight text-slate-900 sm:text-7xl">
          Build a professional CV with confidence
        </h1>
        <p className="mt-7 max-w-2xl text-lg leading-8 text-slate-600 sm:text-xl">
          Create, edit, preview, and export a polished CV from one simple
          workspace. Your work saves automatically in your browser.
        </p>
        <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row">
          <Link
            href="/builder"
            className="inline-flex h-12 items-center justify-center rounded-xl bg-slate-900 px-7 text-base font-semibold text-white shadow-sm transition hover:-translate-y-0.5 hover:bg-black hover:shadow-md focus:outline-none focus:ring-4 focus:ring-slate-200"
          >
            Create Your CV — Free
          </Link>
          <span className="text-sm font-medium text-slate-500">
            No signup. No hidden fees.
          </span>
        </div>
        <div className="mt-16 grid w-full max-w-3xl gap-4 text-left sm:grid-cols-3">
          {[
            ["01", "Build", "Fill in your details with a guided editor."],
            ["02", "Preview", "See every change in a clean A4 preview."],
            ["03", "Export", "Download your finished CV as a PDF."],
          ].map(([number, title, description]) => (
            <div key={number} className="rounded-2xl border border-slate-200 bg-white p-5 transition hover:-translate-y-0.5 hover:border-slate-300 hover:shadow-sm">
              <span className="text-xs font-bold text-slate-400">{number}</span>
              <h2 className="mt-3 font-semibold text-slate-900">{title}</h2>
              <p className="mt-1 text-sm leading-6 text-slate-500">{description}</p>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
