# MediCore - Hospital & Clinic Management System

A comprehensive, modern, and responsive Hospital & Clinic Management Website UI built with React, Tailwind CSS, and Lucide React icons.

## Features

### Core Modules
- **Dashboard** - Overview with charts, stats, and quick actions
- **Authentication** - Role-based login/signup (Admin, Doctor, Staff)
- **Patient Management** - Registration, profiles, medical records
- **Doctor Management** - Profiles, schedules, availability
- **Appointment System** - Booking, status tracking, rescheduling
- **Billing & Payments** - Invoice generation, payment tracking
- **Pharmacy Management** - Medicine inventory, stock alerts
- **Laboratory Management** - Test requests, results, reports
- **Bed & Ward Management** - Bed allocation, room management

### UI/UX Features
- Fully responsive design (desktop, tablet, mobile)
- Modern, clean interface with healthcare-focused color palette
- Sidebar navigation with icons
- Top navbar with search and notifications
- Role-based access control
- Smooth micro-interactions and hover effects
- Data visualization with charts
- Accessibility-friendly design

## Tech Stack

- **Frontend**: React 18.2.0
- **Styling**: Tailwind CSS 3.2.7
- **Icons**: Lucide React 0.263.1
- **Charts**: Recharts 2.5.0
- **Routing**: React Router DOM 6.8.1
- **Date Handling**: date-fns 2.29.3
- **Build Tool**: Create React App

## Getting Started

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd medicore
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm start
```

4. Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

### Build for Production
```bash
npm run build
```

## Usage

### Authentication
- **Login**: Select your role (Admin, Doctor, Staff) and enter credentials
- **Signup**: Register with role-specific information
- **Demo**: Use any email/password to login (no backend validation)

### Navigation
- **Sidebar**: Navigate between different modules
- **Search**: Global search in top navbar
- **Role-based**: Menu items filtered by user role

### Key Features

#### Dashboard
- Real-time statistics cards
- Patient trends and revenue charts
- Quick action buttons
- Recent activity feed

#### Patient Management
- Add/edit patients with comprehensive forms
- Search and filter capabilities
- Detailed patient profiles with medical history
- Prescription and lab result tracking

#### Appointment System
- Schedule appointments with calendar view
- Status tracking (pending, confirmed, cancelled, completed)
- Time slot management
- Doctor-patient assignment

#### Billing & Payments
- Generate invoices with multiple items
- Payment status tracking
- Insurance information management
- Revenue analytics

#### Pharmacy Management
- Medicine inventory tracking
- Low stock alerts
- Expiry date monitoring
- Batch number management

#### Laboratory Management
- Test request management
- Result upload and tracking
- Urgency levels (routine, urgent, emergency)
- Report generation

#### Bed & Ward Management
- Bed allocation system
- Ward overview with statistics
- Room and bed categorization
- Patient assignment/discharge

## Design System

### Color Palette
- **Primary**: Blue (#3b82f6) - Trust, professionalism
- **Secondary**: Green (#22c55e) - Health, success
- **Neutral**: Gray scale - Clean, minimal
- **Background**: White and light gray - High readability

### Typography
- **Font**: Inter (system-ui fallback)
- **Weights**: 300, 400, 500, 600, 700
- **Hierarchy**: Clear heading structure with consistent sizing

### Components
- **Cards**: Soft shadows, rounded corners
- **Buttons**: Multiple variants (primary, secondary, success, danger)
- **Forms**: Consistent input styling with focus states
- **Tables**: Clean, sortable, responsive
- **Modals**: Overlay forms with smooth transitions

## Project Structure

```
src/
|-- components/
|   |-- Layout/
|   |-- auth/
|-- contexts/
|   |-- AuthContext.js
|   |-- DataContext.js
|-- pages/
|   |-- auth/
|   |-- patients/
|   |-- doctors/
|   |-- appointments/
|   |-- billing/
|   |-- pharmacy/
|   |-- laboratory/
|   |-- beds/
|-- App.js
|-- index.js
|-- index.css
```

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Future Enhancements

- [ ] Backend integration with real API
- [ ] Real-time notifications
- [ ] Advanced reporting and analytics
- [ ] Mobile app version
- [ ] Multi-language support
- [ ] Integration with medical devices
- [ ] Telemedicine features
- [ ] AI-powered diagnostics assistance

## Support

For support, please contact the development team or open an issue in the repository.



######################################################################################################################################################################################################################

######################################################################################################################################################################################################################

## 🎉 MediCore Hospital Management System - SUCCESSFULLY RUNNING!

**🌐 Access URL:** http://localhost:3000

### 🔑 Login Credentials (Demo Accounts):

**Admin Access:**
- Email: `admin@medicore.com`
- Password: `admin123`
- Role: Admin

**Doctor Access:**
- Email: `doctor@medicore.com` 
- Password: `doctor123`
- Role: Doctor

**Staff Access:**
- Email: `staff@medicore.com`
- Password: `staff123`
- Role: Staff

### ✅ Issues Fixed:
- ✅ UserStethoscope import error in Sidebar.js
- ✅ UserStethoscope import error in Dashboard.js  
- ✅ CSS border-border class error
- ✅ ESLint confirm() usage errors in all files
- ✅ Dependencies properly installed

### 🚀 Application Status:
- **Server Status:** ✅ RUNNING
- **Compilation:** ✅ SUCCESS (only minor warnings remain)
- **All Core Features:** ✅ WORKING

### 📋 Available Features:
- **Dashboard** - Analytics and overview
- **Patient Management** - Complete CRUD operations
- **Doctor Management** - Profiles and scheduling
- **Appointment System** - Booking and tracking
- **Billing & Payments** - Invoice generation
- **Pharmacy Management** - Inventory with alerts
- **Laboratory Management** - Test requests and results
- **Bed & Ward Management** - Room allocation

### 🎨 UI Features:
- Fully responsive design
- Modern healthcare-focused interface
- Role-based navigation
- Interactive charts and data visualization
- Search and filtering capabilities
- Smooth micro-interactions

The system is now **fully operational**! You can access it at http://localhost:3000 and use any of the demo credentials to explore all features. The application includes comprehensive sample data and all modules are functional with complete CRUD operations.
