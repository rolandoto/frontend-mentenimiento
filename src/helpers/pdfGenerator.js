import jsPDF from "jspdf";
import "jspdf-autotable";
import moment from "moment";
import { randomName } from "./";

export const PdfGenerator = (
    headers = [],
    keyItemsToRender = [],
    items = [],
    title = "",
    orientation = "p"
) => {
    const doc = new jsPDF({
        orientation,
    });
    const tableRows = [];

    items.forEach((item) => {
        const itemData = [];
        keyItemsToRender.forEach((key) => {
            if (key.toString() === "create_at" || key.toString() === "date") {
                itemData.push(moment(item[key]).format("LL"));
            } else {
                itemData.push(item[key]);
            }
        });
        tableRows.push(itemData);
    });

    doc.text("" + title, 14, 15);

    doc.autoTable(headers, tableRows, { startY: 20 });
    doc.save(`${randomName(50)}.pdf`);
};
