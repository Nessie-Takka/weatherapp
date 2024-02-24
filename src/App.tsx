import "./App.css";
import Form from "./components/Form";
import Results from "./components/Results";
import Title from "./components/Title";
import Loading from "./components/Loading";
import { useState } from "react";
import Video from "./components/Video";
import Switch from "./components/Switch";
import PlayBtn from "./components/PlayBtn";
import Geolocation from "./components/Geolocation";

type ResultsStateType = {
	country: string;
	cityName: string;
	temperature: string;
	conditionText: string;
	humidity: string;
	icon: string;
};

function App() {
	//気象情報を取得する
	const [loading, setLoading] = useState<boolean>(false);
	const [city, setCity] = useState<string>("");
	const [results, setResults] = useState<ResultsStateType>({
		country: "",
		cityName: "",
		temperature: "",
		humidity: "",
		conditionText: "",
		icon: "",
	});
	const envValue = process.env.REACT_APP_API_KEY;
	const api = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${envValue}&lang=ja&units=metric`;
	const getWeather = (e: React.ChangeEvent<HTMLInputElement>) => {
		e.preventDefault();
		setLoading(true);
		async function fetchData() {
			try {
				const response = await fetch(api);
				const data = await response.json();
				setResults({
					country: data.sys.country,
					cityName: data.name,
					temperature: String(Math.floor(Number(data.main.temp) * 10) / 10),
					conditionText: data.weather[0].description,
					humidity: data.main.humidity,
					icon: data.weather[0].icon,
				});
				setCity("");
				setLoading(false);
			} catch (error) {
				alert("無効な入力値です。入力し直してください");
			}
		}
		fetchData();
	};

	//背景動画を切り替える
	const [background, setBackground] = useState("sky");
	const handleSwitch = () => {
		setBackground((prev) => {
			if (prev === "sea") {
				return "forest";
			} else if (prev === "forest") {
				return "rain";
			} else if (prev === "rain") {
				return "sky";
			} else {
				return "sea";
			}
		});
	};

	return (
		<>
			<div className="wrapper">
				<Video background={background} />
				<div className="container">
					<Title />
					<Form setCity={setCity} getWeather={getWeather} city={city} />
					{loading ? <Loading /> : <Results results={results} />}
					<Geolocation />
				</div>

				<div className="button-container">
					<Switch handleSwitch={handleSwitch} />
					<PlayBtn />
				</div>
			</div>
		</>
	);
}

export default App;
