import React from "react";
import axios from "axios";

const CarrerPortalFile = () => {
  const [uploadData, setUploadData] = React.useState();
  const [filename, setFilename] = React.useState("");

  const onChange = (e) => {
    setFilename(e.target.files[0]);
  };
  console.log(filename);

  const onSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append("careerPortalPdf", filename);
    console.log('form',formData);
    try {
      const res = await axios.post("http://localhost:8080/api/carrer", formData, {
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
      <p>pdf upload</p>
      <input
        type="file"
        id="file"
        name="careerPortalPdf"
        onChange={onChange}
      />
      <button className="imgAddBtn" onClick={onSubmit}>
        Add Pdf
      </button>{" "}
    </div>
  );
};

export default CarrerPortalFile;
