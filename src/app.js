import React, { useEffect, useState } from "react";

const API_KEY = "2cZkiFTqyiS79UdSapL6LHWlublpl7iy";
const App = () => {
  const [catFact, setCatFact] = useState("");
  const [catGifs, setCatGifs] = useState([]);
  const [random, setRandom] = useState(0);
  const updateImage = () => {
    const min = 0;
    const max = catGifs.length;
    const rand = min + Math.floor(Math.random() * (max - min));
    setRandom(rand);
  };
  const giphyApi = (string) => {
    fetch(`https://api.giphy.com/v1/gifs/search?q=${string}&api_key=${API_KEY}`)
      .then((res) => res.json())
      .then((data) => setCatGifs(data.data));
  };

  const catApiFact = () => {
    fetch("https://catfact.ninja/fact")
      .then((res) => res.json())
      .then((data) => {
        setCatFact(data.fact);
        giphyApi(data.fact.split(" ", 3).join(" "));
      });
  };
  useEffect(catApiFact, []);

  return (
    <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
      <div>
        {catGifs && (
          <img
            style={{ objectFit: "cover", width: "200px", height: "200px" }}
            src={catGifs[random]?.images?.original?.url}
            alt="gif"
          />
        )}
        <button onClick={updateImage}>Update Image</button>
      </div>

      <h1>{catFact}</h1>
    </div>
  );
};

export default App;

//dadas estas 2 apis:
// https://catfact.ninja/fact
// htpps://developers.giphy.com/docs/

//selecciona un dato sobre gatos usando la primera API
//De ese dato, usa las tres primeras palabras
//y busca un gif usando la API Giphy

//El resultadose tiene que
//mostrar con una imagen a
//la izquierda
//y el resto a la derecha,
//todo centrado
//verticalmente
