# Trip Management System

A modern React.js Single Page Application (SPA) for managing travel trips with a beautiful interface inspired by professional dashboards.

## 🚀 Features

### Core Functionality
- ✅ **CRUD Operations**: Create, Read, Update, Delete trips
- ✅ **Search & Filter**: Search by destination, filter by status
- ✅ **Sorting**: Sort by destination, price, or start date (ascending/descending)
- ✅ **Pagination**: Client-side pagination with customizable items per page
- ✅ **Form Validation**: Comprehensive validation using React Hook Form
- ✅ **Responsive Design**: Mobile-first design that works on all devices

### UI/UX Features
- 📊 **Dashboard Analytics**: Summary cards showing trip statistics
- 🎯 **Status Management**: Visual status indicators (PLANNED, ONGOING, COMPLETED)
- 📱 **Mobile Responsive**: Adaptive layouts for desktop and mobile
- ⚡ **Fast Navigation**: React Router for seamless page transitions

### Technical Features
- ⚛️ **React 18+**: Latest React with hooks and modern patterns
- 🛣️ **React Router v6**: Client-side routing
- 🎨 **Tailwind CSS**: Utility-first CSS framework
- 📝 **React Hook Form**: Performant form validation
- 🎯 **TypeScript Ready**: Structured for easy TypeScript migration
- 🔧 **Vite**: Fast build tool and development server

## 🏗️ Project Structure

\`\`\`
/src
    /components
        Navbar.jsx          # Navigation bar
        TripList.jsx        # Trip display (table/cards)
        TripForm.jsx        # Add/Edit trip form
        SearchFilter.jsx    # Search and filter controls
        Pagination.jsx      # Pagination component
    /pages
        Dashboard.jsx       # Main dashboard with analytics
        AddTrip.jsx         # Add new trip page
        EditTrip.jsx        # Edit existing trip page
    /data
        trips.js           # Dummy trip data and constants
    App.jsx               # Main app component
    main.jsx             # React entry point
package.json             # Dependencies and scripts
README.md               # This file
\`\`\`

## 🚀 Getting Started

### Prerequisites
- Node.js 16+ 
- npm or yarn

### Installation

1. **Clone the repository**
   \`\`\`bash
   git clone https://github.com/your-username/React-Trip-Management-SEP-2025-166.git
   cd React-Trip-Management-SEP-2025-166
   \`\`\`

2. **Install dependencies**
   \`\`\`bash
   npm install
   \`\`\`

3. **Start development server**
   \`\`\`bash
   npm run dev
   \`\`\`

4. **Open in browser**
   Navigate to `http://localhost:5173`

### Build for Production
\`\`\`bash
npm run build
npm run preview
\`\`\`


## Typography
- **Primary Font**: System UI fonts for optimal performance
- **Headings**: Bold weights with proper hierarchy
- **Body Text**: Optimized line height (1.5) for readability

## 🔧 Technical Implementation

### State Management
- React `useState` and `useEffect` for local state
- Props drilling for component communication
- Centralized trip data management in App.jsx

### Form Validation
- React Hook Form for performant validation
- Custom validation rules for date ranges
- Real-time error feedback

### Responsive Design
- Mobile-first approach with Tailwind CSS
- Breakpoint-specific layouts (table → cards)
- Touch-friendly interactive elements

### Performance Optimizations
- `useMemo` for expensive filtering/sorting operations
- Efficient pagination to handle large datasets
- Optimized re-renders with proper key props

## 📊 Data Structure

\`\`\`javascript
{
  "id": 1,
  "destination": "Paris",
  "startDate": "2025-09-10",
  "endDate": "2025-09-20", 
  "price": 1500,
  "status": "PLANNED" // PLANNED | ONGOING | COMPLETED
}
\`\`\`

## 🛠️ Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## 🌟 Future Enhancements

- [ ] Backend integration with REST API
- [ ] User authentication and authorization
- [ ] Trip image uploads
- [ ] Export trips to PDF/CSV
- [ ] Trip sharing functionality
- [ ] Advanced filtering (date ranges, price ranges)
- [ ] Trip categories and tags
- [ ] Offline support with PWA


## 📄 License

This project is open source and available under the MIT License.

---

*Built with ❤️ using React, Tailwind CSS, and modern web technologies*
