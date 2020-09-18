import { Editor } from "@tinymce/tinymce-react";
import { useState, useEffect } from "react";
import {editorModules} from "../../../../helpers/tinymce";

const App = () => {
  const [body, setBody] = useState("");
  // const token = getCookie("token");

  const handleEditorChange = (e) => {
    setBody(e.target.getContent());
  };

  const handleSubmit = () => {
    alert(body);
  };
  return (
    <>
      <div
        className="mx-auto mt-4"
        style={{ width: "1200px", height: "1000px", borderRadius: "0.625rem" }}
      >
        <Editor init={editorModules} onChange={handleEditorChange} />
        <div className="btn btn-success mt-3" onClick={handleSubmit}>
          Submit
        </div>
      </div>
    </>
  );
};

export default App;
