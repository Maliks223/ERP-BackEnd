import React, { useRef } from "react";

const FileUploader = ({ onFileSelect }) => {
    // const fileInput = useRef(null);

    const handleFileInput = (e) => {
        onFileSelect(e.target.files[0]);
    };

    return (
        <div className="file-uploader">
            <input
                style={{ marginLeft: "94px", marginTop:"36px" }}
                type="file"
                onChange={handleFileInput}
            />
        </div>
    );
};

export default FileUploader;
