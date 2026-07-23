import { formatDateRange, splitLines } from "@/lib/cv/format";
import type { CvDocument } from "@/lib/cv/types";

type CvPreviewProps = {
  cv: CvDocument;
};

function hasText(...values: string[]) {
  return values.some((value) => value.trim());
}

const translations = {
  en: {
    yourName: "Your Name",
    contact: "Contact Information",
    email: "Email",
    phone: "Phone",
    address: "Address",
    link: "Link",
    about: "About Me",
    skills: "Skills",
    workExperience: "Work Experience",
    role: "Role",
    education: "Education",
    degree: "Degree",
    languages: "Languages",
    certificates: "Certificates",
    references: "References",
    present: "Present",
  },
  tr: {
    yourName: "Adınız Soyadınız",
    contact: "İletişim Bilgileri",
    email: "E-posta",
    phone: "Telefon",
    address: "Adres",
    link: "Bağlantı",
    about: "Hakkımda",
    skills: "Yetenekler",
    workExperience: "İş Deneyimi",
    role: "Pozisyon",
    education: "Eğitim",
    degree: "Bölüm",
    languages: "Diller",
    certificates: "Sertifikalar",
    references: "Referanslar",
    present: "Devam Ediyor",
  },
} as const;

export function CvPreview({ cv }: CvPreviewProps) {
  const text = translations[cv.language ?? "en"];
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
  const certificates = cv.certificates.filter((item) =>
    hasText(item.title, item.description),
  );
  const references = cv.references.filter((item) =>
    hasText(item.name, item.role, item.company, item.email, item.phone),
  );
  const socialLinks = cv.socialLinks.filter((item) =>
    hasText(item.label, item.url),
  );

  return (
    <section className="min-h-0 overflow-y-auto rounded-2xl border border-slate-200 bg-slate-200/70 p-3 shadow-sm">
      <div className="mb-3 flex items-center justify-between px-1">
        <h2 className="text-base font-semibold text-slate-950">Preview</h2>
        <span className="text-xs font-medium text-slate-500">
          Print layout
        </span>
      </div>

      <article
        id="cv-preview"
        aria-label="CV preview"
        className="cv-preview mx-auto min-h-[960px] w-full max-w-[794px] bg-white px-10 py-10 text-slate-950 shadow-md"
      >
        <header className="border-b border-slate-300 pb-5">
          <h1 className="text-3xl font-bold tracking-normal">
            {cv.personalInfo.fullName || text.yourName}
          </h1>
          {cv.personalInfo.jobTitle ? (
            <p className="mt-1 text-base font-medium text-slate-700">
              {cv.personalInfo.jobTitle}
            </p>
          ) : null}
          {hasText(
            cv.personalInfo.email,
            cv.personalInfo.phone,
            cv.personalInfo.location,
            ...socialLinks.flatMap((link) => [link.label, link.url]),
          ) ? (
            <div className="mt-4">
              <h2 className="text-xs font-bold uppercase tracking-wider text-slate-800">
                {text.contact}
              </h2>
              <div className="mt-2 flex flex-col gap-1 text-sm text-slate-600">
                {cv.personalInfo.email ? (
                  <p>
                    <span className="font-semibold text-slate-800">{text.email}:</span>{" "}
                    <a href={`mailto:${cv.personalInfo.email}`}>
                      {cv.personalInfo.email}
                    </a>
                  </p>
                ) : null}
                {cv.personalInfo.phone ? (
                  <p>
                    <span className="font-semibold text-slate-800">{text.phone}:</span>{" "}
                    <a href={`tel:${cv.personalInfo.phone}`}>
                      {cv.personalInfo.phone}
                    </a>
                  </p>
                ) : null}
                {cv.personalInfo.location ? (
                  <p>
                    <span className="font-semibold text-slate-800">{text.address}:</span>{" "}
                    {cv.personalInfo.location}
                  </p>
                ) : null}
                {socialLinks.map((link) => {
                  const label = link.label || text.link;

                  return (
                    <p key={link.id}>
                      <span className="font-semibold text-slate-800">
                        {label}:
                      </span>{" "}
                      {link.url ? (
                        <a href={link.url} target="_blank" rel="noreferrer">
                          {link.url}
                        </a>
                      ) : null}
                    </p>
                  );
                })}
              </div>
            </div>
          ) : null}
        </header>

        <div className="mt-8 space-y-9">
          {cv.about.trim() ? (
            <section>
              <h2 className="cv-heading">{text.about}</h2>
              <p className="mt-2 text-sm leading-6 text-slate-700">
                {cv.about}
              </p>
            </section>
          ) : null}

          {education.length > 0 ? (
            <section>
              <h2 className="cv-heading">{text.education}</h2>
              <div className="mt-3 space-y-4">
                {education.map((item) => (
                  <div key={item.id}>
                    <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                      <h3 className="text-base font-semibold text-slate-950">
                        {item.degree || text.degree}
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

          {workExperience.length > 0 ? (
            <section>
              <h2 className="cv-heading">{text.workExperience}</h2>
              <div className="mt-3 space-y-5">
                {workExperience.map((item) => (
                  <div key={item.id}>
                    <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                      <h3 className="text-base font-semibold text-slate-950">
                        {item.role || text.role}
                        {item.company ? `, ${item.company}` : ""}
                      </h3>
                      <p className="text-sm font-medium text-slate-600">
                        {formatDateRange(
                          item.startDate,
                          item.endDate,
                          item.current,
                          text.present,
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

          {skills.length > 0 ? (
            <section>
              <h2 className="cv-heading">{text.skills}</h2>
              <p className="mt-2 text-sm leading-6 text-slate-700">
                {skills.join(", ")}
              </p>
            </section>
          ) : null}

          {languages.length > 0 ? (
            <section>
              <h2 className="cv-heading">{text.languages}</h2>
              <p className="mt-2 text-sm leading-6 text-slate-700">
                {languages
                  .map((item) =>
                    [item.name, item.proficiency].filter(Boolean).join(" - "),
                  )
                  .join(", ")}
              </p>
            </section>
          ) : null}

          {certificates.length > 0 ? (
            <section>
              <h2 className="cv-heading">{text.certificates}</h2>
              <div className="mt-3 space-y-3">
                {certificates.map((item) => (
                  <div key={item.id} className="text-sm leading-6 text-slate-700">
                    <p className="font-semibold text-slate-950">{item.title}</p>
                    {item.description ? <p>{item.description}</p> : null}
                  </div>
                ))}
              </div>
            </section>
          ) : null}

          {references.length > 0 ? (
            <section>
              <h2 className="cv-heading">{text.references}</h2>
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
