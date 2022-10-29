import { useEffect, useState,useRef  } from "react";
import logo from './images/logo.png';
import './App.css';

function App() {
  const [jsonData, setData] = useState([]);
  const [contientList, setContinentData] = useState([]);
  const [contryList, setContryData] = useState([]);
  const componentRef = useRef(null);
  //const [clicked, setClicked] = useState(false);
  const fetchData = () => {
    fetch(`https://api.countries.code-test.utopiamusic.com/all`)
      .then((response) => response.json())
      .then((actualData) => {
        setData(actualData);
        const key = 'continent';
        const arrayOfContients = [...new Map(actualData.map(item =>
          [item[key], item])).values()];
  
        setContinentData(arrayOfContients);
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

  useEffect(() => {
    fetchData();
  }, []);

  const onSerializeData = (contient,e) => {
    Array.from(e.target.parentElement.children).forEach(function(item,i) {
      item.className = "";
    });
    e.target.classList.add('active'); 
    

    const filtered = jsonData.filter(data => {
      return data.continent === contient;
    });
    setContryData(filtered);

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
          {contientList.map(value => {
            return (
              <a key={value.continent} onClick={(e) => onSerializeData(value.continent,e)}>
                {value.continent}
              </a>
            );
          })}
        </div>
        <div className="country-list" ref={componentRef}>
          {contryList.map(country => {
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
