import * as React from 'react';
import logo from './images/logo.png';
import './App.css';

function App() {
  const [jsonData, setData] = React.useState([]);
  const [continentList, setContinentData] = React.useState([]);
  const [countryList, setcountryData] = React.useState([]);
  const componentRef = React.useRef(null); // for get div element
  const fetchData = () => {
    fetch(`https://api.countries.code-test.utopiamusic.com/all`)
      .then((response) => response.json())
      .then((actualData) => {
        setData(actualData);
        // get all continents
        const key = 'continent';
        const arrayOfcontinents = [...new Map(actualData.map(item =>
          [item[key], item])).values()];  
          setContinentData(arrayOfcontinents);
        })
        .catch((err) => {
          console.log(err.message);
        });
  };

  React.useEffect(() => {
    fetchData();
  }, []);

  const showContryList = (continent,e) => {
    Array.from(e.target.parentElement.children).forEach(function(item,i) {
      item.className = ""; //remove active class from othere element
    });
    e.target.classList.add('active');     

    //get country list by continent
    const filtered = jsonData.filter(data => {
      return data.continent === continent;
    });
    setcountryData(filtered);
    componentRef.current.scrollTo(0, 0);    
  };

  const highlightCountry = (e) => {    
    Array.from(e.target.parentElement.children).forEach(function(item,i) {
      item.className = ""; //remove active class from othere element
    });
    e.target.classList.add('active');    
  };

  const [selectedIndex, setSelectedIndex] = React.useState(1);

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="Utopia-logo" alt="logo" />
      </header>
      <div className="content">
        <div className="continent-name">
          {continentList.map(value => {
            return (
              <a key={value.continent} onClick={(e) => showContryList(value.continent,e)}>
                {value.continent}
              </a>
            );
          })}
        </div>
        
        <div className="country-list" ref={componentRef}>
          {countryList.map(country => {
            return (
                <a key={country.alpha2Code} onClick={ (e) => highlightCountry(e) }>{country.name}</a>              
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default App;
