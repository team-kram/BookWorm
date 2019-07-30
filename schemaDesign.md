# Schema Design

<h1> Books </h1>
<table>
  <tr>
    <th>id</th>
    <th>tiltle</th>
    <th>imageUrl</th>
    <th>description</th>
    <th>orderId</th>
  </tr>
  <tr>
    <td>INTEGER</td>
    <td>STRING, REQUIRED/NOT EMPTY</td>
    <td>STRING, DEFAULT VALUE</td>
    <td>TEXT, REQUIRED/NOT EMPTY</td>
    <td>INTEGER</td>
  </tr>
</table>
<h1> Orders </h1>
<table>
  <tr>
    <th>bookId</th>
    <th>id</th>
    <th>userId</th>
  </tr>
  <tr>
    <td>INTEGER, REQUIRED</td>
    <td>INTEGER, REQUIRED</td>
    <td>INTEGER, REQUIRED</td>
  </tr>
</table>
<h1> Users </h1>
<table>
  <tr>
    <th>id</th>
    <th>name</th>
    <th>email</th>
    <th>address</th>
    <th>orderId</th>
  </tr>
  <tr>
    <td>INTEGER</td>
    <td>STRING</td>
    <td>STRING</td>
    <td>STRING</td>
    <td>INTEGER</td>
  </tr>
</table>
<h1>Relationships</h1>
Books has many orders through bookId <br>
Users has many orders through userId <br>
