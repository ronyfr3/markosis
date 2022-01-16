import React from 'react'
import axios from 'axios'

const BlogFile = () => {
  const [uploadData, setUploadData] = React.useState();
  const [files, setFiles] = React.useState([]);

  const onChange = (e) => {
    setFiles(e.target.files);
  };
  const onSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData();
    Object.values(files).forEach((file) => {
      formData.append("blogImages", file);
    });

    try {
      const res = await axios.post("/api/blogs", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      setUploadData(res.data);
    } catch (err) {
      if (err.response.status === 500) {
        console.log(err);
      } else {
        console.log(err.response.data.msg);
      }
    }
  };
  return (
    <div className="App">
      <p>file upload</p>
      <input
        type="file"
        id="file"
        name="blogImages"
        multiple
        onChange={onChange}
      />
      <button className="imgAddBtn" onClick={onSubmit}>
        Add image
      </button>{" "}
    </div>
  );
};

export default BlogFile;
