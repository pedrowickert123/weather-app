import { format } from "date-fns/esm";
import { useEffect, useState } from "react";
import { Button } from "./components/Button";
import { City } from "./components/City";
import { Loading } from "./components/Loading";
import { Temperature } from "./components/Temperature";
import { api } from "./services/api";
import "./style.scss";

function App() {
  const [isLoading, setIsLoading] = useState(false);
  const [location, setLocation] = useState({
    latitude: "",
    longitude: "",
  });
  const [weatherData, setWeatherData] = useState({
    city: "",
    temperature: 0,
  });

  useEffect(() => {
    function getCurrentLocation() {
      setIsLoading(true);
      navigator.geolocation.getCurrentPosition(
        ({ coords: { latitude, longitude } }) => {
          setLocation({
            latitude,
            longitude,
          });
        },
        (err) => {
          setIsLoading(false);
          alert("Erro ao carregar localização");
        }
      );
    }

    getCurrentLocation();
  }, []);

  useEffect(() => {
    if (!!location.latitude && !!location.longitude) {
      getTodaysWeather();
    }
  }, [location]);

  async function getTodaysWeather() {
    try {
      setIsLoading(true);
      const response = await api.get(
        `https://api.openweathermap.org/data/2.5/weather?lat=${location.latitude}&lon=${location.longitude}&units=metric&appid=bcc695c45f22e81805723c65215f38bb`
      );

      setWeatherData({
        city: response.data.name,
        temperature: Math.round(response.data.main.temp),
      });
    } catch (err) {
      alert("Erro ao carregar dados da temperatura");
    } finally {
      setIsLoading(false);
    }
  }

  function handleReload() {
    getTodaysWeather();
  }

  const renderContent = () => {
    if (isLoading) {
      return <Loading />;
    }

    return (
      <>
        <div className="header">
          <City name={weatherData.city} />
          <Temperature temperature={weatherData.temperature} />
        </div>
        <Button onClick={handleReload} />
      </>
    );
  };

  return (
    <div className="main">
      <div className="container">{renderContent()}</div>
    </div>
  );
}

export default App;
