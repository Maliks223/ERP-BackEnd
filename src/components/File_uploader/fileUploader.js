import { Input } from "@mui/material";
import React from "react";
// import FileUploadIcon from '@mui/icons-material/FileUpload';

const FileUploader = ({ onFileSelect }) => {


    const handleFileInput = (e) => {
        onFileSelect(e.target.files[0]);
    };

    return (
        <div className="file-uploader">
            <Input
                style={{ marginLeft: "1rem" }}
                type="file"
                onChange={handleFileInput}
            />
        </div>
    );
};

export default FileUploader;
