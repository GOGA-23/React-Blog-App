import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useContext } from "react";
import DataContext from "../context/Datacontext";
import api from "../api/posts";
import { format } from "date-fns";

const EditPost = () => {
  const [editTitle, setEditTitle] = useState("");
  const [editBody, setEditBody] = useState("");
  const { posts, setPosts } = useContext(DataContext);
  const { id } = useParams();
  const navigate = useNavigate();
  const post = posts.find((post) => post.id.toString() === id);

  useEffect(() => {
    if (post) {
      setEditTitle(post.title);
      setEditBody(post.body);
    }
  }, [post, setEditTitle, setEditBody]);

  const handleEdit = async (id) => {
    try {
      const datetime = format(new Date(), "MM dd yyyy pp");
      const updatePost = { id, title: editTitle, datetime, body: editBody };
      const res = await api.put(`/posts/${id}`, updatePost);
      setPosts(posts.map((post) => (post.id === id ? { ...res.data } : post)));
      setEditTitle("");
      setEditBody("");
      navigate("/");
    } catch (error) {
      console.log(`Error : ${error.message}`);
    }
  };

  return (
    <div className="addPost">
      {editTitle && (
        <form onSubmit={(e) => e.preventDefault()}>
          <h2>Edit Post</h2>
          <label htmlFor="postTitle">Title</label>
          <input
            id="postTitle"
            type="text"
            placeholder="Enter Title"
            required
            value={editTitle}
            onChange={(e) => setEditTitle(e.target.value)}
          />
          <label htmlFor="postBody">Content</label>
          <input
            id="postBody"
            type="text"
            required
            placeholder="Enter Content"
            value={editBody}
            onChange={(e) => setEditBody(e.target.value)}
          />
          <button type="submit" onClick={() => handleEdit(post.id)}>
            Update
          </button>
        </form>
      )}
      {!editTitle && (
        <>
          <h2>Post Not Found</h2>
          <p>Well, go back to Home page</p>
          <p>
            <Link to="/">Visit Our Homepage</Link>
          </p>
        </>
      )}
    </div>
  );
};

export default EditPost;
