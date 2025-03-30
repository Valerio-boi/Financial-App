export interface News {
    id: number;
    imgUrl: string;
    title: string;
    content: string;
    date: string; // Usa string se arriva come ISO 8601, oppure Date se converti
  }