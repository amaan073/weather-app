# Weather App

A modern, responsive weather application built with React that provides real-time weather information for any location worldwide.

## Tech Stack

**Frontend:**

- React
- Vite
- CSS3
- JavaScript (ES6+)

**APIs:**

- [Weather API - OpenWeatherMap](https://openweathermap.org)

## Features

- Real-time weather data display
- Location-based weather search
- Current temperature and weather conditions
- Additional weather metrics (humidity, wind speed, etc.)
- Responsive design for all devices
- Clean and intuitive user interface

## Installation & Setup

```bash
# Clone the repository
git clone https://github.com/amaan073/weather-app.git

# Navigate to project directory
cd weather-app

# Install dependencies
npm install

# Create .env file and add your API key
# VITE_WEATHER_API_KEY=your_api_key_here

# Run development server
npm run dev
```

## Environment Variables

Create a `.env` file in the root directory and add your weather API key:

```
VITE_OPENWEATHER_API_KEY=your_weather_api_key
```

## Development Notes

This project was built as part of my learning journey with React and external API integration. At the time of development, many architectural and implementation decisions were made based on my understanding and experience at that stage. That means there are many unoptimized or bad syntax code which is normal since its my first time builidng a react app.

As I continued learning, I became aware of more professional patterns and best practices (such as improved state management strategies, error handling patterns, component composition, and API optimization techniques). However, refactoring the entire codebase to fully adopt these newer approaches would require significant time and restructuring, which was outside the scope of this project.

The primary goal of this project was to gain hands-on experience working with external APIs, managing asynchronous data fetching, handling component state, and building a responsive user interface, rather than achieving perfect or enterprise-level architecture. The code reflects practical learning, iteration, and real-world problem-solving at a beginner-to-intermediate level.

This repository is intended to demonstrate growth, understanding of core concepts, and the ability to ship a functional product, rather than serving as a polished production-grade reference.

## Available Scripts

In the project directory, you can run:

### `npm run dev`

Runs the app in development mode with hot module replacement (HMR). Open the local server URL shown in your terminal to view it in the browser.

### `npm run build`

Builds the app for production to the `dist` folder. It correctly bundles React in production mode and optimizes the build for best performance.

### `npm run preview`

Previews the production build locally.

## License

This project is licensed under the MIT License – see the LICENSE file for details.

**Note:** This is a React conversion of the original vanilla JavaScript weather app by [codewithsadee](https://www.youtube.com/watch?v=QMwyNnjAils). Both the original work and this derivative work are licensed under the MIT License.

## Design Note

This project features a clean, modern UI design with a focus on usability and visual appeal.

## Attributions

### APIs

- Weather data provided by OpenWeatherMap API

### Design & UI

- UI Design: Inspired by **codewithsadee** - [Weather App Tutorial](https://www.youtube.com/watch?v=QMwyNnjAils)
- Original design credit is included in the application footer

### Tutorials & Learning Resources

- **codewithsadee** on YouTube - Weather App tutorial for UI/UX inspiration and design patterns

## Note

All code snippets have been adapted, modified, and integrated into this project. The original sources are acknowledged for educational and attribution purposes.


## Contact

For any questions or feedback, feel free to reach out or open an issue in this repository.
