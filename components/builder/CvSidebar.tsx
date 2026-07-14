"use client";

import { formatDateTime } from "@/lib/cv/format";
import type { CvDocument } from "@/lib/cv/types";

type CvSidebarProps = {
  cvs: CvDocument[];
  selectedId?: string;
  onCreate: () => void;
  onSelect: (id: string) => void;
  onDelete: (id: string) => void;
  onExport: (id: string) => void;
};

export function CvSidebar({
  cvs,
  selectedId,
  onCreate,
  onSelect,
  onDelete,
  onExport,
}: CvSidebarProps) {
  return (
    <aside className="flex min-h-0 flex-col rounded-lg border border-slate-200 bg-white shadow-sm">
      <div className="flex items-center justify-between border-b border-slate-100 p-4">
        <div>
          <h2 className="text-base font-semibold text-slate-950">Your CVs</h2>
          <p className="text-sm text-slate-500">{cvs.length} saved</p>
        </div>
        <button
          type="button"
          onClick={onCreate}
          className="h-9 rounded-lg bg-slate-950 px-3 text-sm font-semibold text-white transition hover:bg-slate-800 focus:outline-none focus:ring-4 focus:ring-slate-200"
        >
          New
        </button>
      </div>
      <div className="min-h-0 flex-1 space-y-3 overflow-y-auto p-3">
        {cvs.length === 0 ? (
          <p className="px-2 py-8 text-center text-sm text-slate-500">
            Create your first CV to get started.
          </p>
        ) : null}
        {cvs.map((cv) => {
          const selected = cv.id === selectedId;

          return (
            <article
              key={cv.id}
              className={`rounded-lg border p-3 transition ${
                selected
                  ? "border-slate-950 bg-slate-50"
                  : "border-slate-200 bg-white"
              }`}
            >
              <h3 className="truncate text-sm font-semibold text-slate-950">
                {cv.name || "Untitled CV"}
              </h3>
              <p className="mt-1 text-xs text-slate-500">
                Updated {formatDateTime(cv.updatedAt)}
              </p>
              <div className="mt-3 grid grid-cols-3 gap-2">
                <button
                  type="button"
                  onClick={() => onSelect(cv.id)}
                  className="rounded-md border border-slate-200 px-2 py-1.5 text-xs font-medium text-slate-700 transition hover:bg-slate-100 focus:outline-none focus:ring-2 focus:ring-slate-300"
                >
                  Edit
                </button>
                <button
                  type="button"
                  onClick={() => onExport(cv.id)}
                  className="rounded-md border border-slate-200 px-2 py-1.5 text-xs font-medium text-slate-700 transition hover:bg-slate-100 focus:outline-none focus:ring-2 focus:ring-slate-300"
                >
                  PDF
                </button>
                <button
                  type="button"
                  onClick={() => onDelete(cv.id)}
                  className="rounded-md border border-red-200 px-2 py-1.5 text-xs font-medium text-red-700 transition hover:bg-red-50 focus:outline-none focus:ring-2 focus:ring-red-200"
                >
                  Delete
                </button>
              </div>
            </article>
          );
        })}
      </div>
    </aside>
  );
}
