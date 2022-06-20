export type MovieItem = {
  link: string;
  title: string;
  img?: string;
  torrents?: {
    name: string;
    link: string;
  }[];
};
