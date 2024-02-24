import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCirclePlay } from "@fortawesome/free-solid-svg-icons";
import { useState, useRef } from "react";

const audioName = ["neon", "clair", "morning", "lo-fi"];

const PlayBtn = () => {
	const [audioIndex, setAudioIndex] = useState(0);
	const audioRef = useRef(new Audio(`/music/${audioName[audioIndex]}.mp3`));
	const isSwitching = useRef(false);

	const handlePlay = () => {
		if (!isSwitching.current) {
			const audio = audioRef.current;
			audio.pause();
			const nextAudioIndex = (audioIndex + 1) % audioName.length;
			setAudioIndex(nextAudioIndex);
			isSwitching.current = true;
			setTimeout(() => {
				audio.src = `/music/${audioName[nextAudioIndex]}.mp3`;
				audio.play();
				audio.loop = true;
				isSwitching.current = false;
			}, 2000);
		}
	};
	return (
		<button className="play-btn">
			<FontAwesomeIcon icon={faCirclePlay} size="4x" onClick={handlePlay} />
		</button>
	);
};

export default PlayBtn;
