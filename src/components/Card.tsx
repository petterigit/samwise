import "../styles/Card.css";

type CardProps = {
	id: string;
	imagesrc: string;
	imageLoaded: () => void;
	showCardInfo: (e: React.MouseEvent<HTMLImageElement, MouseEvent>) => void;
};

export const Card = ({ id, imagesrc, imageLoaded, showCardInfo }: CardProps) => {
	return (
		<div className="card">
			<img
				id={id}
				className="card-img"
				src={"https://ringsdb.com" + imagesrc}
				alt="A LOTR card"
				onClick={(e) => {
					showCardInfo(e);
				}}
				onLoad={imageLoaded}
			/>
		</div>
	);
};
