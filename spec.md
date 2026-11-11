# Movie Explorer Specification

## 1. Project Overview

Movie Explorer is a responsive movie discovery web application. Users can browse a local collection of movies, search and filter the collection, sort results by rating, save favorites, switch themes, and view movie information in a modal window.

## 2. Project Objectives

- Make it easy to discover movies from a sample collection.
- Provide clear, reusable movie cards and straightforward controls.
- Keep favorites available between visits by saving them in the browser.
- Support comfortable browsing on desktop, tablet, and mobile screens.
- Use simple, well-organized code that is approachable for beginner developers.

## 3. Functional Requirements

1. **Movie listing:** Display movies as reusable cards. Each card should show useful summary information, such as the movie title, poster, genre, and rating.
2. **Search:** Let users find movies by entering part or all of a title. The displayed results should update to match the search.
3. **Genre filter:** Let users filter the movie list by genre, with an option to show all genres.
4. **Rating sort:** Let users sort the displayed movies by rating, in ascending or descending order.
5. **Favorites:** Let users add movies to favorites and remove them from favorites.
6. **Persistent favorites:** Save and load the favorites list using browser LocalStorage so it is retained between visits.
7. **Theme switch:** Let users switch between light and dark themes. The theme should be applied consistently across the application.
8. **Movie details:** Let users open a movie details modal from a movie card and close it using a clear close control. The modal should present additional information about the selected movie.
9. **Combined controls:** Search, genre filtering, and rating sorting should work together on the movie list.
10. **Local movie data:** Provide sample movie records in JavaScript. No movie API or server is required.

## 4. Non-Functional Requirements

- **Responsive:** The layout and controls should work at desktop, tablet, and mobile viewport sizes.
- **Accessible:** Use semantic HTML, labels for form controls, visible keyboard focus, and keyboard-operable controls. The modal should be usable with a keyboard and have an accessible name.
- **Usable:** Keep movie information and the search, filter, sort, favorites, theme, and modal controls clear and easy to use.
- **Maintainable:** Separate HTML, CSS, and JavaScript into appropriately named files and organize code by purpose.
- **Beginner-friendly:** Prefer clear names, small functions, consistent formatting, and concise comments where they help explain non-obvious behavior.
- **Privacy-conscious:** Store only the information needed for favorites and theme preferences in LocalStorage; do not send user data to a server.
- **Compatible:** Use standard HTML5, CSS3, and browser JavaScript without frameworks or build tools.

## 5. Technologies

- HTML5 for page structure and semantic content.
- CSS3 for styling, themes, and responsive layouts.
- Vanilla JavaScript for rendering movies and implementing interactions.
- LocalStorage for persisting favorites (and, optionally, the selected theme).
- Local sample movie data defined in JavaScript.

No React, Vue, other frameworks, external movie API, or backend service is required.

## 6. Expected Project Folder Structure

```text
movie-explorer/
├── index.html
├── spec.md
├── css/
│   └── styles.css
├── js/
│   ├── data.js
│   └── app.js
└── assets/
    └── posters/
```

`data.js` will contain the sample movie collection. `app.js` will handle rendering and interactions. `styles.css` will contain the application styles, including responsive rules and light and dark themes. The `assets/posters/` folder is reserved for local movie poster images if they are used.
