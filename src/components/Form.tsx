type FormPropsType = {
	city: string;
	setCity: React.Dispatch<React.SetStateAction<string>>;
	getWeather: (e: any) => void;
};
const Form = ({ city, setCity, getWeather }: FormPropsType) => {
	return (
		<form onSubmit={getWeather}>
			<input
				type="text"
				placeholder="都市名"
				name="city"
				onChange={(e) => setCity(e.target.value)}
				value={city}
			/>
			<button type="submit" onClick={getWeather}>
				Get Weather
			</button>
		</form>
	);
};

export default Form;
