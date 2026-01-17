import { useState, useEffect } from "react";
const Details = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  useEffect(() => {
    fetch("http://localhost:5000/data")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        return response.json();
      })
      .then((data) => {
        setData(data);
        setLoading(false);
      })
      .catch((error) => {
        setError(error.message);
        setLoading(false);
      });
  }, []);
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;
  return (
    <table border="1" cellPadding="10">
      <thead>
        <tr>
          <th>Account Number</th>
          <th>Name</th>
          <th>Location</th>
          <th>Account Type</th>
          <th>Balance</th>
        </tr>
      </thead>
      <tbody>
        {data.map((item, index) => (
          <tr key={index}>
            <td>{item.Account_number}</td>
            <td>{item.Name}</td>
            <td>{item.Location}</td>
            <td>{item.Account_Type}</td>
            <td>{item.Balance}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};
export default Details;
