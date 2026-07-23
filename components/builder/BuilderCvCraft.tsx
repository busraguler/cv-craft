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

type MobileTab = "editor" | "preview";

const tabs: Array<{ id: MobileTab; label: string }> = [
  { id: "editor", label: "Editor" },
  { id: "preview", label: "Preview" },
];

export function BuilderCvCraft() {
  const router = useRouter();
  const [cvs, setCvs] = useState<CvDocument[]>([]);
  const [selectedId, setSelectedId] = useState<string>();
  const [activeTab, setActiveTab] = useState<MobileTab>("editor");
  const [sidebarOpen, setSidebarOpen] = useState(true);
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
    setSidebarOpen(false);
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
    <main className="builder-root flex min-h-screen flex-col">
      <header className="builder-header flex flex-wrap items-center justify-between gap-3 border-b border-slate-200 bg-white px-4 py-3 shadow-sm sm:px-6">
        <div>
          <Link
            href="/"
            className="text-sm font-bold text-slate-900 transition hover:text-black focus:outline-none focus:ring-4 focus:ring-slate-100"
          >
            CV Craft
          </Link>
          <h1 className="text-xl font-semibold text-slate-900">CV Builder</h1>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <button
            type="button"
            onClick={() => exportCv(selectedCv.id)}
            className="h-10 rounded-xl bg-slate-900 px-4 text-sm font-semibold text-white shadow-sm transition hover:bg-black focus:outline-none focus:ring-4 focus:ring-slate-200"
          >
            Download PDF
          </button>
          <button
            type="button"
            onClick={signOut}
            className="h-10 rounded-xl border border-slate-200 bg-white px-4 text-sm font-semibold text-slate-600 transition hover:border-slate-300 hover:bg-slate-50 focus:outline-none focus:ring-4 focus:ring-slate-100"
          >
            Sign out
          </button>
        </div>
      </header>

      <nav
        className="builder-mobile-nav grid grid-cols-2 gap-2 border-b border-slate-200 bg-white p-3 lg:hidden"
        aria-label="Builder sections"
      >
        {tabs.map((tab) => (
          <button
            key={tab.id}
            type="button"
            onClick={() => setActiveTab(tab.id)}
            className={`h-10 rounded-xl text-sm font-semibold transition focus:outline-none focus:ring-4 focus:ring-slate-100 ${
              activeTab === tab.id
                ? "bg-slate-900 text-white shadow-sm"
                : "bg-slate-100 text-slate-600 hover:bg-slate-200"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </nav>

      <button
        type="button"
        onClick={() => setSidebarOpen((open) => !open)}
        aria-expanded={sidebarOpen}
        aria-controls="cv-drawer"
        aria-label={sidebarOpen ? "Close CV list" : "Open CV list"}
        className={`builder-sidebar-toggle fixed top-20 z-[60] flex size-11 items-center justify-center rounded-r-xl border border-l-0 border-slate-800 bg-slate-900 text-2xl font-semibold text-white shadow-md transition-[left,background-color] hover:bg-black focus:outline-none focus:ring-4 focus:ring-slate-200 ${
          sidebarOpen ? "left-[min(90vw,340px)]" : "left-0"
        }`}
      >
        <span aria-hidden="true">{sidebarOpen ? "‹" : "›"}</span>
      </button>

      {sidebarOpen ? (
        <div
          className="builder-sidebar-overlay fixed inset-0 z-50 bg-slate-950/35 backdrop-blur-[2px]"
          role="dialog"
          aria-modal="true"
          aria-label="CV list"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) {
              setSidebarOpen(false);
            }
          }}
        >
          <div id="cv-drawer" className="h-full w-[min(90vw,340px)]">
          <CvSidebar
            cvs={sortedCvs}
            selectedId={selectedCv.id}
            onCreate={createCv}
            onSelect={(id) => {
              setSelectedId(id);
              setActiveTab("editor");
              setSidebarOpen(false);
            }}
            onDelete={deleteCv}
            onExport={(id) => {
              setSidebarOpen(false);
              exportCv(id);
            }}
            onClose={() => setSidebarOpen(false)}
          />
          </div>
        </div>
      ) : null}

      <div className="builder-workspace grid min-h-0 flex-1 gap-5 p-4 lg:grid-cols-[minmax(420px,1fr)_minmax(360px,0.95fr)] lg:p-6">

        <div
          className={`editor-pane ${activeTab === "editor" ? "block" : "hidden"} min-h-0 lg:block`}
        >
          <CvEditor
            cv={selectedCv}
            validation={validation}
            onChange={updateSelectedCv}
          />
        </div>

        <div
          className={`preview-pane ${activeTab === "preview" ? "block" : "hidden"} min-h-0 lg:block`}
        >
          <CvPreview cv={selectedCv} />
        </div>
      </div>
    </main>
  );
}
