import { useEffect, useState,useRef  } from "react";
import logo from './images/logo.png';
import './App.css';

function App() {
  const [jsonData, setData] = useState([]);
  const [continentList, setContinentData] = useState([]);
  const [countryList, setcountryData] = useState([]);
  const componentRef = useRef(null);
  //const [clicked, setClicked] = useState(false);
  const fetchData = () => {
    fetch(`https://api.countries.code-test.utopiamusic.com/all`)
      .then((response) => response.json())
      .then((actualData) => {
        setData(actualData);
        const key = 'continent';
        const arrayOfcontinents = [...new Map(actualData.map(item =>
          [item[key], item])).values()];
  
        setContinentData(arrayOfcontinents);
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

  useEffect(() => {
    fetchData();
  }, []);

  const onSerializeData = (continent,e) => {
    Array.from(e.target.parentElement.children).forEach(function(item,i) {
      item.className = "";
    });
    e.target.classList.add('active'); 
    

    const filtered = jsonData.filter(data => {
      return data.continent === continent;
    });
    setcountryData(filtered);

    componentRef.current.scrollTo(0, 0);
    
  };

  const setClicked = (e) => {    
    Array.from(e.target.parentElement.children).forEach(function(item,i) {
      item.className = "";
    });
    e.target.classList.add('active');    
  };

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="Utopia-logo" alt="logo" />
      </header>
      <div className="content">
        <div className="continent-name">
          {continentList.map(value => {
            return (
              <a key={value.continent} onClick={(e) => onSerializeData(value.continent,e)}>
                {value.continent}
              </a>
            );
          })}
        </div>
        <div className="country-list" ref={componentRef}>
          {countryList.map(country => {
            return (
                <a key={country.alpha2Code} onClick={ (e) => setClicked(e) }>{country.name}</a>
              
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default App;
