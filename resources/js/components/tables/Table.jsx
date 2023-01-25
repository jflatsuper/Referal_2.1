import React from "react";
const DefaultTable = ({ tableHeaders = [], tableBody = [] }) => {
    return (
        <table className="table">
            <thead className="table-dark">
                <tr>
                    {tableHeaders.map((item) => (
                        <th scope="col" key={item} id={item}>
                            {item}
                        </th>
                    ))}
                </tr>
            </thead>
            <tbody>
                {tableBody?.map((item, id) => {
                    const values = Object.values(item);
                    console.log(item);
                    console.log(values);
                    return (
                        <tr key={id}>
                            {values.map((item) => (
                                <td scope="row" key={item}>
                                    {item}
                                </td>
                            ))}
                        </tr>
                    );
                })}
            </tbody>
        </table>
    );
};
export default DefaultTable;
