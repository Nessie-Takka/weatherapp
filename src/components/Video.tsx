import { useRef, useEffect } from "react";

type VideoProps = {
	background: string;
};
const Video = ({ background }: VideoProps) => {
	const videoRef = useRef<HTMLVideoElement>(null);
	useEffect(() => {
		if (videoRef.current) {
			videoRef.current.src = `/videos/${background}.mp4`;
			videoRef.current.load();
			videoRef.current.onloadeddata = () => {
				videoRef.current?.play();
			};
		}
	}, [background]);

	return (
		<video className="video" autoPlay muted loop playsInline preload="metadata" ref={videoRef}>
			<source src={background} type="video/mp4" />
		</video>
	);
};

export default Video;
