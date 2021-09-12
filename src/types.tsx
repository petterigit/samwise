export type DeckObject = {
	name: string;
	heroes: { id: number }[];
};

export type CardObject = {
	imagesrc: string;
};

export type CardInfoObject = {
	code: string;
	imagesrc: string;
	name: string;
	text: string;
	flavor: string;
	traits: string;
	threat: number;
	willpower: number;
	attack: number;
	defense: number;
	health: number;
	pack_name: string;
	url: string;
	illustrator: string;
};
