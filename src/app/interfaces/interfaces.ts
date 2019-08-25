// format of an API response array
export interface SourcesResponse {
	status: 'ok';
	sources: [
		{
			id: string,
			name: string,
			description, string,
			url: string,
			category: string,
			language: string,
			country: string
		}
	]
}

export interface NewsApiResponse {
	articles: Article[];
  status: string;
  totalResults: number;
}

// format of each Article array in the API response
export interface Article {
	author?: string;
	content?: string;
	description: string;
	publishedAt: string;
  source: Source;
  title: string;
  url: string;
  urlToImage: string;
}

// format of the article array news source
export interface Source {
  id?: string;
  name: string;
}
