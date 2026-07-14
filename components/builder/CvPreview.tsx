import { formatDateRange, splitLines } from "@/lib/cv/format";
import type { CvDocument } from "@/lib/cv/types";

type CvPreviewProps = {
  cv: CvDocument;
};

function hasText(...values: string[]) {
  return values.some((value) => value.trim());
}

export function CvPreview({ cv }: CvPreviewProps) {
  const skills = cv.skills.filter((skill) => skill.trim());
  const workExperience = cv.workExperience.filter((item) =>
    hasText(item.company, item.role, item.description),
  );
  const education = cv.education.filter((item) =>
    hasText(item.school, item.degree, item.description),
  );
  const languages = cv.languages.filter((item) =>
    hasText(item.name, item.proficiency),
  );
  const references = cv.references.filter((item) =>
    hasText(item.name, item.role, item.company, item.email, item.phone),
  );
  const socialLinks = cv.socialLinks.filter((item) =>
    hasText(item.label, item.url),
  );

  return (
    <section className="min-h-0 overflow-y-auto rounded-lg border border-slate-200 bg-slate-200/70 p-3 shadow-sm">
      <div className="mb-3 flex items-center justify-between px-1">
        <h2 className="text-base font-semibold text-slate-950">Preview</h2>
        <span className="text-xs font-medium text-slate-500">
          Print layout
        </span>
      </div>

      <article
        id="cv-preview"
        aria-label="CV preview"
        className="cv-preview mx-auto min-h-[960px] w-full max-w-[794px] bg-white px-10 py-10 text-slate-950 shadow-lg"
      >
        <header className="border-b border-slate-300 pb-5">
          <h1 className="text-3xl font-bold tracking-normal">
            {cv.personalInfo.fullName || "Your Name"}
          </h1>
          {cv.personalInfo.jobTitle ? (
            <p className="mt-1 text-base font-medium text-slate-700">
              {cv.personalInfo.jobTitle}
            </p>
          ) : null}
          <div className="mt-3 flex flex-wrap gap-x-4 gap-y-1 text-sm text-slate-600">
            {cv.personalInfo.email ? <span>{cv.personalInfo.email}</span> : null}
            {cv.personalInfo.phone ? <span>{cv.personalInfo.phone}</span> : null}
            {cv.personalInfo.location ? (
              <span>{cv.personalInfo.location}</span>
            ) : null}
            {socialLinks.map((link) => (
              <span key={link.id}>{link.label || link.url}</span>
            ))}
          </div>
        </header>

        <div className="mt-6 space-y-6">
          {cv.about.trim() ? (
            <section>
              <h2 className="cv-heading">About Me</h2>
              <p className="mt-2 text-sm leading-6 text-slate-700">
                {cv.about}
              </p>
            </section>
          ) : null}

          {skills.length > 0 ? (
            <section>
              <h2 className="cv-heading">Skills</h2>
              <p className="mt-2 text-sm leading-6 text-slate-700">
                {skills.join(", ")}
              </p>
            </section>
          ) : null}

          {workExperience.length > 0 ? (
            <section>
              <h2 className="cv-heading">Work Experience</h2>
              <div className="mt-3 space-y-5">
                {workExperience.map((item) => (
                  <div key={item.id}>
                    <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                      <h3 className="text-base font-semibold text-slate-950">
                        {item.role || "Role"}
                        {item.company ? `, ${item.company}` : ""}
                      </h3>
                      <p className="text-sm font-medium text-slate-600">
                        {formatDateRange(
                          item.startDate,
                          item.endDate,
                          item.current,
                        )}
                      </p>
                    </div>
                    {item.location ? (
                      <p className="mt-1 text-sm text-slate-600">
                        {item.location}
                      </p>
                    ) : null}
                    {splitLines(item.description).length > 1 ? (
                      <ul className="mt-2 list-disc space-y-1 pl-5 text-sm leading-6 text-slate-700">
                        {splitLines(item.description).map((line) => (
                          <li key={line}>{line}</li>
                        ))}
                      </ul>
                    ) : (
                      <p className="mt-2 text-sm leading-6 text-slate-700">
                        {item.description}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </section>
          ) : null}

          {education.length > 0 ? (
            <section>
              <h2 className="cv-heading">Education</h2>
              <div className="mt-3 space-y-4">
                {education.map((item) => (
                  <div key={item.id}>
                    <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                      <h3 className="text-base font-semibold text-slate-950">
                        {item.degree || "Degree"}
                        {item.school ? `, ${item.school}` : ""}
                      </h3>
                      <p className="text-sm font-medium text-slate-600">
                        {formatDateRange(item.startDate, item.endDate)}
                      </p>
                    </div>
                    {item.location ? (
                      <p className="mt-1 text-sm text-slate-600">
                        {item.location}
                      </p>
                    ) : null}
                    {item.description ? (
                      <p className="mt-2 text-sm leading-6 text-slate-700">
                        {item.description}
                      </p>
                    ) : null}
                  </div>
                ))}
              </div>
            </section>
          ) : null}

          {languages.length > 0 ? (
            <section>
              <h2 className="cv-heading">Languages</h2>
              <p className="mt-2 text-sm leading-6 text-slate-700">
                {languages
                  .map((item) =>
                    [item.name, item.proficiency].filter(Boolean).join(" - "),
                  )
                  .join(", ")}
              </p>
            </section>
          ) : null}

          {references.length > 0 ? (
            <section>
              <h2 className="cv-heading">References</h2>
              <div className="mt-3 grid gap-4 sm:grid-cols-2">
                {references.map((item) => (
                  <div key={item.id} className="text-sm leading-6 text-slate-700">
                    <p className="font-semibold text-slate-950">{item.name}</p>
                    <p>{[item.role, item.company].filter(Boolean).join(", ")}</p>
                    <p>{item.email}</p>
                    <p>{item.phone}</p>
                  </div>
                ))}
              </div>
            </section>
          ) : null}
        </div>
      </article>
    </section>
  );
}
