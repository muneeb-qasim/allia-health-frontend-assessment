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

### TaskTable

- Displays tasks in a responsive table format
- Inline status editing with optimistic updates
- Avatar images with fallback support
- Sorting and filtering capabilities
- Loading states with skeleton UI

### TaskFilters

- Search functionality with debounced input
- Tab-based filtering (All, Assigned to me, Created by me)
- Sort controls for date and priority
- Real-time result counts

### CreateTaskModal

- Form validation with error handling
- Tag management with keyboard shortcuts
- User assignment with dropdown selection
- Date validation to prevent past due dates

### TaskChart

- Pie charts for status and priority distribution
- Interactive tooltips and legends
- Responsive design with proper accessibility
- Empty state handling

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

1. **Current User Context**:

   - Hardcoded to "Amie Leighton" (user ID: u1) for filtering "assigned to me" tasks
   - No authentication system - assumes single user context for demo purposes

2. **Data Management**:

   - Tasks are loaded from static JSON file (`public/tasks.json`)
   - No persistent storage - changes don't survive page refreshes
   - Mock API simulates 12.5% failure rate for testing error handling
   - Network latency simulated between 600-1200ms

3. **User Interface**:

   - Avatar fallbacks use UI Avatars service for missing profile pictures
   - All dates are in ISO 8601 format
   - Task IDs are generated client-side using timestamp-based approach
   - Assumes modern browser with JavaScript enabled

4. **Healthcare Context**:
   - Patient codes follow format "PT-XXX" (3-digit number)
   - Task priorities: low, medium, high
   - Task statuses: todo, in_progress, in_review, done
   - Tags are free-form strings without predefined categories

### Current Limitations

1. **Data Persistence**:

   - No database integration
   - Changes are not saved between sessions
   - No data backup or recovery mechanisms

2. **User Management**:

   - No authentication or authorization system
   - No user roles or permissions
   - No user profile management

3. **Real-time Features**:

   - No WebSocket or real-time synchronization
   - No live collaboration features
   - No push notifications

4. **Advanced Features**:

   - No file uploads or document attachments
   - No offline support or service workers
   - No bulk operations or batch processing
   - No audit trail or change history

5. **Integration**:
   - No external API integrations
   - No healthcare system connections (EMR, scheduling, etc.)
   - No third-party service integrations

## Next Steps

### Immediate Development Priorities

1. **Backend Integration** (High Priority)

   - Replace mock API with real backend services
   - Implement proper database schema and migrations
   - Add data persistence and CRUD operations
   - Set up proper error handling and logging

2. **Authentication & Authorization** (High Priority)

   - Implement user authentication system
   - Add role-based access control (RBAC)
   - Create user management interface
   - Add session management and security

3. **Data Management** (Medium Priority)
   - Implement proper data validation
   - Add data backup and recovery
   - Create data import/export functionality
   - Add audit logging for all changes

### Feature Enhancements

4. **Real-time Collaboration** (Medium Priority)

   - Implement WebSocket connections
   - Add live task updates and notifications
   - Create real-time user presence indicators
   - Add collaborative editing features

5. **Advanced Task Management** (Medium Priority)

   - Add bulk operations (bulk status updates, assignments)
   - Implement task templates and recurring tasks
   - Add task dependencies and workflows
   - Create advanced filtering and search

6. **Mobile & Accessibility** (Medium Priority)
   - Optimize for mobile devices
   - Add Progressive Web App (PWA) features
   - Enhance accessibility compliance
   - Add keyboard shortcuts and navigation

### Healthcare-Specific Features

7. **Healthcare Integration** (High Priority)

   - Integrate with Electronic Medical Records (EMR)
   - Connect with patient scheduling systems
   - Add HIPAA compliance features
   - Implement healthcare-specific workflows

8. **Advanced Analytics** (Low Priority)
   - Add performance metrics and KPIs
   - Create custom dashboard widgets
   - Implement data visualization improvements
   - Add reporting and export capabilities

### Infrastructure & DevOps

9. **Production Readiness** (High Priority)

   - Set up CI/CD pipeline
   - Add comprehensive testing (unit, integration, e2e)
   - Implement monitoring and alerting
   - Add performance optimization

10. **Scalability** (Medium Priority)
    - Implement caching strategies
    - Add load balancing and scaling
    - Optimize database queries
    - Add microservices architecture if needed

### Development Workflow

11. **Code Quality** (Medium Priority)

    - Add comprehensive TypeScript types
    - Implement code coverage reporting
    - Add automated code formatting and linting
    - Create development documentation

12. **Testing Strategy** (High Priority)
    - Add unit tests for all components
    - Implement integration tests for API
    - Create end-to-end tests for user flows
    - Add performance testing

## Troubleshooting

### Common Issues

1. **Port 3000 already in use**

   ```bash
   # Kill process using port 3000
   npx kill-port 3000
   # Or use a different port
   npm run dev -- -p 3001
   ```

2. **Dependencies installation fails**

   ```bash
   # Clear npm cache
   npm cache clean --force
   # Delete node_modules and reinstall
   rm -rf node_modules package-lock.json
   npm install
   ```

3. **Build errors**

   ```bash
   # Check for TypeScript errors
   npx tsc --noEmit
   # Run linting
   npm run lint
   ```

4. **Tasks not loading**

   - Ensure `public/tasks.json` exists and is valid JSON
   - Check browser console for network errors
   - Verify the file is accessible at `http://localhost:3000/tasks.json`

5. **Styling issues**
   - Ensure Tailwind CSS is properly configured
   - Check if classes are being purged in production builds
   - Verify PostCSS configuration

### Development Tips

- Use browser dev tools to inspect network requests and API responses
- Check the browser console for JavaScript errors
- Use React DevTools for component debugging
- Monitor the Network tab to see mock API delays and failures

## Contributing

### Development Setup

1. **Fork and clone the repository:**

   ```bash
   git clone https://github.com/your-username/allia-health-frontend-assessment.git
   cd allia-health-frontend-assessment
   ```

2. **Install dependencies:**

   ```bash
   npm install
   ```

3. **Create a feature branch:**

   ```bash
   git checkout -b feature/your-feature-name
   ```

4. **Make your changes and test:**

   ```bash
   npm run dev
   npm run lint
   npm run build
   ```

5. **Commit your changes:**

   ```bash
   git add .
   git commit -m "feat: add your feature description"
   ```

6. **Push and create a pull request:**
   ```bash
   git push origin feature/your-feature-name
   ```

### Code Standards

- Follow TypeScript best practices
- Use meaningful variable and function names
- Add JSDoc comments for complex functions
- Ensure all components are accessible
- Write tests for new features
- Follow the existing code style and patterns

### Pull Request Guidelines

- Provide a clear description of changes
- Include screenshots for UI changes
- Ensure all tests pass
- Update documentation if needed
- Keep PRs focused and atomic

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
