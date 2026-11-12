# Movie Explorer

Movie Explorer is a small, responsive movie discovery website. Browse a curated collection of sample films, find titles using search and filters, save favorites, and view additional movie information in a details dialog.

## Project Overview and Objectives

The project is a beginner-friendly example of a front-end application built with standard HTML, CSS, and JavaScript. It aims to make exploring a sample movie collection simple while demonstrating reusable movie cards, combined browsing controls, persistent browser preferences, and responsive layouts.

## Features

- **Movie collection and cards:** Displays 12 sample films. Each card includes illustrated poster artwork generated with CSS, the title, year, first listed genre, and rating.
- **Search by title:** Find films by entering all or part of a title.
- **Filter by genre:** Choose a genre from options generated from the movie data, or show all genres.
- **Sort by rating:** Show the highest-rated or lowest-rated films first. Search, genre filtering, sorting, and favorites can be combined.
- **Favorites management:** Add or remove films using the heart control on a card or in the details dialog. A Favorites control filters the collection to saved films and displays the saved count.
- **LocalStorage persistence:** Favorites and the selected theme are saved in the browser so they can be restored on a later visit.
- **Light and dark themes:** Switch themes using the control in the header.
- **Movie details dialog:** Open a film's details from its card to see its poster, year, duration, genres, description, director, and rating. Close the dialog using its close button, by clicking outside it, or with the browser's standard dialog keyboard behavior.
- **Responsive layout:** The collection and controls adapt to desktop, tablet, and mobile screen sizes.
- **Empty-state controls:** When no films match, use **Clear filters** to reset the search, genre, and sort controls.

## Technologies

- HTML5 for page structure and semantic controls.
- CSS3 for styling, responsive layouts, themes, animations, and generated poster artwork.
- Vanilla JavaScript for rendering the collection and implementing search, filters, sorting, favorites, theme switching, and movie details.
- Browser LocalStorage for favorite IDs and the selected theme.

No framework, package manager, build step, or external service is required.

## Project Structure

```text
movie-explorer/
├── index.html       # Application page and controls
├── README.md        # Project documentation
├── spec.md          # Project requirements and objectives
├── css/
│   └── styles.css   # Layout, themes, responsive rules, and poster artwork
└── js/
    ├── app.js       # Rendering and application interactions
    └── data.js      # Local sample movie collection
```

## Run Locally with VS Code Live Server

1. Open the project folder in Visual Studio Code.
2. Install the **Live Server** extension if it is not already installed.
3. In the VS Code Explorer, right-click `index.html` and select **Open with Live Server**.
4. The application opens in your browser. Live Server refreshes the page when you save project files.

There are no dependencies to install and no build command to run.

## How to Use the Application

1. Browse the movie cards in the collection.
2. Type a title or part of a title into the search field to narrow the results.
3. Select a genre to filter the collection, or leave **All genres** selected.
4. Choose **Top rated** or **Lowest rated** to change the rating order.
5. Select the heart on a movie card or in its details dialog to add or remove it from favorites.
6. Select **Favorites** to show only saved films. Select it again to return to the full collection.
7. Select a movie card's title or information area to open its details. Close the dialog with its close button or by clicking outside it.
8. Use the header control to switch between light and dark themes.
9. If your search or filters return no results, select **Clear filters** to reset them.

Favorites and the theme are stored in the current browser's LocalStorage. Clearing browser site data removes those saved preferences.

## Limitations

- Movie information is a small, static sample collection defined in `js/data.js`; it is not fetched or updated from an external source.
- The application has no backend, user accounts, or cross-device synchronization.
- Favorites and theme preferences are local to the browser and device where they were saved.
- Poster artwork is created with CSS and is not sourced from official movie posters.
- The collection cannot be edited through the application interface.

## Future Improvements

Possible future enhancements include:

- Allowing users to add or edit movie entries through the interface.
- Expanding the collection or loading movie data from an optional API.
- Adding more sorting options, such as title or release year.
- Adding tests for search, filters, sorting, favorites, and dialog behavior.
- Providing a way to export or import a user's favorites.
