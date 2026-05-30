import { createBrowserRouter } from 'react-router-dom'
import App from './App'
import Blog from './blog'
import About from './about'
import Contact from './contact'
import Author from './author'


export const router = createBrowserRouter([
    {
      path: "/",
      element: <App />
    },
    {
      path: "/blog/:slug",
      element: <Blog />
    },
    {
      path: "/contact",
      element: <Contact />
    },
    {
      path: "/about",
      element: <About />
    },
    {
      path: "/author",
      element: <Author />
    },
  ]);