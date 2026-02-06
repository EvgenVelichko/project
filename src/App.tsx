import { useState, useEffect } from 'react';
import { supabase } from './lib/supabase';
import { Article, Category } from './types/article';
import { SearchBar } from './components/SearchBar';
import { CategoryFilter } from './components/CategoryFilter';
import { ArticleCard } from './components/ArticleCard';
import { BookOpen, Loader2 } from 'lucide-react';

function App() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [filteredArticles, setFilteredArticles] = useState<Article[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<Category | 'Все'>('Все');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchArticles();
  }, []);

  useEffect(() => {
    filterArticles();
  }, [articles, searchQuery, selectedCategory]);

  const fetchArticles = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('articles')
        .select('*')
        .order('article_number', { ascending: true });

      if (error) throw error;
      setArticles(data || []);
    } catch (error) {
      console.error('Error fetching articles:', error);
    } finally {
      setLoading(false);
    }
  };

  const filterArticles = () => {
    let filtered = [...articles];

    if (selectedCategory !== 'Все') {
      filtered = filtered.filter((article) => article.category === selectedCategory);
    }

    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (article) =>
          article.article_number.toLowerCase().includes(query) ||
          article.title.toLowerCase().includes(query) ||
          article.content.toLowerCase().includes(query) ||
          article.punishment?.toLowerCase().includes(query) ||
          article.chapter?.toLowerCase().includes(query)
      );
    }

    setFilteredArticles(filtered);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <header className="bg-white shadow-md border-b-4 border-blue-600">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex items-center justify-center gap-3">
            <BookOpen className="w-10 h-10 text-blue-600" />
            <h1 className="text-3xl font-bold text-gray-900">
              Памятка Маджестик РП
            </h1>
          </div>
          <p className="text-center text-gray-600 mt-2">
            База знаний законов штата Сан-Андреас <br />
            by Evgeniy Brewer; Morgan Blackwood
          </p>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8">
        <div className="space-y-6 mb-8">
          <SearchBar value={searchQuery} onChange={setSearchQuery} />
          <CategoryFilter
            selectedCategory={selectedCategory}
            onCategoryChange={setSelectedCategory}
          />
        </div>

        {loading ? (
          <div className="flex items-center justify-center py-20">
            <Loader2 className="w-12 h-12 text-blue-600 animate-spin" />
          </div>
        ) : (
          <>
            <div className="mb-6 text-center">
              <p className="text-gray-600">
                Найдено статей: <span className="font-bold text-gray-900">{filteredArticles.length}</span>
              </p>
            </div>

            {filteredArticles.length === 0 ? (
              <div className="text-center py-20">
                <p className="text-xl text-gray-600">
                  Статьи не найдены. Попробуйте изменить параметры поиска.
                </p>
              </div>
            ) : (
              <div className="grid gap-6">
                {filteredArticles.map((article) => (
                  <ArticleCard key={article.id} article={article} />
                ))}
              </div>
            )}
          </>
        )}
      </main>

   
    </div>
  );
}

export default App;
