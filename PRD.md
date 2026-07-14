# Product Requirement Document (PRD)

# Project

CV Generator

## Context

I want to build a complete AI-assisted project from planning to deployment.

The purpose of this project is to create a modern web application where users can build professional resumes (CVs) through an intuitive interface.

The first version should be simple, fully browser-based and require no backend.

## Goal

Allow users to create, edit, preview, manage and export professional CVs.

The application should feel like a lightweight Resume Builder rather than a simple form.

## Tech Stack

- Next.js (latest)
- TypeScript
- App Router
- Tailwind CSS

## Design

Create a clean, modern and minimal interface.

Design principles:

- Plenty of whitespace
- Rounded corners
- Soft shadows
- Smooth animations
- Professional appearance
- Responsive layout
- Mobile friendly

The UI should look similar to modern productivity applications.

## Application Flow

### Home Page

Display:

- Application title
- Short description
- "Create Your CV" button

Clicking the button navigates to the CV Builder page.

---

### CV Builder

The page should have a three-column layout.

### Left Sidebar

Display all previously created CVs.

Each card should contain:

- CV Name
- Last Updated
- Edit
- Download PDF
- Delete

Deleting a CV should require confirmation.

Users can create unlimited CVs.

---

### Center Section

Display the CV editor.

The form should be divided into collapsible sections (Accordion).

Sections:

- Personal Information
- About Me
- Skills
- Work Experience
- Education
- Languages
- References
- Social Links

Users should be able to dynamically add and remove repeatable items.

Examples:

- Multiple work experiences
- Multiple education records
- Multiple references
- Multiple links

Changes should be automatically saved to localStorage.

---

### Right Section

Display a real-time CV preview.

The preview should update instantly while editing.

The preview should represent the exported PDF as closely as possible.

## CV Template

Version 1 should contain only one CV template.

Requirements:

- ATS-friendly
- Professional
- Simple
- Easy to read
- Suitable for most companies
- Pure HTML/CSS layout

Avoid decorative designs.

Prioritize readability.

## PDF Export

Users should be able to export the displayed CV as PDF.

The exported PDF should closely match the preview.

## Local Storage

No backend should be used.

Requirements:

- Automatically save changes
- Restore latest changes after refresh
- Support unlimited CVs
- Store each CV with:
  - id
  - name
  - createdAt
  - updatedAt

## Validation

Validate required fields.

Display friendly validation messages.

## Accessibility

- Keyboard accessible
- Responsive
- Mobile friendly
- Screen reader friendly

## Code Requirements

- TypeScript
- Reusable components
- Clean Code
- Small components
- No unnecessary dependencies
- Avoid any
- Separate UI from business logic

## Workflow

Do not start coding immediately.

Follow these steps:

1. Analyze the project.
2. Identify missing requirements.
3. Suggest improvements if necessary.
4. Create the project architecture.
5. Create the folder structure.
6. Create the implementation plan.
7. Wait for approval.
8. Implement the project step by step.

## Important Rules

- Do not invent features that are not described.
- Keep Version 1 as simple as possible.
- Focus on maintainability.
- Prefer reusable components.
- Do not over-engineer the project.
- Explain important architectural decisions before implementation.
