import { useEffect, useState } from "react";

const Geolocation = () => {
	const [lon, setLon] = useState<number | null>(null);
	const [lat, setLat] = useState<number | null>(null);
	const [weatherData, setWeatherData] = useState<any>(null); // 天気情報の状態を追加

	useEffect(() => {
		if (navigator.geolocation) {
			navigator.geolocation.getCurrentPosition((position) => {
				setLon(position.coords.longitude);
				setLat(position.coords.latitude);
			});
		}
	}, []);

	useEffect(() => {
		const fetchData = async () => {
			if (lon !== null && lat !== null) {
				const envValue = process.env.REACT_APP_API_KEY;
				const geoApi = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${envValue}&lang=ja&units=metric`;
				try {
					const response = await fetch(geoApi);
					const data = await response.json();
					console.log(data);
					setWeatherData(data); // 取得した天気情報を状態に保存
				} catch (error) {
					console.error("Error fetching weather data:", error);
				}
			}
		};

		fetchData();
	}, [lon, lat]); // lonとlatが変更された時に再度データを取得する

	return (
		<>
			<div className="geolocation">
				{weatherData ? (
					<>
						<h3>5日間の現在地の天気</h3>
						<div className="weather-icons-container">
							{weatherData.list
								.filter((item: any, index: number) => index % 8 === 0)
								.map((item: any, index: number) => (
									<div key={index} className="weather-icons">
										<div className="weather-date">
											{new Date(item.dt_txt).toLocaleDateString("ja-JP", {
												month: "numeric",
												day: "numeric",
											})}
										</div>
										<img
											src={`http://openweathermap.org/img/wn/${item.weather[0].icon}@2x.png`}
											alt={`Weather icon ${index}`}
										/>
									</div>
								))}
						</div>
					</>
				) : (
					<div>天気情報を取得中...</div>
				)}
			</div>
		</>
	);
};

export default Geolocation;
