import { Article } from '../types/article';
import { Scale, Gavel } from 'lucide-react';

interface ArticleCardProps {
  article: Article;
}

export function ArticleCard({ article }: ArticleCardProps) {
  return (
    <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-xl transition-shadow border-l-4 border-blue-500">
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-3">
          <div className="bg-blue-100 p-2 rounded-lg">
            <Scale className="w-6 h-6 text-blue-600" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-sm font-semibold text-blue-600 bg-blue-50 px-2 py-1 rounded">
                {article.category}
              </span>
              <span className="text-xl font-bold text-gray-800">
                Статья {article.article_number}
              </span>
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mt-1">
              {article.title}
            </h3>
          </div>
        </div>
        {article.stars && (
          <div className="text-orange-500 text-xl font-bold">
            {article.stars}
          </div>
        )}
      </div>

      <div className="mt-4 space-y-2">
        <div className="text-gray-700 whitespace-pre-line text-sm leading-relaxed">
          {article.content}
        </div>
      </div>

      <div className="mt-4 pt-4 border-t border-gray-200 flex flex-wrap gap-3">
        {article.jurisdiction && (
          <div className="flex items-center gap-2">
            <Gavel className="w-4 h-4 text-gray-500" />
            <span className="text-sm text-gray-600">
              <span className="font-medium">Юрисдикция:</span> {article.jurisdiction}
            </span>
          </div>
        )}
        {article.punishment && (
          <div className="text-sm text-gray-600 flex-1">
            <span className="font-medium">Наказание:</span> {article.punishment}
          </div>
        )}
      </div>

      {article.chapter && (
        <div className="mt-3 text-xs text-gray-500">
          {article.section && <span>{article.section} → </span>}
          {article.chapter}
        </div>
      )}
    </div>
  );
}
