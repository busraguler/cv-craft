"use client";

import { AccordionSection } from "@/components/builder/AccordionSection";
import { EmptyState } from "@/components/builder/EmptyState";
import { Field } from "@/components/builder/Field";
import {
  createEmptyEducation,
  createEmptyLanguage,
  createEmptyReference,
  createEmptySocialLink,
  createEmptyWorkExperience,
} from "@/lib/cv/defaults";
import type {
  CvDocument,
  CvValidation,
  Education,
  Language,
  Reference,
  SocialLink,
  WorkExperience,
} from "@/lib/cv/types";

type CvEditorProps = {
  cv: CvDocument;
  validation: CvValidation;
  onChange: (cv: CvDocument) => void;
};

export function CvEditor({ cv, validation, onChange }: CvEditorProps) {
  function update(next: CvDocument) {
    onChange(next);
  }

  function updatePersonalInfo(
    key: keyof CvDocument["personalInfo"],
    value: string,
  ) {
    update({
      ...cv,
      personalInfo: {
        ...cv.personalInfo,
        [key]: value,
      },
    });
  }

  function updateSkill(index: number, value: string) {
    update({
      ...cv,
      skills: cv.skills.map((skill, itemIndex) =>
        itemIndex === index ? value : skill,
      ),
    });
  }

  function removeSkill(index: number) {
    update({
      ...cv,
      skills: cv.skills.filter((_, itemIndex) => itemIndex !== index),
    });
  }

  function updateWork(id: string, changes: Partial<WorkExperience>) {
    update({
      ...cv,
      workExperience: cv.workExperience.map((item) =>
        item.id === id ? { ...item, ...changes } : item,
      ),
    });
  }

  function updateEducation(id: string, changes: Partial<Education>) {
    update({
      ...cv,
      education: cv.education.map((item) =>
        item.id === id ? { ...item, ...changes } : item,
      ),
    });
  }

  function updateLanguage(id: string, changes: Partial<Language>) {
    update({
      ...cv,
      languages: cv.languages.map((item) =>
        item.id === id ? { ...item, ...changes } : item,
      ),
    });
  }

  function updateReference(id: string, changes: Partial<Reference>) {
    update({
      ...cv,
      references: cv.references.map((item) =>
        item.id === id ? { ...item, ...changes } : item,
      ),
    });
  }

  function updateSocialLink(id: string, changes: Partial<SocialLink>) {
    update({
      ...cv,
      socialLinks: cv.socialLinks.map((item) =>
        item.id === id ? { ...item, ...changes } : item,
      ),
    });
  }

  return (
    <section className="min-h-0 overflow-y-auto rounded-2xl border border-slate-200 bg-slate-100/70 p-3 shadow-sm">
      <div className="mb-3 rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
        <label className="mb-4 block text-sm font-medium text-slate-800">
          CV Language
          <select
            className="mt-1.5 block w-full rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm text-slate-900 outline-none transition hover:border-slate-300 focus:border-slate-900 focus:ring-4 focus:ring-slate-100"
            value={cv.language}
            onChange={(event) =>
              update({
                ...cv,
                language: event.target.value === "tr" ? "tr" : "en",
              })
            }
          >
            <option value="tr">Türkçe</option>
            <option value="en">English</option>
          </select>
        </label>
        <Field
          label="CV Name"
          value={cv.name}
          error={validation.fields.name}
          onValueChange={(name) => update({ ...cv, name })}
        />
      </div>

      {!validation.isValid ? (
        <div className="mb-3 rounded-lg border border-amber-200 bg-amber-50 p-4 text-sm text-amber-900">
          <p className="font-semibold">Before exporting</p>
          <ul className="mt-2 list-disc space-y-1 pl-5">
            {validation.messages.map((message) => (
              <li key={message}>{message}</li>
            ))}
          </ul>
        </div>
      ) : null}

      <div className="space-y-3">
        <AccordionSection title="Personal Information" defaultOpen>
          <div className="grid gap-4 sm:grid-cols-2">
            <Field
              label="Full Name"
              value={cv.personalInfo.fullName}
              error={validation.fields.fullName}
              onValueChange={(value) => updatePersonalInfo("fullName", value)}
            />
            <Field
              label="Job Title"
              value={cv.personalInfo.jobTitle}
              onValueChange={(value) => updatePersonalInfo("jobTitle", value)}
            />
            <Field
              label="Email"
              type="email"
              value={cv.personalInfo.email}
              error={validation.fields.email}
              onValueChange={(value) => updatePersonalInfo("email", value)}
            />
            <Field
              label="Phone"
              value={cv.personalInfo.phone}
              error={validation.fields.phone}
              onValueChange={(value) => updatePersonalInfo("phone", value)}
            />
            <Field
              label="Location"
              value={cv.personalInfo.location}
              className="sm:col-span-2"
              onValueChange={(value) => updatePersonalInfo("location", value)}
            />
          </div>
        </AccordionSection>

        <AccordionSection title="About Me">
          <Field
            label="Professional Summary"
            multiline
            value={cv.about}
            error={validation.fields.content}
            onValueChange={(about) => update({ ...cv, about })}
          />
        </AccordionSection>

        <AccordionSection title="Skills">
          <div className="space-y-3">
            {cv.skills.map((skill, index) => (
              <div key={index} className="flex gap-2">
                <Field
                  label={`Skill ${index + 1}`}
                  value={skill}
                  className="flex-1"
                  onValueChange={(value) => updateSkill(index, value)}
                />
                <button
                  type="button"
                  onClick={() => removeSkill(index)}
                  className="mt-7 h-10 rounded-lg border border-slate-200 px-3 text-sm font-medium text-slate-600 hover:bg-slate-50 focus:outline-none focus:ring-4 focus:ring-slate-200"
                >
                  Remove
                </button>
              </div>
            ))}
            <button
              type="button"
              onClick={() => update({ ...cv, skills: [...cv.skills, ""] })}
              className="rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm font-semibold text-slate-800 transition hover:border-slate-300 hover:bg-slate-50 focus:outline-none focus:ring-4 focus:ring-slate-100"
            >
              Add Skill
            </button>
          </div>
        </AccordionSection>

        <AccordionSection title="Work Experience">
          <div className="space-y-4">
            {cv.workExperience.map((item) => (
              <div
                key={item.id}
                className="rounded-lg border border-slate-200 bg-slate-50 p-3"
              >
                <div className="grid gap-4 sm:grid-cols-2">
                  <Field
                    label="Role"
                    value={item.role}
                    onValueChange={(role) => updateWork(item.id, { role })}
                  />
                  <Field
                    label="Company"
                    value={item.company}
                    onValueChange={(company) =>
                      updateWork(item.id, { company })
                    }
                  />
                  <Field
                    label="Location"
                    value={item.location}
                    onValueChange={(location) =>
                      updateWork(item.id, { location })
                    }
                  />
                  <Field
                    label="Start Date"
                    value={item.startDate}
                    placeholder="Jan 2024"
                    onValueChange={(startDate) =>
                      updateWork(item.id, { startDate })
                    }
                  />
                  <Field
                    label="End Date"
                    value={item.endDate}
                    placeholder="Present"
                    disabled={item.current}
                    onValueChange={(endDate) =>
                      updateWork(item.id, { endDate })
                    }
                  />
                  <label className="mt-7 flex h-10 items-center gap-2 rounded-lg border border-slate-200 bg-white px-3 text-sm text-slate-700">
                    <input
                      type="checkbox"
                      checked={item.current}
                      onChange={(event) =>
                        updateWork(item.id, {
                          current: event.target.checked,
                          endDate: event.target.checked ? "" : item.endDate,
                        })
                      }
                    />
                    Current role
                  </label>
                  <Field
                    label="Description"
                    multiline
                    value={item.description}
                    className="sm:col-span-2"
                    onValueChange={(description) =>
                      updateWork(item.id, { description })
                    }
                  />
                </div>
                <button
                  type="button"
                  onClick={() =>
                    update({
                      ...cv,
                      workExperience: cv.workExperience.filter(
                        (work) => work.id !== item.id,
                      ),
                    })
                  }
                  className="mt-3 rounded-lg border border-red-200 px-3 py-2 text-sm font-medium text-red-700 hover:bg-red-50 focus:outline-none focus:ring-4 focus:ring-red-100"
                >
                  Remove Experience
                </button>
              </div>
            ))}
            <button
              type="button"
              onClick={() =>
                update({
                  ...cv,
                  workExperience: [
                    ...cv.workExperience,
                    createEmptyWorkExperience(),
                  ],
                })
              }
              className="rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm font-semibold text-slate-800 transition hover:border-slate-300 hover:bg-slate-50 focus:outline-none focus:ring-4 focus:ring-slate-100"
            >
              Add Experience
            </button>
          </div>
        </AccordionSection>

        <AccordionSection title="Education">
          <div className="space-y-4">
            {cv.education.map((item) => (
              <div
                key={item.id}
                className="rounded-lg border border-slate-200 bg-slate-50 p-3"
              >
                <div className="grid gap-4 sm:grid-cols-2">
                  <Field
                    label="School"
                    value={item.school}
                    onValueChange={(school) =>
                      updateEducation(item.id, { school })
                    }
                  />
                  <Field
                    label="Degree"
                    value={item.degree}
                    onValueChange={(degree) =>
                      updateEducation(item.id, { degree })
                    }
                  />
                  <Field
                    label="Location"
                    value={item.location}
                    onValueChange={(location) =>
                      updateEducation(item.id, { location })
                    }
                  />
                  <Field
                    label="Start Date"
                    value={item.startDate}
                    onValueChange={(startDate) =>
                      updateEducation(item.id, { startDate })
                    }
                  />
                  <Field
                    label="End Date"
                    value={item.endDate}
                    onValueChange={(endDate) =>
                      updateEducation(item.id, { endDate })
                    }
                  />
                  <Field
                    label="Description"
                    multiline
                    value={item.description}
                    className="sm:col-span-2"
                    onValueChange={(description) =>
                      updateEducation(item.id, { description })
                    }
                  />
                </div>
                <button
                  type="button"
                  onClick={() =>
                    update({
                      ...cv,
                      education: cv.education.filter(
                        (education) => education.id !== item.id,
                      ),
                    })
                  }
                  className="mt-3 rounded-lg border border-red-200 px-3 py-2 text-sm font-medium text-red-700 hover:bg-red-50 focus:outline-none focus:ring-4 focus:ring-red-100"
                >
                  Remove Education
                </button>
              </div>
            ))}
            <button
              type="button"
              onClick={() =>
                update({
                  ...cv,
                  education: [...cv.education, createEmptyEducation()],
                })
              }
              className="rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm font-semibold text-slate-800 transition hover:border-slate-300 hover:bg-slate-50 focus:outline-none focus:ring-4 focus:ring-slate-100"
            >
              Add Education
            </button>
          </div>
        </AccordionSection>

        <AccordionSection title="Languages">
          <div className="space-y-3">
            {cv.languages.map((item) => (
              <div key={item.id} className="grid gap-3 sm:grid-cols-[1fr_1fr_auto]">
                <Field
                  label="Language"
                  value={item.name}
                  onValueChange={(name) => updateLanguage(item.id, { name })}
                />
                <Field
                  label="Proficiency"
                  value={item.proficiency}
                  onValueChange={(proficiency) =>
                    updateLanguage(item.id, { proficiency })
                  }
                />
                <button
                  type="button"
                  onClick={() =>
                    update({
                      ...cv,
                      languages: cv.languages.filter(
                        (language) => language.id !== item.id,
                      ),
                    })
                  }
                  className="mt-7 h-10 rounded-lg border border-slate-200 px-3 text-sm font-medium text-slate-600 hover:bg-slate-50 focus:outline-none focus:ring-4 focus:ring-slate-200"
                >
                  Remove
                </button>
              </div>
            ))}
            <button
              type="button"
              onClick={() =>
                update({
                  ...cv,
                  languages: [...cv.languages, createEmptyLanguage()],
                })
              }
              className="rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm font-semibold text-slate-800 transition hover:border-slate-300 hover:bg-slate-50 focus:outline-none focus:ring-4 focus:ring-slate-100"
            >
              Add Language
            </button>
          </div>
        </AccordionSection>

        <AccordionSection title="References">
          <div className="space-y-4">
            {cv.references.length === 0 ? (
              <EmptyState
                title="No references yet"
                description="Add references only when you want them on the CV."
              />
            ) : null}
            {cv.references.map((item) => (
              <div
                key={item.id}
                className="rounded-lg border border-slate-200 bg-slate-50 p-3"
              >
                <div className="grid gap-4 sm:grid-cols-2">
                  <Field
                    label="Name"
                    value={item.name}
                    onValueChange={(name) => updateReference(item.id, { name })}
                  />
                  <Field
                    label="Role"
                    value={item.role}
                    onValueChange={(role) => updateReference(item.id, { role })}
                  />
                  <Field
                    label="Company"
                    value={item.company}
                    onValueChange={(company) =>
                      updateReference(item.id, { company })
                    }
                  />
                  <Field
                    label="Email"
                    type="email"
                    value={item.email}
                    onValueChange={(email) =>
                      updateReference(item.id, { email })
                    }
                  />
                  <Field
                    label="Phone"
                    value={item.phone}
                    onValueChange={(phone) =>
                      updateReference(item.id, { phone })
                    }
                  />
                </div>
                <button
                  type="button"
                  onClick={() =>
                    update({
                      ...cv,
                      references: cv.references.filter(
                        (reference) => reference.id !== item.id,
                      ),
                    })
                  }
                  className="mt-3 rounded-lg border border-red-200 px-3 py-2 text-sm font-medium text-red-700 hover:bg-red-50 focus:outline-none focus:ring-4 focus:ring-red-100"
                >
                  Remove Reference
                </button>
              </div>
            ))}
            <button
              type="button"
              onClick={() =>
                update({
                  ...cv,
                  references: [...cv.references, createEmptyReference()],
                })
              }
              className="rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm font-semibold text-slate-800 transition hover:border-slate-300 hover:bg-slate-50 focus:outline-none focus:ring-4 focus:ring-slate-100"
            >
              Add Reference
            </button>
          </div>
        </AccordionSection>

        <AccordionSection title="Social Links">
          <div className="space-y-3">
            {cv.socialLinks.map((item) => (
              <div key={item.id} className="grid gap-3 sm:grid-cols-[1fr_1fr_auto]">
                <Field
                  label="Label"
                  value={item.label}
                  placeholder="LinkedIn"
                  onValueChange={(label) =>
                    updateSocialLink(item.id, { label })
                  }
                />
                <Field
                  label="URL"
                  value={item.url}
                  placeholder="https://"
                  onValueChange={(url) => updateSocialLink(item.id, { url })}
                />
                <button
                  type="button"
                  onClick={() =>
                    update({
                      ...cv,
                      socialLinks: cv.socialLinks.filter(
                        (link) => link.id !== item.id,
                      ),
                    })
                  }
                  className="mt-7 h-10 rounded-lg border border-slate-200 px-3 text-sm font-medium text-slate-600 hover:bg-slate-50 focus:outline-none focus:ring-4 focus:ring-slate-200"
                >
                  Remove
                </button>
              </div>
            ))}
            <button
              type="button"
              onClick={() =>
                update({
                  ...cv,
                  socialLinks: [...cv.socialLinks, createEmptySocialLink()],
                })
              }
              className="rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm font-semibold text-slate-800 transition hover:border-slate-300 hover:bg-slate-50 focus:outline-none focus:ring-4 focus:ring-slate-100"
            >
              Add Link
            </button>
          </div>
        </AccordionSection>
      </div>
    </section>
  );
}
