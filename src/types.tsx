export type DeckObject = {
    name: string,
    heroes: {id: number}[],
    slots: {id: number}[]
  }

export type CardObject = {
    imagesrc: string
}