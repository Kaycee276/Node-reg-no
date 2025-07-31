# JambRegNO

JambRegNO is a clean and efficient Node.js application that extracts registration numbers from PDF files. The application provides a simple REST API for uploading PDFs and automatically extracting UNN registration numbers using pattern matching.

## Features

- **File Upload**: Users can upload PDF files through a dedicated API endpoint.
- **PDF Parsing**: The application reads the uploaded PDF files and extracts registration numbers using regular expressions.
- **Database Integration**: Extracted registration numbers are stored in a PostgreSQL database, ensuring that duplicates are not inserted.
- **Logging**: The application logs important events, such as file uploads and errors, to assist with debugging and monitoring.

## Technical Stack

- **Node.js**: The runtime environment for executing JavaScript on the server side.
- **Express.js**: A web application framework for building the API.
- **Multer**: Middleware for handling multipart/form-data, primarily used for file uploads.
- **pdf-parse**: A library for parsing PDF files and extracting text.
- **PostgreSQL**: A relational database management system used for storing registration numbers.

## Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd JambRegNO
   ```
2. Install the dependencies:
   ```bash
   npm install
   ```
3. Set up your PostgreSQL database and update the connection details in `index.js`.

## Usage

1. Start the server:
   ```bash
   npm start
   ```
   Or for development with auto-restart:
   ```bash
   npm run dev
   ```
2. Use a tool like Postman or cURL to send a POST request to the `/upload` endpoint with a PDF file.

## Contributing

Contributions are welcome! Please open an issue or submit a pull request for any enhancements or bug fixes.

## License

This project is licensed under the MIT License.

## Acknowledgments

- Thanks to the contributors and libraries that made this project possible.
