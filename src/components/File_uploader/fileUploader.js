import { Input } from "@mui/material";
import React from "react";
// import FileUploadIcon from '@mui/icons-material/FileUpload';

const FileUploader = ({ onFileSelect }) => {


    const handleFileInput = (e) => {
        onFileSelect(e.target.files[0]);
    };

    return (
        <div className="file-uploader">
<<<<<<< HEAD
            <input
                style={{ marginLeft: "94px", marginTop:"36px" }}
=======
            <Input
                style={{ marginLeft: "1rem" }}
>>>>>>> edits1
                type="file"
                onChange={handleFileInput}
            />
        </div>
    );
};

export default FileUploader;
