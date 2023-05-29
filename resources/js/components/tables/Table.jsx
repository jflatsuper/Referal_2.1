import React from "react";
const DefaultTable = ({ tableHeaders = [], tableBody = [] }) => {
    return (
        <table className="table">
            <thead className="table-light">
                <tr>
                    {tableHeaders.map((item) => (
                        <th scope="col" key={item} id={item}>
                            {item}
                        </th>
                    ))}
                </tr>
            </thead>
            <tbody style={{color:'white'}}>
                {tableBody?.map((item, id) => {
                    const values = Object.values(item);
                    console.log(item);
                    console.log(values);
                    return (
                        <tr key={id}>
                            {values.map((item,index) => (
                                <td scope="row" key={index}>
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
