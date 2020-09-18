import { uploadImage } from "../actions/blog";
import { getCookie } from "../actions/auth";

export const editorModules = {
         height: "600",
         plugins: "link image code table lists advlist media",
         default_link_target: "_blank",
         image_advtab: true,
         toolbar:
           "styleselect |fontsizeselect|forecolor backcolor bold italic underline | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | link image media | table",
         file_picker_types: "image",
         file_picker_callback: (cb, value, meta) => {
           fp_cb(cb, value, meta);
         },
         images_upload_handler: (blobInfo, success, failure) => {
           imageUploadHandler(blobInfo, success, failure);
         },
       };

const fp_cb = (cb, value, meta) => {
  var input = document.createElement("input");
  input.setAttribute("type", "file");
  input.setAttribute("accept", "image/*");

  input.onchange = function() {
    var file = this.files[0];

    var reader = new FileReader();
    reader.onload = function() {
      var id = "blobid" + new Date().getTime();
      var blobCache = tinymce.activeEditor.editorUpload.blobCache;
      var base64 = reader.result.split(",")[1];
      var blobInfo = blobCache.create(id, file, base64);
      blobCache.add(blobInfo);

      /* call the callback and populate the Title field with the file name */
      cb(blobInfo.blobUri(), { title: file.name });
    };
    reader.readAsDataURL(file);
  };
  input.click();
};

const imageUploadHandler = (blobInfo, success, failure) => {
  var formData;
  var id = "blobid" + new Date().getTime();
  formData = new FormData();
  formData.append("photo", blobInfo.blob(), id);
  uploadImage(formData, getCookie("token")).then((data) => {
    console.log("DATA: ", data);
    if (data.error) {
      failure("HTTP Error: " + data.error);
      return;
    }
    if (!data || typeof data.location != "string") {
      failure("Invalid JSON");
      return;
    }

    success(data.location);
  });
};
