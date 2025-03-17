interface Book {
  id: number;
  name: string;
  description: string | null;
  price: number;
  isbn: string | null;
  issn: string | null;
  category: string;
  publisher: string;
  author: string;
  year: number;
}

export type {Book};
