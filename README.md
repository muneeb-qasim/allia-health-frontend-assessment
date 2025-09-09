# Allia Health - Task Management System

A modern healthcare task management application built with Next.js, TypeScript, and Tailwind CSS. This application provides a comprehensive interface for managing healthcare tasks with features like filtering, sorting, status updates, and data visualization.

## Features

### Core Functionality

- **Task Management**: View, filter, sort, and update healthcare tasks
- **Optimistic Updates**: Instant UI feedback with rollback on errors
- **Real-time Status Changes**: Inline status updates with loading states
- **Advanced Filtering**: Search by title, filter by assignment, sort by multiple criteria
- **URL Persistence**: Filters and search state persist across page refreshes

### UI/UX Features

- **Responsive Design**: Works seamlessly on desktop and mobile devices
- **Loading States**: Skeleton loaders and spinners for better user experience
- **Error Handling**: Graceful error states with user-friendly messages
- **Toast Notifications**: Success and error feedback using Sonner
- **Accessibility**: WCAG compliant with proper ARIA labels and keyboard navigation

### Dashboard & Analytics

- **Task Distribution Charts**: Visual representation of tasks by status and priority
- **Interactive Charts**: Built with Recharts for responsive data visualization
- **Real-time Updates**: Charts update automatically as tasks change

### Data Management

- **Mock API**: Simulated backend with realistic latency and error rates
- **State Management**: Zustand for efficient global state management
- **Type Safety**: Comprehensive TypeScript types throughout the application

## Tech Stack

- **Framework**: Next.js 15 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **State Management**: Zustand
- **Charts**: Recharts
- **Date Handling**: dayjs
- **Notifications**: Sonner
- **HTTP Client**: Axios
- **UI Components**: Ant Design
- **Icons**: Lucide React
- **Utilities**: clsx for conditional classes

## Getting Started

### Prerequisites

- **Node.js**: Version 18.0 or higher
- **Package Manager**: npm (comes with Node.js) or yarn
- **Git**: For cloning the repository
- **Modern Browser**: Chrome 90+, Firefox 88+, Safari 14+, or Edge 90+

### Quick Setup

1. **Clone the repository:**

   ```bash
   git clone <repository-url>
   cd allia-health-frontend-assessment
   ```

2. **Install dependencies:**

   ```bash
   npm install
   # or if you prefer yarn
   yarn install
   ```

3. **Start the development server:**

   ```bash
   npm run dev
   # or
   yarn dev
   ```

4. **Open your browser:**
   Navigate to [http://localhost:3000](http://localhost:3000)

### Development Commands

```bash
# Start development server with hot reload
npm run dev

# Build for production
npm run build

# Start production server (after build)
npm start

# Run linting
npm run lint
```

### Project Structure Overview

```
allia-health-frontend-assessment/
├── public/
│   ├── tasks.json          # Mock data source
│   └── *.svg              # Static assets
├── src/
│   ├── app/               # Next.js App Router
│   │   ├── globals.css    # Global styles
│   │   ├── layout.tsx     # Root layout
│   │   └── page.tsx       # Main page
│   ├── components/        # React components
│   │   ├── dashboard/     # Chart components
│   │   ├── layout/        # Layout components
│   │   ├── tasks/         # Task management
│   │   └── ui/           # Reusable UI components
│   ├── lib/              # Utilities
│   │   ├── api.ts        # Mock API
│   │   └── url-params.ts # URL utilities
│   ├── store/            # State management
│   │   └── tasks.ts      # Zustand store
│   └── types/            # TypeScript definitions
│       └── task.ts       # Task types
├── package.json          # Dependencies & scripts
├── tailwind.config.js    # Tailwind configuration
├── next.config.ts        # Next.js configuration
└── tsconfig.json         # TypeScript configuration
```

## Key Components

- **TaskTable**: Responsive table with inline status editing, optimistic updates, avatars, sorting/filtering, skeleton loading
- **TaskFilters**: Debounced search, tab filtering (All/Assigned/Created), date/priority sorting, real-time counts
- **CreateTaskModal**: Form validation, tag management, user assignment, date validation
- **TaskChart**: Pie charts for status/priority distribution, interactive tooltips, responsive design, empty states

## API Simulation

The application includes a comprehensive mock API that simulates real-world conditions:

- **Realistic Latency**: 600-1200ms delays to simulate network requests
- **Error Simulation**: 12.5% failure rate for testing error handling
- **Optimistic Updates**: Immediate UI updates with rollback on failure
- **Data Persistence**: Simulated CRUD operations

### API Methods

```typescript
api.listTasks(): Promise<Task[]>
api.updateTaskStatus(id: string, status: Status): Promise<Task>
api.createTask(data: CreateTaskData): Promise<Task>
```

## State Management

The application uses Zustand for state management with the following key features:

- **Optimistic Updates**: Immediate UI updates with rollback capability
- **Filter Management**: Centralized filter state with URL synchronization
- **Error Handling**: Centralized error state management
- **Loading States**: Global loading indicators

## Accessibility Features

- **Keyboard Navigation**: Full keyboard support for all interactive elements
- **Screen Reader Support**: Proper ARIA labels and semantic HTML
- **Focus Management**: Visible focus indicators and logical tab order
- **Color Contrast**: WCAG AA compliant color schemes
- **Touch Targets**: Minimum 44px touch targets for mobile users

## Performance Optimizations

- **Code Splitting**: Automatic code splitting with Next.js
- **Image Optimization**: Optimized avatar loading with fallbacks
- **Debounced Search**: Reduced API calls with search debouncing
- **Memoized Charts**: Optimized chart rendering with useMemo
- **Efficient Filtering**: Client-side filtering for instant results

## Browser Support

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## Assumptions & Limitations

### Technical Assumptions

- **User Context**: Hardcoded to "Amie Leighton" (u1) - no authentication system
- **Data Source**: Static JSON file (`public/tasks.json`) with no persistent storage
- **API Simulation**: 12.5% failure rate, 600-1200ms latency for testing
- **Healthcare Format**: Patient codes "PT-XXX", priorities (low/medium/high), statuses (todo/in_progress/in_review/done)
- **Browser**: Modern browser with JavaScript enabled, ISO 8601 dates, client-side task IDs

### Current Limitations

- **Data Persistence**: No database, changes don't survive page refreshes, no backup/recovery
- **User Management**: No authentication, authorization, user roles, or profile management
- **Real-time Features**: No WebSocket, live collaboration, or push notifications
- **Advanced Features**: No file uploads, offline support, bulk operations, or audit trails
- **Integration**: No external APIs, healthcare system connections (EMR, scheduling), or third-party services

## Next Steps

### High Priority

- **Backend Integration**: Replace mock API with real backend, database, data persistence
- **Authentication**: User auth system, RBAC, user management, security
- **Healthcare Integration**: EMR integration, patient scheduling, HIPAA compliance
- **Production Readiness**: CI/CD pipeline, comprehensive testing, monitoring
- **Testing Strategy**: Unit, integration, e2e tests, performance testing

### Medium Priority

- **Data Management**: Data validation, backup/recovery, import/export, audit logging
- **Real-time Features**: WebSocket connections, live updates, collaboration
- **Advanced Task Management**: Bulk operations, templates, dependencies, workflows
- **Mobile & Accessibility**: PWA features, mobile optimization, enhanced accessibility
- **Scalability**: Caching, load balancing, database optimization
- **Code Quality**: TypeScript types, code coverage, automated formatting

### Low Priority

- **Advanced Analytics**: Performance metrics, custom dashboards, reporting

## Troubleshooting

### Common Issues

- **Port 3000 in use**: `npx kill-port 3000` or `npm run dev -- -p 3001`
- **Dependencies fail**: `npm cache clean --force` then `rm -rf node_modules package-lock.json && npm install`
- **Build errors**: `npx tsc --noEmit` and `npm run lint`
- **Tasks not loading**: Check `public/tasks.json` exists, browser console, verify `http://localhost:3000/tasks.json`
- **Styling issues**: Verify Tailwind CSS config, check class purging, PostCSS setup

### Development Tips

- Use browser dev tools for network requests, console for errors, React DevTools for debugging
- Monitor Network tab for mock API delays and failures

## Contributing

### Setup & Workflow

1. Fork and clone repository
2. `npm install` dependencies
3. Create feature branch: `git checkout -b feature/your-feature-name`
4. Make changes and test: `npm run dev`, `npm run lint`, `npm run build`
5. Commit: `git commit -m "feat: add your feature description"`
6. Push and create pull request

### Standards

- **Code**: TypeScript best practices, meaningful names, JSDoc comments, accessibility
- **Testing**: Write tests for new features, ensure all tests pass
- **PRs**: Clear descriptions, screenshots for UI changes, focused and atomic

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Support

For questions, issues, or support:

- **Issues**: Create an issue in the repository
- **Discussions**: Use GitHub Discussions for questions
- **Documentation**: Check this README and inline code comments
- **Contact**: Reach out to the development team

## Acknowledgments

- Built with [Next.js](https://nextjs.org/)
- UI components from [Ant Design](https://ant.design/)
- Charts powered by [Recharts](https://recharts.org/)
- Icons from [Lucide React](https://lucide.dev/)
- State management with [Zustand](https://zustand-demo.pmnd.rs/)
