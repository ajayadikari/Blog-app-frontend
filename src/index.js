import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { Provider } from 'react-redux';
import store from './redux/store';

import Navbar from './components/navbar/NavBar';
import Sidebar from './components/sidebar/Sidebar';
import SearchBar from './components/searchbar/SearchBar';
import { Outlet } from 'react-router-dom';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Body from './components/body/Body';
import BlogContainer from './components/blogContainer/BlogContainer';
import Layout from './layout/Layout';
import ResultsPage from './pages/ResultsPage';
import LoginPage from './pages/LoginPage'
import RegistrationPage from './pages/RegistrationPage';
import PostCU from './author/post/PostCU';
import ProfilePage from './pages/ProfilePage';
import UpdateProfilePage from './pages/UpdateProfilePage';
import toast, { Toaster } from 'react-hot-toast';
import ProtectedRoute from './utils/ProtectedRoute';
import LikedPostsPage from './pages/LikedPostsPage';
import AuthorPostsPage from './pages/AuthorPostsPage';
import Dashboard from './author/dashboard/Dashboard';
import AuthorHome from './pages/AuthorHome';
import HomePage from './pages/HomePage';


const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        path: '/',
        element: <HomePage />
      },
      {
        path: '/blog/:id',
        element: <BlogContainer />
      },
      {
        path: '/results/:term',
        element: <ResultsPage />
      },
      {
        path: '/register',
        element: <RegistrationPage />
      },
      {
        path: '/login',
        element: <LoginPage />
      },
      {
        path: '/post',
        children: [{
          path: 'create-post',
          element: <PostCU />
        },
        {
          path: 'update-post/:id',
          element: <PostCU edit={true} />
        }]
      },
      {
        path: '/update-profile/:id',
        element: <ProtectedRoute><UpdateProfilePage /></ProtectedRoute>
      },
      {
        path: '/profile/:id',
        element: <ProtectedRoute><ProfilePage /></ProtectedRoute>
      },
      {
        path: '/liked-posts',
        element: <ProtectedRoute><LikedPostsPage /></ProtectedRoute>
      },
      {
        path: '/author',
        children: [{
          path: '',
          element: <AuthorHome />
        },
        {
          path: 'my-posts',
          element: <AuthorPostsPage />
        }]
      }
    ]
  }
])

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    <RouterProvider router={router}>
      <Navbar />
      <SearchBar />
      <Sidebar />
      <Outlet />
      <Toaster />
    </RouterProvider>
    <Toaster />
  </Provider>

);

