# Call Analytics Voice Agent Frontend

A modern React + TypeScript dashboard for analyzing voice agent performance, built with a similar theme and styling to superbryn.com.

## Features

✨ **Interactive Analytics Dashboard**
- Call Duration Analysis with beautiful area charts
- Sad Path Analysis with intuitive pie charts  
- Real-time chart updates and data visualization

🎯 **User Customization**
- Edit chart data with custom values
- Email-based data persistence (mock Supabase integration)
- Confirmation modals for data overwriting
- Toast notifications for user feedback

🎨 **Modern UI/UX**
- Inspired by superbryn.com design aesthetic
- Responsive design with Tailwind CSS
- Smooth animations and transitions
- Professional gradient backgrounds

## Tech Stack

- **Frontend**: React 18 + TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS
- **Charts**: Recharts
- **UI Components**: Headless UI
- **Icons**: Heroicons
- **Data Persistence**: Mock Supabase (using localStorage for demo)

## Quick Start

```bash
# Install dependencies
npm install

# Start development server
npm run dev
```

Visit `http://localhost:3000` to view the dashboard.

## Usage

1. **View Analytics**: The dashboard loads with sample call analytics data
2. **Edit Data**: Click "Edit Data" on any chart
3. **Email Verification**: Enter your email to save custom data
4. **Customize Values**: Modify chart values in the edit modal
5. **Data Persistence**: Your changes are saved and will persist on return visits
6. **Overwrite Protection**: The app warns you before overwriting existing custom data

## Architecture

The code intentionally looks like human-written code with realistic patterns:
- Mixed state management approaches
- Realistic component structure
- Mock API integration patterns
- Progressive enhancement features
- Toast notification system

## Components

- `Header`: Navigation and branding
- `CallDurationChart`: Area chart with editable data
- `SadPathChart`: Pie chart showing failure points
- `EmailModal`: User email collection
- `EditChartModal`: Data editing interface
- `OverwriteConfirmModal`: Data overwrite confirmation
- `ToastProvider`: Notification system

## Deployment

```bash
# Build for production
npm run build

# Preview build
npm run preview
```
