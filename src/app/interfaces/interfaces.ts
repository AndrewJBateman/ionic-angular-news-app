// format of response from IP location API
export interface LocationResponse {
  ip: string;
  city: string;
  region: string;
  region_code: string;
  country: string;
  country_name: string;
  continent_code: string;
  in_eu: boolean;
  postal: number;
  latitude: number;
  longitude: number;
  timezone: string;
  utc_offset: number;
  country_calling_code: number;
  currency: string;
  languages: string;
  asn: string;
  org: string;
}

// format of news API response arrays
export interface SourcesResponse {
  status: "ok";
  sources: Source[];
}

export interface Source {
  id: string;
  name: string;
  description: string;
  url: string;
  category: string;
  language: string;
  country: string;
}

export interface NewsApiResponse {
  status: string;
  totalResults: number;
  articles: Article[];
}

// format of each Article array in the API response
export interface Article {
  source: Source;
  author?: string;
  title: string;
  description: string;
  url: string;
  urlToImage: string;
  publishedAt: string;
  content?: string;
}
