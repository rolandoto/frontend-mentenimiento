import React from "react";
import { useDispatch } from "react-redux";
import { environmentActions } from "../../../../@actions";
import { Input, Button, UploadImage, Text } from "../../../atoms";

export const AddEnvironmentComponent = ({ edit }) => {
    const dispatch = useDispatch();

    const eHandleSubmit = (e) => {
        e.preventDefault();

        if (e.target.environmentPhoto.files.length > 0) {
            // const data = new FormData(e.target);
            // dispatch(environmentActions.createEnvironment(data));
        } else {
            const environment = {
                environmentID: e.target.environmentID.value,
                environmentCode: e.target.environmentCode.value,
                name: e.target.name.value,
            };

            dispatch(environmentActions.updateEnvironment(environment));
        }
    };

    return (
        <form
            method="POST"
            className="p20"
            onSubmit={eHandleSubmit}
            encType="multipar/form-data"
        >
            <Text
                type="h2"
                text={edit ? "Editar ambiente" : "Agregar ambiente"}
                size={20}
                weight={500}
                color="#83889c"
            />
            <div className="separator_top"></div>

            <div className="rows mb_20">
                <div className="col4 absolute_center">
                    <UploadImage
                        identifier="environmentPhoto"
                        defaultPhoto={
                            edit
                                ? process.env.REACT_APP_API +
                                  edit.environmentPhoto.folder +
                                  edit.environmentPhoto.filename
                                : ""
                        }
                    />
                </div>
                <div className="col8">
                    {edit && (
                        <Input
                            identifier="environmentID"
                            type="text"
                            placeholder="ID del ambiente"
                            min={5}
                            max={50}
                            height={50}
                            defaultValue={edit._id}
                            animated
                        />
                    )}

                    <Input
                        identifier="environmentCode"
                        type="text"
                        placeholder="Código ambiente"
                        min={5}
                        max={50}
                        height={50}
                        defaultValue={edit ? edit.environmentCode : ""}
                        animated
                    />
                    <Input
                        identifier="name"
                        type="text"
                        placeholder="Nombre del ambiente"
                        min={5}
                        max={50}
                        height={50}
                        defaultValue={edit ? edit.name : ""}
                        animated
                    />
                </div>
            </div>
            <Button
                text={edit ? "Editar" : "Agregar"}
                variant="secondary btn-big"
            />
        </form>
    );
};
