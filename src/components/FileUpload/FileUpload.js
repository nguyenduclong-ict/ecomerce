import React, { useEffect, useState } from "react";

// Import React FilePond
import { FilePond, registerPlugin } from "react-filepond";

// Import FilePond styles
import "filepond/dist/filepond.min.css";

// Import the Image EXIF Orientation and Image Preview plugins
// Note: These need to be installed separately
import FilePondPluginImageExifOrientation from "filepond-plugin-image-exif-orientation";
import FilePondPluginImagePreview from "filepond-plugin-image-preview";
// import "filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css";

// Register the plugins
registerPlugin(FilePondPluginImageExifOrientation, FilePondPluginImagePreview);

// Our app
const FileUpload = ({ server }) => {
  // File local mean file upload to server
  var pond;
  const [files, setFiles] = useState([
    {
      source: "index.html",
      options: { type: "local" }
    }
  ]);
  const handleInit = () => {
    console.log("FilePond instance has initialised");
  };

  return (
    <div className="FileUpload">
      {/* Pass FilePond properties as attributes */}
      <FilePond
        ref={ref => (pond = ref)}
        files={files}
        allowMultiple={true}
        maxFiles={3}
        server={server}
        oninit={() => handleInit()}
        onupdatefiles={fileItems => {
          // Set currently active file objects to this.state
          setFiles({ ...fileItems.map(fileItem => fileItem.file) });
        }}
      />
    </div>
  );
};

export default FileUpload;
