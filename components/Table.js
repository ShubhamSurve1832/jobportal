import { useState } from 'react';

function Table({ data }) {
  const [showAllRows, setShowAllRows] = useState(false);
  const maxRowsToShow = 10; // Change this to your desired maximum

  return (
    <table>
      <thead>
        <tr>
          <th>Header 1</th>
          <th>Header 2</th>
          <th>Header 3</th>
        </tr>
      </thead>
      <tbody>
        {data.slice(0, showAllRows ? data.length : maxRowsToShow).map((item, index) => (
          <tr key={index}>
            <td>{item.column1}</td>
            <td>{item.column2}</td>
            <td>{item.column3}</td>
          </tr>
        ))}
      </tbody>
      {!showAllRows && data.length > maxRowsToShow && (
        <tfoot>
          <tr>
            <td colSpan="3">
              <button onClick={() => setShowAllRows(true)}>Read more</button>
            </td>
          </tr>
        </tfoot>
      )}
    </table>
  );
}

export default Table;

