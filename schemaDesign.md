# Schema Design

<h1> Books </h1>
<table>
  <tr>
    <th>id</th>
    <th>tiltle</th>
    <th>imageUrl</th>
    <th>description</th>
    <th>orderId</th>
    <th>author</th>
    <th>genre</th>
    <th>stock</th>
    <th>price</th>
    <th>ISBN</th>
  </tr>
  <tr>
    <td>INTEGER</td>
    <td>STRING, REQUIRED/NOT EMPTY</td>
    <td>STRING, DEFAULT VALUE</td>
    <td>TEXT, REQUIRED/NOT EMPTY</td>
    <td>INTEGER</td>
    <td>STRING</td>
    <td>STRING</td>
    <td>INTEGER</td>
    <td>DOUBLE</td>
    <td>STRING</td>
  </tr>
</table>
<h1> Product-Orders through table </h1>
<table>
  <tr>
    <th>bookId</th>
    <th>id</th>
    <th>quantity</th>
    <th>userId</th>
  </tr>
  <tr>
    <td>INTEGER, REQUIRED</td>
    <td>INTEGER, REQUIRED</td>
    <td>INTEGER, REQUIRED</td>
    <td>INTEGER, REQUIRED</td>
  </tr>
</table>
<h1> Orders </h1>
<table>
  <tr>
    <th>completed</th>
    <th>id</th>
  </tr>
  <tr>
    <td>BOOLEAN REQUIRED</td>
    <td>INTEGER, REQUIRED</td>
  </tr>
</table>
<h1> Orders-Users through table </h1>
<table>
  <tr>
    <th>ordersId</th>
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
  </tr>
  <tr>
    <td>INTEGER</td>
    <td>STRING</td>
    <td>STRING</td>
    <td>STRING</td>
  </tr>
</table>
<h1>Relationships</h1>
Books many to many with orders <br>
One to many User to Orders. Order belongs to one user, user has many orders
