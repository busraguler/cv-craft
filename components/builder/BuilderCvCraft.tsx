"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { CvEditor } from "@/components/builder/CvEditor";
import { CvPreview } from "@/components/builder/CvPreview";
import { CvSidebar } from "@/components/builder/CvSidebar";
import { createEmptyCv, touchCv } from "@/lib/cv/defaults";
import { clearCvs, getLatestCv, loadCvs, saveCvs } from "@/lib/cv/storage";
import type { CvDocument } from "@/lib/cv/types";
import { validateCv } from "@/lib/cv/validation";

type MobileTab = "cvs" | "editor" | "preview";

const tabs: Array<{ id: MobileTab; label: string }> = [
  { id: "cvs", label: "CVs" },
  { id: "editor", label: "Editor" },
  { id: "preview", label: "Preview" },
];

export function BuilderCvCraft() {
  const router = useRouter();
  const [cvs, setCvs] = useState<CvDocument[]>([]);
  const [selectedId, setSelectedId] = useState<string>();
  const [activeTab, setActiveTab] = useState<MobileTab>("editor");
  const [hydrated, setHydrated] = useState(false);
  const [pendingExportId, setPendingExportId] = useState<string>();

  useEffect(() => {
    queueMicrotask(() => {
      const storedCvs = loadCvs();

      if (storedCvs.length > 0) {
        setCvs(storedCvs);
        setSelectedId(getLatestCv(storedCvs)?.id);
      } else {
        const firstCv = createEmptyCv();
        setCvs([firstCv]);
        setSelectedId(firstCv.id);
      }

      setHydrated(true);
    });
  }, []);

  useEffect(() => {
    if (hydrated) {
      saveCvs(cvs);
    }
  }, [cvs, hydrated]);

  const sortedCvs = useMemo(
    () =>
      [...cvs].sort(
        (first, second) =>
          new Date(second.updatedAt).getTime() -
          new Date(first.updatedAt).getTime(),
      ),
    [cvs],
  );

  const selectedCv = cvs.find((cv) => cv.id === selectedId) ?? cvs[0];
  const validation = selectedCv
    ? validateCv(selectedCv)
    : { isValid: false, messages: [], fields: {} };

  useEffect(() => {
    if (!pendingExportId || selectedId !== pendingExportId || !selectedCv) {
      return;
    }

    const exportValidation = validateCv(selectedCv);

    if (!exportValidation.isValid) {
      window.alert(exportValidation.messages.join("\n"));
      window.setTimeout(() => setPendingExportId(undefined), 0);
      return;
    }

    window.setTimeout(() => {
      window.print();
      setPendingExportId(undefined);
    }, 80);
  }, [pendingExportId, selectedCv, selectedId]);

  function createCv() {
    const nextCv = createEmptyCv();
    setCvs((current) => [nextCv, ...current]);
    setSelectedId(nextCv.id);
    setActiveTab("editor");
  }

  function updateSelectedCv(nextCv: CvDocument) {
    setCvs((current) =>
      current.map((cv) => (cv.id === nextCv.id ? touchCv(nextCv) : cv)),
    );
  }

  function deleteCv(id: string) {
    const cv = cvs.find((item) => item.id === id);
    const confirmed = window.confirm(
      `Delete "${cv?.name || "Untitled CV"}"? This cannot be undone.`,
    );

    if (!confirmed) {
      return;
    }

    setCvs((current) => {
      const remaining = current.filter((item) => item.id !== id);

      if (remaining.length === 0) {
        const nextCv = createEmptyCv();
        setSelectedId(nextCv.id);
        return [nextCv];
      }

      if (selectedId === id) {
        setSelectedId(getLatestCv(remaining)?.id);
      }

      return remaining;
    });
  }

  function exportCv(id: string) {
    setSelectedId(id);
    setActiveTab("preview");
    setPendingExportId(id);
  }

  function signOut() {
    const confirmed = window.confirm(
      "Sign out and remove saved CVs from this browser?",
    );

    if (!confirmed) {
      return;
    }

    clearCvs();
    setHydrated(false);
    setCvs([]);
    setSelectedId(undefined);
    setPendingExportId(undefined);
    router.replace("/");
  }

  if (!hydrated || !selectedCv) {
    return (
      <main className="flex min-h-screen items-center justify-center">
        <p className="text-sm font-medium text-slate-500">Loading builder...</p>
      </main>
    );
  }

  return (
    <main className="flex min-h-screen flex-col">
      <header className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-200 bg-white px-4 py-3 shadow-sm sm:px-6">
        <div>
          <Link
            href="/"
            className="text-sm font-semibold text-slate-500 transition hover:text-slate-950 focus:outline-none focus:ring-4 focus:ring-slate-200"
          >
            CV Craft
          </Link>
          <h1 className="text-xl font-semibold text-slate-950">CV Builder</h1>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <button
            type="button"
            onClick={() => exportCv(selectedCv.id)}
            className="h-10 rounded-lg bg-slate-950 px-4 text-sm font-semibold text-white shadow-sm transition hover:bg-slate-800 focus:outline-none focus:ring-4 focus:ring-slate-300"
          >
            Download PDF
          </button>
          <button
            type="button"
            onClick={signOut}
            className="h-10 rounded-lg border border-slate-200 bg-white px-4 text-sm font-semibold text-slate-700 transition hover:bg-slate-100 focus:outline-none focus:ring-4 focus:ring-slate-200"
          >
            Sign out
          </button>
        </div>
      </header>

      <nav
        className="grid grid-cols-3 gap-2 border-b border-slate-200 bg-white p-3 lg:hidden"
        aria-label="Builder sections"
      >
        {tabs.map((tab) => (
          <button
            key={tab.id}
            type="button"
            onClick={() => setActiveTab(tab.id)}
            className={`h-10 rounded-lg text-sm font-semibold transition focus:outline-none focus:ring-4 focus:ring-slate-200 ${
              activeTab === tab.id
                ? "bg-slate-950 text-white"
                : "bg-slate-100 text-slate-600 hover:bg-slate-200"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </nav>

      <div className="grid min-h-0 flex-1 gap-4 p-4 lg:grid-cols-[280px_minmax(420px,1fr)_minmax(360px,0.95fr)] lg:p-6">
        <div className={`${activeTab === "cvs" ? "block" : "hidden"} lg:block`}>
          <CvSidebar
            cvs={sortedCvs}
            selectedId={selectedCv.id}
            onCreate={createCv}
            onSelect={(id) => {
              setSelectedId(id);
              setActiveTab("editor");
            }}
            onDelete={deleteCv}
            onExport={exportCv}
          />
        </div>

        <div
          className={`${activeTab === "editor" ? "block" : "hidden"} min-h-0 lg:block`}
        >
          <CvEditor
            cv={selectedCv}
            validation={validation}
            onChange={updateSelectedCv}
          />
        </div>

        <div
          className={`${activeTab === "preview" ? "block" : "hidden"} min-h-0 lg:block`}
        >
          <CvPreview cv={selectedCv} />
        </div>
      </div>
    </main>
  );
}
