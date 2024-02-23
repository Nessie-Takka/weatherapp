type FormPropsType = {
	handleSwitch: () => void;
};

const Switch = (props: FormPropsType) => {
	return (
		<button className="switch-btn" onClick={props.handleSwitch}>
			Switch!
		</button>
	);
};

export default Switch;
