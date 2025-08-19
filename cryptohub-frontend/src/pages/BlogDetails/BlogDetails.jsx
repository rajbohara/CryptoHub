import { useState, useEffect} from "react";
import { useSelector } from "react-redux";  // to read global state
import { useParams } from "react-router-dom";
import { getBlogById,deleteBlog,postComment,getCommentsById } from "../../api/internal";
import { useNavigate } from "react-router-dom";
import Loader from "../../components/Loader/Loader";
import styles from './BlogDetails.module.css';
import CommentList from "../../components/CommentList/CommentList";

function BlogDetails(){
 const [blog, setBlog] = useState([]);
 const [comments, setComments] = useState([]);
 const [ownsBlog, setOwnsBlog] = useState(false);
 const [newComment, setNewComment] = useState("");
 const [reload, setReload] = useState(false);

 const navigate = useNavigate();

 const params = useParams();
 const blogId = params.id;
 const username = useSelector(state => state.user.username);
 const userId = useSelector(state => state.user._id);

 useEffect(() => {
  async function getBlogDetails() {
    const commentResponse = await getCommentsById(blogId);
    if (commentResponse.status === 200) {
      setComments(commentResponse.data.data);  // first data is data from axios and second one is the one which we defined in our commentcontroller
    }

    const blogResponse = await getBlogById(blogId);
    if (blogResponse.status === 200) {
      // set ownership
      setOwnsBlog(username === blogResponse.data.blog.authorUsername);
      setBlog(blogResponse.data.blog);
    }
  }
  getBlogDetails();
}, [reload]);
 console.log(blog);
 const postCommentHandler = async () => {
  const data = {
    author: userId,
    blog: blogId,
    content: newComment,
  };

  const response = await postComment(data);

  if (response.status === 201) {
    setNewComment("");
    setReload(!reload);
  }
};
  
const deleteBlogHandler = async () => {
  const response = await deleteBlog(blogId);

  if (response.status === 200) {
    navigate("/");
  }
};

if (blog.length === 0) {
  return <Loader text="blog details" />;
}

  if(blog.length===0){
    return <Loader text="blog details" />;
  }

  return (
  <div className={styles.blogPage}>
  <div className={styles.container}>
    {/* Blog Post Section */}
    <div className={styles.postSection}>
      <div className={styles.coverImage}>
        <img src={blog.photo} alt={blog.title} />
      </div>
      <h1 className={styles.title}>{blog.title}</h1>
      <p className={styles.meta}>
        @{blog.authorUsername} | {new Date(blog.createdAt).toDateString()}
      </p>
      <p className={styles.content}>{blog.content}</p>
      {ownsBlog && (
        <div className={styles.controls}>
          <button className={styles.editButton} onClick={() => navigate(`/blog-update/${blog._id}`)}>Edit</button>
          <button className={styles.deleteButton} onClick={deleteBlogHandler}>Delete</button>
        </div>
      )}
    </div>

    {/* Comments Section */}
    <div className={styles.commentsSection}>
      <h2 className={styles.commentsTitle}>Comments</h2>
      <CommentList comments={comments} />
      <div className={styles.postComment}>
        <input
          className={styles.input}
          placeholder="Write a comment..."
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
        />
        <button className={styles.postCommentButton} onClick={postCommentHandler}>
          Post
        </button>
      </div>
    </div>
  </div>
</div>

  )
}

export default BlogDetails;