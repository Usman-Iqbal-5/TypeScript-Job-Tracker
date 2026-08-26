# 💼 Job Tracker

A responsive, client-side job application tracker built with **TypeScript, Tailwind CSS and Vite**.

The application uses a Kanban board to manage applications through four stages: **Applied, Interviewed, Offered and Rejected**.

Applications can be added, edited, searched, filtered, sorted and moved between stages using drag and drop. The dashboard provides an overview of applications with statistics and charts.

## ✨ Features

- 📌 Kanban board with four application stages
- 🖱️ Drag and drop between stages
- ➕ Add and edit applications
- 📄 View detailed job information
- 🔎 Search by job title, company and notes
- ⭐ Five-star application ratings
- 📅 Filter by application date
- ↕️ Sort by:
  - Newest
  - Oldest
  - Highest rated
  - Lowest rated
  - Company A–Z
  - Company Z–A
- 📊 Application statistics
- 📈 Application status charts
- ✅ Client-side form validation
- 📱 Responsive layout

## 🖼️ Screenshots

### Dashboard and Kanban Board

![Job Tracker Dashboard and Kanban Board](screenshots/full.jpeg)

### Add Application

![Add Application](screenshots/add-application.png)

### Job Details

![Job Details](screenshots/job-details.png)

## 🛠️ Technologies

| Technology | Use |
|---|---|
| **TypeScript** | Application logic and type safety |
| **Tailwind CSS** | Styling and responsive layouts |
| **Vite** | Development and build tooling |
| **Chart.js** | Dashboard charts |
| **HTML5** | Application structure |
| **Web APIs** | Drag and drop and DOM interaction |

## ⚙️ Technical Implementation

### Rendering

Job data is stored in the `jobs` collection and used to build the Kanban board.

`applyFilters()` handles searching, filtering and sorting. `renderJobs()` clears the Kanban columns and creates the cards for the jobs that should currently be displayed.

When a job is added, edited or moved, the job data is updated and the board is rendered again.

### Filtering and Sorting

The application supports combining multiple filters:

- Search by title, company or notes
- Filter by rating
- Filter by application date

Jobs can then be sorted by date, rating or company name.

### Drag and Drop

The Kanban board uses the **HTML5 Drag and Drop API**.

When a job is dropped into another column, its `status` is updated and the board is rendered again. This means the board continues to work correctly when filters or sorting are being used.

### Dashboard

The dashboard displays the number of applications in each recruitment stage.

**Chart.js** is used to display application data as charts. Dashboard statistics and charts are updated whenever the job data changes.

### Code Structure

The application is split into separate modules for different parts of the application.

Job types are kept in `types/job.ts`, dashboard functionality is handled in `dashboard.ts`, and reusable statistics functions are kept in `utils/jobStats.ts`.

This keeps the main application logic organised and makes individual parts easier to maintain.

### TypeScript

The application uses TypeScript interfaces and enums to define job data and application statuses.

The `job` interface defines the fields stored for each application, while `JobStatus` defines the available Kanban stages.

## 📁 Project Structure

```text
TypeScript-Job-Tracker/
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

- **`src/types/job.ts`** — Job interface and `JobStatus` enum.
- **`src/utils/jobStats.ts`** — Functions used to calculate application statistics.
- **`src/app.ts`** — Main application logic, including jobs, rendering, filtering, sorting and drag and drop.
- **`src/dashboard.ts`** — Dashboard statistics and Chart.js charts.
- **`src/shared_states.ts`** — Shared application state.
- **`CSS/input.css`** — Tailwind CSS input file and custom CSS.

## 🚀 Getting Started

### Prerequisites

- Node.js
- npm

### Installation

Clone the repository:

```bash
git clone git@github.com:Usman-Iqbal-5/TypeScript-Job-Tracker.git
```

Enter the project directory:

```bash
cd TypeScript-Job-Tracker
```

Install the dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

Vite will provide the local development URL.

### Production Build

Create a production build:

```bash
npm run build
```

## 💡 Technical Highlights

- **TypeScript** application development
- **Interfaces and enums** for typed data
- **DOM manipulation** and dynamic rendering
- **Event handling** and event delegation
- **HTML5 Drag and Drop API**
- **Filtering and sorting** of application data
- **Client-side state management**
- **Responsive UI development**
- **Tailwind CSS**
- **Chart.js**
- **Modular code structure**
- **Vite**

## 👨‍💻 Author

**Usman Iqbal**

Full-stack developer experienced in building web applications across the frontend and backend using **TypeScript, JavaScript, React, Node.js, Express and modern web technologies**.
