import { useParams } from "react-router-dom";
import Header from "./components/header";
import { useState, useRef, useEffect } from 'react'

import Footer from "./components/footer";
import { API_BASE } from "./api";
import { useGSAP } from '@gsap/react'
import { animateBlogDetail } from './animations/gsapEffects'


export default function Blog() {
  const { slug } = useParams();

  const [blogs, setBlogs] = useState([]);
  const mainRef = useRef(null)

  useEffect(() => {
    fetch(`${API_BASE}/blogs`, { method: 'GET' })
    .then(response => response.json())
    .then(data => {
      setBlogs(data)
    })
    .catch(error => {
      console.error('Error fetching blogs:', error)
    })
  },[])
  
  let blog = blogs.find(blog => blog.slug === slug)

  useGSAP(
    () => {
      if (blog && mainRef.current) animateBlogDetail(mainRef.current)
    },
    { scope: mainRef, dependencies: [blog?.slug] }
  )

  if (!blog) return <p>Blog not found</p>;
    return (
      <>
        <Header />
        <main className="blogDetail" ref={mainRef}>
          <div className="container main">
            <article className="postCard postCardColor">
              <h2 className="postTitle">{blog.title}</h2>
              <p className="postExcerpt1 ">{blog.excerpt}</p>
              <p className="postDate">{blog.date}</p>
            </article>
          </div>
        </main>
        <Footer />
      </>
    )

}