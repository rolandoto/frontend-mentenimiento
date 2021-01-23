import React, { useRef, useState } from "react";
import { CameraAlt } from "@material-ui/icons";
import cx from "classnames";
import "./uploadImage.scss";

export const UploadImage = ({ identifier, defaultPhoto }) => {
    const file = useRef();
    const [imagePreview, setImagePreview] = useState(
        defaultPhoto ? defaultPhoto : ""
    );
    const [imageIcon, setImageIcon] = useState(false);

    const filePreview = (_) => {
        const filePreview = file.current.files[0];
        if (filePreview) {
            if (filePreview.size / 1000 > 1000000) {
                file.current.value = "";
                return false;
            }

            const reader = new FileReader();
            reader.onload = (e) => {
                setImagePreview(e.target.result);
            };
            reader.readAsDataURL(file.current.files[0]);
        }
    };

    return (
        <div
            className={cx(
                "container_image_preview absolute_center",
                imagePreview ? "no_border" : ""
            )}
            onMouseEnter={() => setImageIcon(true)}
            onMouseLeave={() => setImageIcon(false)}
        >
            {imageIcon && imagePreview && (
                <div className="show_camera_on_hover">
                    <CameraAlt />
                </div>
            )}
            {imagePreview && (
                <img
                    className="preview_image"
                    src={imagePreview}
                    alt="preview file"
                />
            )}

            {!imagePreview && (
                <div className="preview_image no_file">
                    <CameraAlt />
                    <span>Subir foto</span>
                </div>
            )}

            <input
                name={identifier}
                type="file"
                ref={file}
                onChange={() => filePreview()}
            />
        </div>
    );
};
