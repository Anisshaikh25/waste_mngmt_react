import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import ProtectedRoute  from './components/ProtectedRoute'
import Landing         from './pages/Landing'
import Register        from './pages/Register'
import Login           from './pages/Login'
import Home            from './pages/Home'
import ReportDump      from './pages/ReportDump'
import MyComplaints    from './pages/MyComplaints'
import ComplaintDetail from './pages/ComplaintDetail'
import AdminDashboard  from './pages/AdminDashboard'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* Public routes */}
        <Route path="/"         element={<Landing />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login"    element={<Login />} />

        {/* Resident routes */}
        <Route path="/home" element={
          <ProtectedRoute role="resident"><Home /></ProtectedRoute>
        } />
        <Route path="/report" element={
          <ProtectedRoute role="resident"><ReportDump /></ProtectedRoute>
        } />
        <Route path="/complaints" element={
          <ProtectedRoute role="resident"><MyComplaints /></ProtectedRoute>
        } />
        <Route path="/complaints/:id" element={
          <ProtectedRoute><ComplaintDetail /></ProtectedRoute>
        } />

        {/* Admin routes */}
        <Route path="/admin" element={
          <ProtectedRoute role="admin"><AdminDashboard /></ProtectedRoute>
        } />

        {/* Fallback */}
        <Route path="*" element={<Navigate to="/" />} />

      </Routes>
    </BrowserRouter>
  )
}