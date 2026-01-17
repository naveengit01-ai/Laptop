import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../CSS/Search.css"
const Sec_HOME = () => {
    const navigate=useNavigate();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [name, setName] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    fetch(`http://localhost:5000/movie/${name}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to get the data");
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
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;

  return (
    <div className="setup">
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Enter movie name"
          required
          className="take"
        />
        <button type="submit" className="search">Search</button>
      </form>

      <div className="div2">
        {data.length > 0 ? (
          data.map((item, index) => (
            <div key={index}>
              <img
                src={`/images/movies/${item.image}`}
                alt={item.name || "movie image"}
                className="image2"
                style={{ width: "200px", height: "auto" }}
              />
              <br></br>
              <button onClick={()=>navigate("/tickets-book")} className="book">BOOK</button>
            </div>
          ))
        ) : (
          <p>No movie found Search the movie</p>
        )}
      </div>
    </div>
  );
};

export default Sec_HOME;
