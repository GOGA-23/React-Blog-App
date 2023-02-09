import { useContext, useState } from "react";
import DataContext from "../context/Datacontext";
import api from "../api/posts";
import { format } from "date-fns";
import { useNavigate } from "react-router-dom";

const Newpost = () => {
  const [postTitle, setPostTitle] = useState("");
  const [postBody, setPostBody] = useState("");
  const navigate = useNavigate();
  const { posts, setPosts } = useContext(DataContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const id = posts.length ? posts[posts.length - 1].id + 1 : 1;
    const datetime = format(new Date(), "MM dd yyyy pp");
    const newPost = { id, title: postTitle, datetime, body: postBody };
    try {
      const res = await api.post("/posts", newPost);
      const allPosts = [...posts, res.data];
      setPosts(allPosts);
      setPostTitle("");
      setPostBody("");
      navigate("/");
    } catch (error) {
      console.log(`Error : ${error.message}`);
    }
  };

  return (
    <div className="addPost">
      <form onSubmit={handleSubmit}>
        <h2>New Post</h2>
        <label htmlFor="postTitle">Title</label>
        <input
          id="postTitle"
          type="text"
          placeholder="Enter Title"
          required
          value={postTitle}
          onChange={(e) => setPostTitle(e.target.value)}
        />
        <label htmlFor="postBody">Content</label>
        <input
          id="postBody"
          type="text"
          required
          placeholder="Enter Content"
          value={postBody}
          onChange={(e) => setPostBody(e.target.value)}
        />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default Newpost;
