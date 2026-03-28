src/
│
├── app/
│   ├── App.jsx
│   ├── routes.jsx
│
├── components/
│   ├── common/
│   │   ├── SearchBar.jsx
│   │   ├── Loader.jsx
│   │   ├── Modal.jsx
│   │
│   ├── subjects/
│   │   ├── SubjectCard.jsx
│   │   ├── TopicList.jsx
│   │
│   ├── tasks/
│   │   ├── TaskCard.jsx
│   │   ├── TaskForm.jsx
│   │
│   ├── dashboard/
│   │   ├── ProgressChart.jsx
│   │   ├── StatsCards.jsx
│   │
│   ├── revision/
│   │   ├── RevisionList.jsx
│   │   ├── CalendarView.jsx
│   │
│   ├── ai/
│   │   ├── AIPromptBox.jsx
│   │   ├── AIResponseCard.jsx
│
├── pages/
│   ├── Dashboard.jsx
│   ├── Subjects.jsx
│   ├── Tasks.jsx
│   ├── Revision.jsx
│   ├── AITools.jsx
│
├── context/
│   ├── StudyContext.jsx
│
├── hooks/
│   ├── useTasks.js
│   ├── useSubjects.js
│   ├── useProgress.js
│   ├── useDebounce.js
│
├── services/
│   ├── aiService.js
│   ├── storageService.js   // localStorage
│
├── utils/
│   ├── helpers.js
│   ├── constants.js
│
├── styles/
│   ├── global.css
│
└── main.jsx



Inside src create these folders

components/
pages/
context/
hooks/
services/
utils/
styles/
app/





Phase 1 (Core CRUD):
- Subjects
- Topics
- Tasks
Phase 2 (UI + Filters):
- Search
- Filter
- Sorting
Phase 3 (Dashboard):
- Charts
- Stats
Phase 4 (Revision planner):
Phase 5 (AI integration):