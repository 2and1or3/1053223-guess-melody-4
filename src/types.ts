enum GameType {
  ARTIST = `artist`,
  GENRE = `genre`,
}

interface GenreAnswer {
  genre: string;
  src: string;
}

interface ArtistAnswer {
  artist: string;
  pictureSrc: string;
}

interface GenreQuestion {
  type: GameType.GENRE;
  genre: string;
  answers: Array<GenreAnswer>;
}

interface ArtistQuestion {
  type: GameType.ARTIST;
  artist: string;
  trackSrc: string;
  answers: Array<ArtistAnswer>;
}

export { GenreAnswer, ArtistAnswer, GenreQuestion, ArtistQuestion, GameType };
