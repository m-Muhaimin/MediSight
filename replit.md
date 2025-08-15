# Overview

This is a medical practice management system called "Medisight" built as a full-stack web application. The system provides a dashboard for healthcare professionals to manage patients, appointments, and track key metrics. It features a React frontend with a clean, modern UI using shadcn/ui components and a Node.js/Express backend with PostgreSQL database integration via Drizzle ORM.

# User Preferences

Preferred communication style: Simple, everyday language.

# System Architecture

## Frontend Architecture
- **Framework**: React with TypeScript, built using Vite for fast development and bundling
- **UI Library**: shadcn/ui components based on Radix UI primitives for accessibility and consistency
- **Styling**: Tailwind CSS with custom CSS variables for theming and responsive design
- **State Management**: TanStack Query (React Query) for server state management and caching
- **Routing**: Wouter for lightweight client-side routing
- **Build Tool**: Vite with custom configuration for development and production builds

## Backend Architecture
- **Framework**: Express.js with TypeScript for type safety
- **Database**: PostgreSQL with Drizzle ORM for type-safe database operations
- **API Design**: RESTful API endpoints following standard HTTP conventions
- **Storage Layer**: Abstracted storage interface with both in-memory and database implementations
- **Error Handling**: Centralized error handling middleware with proper HTTP status codes
- **Request Logging**: Custom middleware for API request logging and performance monitoring

## Data Storage Solutions
- **Primary Database**: PostgreSQL for persistent data storage
- **Database Schema**: Defined using Drizzle ORM with the following main entities:
  - Patients: Core patient information including demographics and medical details
  - Appointments: Scheduling data linked to patients with status tracking
  - Metrics: Dashboard analytics and key performance indicators
  - Chart Data: Time-series data for dashboard visualizations
- **Migrations**: Managed through Drizzle Kit for schema versioning and deployment
- **Development Fallback**: In-memory storage for development and testing scenarios

## Authentication and Authorization
- **Current State**: Basic structure in place but not fully implemented
- **Session Management**: Uses connect-pg-simple for PostgreSQL-backed session storage
- **Future Implementation**: Ready for user authentication and role-based access control

## External Dependencies
- **Database Provider**: Neon Database (serverless PostgreSQL) via @neondatabase/serverless
- **UI Components**: Extensive use of Radix UI primitives for accessible component building
- **Charts and Visualizations**: Recharts library for data visualization components
- **Form Handling**: React Hook Form with Zod validation for type-safe form management
- **Date Handling**: date-fns for date manipulation and formatting
- **Development Tools**: Replit-specific plugins for development environment integration