import React, { useState, useEffect } from 'react';
import './App.css';
import Header from './components/header';
import { sortBlogsByLatest } from './utils/sortBlogs';
import { API_BASE } from './api';
const MIN_EXCERPT_LENGTH = 300;

const slugify = (text) =>
  text.toLowerCase().trim().replace(/\s+/g, '-').replace(/[^\w-]+/g, '');

const getBlogId = (blog) => String(blog?._id ?? blog?.id ?? '');

const Author = () => {
  const [blogs, setBlogs] = useState([]);
  const [title, setTitle] = useState('');
  const [excerpt, setExcerpt] = useState('');
  const [loading, setLoading] = useState(false);
  const [editingId, setEditingId] = useState(null);

  const isEditing = Boolean(editingId);
  const excerptLength = excerpt.length;
  const excerptValid = excerptLength >= MIN_EXCERPT_LENGTH;

  const loadBlogs = () => {
    return fetch(`${API_BASE}/blogs`)
      .then((res) => res.json())
      .then((data) => setBlogs(sortBlogsByLatest(data)))
      .catch((err) => console.error('Error fetching blogs:', err));
  };

  useEffect(() => {
    loadBlogs();
  }, []);

  const resetForm = () => {
    setTitle('');
    setExcerpt('');
    setEditingId(null);
  };

  const buildPayload = (forCreate) => ({
    title: title.trim(),
    excerpt: excerpt.trim(),
    date: Date.now(),
    slug: forCreate
      ? `${slugify(title)}-${Date.now()}`
      : slugify(title),
  });

  const validateForm = () => {
    if (!title.trim() || !excerpt.trim()) {
      alert('Please fill in all fields.');
      return false;
    }
    if (!excerptValid) {
      alert(
        `Content must be at least ${MIN_EXCERPT_LENGTH} characters. You have ${excerptLength}.`
      );
      return false;
    }
    return true;
  };

  const handleCreate = async () => {
    if (!validateForm()) return;

    setLoading(true);
    try {
      const res = await fetch(`${API_BASE}/add`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(buildPayload(true)),
      });
      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        throw new Error(err.message || 'Failed to publish');
      }
      const savedBlog = await res.json();
      setBlogs((prev) => sortBlogsByLatest([...prev, savedBlog]));
      resetForm();
    } catch (err) {
      console.error('Error adding blog:', err);
      alert(err.message || 'Failed to publish blog. Is the server running?');
    } finally {
      setLoading(false);
    }
  };

  const handleUpdate = async () => {
    if (!editingId) return;
    if (!validateForm()) return;

    setLoading(true);
    try {
      const res = await fetch(`${API_BASE}/blogs/${editingId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(buildPayload(false)),
      });
      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        throw new Error(err.message || 'Failed to update');
      }
      const savedBlog = await res.json();
      setBlogs((prev) =>
        sortBlogsByLatest(
          prev.map((b) => (getBlogId(b) === editingId ? savedBlog : b))
        )
      );
      resetForm();
    } catch (err) {
      console.error('Error updating blog:', err);
      alert(err.message || 'Failed to update blog.');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editingId) {
      handleUpdate();
    } else {
      handleCreate();
    }
  };

  const handleEditBlog = (blog) => {
    const id = getBlogId(blog);
    if (!id) return alert('This blog cannot be edited (missing id).');
    setEditingId(id);
    setTitle(blog.title);
    setExcerpt(blog.excerpt);
    document.getElementById('blogTitle')?.focus();
  };

  const handleDeleteBlog = async (blog) => {
    if (!window.confirm(`Delete "${blog.title}"?`)) return;

    const id = getBlogId(blog);
    if (!id) return alert('This blog cannot be deleted (missing id).');

    try {
      const res = await fetch(`${API_BASE}/blogs/${id}`, { method: 'DELETE' });
      if (!res.ok) throw new Error('Failed');
      setBlogs((prev) => prev.filter((b) => getBlogId(b) !== id));
      if (editingId === id) resetForm();
    } catch (err) {
      console.error('Error deleting blog:', err);
      alert('Failed to delete blog.');
    }
  };

  return (
    <>
      <Header />
      <main className="authorPage">
      <div className="container main">
        <section className="surface authorSurface">
          <div className="surfaceInner">
            <header className="authorHeader">
              <h1 className="pageTitle pageTitleColor authorTitle">Blog Authoring Tool</h1>
              <p className="subTitle authorSubTitle">
                {isEditing
                  ? 'You are editing a post. Click “New post” to publish a different one.'
                  : 'Draft a new post and publish it to the feed.'}
              </p>
              {isEditing && (
                <button
                  type="button"
                  className="authorNewPostBtn"
                  onClick={resetForm}
                >
                  New post
                </button>
              )}
            </header>

            {isEditing && (
              <p className="authorEditingBanner" role="status">
                Editing mode — Save Changes updates this post only. Use “New post” to add another blog.
              </p>
            )}

            <form className="authorForm" onSubmit={handleSubmit} noValidate>
              <div className="authorField">
                <label className="authorLabel" htmlFor="blogTitle">Blog Title</label>
                <input
                  id="blogTitle"
                  className="authorInput"
                  type="text"
                  placeholder="e.g. How I built this blog"
                  value={title}
                  required
                  onChange={(e) => setTitle(e.target.value)}
                />
              </div>

              <div className="authorField">
                <label className="authorLabel" htmlFor="blogContent">Content</label>
                <textarea
                  id="blogContent"
                  className="authorTextarea"
                  placeholder="Write your content here..."
                  value={excerpt}
                  required
                  onChange={(e) => setExcerpt(e.target.value)}
                />
                <p className={`authorHint ${excerptValid ? 'authorHintValid' : 'authorHintInvalid'}`}>
                  {excerptLength} / {MIN_EXCERPT_LENGTH} characters
                  {!excerptValid && ' — add more to publish'}
                </p>
              </div>

              <div className="authorActions">
                {isEditing ? (
                  <>
                    <button
                      className="authorCancelBtn"
                      type="button"
                      onClick={resetForm}
                      disabled={loading}
                    >
                      Cancel edit
                    </button>
                    <button className="publishBtn" type="submit" disabled={loading || !excerptValid}>
                      {loading ? 'Saving...' : 'Save Changes'}
                    </button>
                  </>
                ) : (
                  <button
                    className="publishBtn"
                    type="submit"
                    disabled={loading || !excerptValid}
                  >
                    {loading ? 'Publishing...' : 'Publish Blog'}
                  </button>
                )}
              </div>
            </form>

            <div className="authorDivider" role="separator" aria-hidden="true" />

            <section className="authorList" aria-label="Published blogs">
              <h2 className="authorSectionTitle">Published Blogs</h2>

              {blogs.length === 0 ? (
                <p className="authorEmpty">No blogs yet. Start writing!</p>
              ) : (
                <div className="authorGrid">
                  {blogs.map((blog) => (
                    <article key={getBlogId(blog) || blog.slug} className="authorCard">
                      <h3 className="authorCardTitle">{blog.title}</h3>
                      <p className="authorCardExcerpt">{blog.excerpt}</p>
                      <div className="authorCardActions">
                        <button
                          type="button"
                          className="authorEditBtn"
                          onClick={() => handleEditBlog(blog)}
                        >
                          Edit
                        </button>
                        <button
                          type="button"
                          className="authorDeleteBtn"
                          onClick={() => handleDeleteBlog(blog)}
                        >
                          Delete
                        </button>
                      </div>
                    </article>
                  ))}
                </div>
              )}
            </section>
          </div>
        </section>
      </div>
    </main>
    </>
  );
};

export default Author;
