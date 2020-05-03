import React from 'react';

function Table () {
    return (
     <div>
     <table className="table">
  <thead className="thead-dark">
    <tr>
      <th scope="col">#</th>
      <th scope="col">INE</th>
      <th scope="col">First Name </th>
      <th scope="col">Last Name</th>
      <th scope="col">Birthday</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th scope="row">1</th>
      <td>12345567789</td>
      <td>Rudy</td>
      <td>Deflisque</td>
      <td>08/07/1997</td>
    </tr>
    <tr>
      <th scope="row">2</th>
      <td>24596838299</td>
      <td>Chiara</td>
      <td>Bouchet</td>
      <td>08/07/1997</td>
    </tr>
    <tr>
      <th scope="row">3</th>
      <td>34829103940</td>
      <td>Pierre</td>
      <td>Lourdelet</td>
      <td>05/06/1999</td>
    </tr>
  </tbody>
</table>
</div>
    );
}

export default Table;