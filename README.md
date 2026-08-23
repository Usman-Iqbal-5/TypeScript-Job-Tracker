# Job Tracker

A responsive job application tracker built with **TypeScript, Tailwind CSS and Vite**. The application provides a Kanban-style workflow for managing job applications from initial application through to interview, offer or rejection.

## Overview

Job Tracker is a client-side web application designed to make managing multiple job applications easier.

Applications can be added, edited, searched, filtered, sorted and moved between recruitment stages using drag and drop. A dashboard provides an overview of application activity.

The project was built to practise and demonstrate practical frontend development, including **TypeScript, DOM manipulation, event-driven programming and data handling**.

## Features

- **Kanban board** with four application stages:
  - Applied
  - Interviewed
  - Offered
  - Rejected
- **Drag and drop** applications between stages
- Add and edit job applications through modal forms
- Detailed job information side panel
- Search by job title, company and notes
- Filter by application rating
- Filter by application date:
  - All
  - Past week
  - Past month
  - Past 3 months
- Sort applications by:
  - Newest
  - Oldest
  - Highest rated
  - Lowest rated
  - Company name A–Z
  - Company name Z–A
- Interactive five-star rating system
- Dashboard application statistics
- Application status charts using Chart.js
- Client-side form handling and validation

## Screenshots

### Dashboard and Kanban board

![Job Tracker Dashboard and kanban board](screenshots/full.png)

### Add Application

![Add Application](screenshots/add-application.png)

### Job Details

![Job Details](screenshots/job-details.png)

## Technologies

| Technology | Usage |
|---|---|
| **TypeScript** | Application logic, interfaces, enums and type safety |
| **Tailwind CSS** | Responsive styling and UI layout |
| **Vite** | Development environment and build tooling |
| **Chart.js** | Dashboard data visualisation |
| **HTML5** | Application structure |
| **Web APIs** | Drag and drop and DOM manipulation |

## Technical Implementation

### Data-driven rendering

The `jobs` array is used as the **source of truth** for application data.

When an application is added, edited or moved between stages, the underlying job object is updated before the interface is rendered again.

Filtering and sorting are handled by a central `applyFilters()` function. The resulting array is passed to `renderJobs()`, which clears the Kanban columns and renders the currently visible applications.

### Filtering and sorting

Search, rating and date filters are combined before the resulting applications are sorted.

Sorting is handled using JavaScript's `filter()` and `sort()`  method with different comparison functions for dates, ratings and company names.

### Drag and drop

The HTML5 Drag and Drop API is used to move applications between Kanban stages.

Rather than treating the DOM card as the source of application state, the drop operation updates the corresponding job's `status`. The application is then re-rendered from the updated data.

This allows drag-and-drop operations to work correctly alongside the active search, filters and sorting options.

### Dashboard visualisation

Chart.js is used to visualise application statuses and provide a quick overview of the user's application pipeline.

Dashboard statistics are recalculated when application data changes, keeping the visualisations synchronised with the Kanban board.

## Getting Started

### Prerequisites

- Node.js
- npm

### Installation

Clone the repository:

```bash
git clone https://github.com/YOUR-USERNAME/job-tracker.git
```

Navigate to the project directory:

```bash
cd job-tracker
```

Install the dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

Open the local development URL provided by Vite.

### Production Build

To create a production build:

```bash
npm run build
```

## Project Structure

```text
job-tracker/
├── src/
│   ├── types/
│   │   └── job.ts
│   ├── utils/
│   │   └── jobStats.ts
│   ├── app.ts
│   ├── dashboard.ts
│   ├── shared_states.ts
│   └── vite-env.d.ts
├── CSS/
│   └── input.css
├── public/
├── index.html
├── package.json
├── tsconfig.json
├── vite.config.ts
└── README.md
```

## Development Focus

This project was built to strengthen practical experience with:

- TypeScript application development
- Typed data models using interfaces and enums
- DOM manipulation
- Event listeners and event propagation
- HTML5 Drag and Drop API
- Array filtering and sorting
- Client-side state management
- Tailwind CSS
- Data visualisation with Chart.js
- Vite-based development and builds
- Separating application logic from UI rendering

## Future Development

Potential extensions include:

- REST API and database integration
- User authentication
- Cloud-based data synchronisation
- Application reminders
- More detailed analytics
- Application activity history

## Author

**Usman Iqbal**

Built as a portfolio project to demonstrate practical frontend development skills using TypeScript, Tailwind CSS, Vite and modern browser APIs.
