import hitsTpl from '../templates/cardMarkup.hbs';
import PictureApiService from './apiService';

const refs = {
  searchForm: document.querySelector('.search-form'),
  photoContainer: document.querySelector('.gallery'),
  loadMoreButton: document.querySelector('[data-action="load-more"]'),

};

const pictureApiService = new PictureApiService();


refs.searchForm.addEventListener('submit', onSearch);
refs.loadMoreButton.addEventListener('click', onLoadMore);

function onSearch(e) {
  e.preventDefault();
  

  clearHitsContainer();
  pictureApiService.query = e.currentTarget.elements.query.value;
  pictureApiService.resetPage();
  pictureApiService
    .fetchArticles()
    .then(appendHitsMarkup)
    .then(() => refs.loadMoreButton.classList.remove('disabled'));
}

function scroll() {
  window.scrollTo({
    top: window.pageYOffset + 484,
    behavior: 'smooth',
  });
}

function onLoadMore() {
  pictureApiService.fetchArticles().then(appendHitsMarkup).then(scroll);
}

function appendHitsMarkup(hits) {
  refs.photoContainer.insertAdjacentHTML('beforeend', hitsTpl(hits));
}

function clearHitsContainer() {
  refs.photoContainer.innerHTML = '';
}
