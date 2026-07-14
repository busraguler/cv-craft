import Link from "next/link";

export default function Home() {
  return (
    <main className="flex min-h-screen items-center justify-center px-6 py-16">
      <section className="mx-auto flex w-full max-w-4xl flex-col items-center text-center">
        <p className="mb-5 rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-600 shadow-sm">
          Browser-based resume builder
        </p>
        <h1 className="max-w-3xl text-5xl font-semibold tracking-normal text-slate-950 sm:text-6xl">
          CV Craft
        </h1>
        <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-600">
          Create, edit, preview, manage, and export professional CVs from a
          clean workspace that saves automatically in your browser.
        </p>
        <Link
          href="/builder"
          className="mt-10 inline-flex h-12 items-center justify-center rounded-lg bg-slate-950 px-6 text-base font-semibold text-white shadow-sm transition hover:bg-slate-800 focus:outline-none focus:ring-4 focus:ring-slate-300"
        >
          Create Your CV
        </Link>
      </section>
    </main>
  );
}
