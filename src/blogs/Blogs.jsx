import React, { useEffect, useState } from "react";
import "./Blogs.css";

const BLOGS_API = "https://fastapi-saas-1-520799875010.asia-south1.run.app/blogs/";
const Blogs = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(BLOGS_API)
      .then(res => res.json())
      .then(data => {
        setBlogs(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  if (loading) return <div className="blogs-root"><h2>Loading blogs...</h2></div>;

  return (
    <div className="blogs-root">
      <h1 className="blogs-title">Latest Blogs</h1>
      <div className="blogs-list">
        {blogs.map(blog => {
            // Limit preview to 50 words
            const words = blog.excerpt.split(" ");
            const isLong = words.length > 50;
            const preview = isLong ? words.slice(0, 50).join(" ") + "..." : blog.excerpt;
            return (
            <a
                className="blog-card"
                key={blog.id}
                href={blog.url}
                target="_blank"
                rel="noopener noreferrer"
            >
                <img src={blog.image} alt={blog.title} className="blog-image" />
                <div className="blog-info">
                <h2>{blog.title}</h2>
                <p className="blog-meta">By {blog.author} | {blog.date}</p>
                <p>
                    {preview}
                    {isLong && (
                    <span className="read-more-link">Read More</span>
                    )}
                </p>
                </div>
            </a>
            );
        })}
        </div>
    </div>
  );
};

export default Blogs;