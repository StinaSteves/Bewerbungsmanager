import { useState, useEffect } from 'react';
import './Style/Main.css';
import Glas from '../../../public/image/glas.png';
import Airplane from '../../../public/image/paper.png';
import MOTIVATION_LIST from '../../Motivation.js';

export default function Main() {
  const [motivation, setMotivation] = useState("");
  const [data, setData] = useState([]);
  const [searchQuery, setSearchQuery] = useState(""); 
  const [searchResult, setSearchResult] = useState(""); 
  const [successMessage, setSuccessMessage] = useState(""); // Neuer Zustand für Erfolgsmeldung

  const getRandomMotivation = () => {
    const randomIndex = Math.floor(Math.random() * MOTIVATION_LIST.length);
    setMotivation(MOTIVATION_LIST[randomIndex]);
  };

  useEffect(() => {
    const storedData = localStorage.getItem("data");
    if (storedData) {
      setData(JSON.parse(storedData));
    } else {
      setData([]); 
    }
    getRandomMotivation();
  }, []);

  const addEntry = (newEntry) => {
    const updatedData = [...data, newEntry];
    setData(updatedData);
    localStorage.setItem("data", JSON.stringify(updatedData));
    setSuccessMessage("Super"); // Erfolgsmeldung setzen
    setTimeout(() => setSuccessMessage(""), 3000); // Meldung nach 3 Sekunden ausblenden
  };

  const handleSearch = () => {
    if (data.includes(searchQuery)) {
      setSearchResult(<span style={{ color: '#658354' }}>Jeay, du hast dich bereits beworben – das ist der erste Schritt zu etwas Großartigem!</span>);
    } else {
      setSearchResult( <span style={{ color: '#af3a25 ' }}>Go for it! Du hast dich noch nicht beworben – jetzt ist der perfekte Moment!</span>);
    }
  };

  return (
    <div className='content'>
      <div className='mainWrapper'>
        <div className='sloganDiv'>
          <img src={Airplane} alt="" />
          <h1>Keep Calm <br /> <span>and</span> <br /> drink a cup of coffee </h1>
          <p>{motivation}</p> 
          <button onClick={getRandomMotivation}>Motivation</button>
        </div>
        
        <div className='imgDiv'>
          <img id='img' src={Glas} alt="" />
        </div>

        <div className='toolDiv'>
   
          <h1>Bewerben einfach <br />
           <span>und organisiert</span> </h1>
        
          <div className="tool">
            <input type="checkbox" id="chk" aria-hidden="true" />
            <div className="signup">
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  const firmaName = e.target.firma.value;
                  if (firmaName) {
                    addEntry(firmaName);
                    e.target.firma.value = ''; 
                  }
                }}
              >
                <label htmlFor="chk" aria-hidden="true">
                  Firma Eintragen
                </label>
                <input
                  name="firma" // Name hinzugefügt, um auf das Feld zuzugreifen
                  placeholder="Firmen Name"
                  required
                  autoComplete="off" 
                />
                <button type="submit">Eintragen</button>
              </form>
              {successMessage && <p className="successMessage">{successMessage}</p>} {/* Erfolgsmeldung */}
            </div>

            <div className="login">
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleSearch();
                }}
              >
                <label htmlFor="chk" aria-hidden="true">
                  Suchen
                </label>
                <input
                  placeholder="Firmen Namen"
                  required
                  onChange={(e) => {
                    setSearchQuery(e.target.value);
                    setSearchResult(""); 
                  }}
                />
                <button type="submit">Suchen</button>
              </form>
              {searchResult && <p className='ausgabeText'> {searchResult}</p>}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
