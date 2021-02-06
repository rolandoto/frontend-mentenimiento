import React from "react";
import { useDispatch } from "react-redux";
import { sparePartsActions } from "../../../../@actions";
import { Input, Button, UploadImage, Text } from "../../../atoms";

export const AddSparePartComponent = ({ edit }) => {
    const dispatch = useDispatch();

    const eHandleSubmit = (e) => {
        e.preventDefault();
        const data = new FormData(e.target);

        if (e.target.sparePartPhoto.files.length > 0) {
            if (!edit) {
                dispatch(sparePartsActions.createSparePart(data));
            } else {
                dispatch(sparePartsActions.updateSparePart(data));
                e.target.sparePartPhoto.value = "";
            }
        } else {
            if (!edit) {
                dispatch(sparePartsActions.createSparePart(data));
            } else {
                const sparePart = {
                    sparePartID: e.target.sparePartID.value,
                    price: e.target.price.value,
                    stock: e.target.stock.value,
                    name: e.target.name.value,
                };
                
                dispatch(sparePartsActions.updateSparePart(sparePart));
            }
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
                text={edit ? "Editar repuesto" : "Agregar repuesto"}
                size={20}
                weight={500}
                color="#83889c"
            />
            <div className="separator_top"></div>

            <div className="rows mb_20">
                <div className="col4 absolute_center">
                    <UploadImage
                        identifier="sparePartPhoto"
                        defaultPhoto={
                            edit
                                ? edit.sparePartPhoto
                                    ? process.env.REACT_APP_API +
                                      edit.sparePartPhoto.folder +
                                      edit.sparePartPhoto.filename
                                    : ""
                                : ""
                        }
                    />
                </div>
                <div className="col8">
                    {edit && (
                        <Input
                            identifier="sparePartID"
                            type="hidden"
                            placeholder="ID del repuesto"
                            min={5}
                            max={50}
                            height={50}
                            defaultValue={edit._id}
                            animated
                        />
                    )}

                    <div className="rows">
                        <div className="col6">
                            <Input
                                identifier="sparePartCode"
                                type="text"
                                placeholder="Código del repuesto"
                                min={5}
                                max={50}
                                height={50}
                                defaultValue={edit ? edit.sparePartCode : ""}
                                animated
                            />
                        </div>
                        <div className="col6">
                            <Input
                                identifier="name"
                                type="text"
                                placeholder="Nombre del repuesto"
                                min={5}
                                max={50}
                                height={50}
                                defaultValue={edit ? edit.name : ""}
                                animated
                            />
                        </div>
                    </div>
                    <div className="rows">
                        <div className="col6">
                            <Input
                                identifier="price"
                                type="number"
                                placeholder="Precio del repuesto"
                                max={10000000}
                                height={50}
                                defaultValue={edit ? edit.price : ""}
                                animated
                            />
                        </div>
                        <div className="col6">
                            <Input
                                identifier="stock"
                                type="number"
                                placeholder="Stock del repuesto"
                                max={200}
                                height={50}
                                defaultValue={edit ? edit.stock : ""}
                                animated
                            />
                        </div>
                    </div>
                </div>
            </div>
            <Button
                text={edit ? "Editar" : "Agregar"}
                variant="secondary btn-big"
            />
        </form>
    );
};
