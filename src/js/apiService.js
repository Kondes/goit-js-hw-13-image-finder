const BASE_URL = 'https://pixabay.com/api/';
const API_KEY = '20779676-bb3afd876c234aa3fabccc9a8';

export default class PictureApiService {
  constructor() {
    this.searchQuery = '';
    this.page = 1;
  }
  fetchArticles() {
    const url = `${BASE_URL}?image_type=photo&q=${this.searchQuery}&page=${this.page}&per_page=12&orientation=horizontal&key=${API_KEY}`;
   
   return fetch(url)
      .then(r => r.json())
      .then(data => {
        this.incrementPage();
        return data.hits;
      });
  }
  incrementPage() {
    this.page += 1;
  }
  resetPage(){
      this.page=1
  }
  get query() {
    return this.searchQuery;
  }
  set query(newQuery) {
    this.searchQuery = newQuery;
  }
}
