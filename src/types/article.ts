export interface Article {
  id: string;
  category: string;
  article_number: string;
  title: string;
  content: string;
  jurisdiction: string | null;
  stars: string | null;
  punishment: string | null;
  chapter: string | null;
  section: string | null;
  created_at: string;
  updated_at: string;
}

export type Category = 'УК' | 'ДК' | 'Душка адвокатов' | 'Процессуальные' | '10-Коды' | 'Порядок Задержания';
