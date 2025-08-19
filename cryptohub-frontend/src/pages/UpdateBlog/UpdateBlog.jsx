import { useState, useEffect } from "react";
import { getBlogById, updateBlog } from '../../api/internal'
import { useNavigate, useParams } from "react-router-dom";
import styles from './UpdateBlog.module.css'
import { useSelector } from 'react-redux';
import TextInput from '../../components/TextInput/TextInput';

function UpdateBlog() {
  const navigate = useNavigate();
  const params = useParams();
  const blogId = params.id;
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [photo, setPhoto] = useState("");

  const getPhoto = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file)
    reader.onloadend = () => {
      setPhoto(reader.result);
    };
  };
  const author = useSelector(state => state.user._id);
  const updateHandler = async () => {
    let data;
    if (photo.includes('http')) {
      data = {
        author: author,
        title: title,
        content: content,
        blogId
      };
    } else {
      data = {
        author: author,
        title: title,
        content: content,
        photo: photo,
        blogId
      };
    }
    const response = await updateBlog(data);

    if (response.status === 200) {
      navigate("/");
    };
  }

  useEffect(() => {
    async function getBlogDetails() {
      const response = await getBlogById(blogId);
      if (response.status == 200) {
        setTitle(response.data.blog.title);
        setContent(response.data.blog.content);
        setPhoto(response.data.blog.photo);
      }
    }
    getBlogDetails();
  }, [blogId]);

  return (
    <div className={styles.wrapper}>
      <div className={styles.card}>
        <div className={styles.header}>Edit your blog!</div>
        <div className={styles.input}>
          <TextInput
            type="text"
            name="title"
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <textarea
          className={styles.content}
          placeholder="Your content goes here..."
          maxLength={400}
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
        <div className={styles.photoPrompt}>
          <span>Choose a Photo</span>
          <input
            type="file"
            name="photo"
            id="photo"
            accept='image/jpg, image/jpeg, image/png'
            onChange={getPhoto}
          />
          {photo !== '' ? (
            <img className={styles.previewImg} src={photo} alt="preview" />
          ) : ''}
        </div>
        <button className={styles.update} onClick={updateHandler}>
          Update
        </button>
      </div>
    </div>
  )
}

export default UpdateBlog;

