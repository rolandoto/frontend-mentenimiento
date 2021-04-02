import React, { useEffect, useState } from "react";
import moment from "moment";
import { ListDetail } from "../../../organisms";

export const AlertAndUsesPartial = ({ machine }) => {
    const [uses, setUses] = useState([]);
    const [useDetail, setUseDetail] = useState(false);
    const [issueDetail, setIssueDetail] = useState(false);

    useEffect(() => {
        const usesMachine = [];
        for (let u in machine.machineUses) {
            usesMachine.push({
                ...machine.machineUses[u],
                user: machine.machineUses[u].user.name,
            });
        }

        setUses(usesMachine.reverse());
    }, [machine.machineUses]);

    const showUseDetail = (use) => {
        setIssueDetail(false);
        setUseDetail({
            show: true,
            ...use,
            create_at: moment(use.create_at).format("LL"),
        });
    };

    const showIssueDetail = (issue) => {
        setUseDetail(false);
        setIssueDetail({
            show: true,
            ...issue,
            date: moment(issue.date).format("LL"),
        });
    };

    return (
        <div className="rows">
            <div className="col4">
                <div className="center_elements flex-start mnh-25">
                    <span>Usos</span>
                </div>

                <ListDetail
                    show={showUseDetail}
                    items={uses}
                    keysToShow={["user", "note"]}
                />
            </div>

            <div className="col4">
                <div className="center_elements flex-start mnh-25">
                    <span>Reportes</span>
                </div>

                <ListDetail
                    show={showIssueDetail}
                    items={machine.machineIssues.reverse()}
                    keysToShow={["name", "note"]}
                />
            </div>

            <div className="col4">
                <div className="center_elements flex-start mnh-25">
                    <span>Detalle</span>
                </div>
                {useDetail.show && (
                    <div className="maitenance_detail_card">
                        <p className="mt-10">
                            <strong className="f600">Usuario:</strong>{" "}
                            {useDetail.user}
                        </p>
                        <p className="mt-10">
                            <strong className="f600">Nota:</strong>{" "}
                            {useDetail.note}
                        </p>

                        <p className="mt-10">
                            <strong className="f600">Horas de uso:</strong>{" "}
                            {useDetail.hours}
                        </p>
                        <p className="mt-10">
                            <strong className="f600">Fecha registrada:</strong>{" "}
                            {useDetail.create_at}
                        </p>
                    </div>
                )}
                {issueDetail.show && (
                    <div className="maitenance_detail_card">
                        <p className="mt-10">
                            <strong className="f600">Usuario:</strong>{" "}
                            {issueDetail.name}
                        </p>
                        <p className="mt-10">
                            <strong className="f600">Nota:</strong>{" "}
                            {issueDetail.note}
                        </p>
                        <p className="mt-10">
                            <strong className="f600">Fecha registrada:</strong>{" "}
                            {issueDetail.date}
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
};
