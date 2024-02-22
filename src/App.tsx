import "./App.css";
import Form from "./components/Form";
import Results from "./components/Results";
import Title from "./components/Title";
import Loading from "./components/Loading";
import { useState } from "react";

type ResultsStateType = {
	country: string;
	cityName: string;
	temperature: string;
	conditionText: string;
	humidity: string;
	icon: string;
};

function App() {
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
					temperature: data.main.temp,
					conditionText: data.weather[0].description,
					humidity: data.main.humidity,
					icon: data.weather[0].icon,
				});
				setCity("");
				setLoading(false);
			} catch (error) {
				alert("無効な入力値です");
			}
		}
		fetchData();
	};

	return (
		<>
			<div className="wrapper">
				<div className="container">
					<Title />
					<Form setCity={setCity} getWeather={getWeather} city={city} />
					{loading ? <Loading /> : <Results results={results} />}
				</div>
			</div>
		</>
	);
}

export default App;
