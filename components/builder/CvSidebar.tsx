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
  onClose?: () => void;
};

export function CvSidebar({
  cvs,
  selectedId,
  onCreate,
  onSelect,
  onDelete,
  onExport,
  onClose,
}: CvSidebarProps) {
  return (
    <aside className="flex h-full min-h-0 flex-col overflow-hidden border-r border-slate-200 bg-white shadow-xl">
      <div className="flex items-center justify-between border-b border-slate-100 p-4">
        <div>
          <h2 className="text-base font-semibold text-slate-900">Your CVs</h2>
          <p className="text-sm text-slate-500">{cvs.length} saved</p>
        </div>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={onCreate}
            className="h-9 rounded-xl bg-slate-900 px-3 text-sm font-semibold text-white shadow-sm transition hover:bg-black focus:outline-none focus:ring-4 focus:ring-slate-100"
          >
            New
          </button>
          {onClose ? (
            <button
              type="button"
              onClick={onClose}
              aria-label="Close CV list"
              className="flex size-9 items-center justify-center rounded-xl border border-slate-200 text-xl leading-none text-slate-500 transition hover:bg-slate-50 hover:text-slate-900 focus:outline-none focus:ring-4 focus:ring-slate-100"
            >
              ×
            </button>
          ) : null}
        </div>
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
              role="button"
              tabIndex={0}
              onClick={() => onSelect(cv.id)}
              onKeyDown={(event) => {
                if (
                  event.target === event.currentTarget &&
                  (event.key === "Enter" || event.key === " ")
                ) {
                  event.preventDefault();
                  onSelect(cv.id);
                }
              }}
              className={`cursor-pointer rounded-xl border p-3 transition hover:border-slate-400 hover:bg-slate-50 focus:outline-none focus:ring-4 focus:ring-slate-100 ${
                selected
                  ? "border-slate-900 bg-slate-50 ring-1 ring-slate-100"
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
                  onClick={(event) => {
                    event.stopPropagation();
                    onSelect(cv.id);
                  }}
                  className="rounded-lg border border-slate-900 bg-slate-900 px-2 py-1.5 text-xs font-semibold text-white transition hover:bg-black focus:outline-none focus:ring-2 focus:ring-slate-300"
                >
                  Edit
                </button>
                <button
                  type="button"
                  onClick={(event) => {
                    event.stopPropagation();
                    onExport(cv.id);
                  }}
                  className="rounded-lg border border-slate-200 bg-white px-2 py-1.5 text-xs font-medium text-slate-700 transition hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-slate-300"
                >
                  PDF
                </button>
                <button
                  type="button"
                  onClick={(event) => {
                    event.stopPropagation();
                    onDelete(cv.id);
                  }}
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
