import { useState, useRef, useEffect } from 'react'
import './App.css'
import Header from './components/header'
import Footer from './components/footer'
import { Link } from 'react-router-dom'
import { sortBlogsByLatest } from './utils/sortBlogs'
import { API_BASE } from './api'


function App() {
  const [blogs, setBlogs] = useState([]);

    useEffect(() => {
      fetch(`${API_BASE}/blogs`, { method: 'GET' })
      .then(response => response.json())
      .then(data => {
        setBlogs(sortBlogsByLatest(data))
      })
      .catch(error => {
        console.error('Error fetching blogs:', error)
      })
    },[])

 

  return (
    <>
      <Header />

      <main className="homeHero">
        <div className="container main">
          <div className="heroCard">
            {/* <p className="badge">Latest</p> */}
            <h1 className="pageTitle pageTitleColor">Latest Blogs</h1>
            <p className="subTitle">
              Simple, clean, and ready for your own blog content.
              <br />
              Read the newest posts, ideas, and quick updates in one place.
              <br />
              Built to stay fast, clear, and easy to navigate.
            </p>
          </div>

          <section className="postGrid" aria-label="Blog posts">


 {blogs.map((blog) => (
              <article key={blog._id || blog.slug} className="postCard postCardColor">
                <h2 className="postTitle">{blog.title}</h2>
                <p className="postExcerpt">{blog.excerpt}</p>
                <Link className="readMore" to={`/blog/${blog.slug}`}>
                  Read more →
                </Link>
                <p className="postDate">{blog.date}</p>
              </article>
            ))}
          </section>
        </div>
      </main>

          <Footer />
    </>
  )
}

export default App
