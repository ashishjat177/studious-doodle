# Studious Doodle

This repository contains a collection of React-based applications designed to demonstrate various functionalities and features. Below is an overview of the applications included in this repository:

## Applications

### 1. TypeAhead Component
The `TypeAhead` component is a search bar with autocomplete functionality. It allows users to type a query and fetches matching results from an API. Key features include:
- **Debounced Search**: Reduces the number of API calls by introducing a delay after the user stops typing.
- **Caching**: Implements a caching mechanism to store recent search results, improving performance and reducing redundant API calls.
- **Error Handling**: Displays appropriate messages for loading, success, and failure states.
- **API Integration**: Fetches data from `https://dummyjson.com/products/search`.

#### How to Use
1. Navigate to the `search-bar/src/components/TypeAhead.jsx` file.
2. Import and render the `TypeAhead` component in your application.
3. Start typing in the input field to see the search results.

#### Example
```jsx
import TypeAhead from './components/TypeAhead';

function App() {
    return (
        <div>
            <h1>Search Products</h1>
            <TypeAhead />
        </div>
    );
}

export default App;
```

## Getting Started

### Prerequisites
- Node.js (v14 or later)
- npm or yarn

### Installation
1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/studious-doodle.git
   ```
2. Navigate to the project directory:
   ```bash
   cd studious-doodle
   ```
3. Install dependencies:
   ```bash
   npm install
   ```
   or
   ```bash
   yarn install
   ```

### Running the Application
To start the development server:
```bash
npm start
```
or
```bash
yarn start
```
The application will be available at `http://localhost:3000`.

## Folder Structure
- `src/components`: Contains reusable React components like `TypeAhead`.
- `public`: Static assets and the HTML template.
- `README.md`: Documentation for the repository.

## Contributing
Contributions are welcome! Feel free to open issues or submit pull requests to improve the repository.

## License
This project is licensed under the MIT License. See the `LICENSE` file for details.