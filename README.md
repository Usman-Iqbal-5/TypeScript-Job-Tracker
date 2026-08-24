# 💼 Job Tracker

A responsive job tracking application built with **TypeScript, Tailwind CSS and Vite**.

The application provides a Kanban board for managing job applications through different recruitment stages, with search, filtering, sorting, drag and drop, and dashboard analytics.

Applications can be created, edited, searched, filtered, sorted and moved between recruitment stages through drag and drop. A dedicated dashboard provides application statistics and Chart.js visualisations.

## ✨ Features

- 📌 **Kanban workflow** across four recruitment stages:
  - Applied
  - Interviewed
  - Offered
  - Rejected
- 🖱️ **Drag and drop** applications between recruitment stages
- ➕ Create and edit applications through modal forms
- 📄 Detailed job information side panel
- 🔎 Search across job title, company and notes
- ⭐ Interactive five-star rating system
- 📅 Filter applications by date:
  - All
  - Past week
  - Past month
  - Past 3 months
- ↕️ Sort applications by:
  - Newest
  - Oldest
  - Highest rated
  - Lowest rated
  - Company A–Z
  - Company Z–A
- 📊 Dashboard application statistics
- 📈 Application status visualisations using Chart.js
- ✅ Client-side form validation
- 📱 Responsive interface

## 🖼️ Screenshots

### 📊 Dashboard and Kanban Board

![Job Tracker Dashboard and Kanban Board](screenshots/full.jpeg)

### ➕ Add Application

![Add Application](screenshots/add-application.png)

### 📄 Job Details

![Job Details](screenshots/job-details.png)

## 🛠️ Technologies

| Technology | Purpose |
|---|---|
| **TypeScript** | Typed application logic, interfaces, enums and type safety |
| **Tailwind CSS** | Responsive styling, layout and UI design |
| **Vite** | Development environment and production build tooling |
| **Chart.js** | Dashboard data visualisation |
| **HTML5** | Application structure and semantic markup |
| **Web APIs** | Drag and drop, DOM manipulation and browser interactions |

## ⚙️ Technical Implementation

### 🔄 Data-driven rendering

The `jobs` collection acts as the **single source of truth** for application data.

UI operations update the underlying application data before the interface is rendered. Rather than treating individual DOM elements as the source of application state, the Kanban board is generated from the current application data.

Filtering and sorting are centralised in `applyFilters()`, while `renderJobs()` is responsible for rebuilding the visible Kanban cards.

This approach keeps application state independent from the DOM and ensures that filtering, sorting and drag-and-drop operations remain synchronised.

### 🔎 Filtering and sorting

Search, rating and date criteria are combined during filtering before the resulting collection is sorted.

The application supports multiple sorting strategies, including:

- Chronological ordering using application dates
- Numeric ordering using application ratings
- Alphabetical ordering using company names

The filtering and sorting pipeline allows multiple criteria to be applied simultaneously while preserving the selected ordering.

### 🖱️ Drag and drop

The application uses the **HTML5 Drag and Drop API** to move applications between recruitment stages.

A drop operation identifies the corresponding application and updates its `status` in the underlying data. The Kanban board is then rendered from the updated state.

This ensures that drag-and-drop operations remain compatible with the active search, filtering and sorting configuration.

### 📊 Dashboard and data visualisation

Dashboard statistics are calculated directly from the application data.

**Chart.js** is used to visualise the distribution of applications across recruitment stages, while summary statistics provide an overview of the current application pipeline.

When application data changes, the dashboard is recalculated so that the statistics and visualisations remain synchronised with the Kanban board.

### 🧩 Modular application structure

Application functionality is separated across dedicated modules rather than being contained entirely within a single file.

Type definitions, dashboard functionality, shared state and statistical utilities are maintained separately from the main application logic.

This provides clear separation of responsibilities and makes individual parts of the application easier to maintain and extend.

### 🎯 Typed application model

The application's job data is represented using TypeScript interfaces and enums.

The `job` interface defines the structure of application data, while the `JobStatus` enum provides a controlled set of valid recruitment stages.

This provides compile-time type checking and helps maintain consistent application state throughout the application.

## 📁 Project Structure

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

## 🗂️ Code Organisation

- **`src/types/job.ts`** — Defines the application's job interface and `JobStatus` enum.
- **`src/utils/jobStats.ts`** — Contains reusable functions for calculating application and dashboard statistics.
- **`src/app.ts`** — Handles core application functionality, including job creation, editing, filtering, sorting, rendering and drag-and-drop operations.
- **`src/dashboard.ts`** — Handles dashboard statistics and Chart.js visualisations.
- **`src/shared_states.ts`** — Provides shared application state between modules.
- **`CSS/input.css`** — Tailwind CSS entry point and custom styling.

## 🚀 Getting Started

### 📋 Prerequisites

- Node.js
- npm

### 📥 Installation

Clone the repository:

```bash
git clone git@github.com:Usman-Iqbal-5/TypeScript-Job-Tracker.git
```

Navigate to the project directory:

```bash
cd TypeScript-Job-Tracker
```

Install the project dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

Open the local development URL provided by Vite.

### 📦 Production Build

Create a production build with:

```bash
npm run build
```

## 💡 Engineering Highlights

This project demonstrates experience with:

- **TypeScript** and strongly typed application models
- **Frontend state management** and data-driven rendering
- **DOM manipulation** and dynamic UI generation
- **Event-driven programming**
- **HTML5 Drag and Drop API**
- **Array transformation and data processing**
- **Filtering and sorting logic**
- **Responsive interface development**
- **Tailwind CSS**
- **Chart.js data visualisation**
- **Modular TypeScript architecture**
- **Vite development and build tooling**

## 👨‍💻 Author

**Usman Iqbal**

Full-stack developer experienced in building maintainable web applications across the frontend and backend using **TypeScript, JavaScript, React, Node.js, Express and modern web technologies**.
