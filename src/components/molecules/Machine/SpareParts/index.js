import React, { useState } from "react";
import { ListDetail } from "../../../organisms";
import { Avatar, Input, Button, Text } from "../../../atoms";
import { useDispatch } from "react-redux";
import { alertActions, sparePartsActions } from "../../../../@actions";

export const SparePartsPartial = ({ machine }) => {
    const [sparePartDetail, setSparePartDetail] = useState(false);
    const [useSparePart, setUseSparePart] = useState(false);
    const dispatch = useDispatch();

    const showSparePart = (sparePart) => {
        setSparePartDetail({
            ...sparePart,
            show: true,
        });
    };

    const showSparePartStock = (sparePart) => {
        showSparePart(sparePart);
        setUseSparePart(true);
    };

    const showSparePartDetail = (sparePart) => {
        showSparePart(sparePart);
        setUseSparePart(false);
    };

    const useStockSparePart = (e) => {
        e.preventDefault();
        const data = {
            sparePartID: sparePartDetail._id,
            machineID: machine._id,
            stockUsed: e.target.used_stock.value,
        };

        if (data.sparePartID.length > 0 && data.machineID.length > 0) {
            if (Number(data.stockUsed) > 0) {
                dispatch(sparePartsActions.assignSparePartStockToMachine(data));
            } else {
                dispatch(
                    alertActions.showAlert({
                        type: "failure",
                        message: "El valor mínimo del stock a usar es 1.",
                    })
                );
            }
        } else {
            dispatch(
                alertActions.showAlert({
                    type: "failure",
                    message: "El id de la maquina y el repuesto es requerido.",
                })
            );
        }
    };

    return (
        <div className="rows">
            <div className="col4">
                <div className="center_elements flex-start mnh-25">
                    <span>Repuestos habilitados</span>
                </div>
                <ListDetail
                    show={showSparePartStock}
                    items={machine.enableSpareParts}
                    keysToShow={["sparePartCode", "name"]}
                />
            </div>
            <div className="col4">
                <div className="center_elements flex-start mnh-25">
                    <span>Repuestos usados</span>
                </div>
                <ListDetail
                    show={showSparePartDetail}
                    items={machine.usedSpareParts}
                    keysToShow={["sparePartCode", "name"]}
                />
            </div>
            <div className="col4">
                <div className="center_elements flex-start mnh-25">
                    <span>Detalles del repuesto</span>
                </div>
                {sparePartDetail.show && (
                    <div className="maitenance_detail_card">
                        <div className="center_elements mb_20">
                            <Avatar
                                image={
                                    process.env.REACT_APP_API +
                                    sparePartDetail.sparePartPhoto.folder +
                                    sparePartDetail.sparePartPhoto.filename
                                }
                                className="machine_photo"
                                size={100}
                            />
                        </div>
                        <p>
                            <strong className="f600">
                                Código del repuesto:
                            </strong>{" "}
                            {sparePartDetail.sparePartCode}
                        </p>
                        <p className="mt-10">
                            <strong className="f600">
                                Nombre del repuesto:
                            </strong>{" "}
                            {sparePartDetail.name}
                        </p>
                        <p className="mt-10">
                            <strong className="f600">Precio:</strong>{" "}
                            {sparePartDetail.price}
                        </p>
                        {!useSparePart && (
                            <p className="mt-10">
                                <strong className="f600">Stock usado:</strong>{" "}
                                {sparePartDetail.stockUsed}
                            </p>
                        )}

                        {useSparePart && (
                            <React.Fragment>
                                <p className="mt-10">
                                    <strong className="f600">
                                        Stock disponible:
                                    </strong>{" "}
                                    {sparePartDetail.stock}
                                </p>
                                <form
                                    method="post"
                                    onSubmit={useStockSparePart}
                                >
                                    <div className="mt-10">
                                        <Text type="h3" text="User repuesto" />
                                        <Input
                                            animated
                                            type="number"
                                            min="0"
                                            max={sparePartDetail.stock}
                                            defaultValue="0"
                                            placeholder="Total a usar"
                                            identifier="used_stock"
                                        />
                                        <Button
                                            text="Usar repuesto"
                                            variant="secondary btn-big"
                                        />
                                    </div>
                                </form>
                            </React.Fragment>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};
