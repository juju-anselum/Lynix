# Lynix

**Lynix** is an AI-powered web application that allows users to instantly summarize lengthy articles by simply entering the URL. This tool leverages the power of GPT-4 to condense content into concise, easy-to-read summaries, enhancing your reading experience by saving time and effort.

## Features

- **URL-based Summarization**: Enter a URL to get a quick summary of the article's content.
- **Sync across Devices**: Sync your summaries across multiple devices.
- **Real-Time Updates**: Instant updates as you type, ensuring smooth and dynamic user interaction.
- **Customizable Summaries**: Create and delete summaries.
- **Responsive Design**: User-friendly interface, accessible on both desktop and mobile devices.

## Installation

This project is built using **Vite** and **React**. Follow the steps below to set up the project on your local machine.

### Prerequisites

Make sure you have the following installed on your system:

- [Node.js](https://nodejs.org/) (v14 or higher)
- [npm](https://www.npmjs.com/) (v6 or higher) or [Yarn](https://yarnpkg.com/) (v1.22 or higher)

### Getting Started

1. **Clone the Repository**

   ```bash
   git clone https://github.com/juju-anselum/Lynix.git
   cd lynix
   ```

2. **Install Dependencies**

   If you are using npm:

   ```bash
   npm install
   ```

   Or if you are using Yarn:

   ```bash
   yarn install
   ```

3. **Update the Environment Variables**

   Rename the `.env.example` file to `.env`
   
   Get your rapidApi key from [Article Extractor and Summarizer](https://rapidapi.com/restyler/api/article-extractor-and-summarizer/playground/apiendpoint_99e4b95c-3adc-4532-8b4e-20795c3c996a)

   Create a new firebase project and get your Firebase API key.

   Update all the environment variables by your key.

4. **Run the Development Server**

   Start the Vite development server to run the app locally:

   Using npm:

   ```bash
   npm run dev
   ```

   Using Yarn:

   ```bash
   yarn dev
   ```

   After running the above command, the application should be available at `http://localhost:5173` or the port specified in the terminal.

### Building for Production

To build the project for production, use the following command:

Using npm:

```bash
npm run build
```

Using Yarn:

```bash
yarn build
```

The optimized production files will be generated in the `dist` folder.

### Preview the Production Build

To preview the production build locally, use the following command:

Using npm:

```bash
npm run serve
```

Using Yarn:

```bash
yarn serve
```

This will serve the content from the `dist` folder on a local server, allowing you to test the production build.

## Project Structure

Here's a quick overview of the project's structure:

```
Lynix/
│
├── src/                # Source code
│   ├── assets/         # Images, icons, etc.
│   ├── components/     # Reusable components
│   ├── containers/     # Containers for webpage
│   ├── services/       # Services for API and Firebase
│   ├── App.jsx         # Root component
│   └── main.jsx        # Entry point
│  
├── .gitignore          # Files to be ignored by Git
├── index.html          # Main HTML template
├── package.json        # Project dependencies and scripts
├── README.md           # Project documentation
└── tailwind.config.js  # Tailwind configuration
└── vite.config.js      # Vite configuration
```

## Contributing

Contributions are welcome! If you have any ideas or suggestions to improve the project, feel free to open an issue or submit a pull request.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
