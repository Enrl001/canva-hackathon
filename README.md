# Course Mind Map - Canva Hackathon

An interactive course mind map application that helps students visualize their academic journey with AI-powered course analysis and interactive mind mapping.

## Features

- **User Authentication**: Login system with university and degree selection
- **Course Management**: Add and manage multiple courses with categories
- **AI Integration**: Analyze courses and extract topics, skills, and connections (planned)
- **Interactive Mind Maps**: Visual representation of course relationships using React Flow
- **Responsive Design**: Modern UI built with Tailwind CSS
- **Type Safety**: Full TypeScript implementation

## Tech Stack

### Frontend Framework
- **Next.js 15.5.2**: React framework with App Router and Turbopack support
- **React 19.1.0**: UI library with modern hooks
- **TypeScript 5**: Type-safe JavaScript with full interface definitions

### State Management
- **Redux Toolkit 2.9.0**: Predictable state container
- **React Redux 9.2.0**: React bindings for Redux

### UI & Styling
- **Tailwind CSS 4.1.13**: Utility-first CSS framework
- **PostCSS 8.5.6**: CSS post-processor
- **Autoprefixer 10.4.21**: CSS vendor prefix automation

### Data Visualization
- **React Flow 11.11.4**: Interactive node-based graphs and mind maps

### HTTP Client
- **Axios 1.11.0**: Promise-based HTTP client for API calls

### Development Dependencies
- **@types/node**: Node.js type definitions
- **@types/react**: React type definitions  
- **@types/react-dom**: React DOM type definitions

## Project Structure

```
my-app/
├── src/
│   ├── app/
│   │   ├── components/
│   │   │   ├── LoginForm.tsx
│   │   │   ├── UniversitySelector.tsx
│   │   │   └── CourseForm.tsx
│   │   ├── store/
│   │   │   └── index.ts
│   │   ├── utils/
│   │   │   └── localStorage.ts
│   │   ├── layout.tsx
│   │   └── globals.css
│   └── pages/
│       ├── index.tsx
│       ├── map.tsx
│       └── user.tsx
├── public/
├── package.json
├── tailwind.config.ts
├── tsconfig.json
└── next.config.ts
```

## Installation & Setup

1. Clone the repository:
```
git clone https://github.com/Enrl001/canva-hackathon.git
cd canva-hackathon/my-app
```

2. Install dependencies:
```bash
npm install
```

3. Run the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Available Scripts

- `npm run dev`: Start development server with Turbopack
- `npm run build`: Build for production with Turbopack
- `npm start`: Start production server

## Key Dependencies Explained

- **Redux Toolkit**: Manages application state including user authentication, university selection, and course data
- **React Flow**: Powers the interactive mind map visualization with drag-and-drop nodes
- **Tailwind CSS**: Provides utility classes for responsive design and modern UI components
- **TypeScript**: Ensures type safety across components, Redux store, and API interfaces
- **Next.js**: Provides server-side rendering, routing, and optimized build process

## Future Enhancements

- AI-powered course analysis integration
- Advanced mind map features (clustering, filtering)
- Export functionality (PDF, PNG)
- Collaborative editing
- Mobile app version