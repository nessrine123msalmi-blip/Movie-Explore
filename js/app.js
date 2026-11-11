const FAVORITES_KEY = "movie-explorer-favorites";
const THEME_KEY = "movie-explorer-theme";

const movieGrid = document.querySelector("#movie-grid");
const searchInput = document.querySelector("#search-input");
const genreFilter = document.querySelector("#genre-filter");
const sortSelect = document.querySelector("#sort-select");
const favoritesFilter = document.querySelector("#favorites-filter");
const favoriteCount = document.querySelector("#favorite-count");
const resultsCount = document.querySelector("#results-count");
const emptyState = document.querySelector("#empty-state");
const emptyTitle = document.querySelector("#empty-title");
const emptyDescription = document.querySelector("#empty-description");
const movieDialog = document.querySelector("#movie-dialog");
const dialogContent = document.querySelector("#dialog-content");
const themeToggle = document.querySelector("#theme-toggle");
const resetFiltersButton = document.querySelector("#reset-filters");

let favoriteIds = readStoredList(FAVORITES_KEY);
let showingFavorites = false;

function readStoredList(key) {
	try {
		const storedValue = JSON.parse(localStorage.getItem(key) || "[]");
		return Array.isArray(storedValue) ? storedValue : [];
	} catch {
		return [];
	}
}

// Build the menu from local data so genre options stay in sync with the collection.
function populateGenres() {
	const genres = [...new Set(movies.flatMap((movie) => movie.genres))].sort();

	genres.forEach((genre) => {
		const option = document.createElement("option");
		option.value = genre;
		option.textContent = genre;
		genreFilter.append(option);
	});
}

function getVisibleMovies() {
	const searchTerm = searchInput.value.trim().toLocaleLowerCase();
	const selectedGenre = genreFilter.value;
	const sortOrder = sortSelect.value;

	return movies
		.filter((movie) => !showingFavorites || favoriteIds.includes(movie.id))
		.filter((movie) => movie.title.toLocaleLowerCase().includes(searchTerm))
		.filter((movie) => selectedGenre === "all" || movie.genres.includes(selectedGenre))
		.sort((firstMovie, secondMovie) => {
			const ratingDifference = firstMovie.rating - secondMovie.rating;
			return sortOrder === "rating-asc" ? ratingDifference : -ratingDifference;
		});
}

function createMovieCard(movie) {
	const isFavorite = favoriteIds.includes(movie.id);
	const card = document.createElement("article");
	card.className = "movie-card";
	card.innerHTML = `
		<div class="poster poster-${movie.art}" role="img" aria-label="Illustrated poster for ${movie.title}">
			<span class="poster-stamp" aria-hidden="true">ME<span> / </span>${movie.year}</span>
			<span class="poster-orbit" aria-hidden="true"></span>
			<span class="poster-title" aria-hidden="true">${movie.title}</span>
			<span class="poster-caption" aria-hidden="true">A FILM BY ${movie.director.toLocaleUpperCase()}</span>
			<button class="favorite-button${isFavorite ? " is-favorite" : ""}" type="button" data-favorite="${movie.id}" aria-label="${isFavorite ? "Remove" : "Add"} ${movie.title} ${isFavorite ? "from" : "to"} favorites" aria-pressed="${isFavorite}" title="${isFavorite ? "Remove from" : "Add to"} favorites">
				<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.7l-1.1-1.1a5.5 5.5 0 0 0-7.8 7.8l1.1 1.1L12 21l7.8-7.5 1.1-1.1a5.5 5.5 0 0 0-.1-7.8Z"/></svg>
			</button>
		</div>
		<button class="movie-info" type="button" data-details="${movie.id}" aria-label="View details for ${movie.title}">
			<span class="movie-title-row"><span class="movie-title">${movie.title}</span><span class="rating"><span aria-hidden="true">★</span> ${movie.rating.toFixed(1)}</span></span>
			<span class="movie-meta"><span>${movie.year}</span><span class="meta-dot" aria-hidden="true"></span><span>${movie.genres[0]}</span></span>
		</button>
	`;

	return card;
}

// Render the current search, genre, sort, and favorites combination.
function renderMovies() {
	const visibleMovies = getVisibleMovies();
	movieGrid.replaceChildren(...visibleMovies.map(createMovieCard));
	movieGrid.hidden = visibleMovies.length === 0;
	emptyState.hidden = visibleMovies.length !== 0;

	const noun = visibleMovies.length === 1 ? "film" : "films";
	resultsCount.textContent = showingFavorites
		? `${visibleMovies.length} favorite ${noun}`
		: `${visibleMovies.length} ${noun} to explore`;

	if (showingFavorites && favoriteIds.length === 0) {
		emptyTitle.textContent = "Your shelf is waiting";
		emptyDescription.textContent = "Tap the heart on any film to save it here.";
	} else {
		emptyTitle.textContent = "No films found";
		emptyDescription.textContent = "Try adjusting your search or filters.";
	}

	favoriteCount.textContent = String(favoriteIds.length);
	favoriteCount.setAttribute("aria-label", `${favoriteIds.length} ${favoriteIds.length === 1 ? "favorite" : "favorites"}`);
}

function toggleFavorite(movieId) {
	if (favoriteIds.includes(movieId)) {
		favoriteIds = favoriteIds.filter((favoriteId) => favoriteId !== movieId);
	} else {
		favoriteIds = [...favoriteIds, movieId];
	}

	try {
		localStorage.setItem(FAVORITES_KEY, JSON.stringify(favoriteIds));
	} catch {
		// Keep favorites usable for this visit if browser storage is unavailable.
	}

	renderMovies();
}

function openMovieDetails(movieId) {
	const movie = movies.find((item) => item.id === movieId);
	if (!movie) return;

	const isFavorite = favoriteIds.includes(movie.id);
	dialogContent.innerHTML = `
		<div class="dialog-poster poster poster-${movie.art}" role="img" aria-label="Illustrated poster for ${movie.title}">
			<span class="poster-stamp" aria-hidden="true">ME<span> / </span>${movie.year}</span>
			<span class="poster-orbit" aria-hidden="true"></span>
			<span class="poster-title" aria-hidden="true">${movie.title}</span>
			<span class="poster-caption" aria-hidden="true">A FILM BY ${movie.director.toLocaleUpperCase()}</span>
		</div>
		<div class="dialog-copy">
			<p class="eyebrow section-eyebrow">${movie.year} <span aria-hidden="true">/</span> ${movie.duration}</p>
			<h2 id="dialog-title">${movie.title}</h2>
			<div class="dialog-tags">${movie.genres.map((genre) => `<span>${genre}</span>`).join("")}</div>
			<p class="dialog-description">${movie.description}</p>
			<dl class="movie-credits">
				<div><dt>Director</dt><dd>${movie.director}</dd></div>
				<div><dt>Rating</dt><dd><span class="rating-star" aria-hidden="true">★</span> ${movie.rating.toFixed(1)} <span class="rating-out-of">/ 10</span></dd></div>
			</dl>
			<button class="dialog-favorite${isFavorite ? " is-favorite" : ""}" type="button" data-favorite="${movie.id}" aria-pressed="${isFavorite}">
				<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.7l-1.1-1.1a5.5 5.5 0 0 0-7.8 7.8l1.1 1.1L12 21l7.8-7.5 1.1-1.1a5.5 5.5 0 0 0-.1-7.8Z"/></svg>
				${isFavorite ? "Saved to favorites" : "Add to favorites"}
			</button>
		</div>
	`;

	movieDialog.showModal();
}

function setTheme(theme) {
	document.documentElement.dataset.theme = theme;
	themeToggle.setAttribute("aria-label", `Switch to ${theme === "dark" ? "light" : "dark"} theme`);

	try {
		localStorage.setItem(THEME_KEY, theme);
	} catch {
		// The chosen theme remains active for this page if storage is unavailable.
	}
}

function initializeTheme() {
	let savedTheme;
	try {
		savedTheme = localStorage.getItem(THEME_KEY);
	} catch {
		savedTheme = null;
	}

	setTheme(savedTheme === "dark" ? "dark" : "light");
}

document.querySelector("#filters").addEventListener("submit", (event) => event.preventDefault());
document.querySelector("#filters").addEventListener("input", renderMovies);
document.querySelector("#filters").addEventListener("change", renderMovies);

movieGrid.addEventListener("click", (event) => {
	const favoriteButton = event.target.closest("[data-favorite]");
	if (favoriteButton) {
		toggleFavorite(favoriteButton.dataset.favorite);
		return;
	}

	const detailsButton = event.target.closest("[data-details]");
	if (detailsButton) openMovieDetails(detailsButton.dataset.details);
});

dialogContent.addEventListener("click", (event) => {
	const favoriteButton = event.target.closest("[data-favorite]");
	if (favoriteButton) {
		const movieId = favoriteButton.dataset.favorite;
		toggleFavorite(movieId);
		openMovieDetails(movieId);
	}
});

favoritesFilter.addEventListener("click", () => {
	showingFavorites = !showingFavorites;
	favoritesFilter.setAttribute("aria-pressed", String(showingFavorites));
	renderMovies();
});

themeToggle.addEventListener("click", () => {
	setTheme(document.documentElement.dataset.theme === "dark" ? "light" : "dark");
});

resetFiltersButton.addEventListener("click", () => {
	searchInput.value = "";
	genreFilter.value = "all";
	sortSelect.value = "rating-desc";
	if (showingFavorites && favoriteIds.length === 0) {
		showingFavorites = false;
		favoritesFilter.setAttribute("aria-pressed", "false");
	}
	renderMovies();
	searchInput.focus();
});

document.querySelector("#dialog-close").addEventListener("click", () => movieDialog.close());
movieDialog.addEventListener("click", (event) => {
	if (event.target === movieDialog) movieDialog.close();
});

populateGenres();
initializeTheme();
document.querySelector("#footer-film-count").textContent = `${movies.length} films in the collection`;
renderMovies();
