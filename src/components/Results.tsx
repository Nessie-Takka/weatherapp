type ResultsPropsType = {
	results: {
		country: string;
		cityName: string;
		temperature: string;
		conditionText: string;
		humidity: string;
		icon: string;
	};
};

const Results = ({ results }: ResultsPropsType) => {
	const { country, cityName, temperature, conditionText, humidity, icon } = results;
	return (
		<>
			<div className="results-container">
				<div className="results-text">
					{cityName && <div className="results-city">{cityName}</div>}
					{country && <div className="results-country">{country}</div>}
					{temperature && <div className="results-temp">{temperature}℃</div>}
					{conditionText && <div className="results-condition">{conditionText}</div>}
					{humidity && <div className="results-humidity">湿度:{humidity}%</div>}
				</div>
				{icon && (
					<div className="results-icon">
						{/* eslint-disable-next-line jsx-a11y/alt-text */}
						<img src={`http://openweathermap.org/img/wn/${icon}@4x.png`}></img>
					</div>
				)}
			</div>
		</>
	);
};

export default Results;
