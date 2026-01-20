import { Routes, Route } from 'react-router-dom'
import PublicLayout from './layouts/PublicLayout'
import AdminLayout from './layouts/AdminLayout'
import ProtectedRoute from './components/common/ProtectedRoute'

// Pages
import Home from './pages/Home'
import BlogList from './pages/blog/BlogList'
import BlogPost from './pages/blog/BlogPost'
import NewsletterList from './pages/newsletter/NewsletterList'
import NewsletterPost from './pages/newsletter/NewsletterPost'

// Admin Pages
import Login from './pages/admin/Login'
import Dashboard from './pages/admin/Dashboard'
import PostsList from './pages/admin/posts/PostsList'
import PostCreate from './pages/admin/posts/PostCreate'
import CTAsList from './pages/admin/ctas/CTAsList'
import Subscribers from './pages/admin/newsletter/Subscribers'

import './App.css'

function App() {
  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/" element={<PublicLayout />}>
        <Route index element={<Home />} />
        <Route path="blog" element={<BlogList />} />
        <Route path="blog/:slug" element={<BlogPost />} />
        <Route path="newsletter" element={<NewsletterList />} />
        <Route path="newsletter/:slug" element={<NewsletterPost />} />
      </Route>

      {/* Auth Routes */}
      <Route path="/admin/login" element={<Login />} />

      {/* Protected Admin Routes */}
      <Route
        path="/admin"
        element={
          <ProtectedRoute>
            <AdminLayout />
          </ProtectedRoute>
        }
      >
        <Route index element={<Dashboard />} />
        <Route path="posts" element={<PostsList />} />
        <Route path="posts/create" element={<PostCreate />} />
        <Route path="posts/edit/:id" element={<PostCreate />} />
        <Route path="ctas" element={<CTAsList />} />
        <Route path="newsletter" element={<Subscribers />} />
      </Route>
    </Routes>
  )
}

export default App
