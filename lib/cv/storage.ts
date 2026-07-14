import type { CvDocument } from "./types";

const STORAGE_KEY = "cv-craft.documents.v1";

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null;
}

function isCvDocument(value: unknown): value is CvDocument {
  if (!isRecord(value)) {
    return false;
  }

  return (
    typeof value.id === "string" &&
    typeof value.name === "string" &&
    typeof value.createdAt === "string" &&
    typeof value.updatedAt === "string" &&
    isRecord(value.personalInfo) &&
    Array.isArray(value.skills) &&
    Array.isArray(value.workExperience) &&
    Array.isArray(value.education) &&
    Array.isArray(value.languages) &&
    Array.isArray(value.references) &&
    Array.isArray(value.socialLinks)
  );
}

export function loadCvs(): CvDocument[] {
  if (typeof window === "undefined") {
    return [];
  }

  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);

    if (!raw) {
      return [];
    }

    const parsed: unknown = JSON.parse(raw);

    if (!Array.isArray(parsed)) {
      return [];
    }

    return parsed.filter(isCvDocument);
  } catch {
    return [];
  }
}

export function saveCvs(cvs: CvDocument[]): void {
  if (typeof window === "undefined") {
    return;
  }

  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(cvs));
}

export function clearCvs(): void {
  if (typeof window === "undefined") {
    return;
  }

  window.localStorage.removeItem(STORAGE_KEY);
}

export function getLatestCv(cvs: CvDocument[]): CvDocument | undefined {
  return [...cvs].sort(
    (first, second) =>
      new Date(second.updatedAt).getTime() - new Date(first.updatedAt).getTime(),
  )[0];
}
