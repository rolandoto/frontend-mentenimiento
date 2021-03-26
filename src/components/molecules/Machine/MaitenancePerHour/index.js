import React, { useState } from "react";
import { Input, Select, Option } from "../../../atoms";

export const MaitenancePerHour = ({
    hours = 0,
    maitenances = [],
    selectedMaitenance = "",
}) => {
    maitenances = [{ _id: "", name: "Selecciona un valor" }, ...maitenances];
    const [maitenancePreconfigured, setMaitenancePreconfigured] = useState(
        JSON.stringify({
            hours,
            maintenance: "",
        })
    );

    const changeState = (key, value) => {
        const convertValue = JSON.parse(maitenancePreconfigured);
        setMaitenancePreconfigured(
            JSON.stringify({
                ...convertValue,
                [key]: value,
            })
        );
    };

    return (
        <React.Fragment>
            <input
                type="hidden"
                name="preconfigureMaitenance"
                value={maitenancePreconfigured}
                onChange={() => null}
            />
            <div className="center_elements space-between">
                <div className="col4">
                    <Input
                        type="number"
                        defaultValue={hours}
                        min={0}
                        max={999}
                        height={50}
                        placeholder="Horas"
                        animated
                        onChange={(e) => changeState("hours", e.target.value)}
                    />
                </div>
                <div className="col7">
                    <Select
                        identifier="selectedMaitenance"
                        placeholder="Mantenimiento"
                        defaultSelected={selectedMaitenance}
                        height={50}
                        onChange={(value) => changeState("maintenance", value)}
                    >
                        {maitenances.map((maitenance, index) => (
                            <Option
                                key={maitenance._id}
                                value={maitenance._id}
                                text={maitenance.name}
                            />
                        ))}
                    </Select>
                </div>
            </div>
        </React.Fragment>
    );
};
