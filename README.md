[![Deploy](https://github.com/enemy-sh/enemy-sh-contact-api/actions/workflows/deploy.yml/badge.svg)](https://github.com/enemy-sh/enemy-sh-contact-api/actions/workflows/deploy.yml)

# Enemy.sh Contact API

This is a simple Express.js server that handles contact form submissions with rate limiting and token-based authentication. It interacts with an external API to store contact data.

## Features

- **Rate Limiting**: Limits submissions to 5 requests per hour per IP.
- **JWT Authentication**: Ensures secure access to the API.
- **CORS Support**: Configurable for allowed origins.
- **Environment Configuration**: Uses `.env` for sensitive data.

## Installation

1. Clone the repository.
   ```bash
   git clone https://github.com/enemy-sh/enemy-sh-contact-api.git
   ```
2. Navigate to the project directory:
   ```bash
   cd enemy-sh-contact-api
   ```
3. Install dependencies:
   ```bash
   npm install
   ```
4. Create a `.env` file in the root directory with the following variables:
   ```env
   URI=<external-api-uri>
   PORT=<server-port>
   API_KEY=<api-key>
   ORIGIN=<allowed-origin>
   JWT_SECRET=<jwt-secret>
   ```

## Usage

1. Start the server:
   ```bash
   npm start
   ```
2. The server listens on the port specified in the `.env` file or defaults to `4888`.

## Endpoints

### POST `/api/contact/`
Submit a contact form.

#### Headers
- `Authorization`: Bearer token (`JWT`).

#### Request Body
```json
{
  "name": "Your Name",
  "email": "your.email@example.com",
  "message": "Your message"
}
```

#### Response
- **200 OK**: Submission successful.
- **429 Too Many Requests**: Rate limit exceeded.
- **401 Unauthorized**: Invalid token.
- **403 Forbidden**: Origin not allowed or missing token.
- **500 Internal Server Error**: Server issue.

## Rate Limiting

Each IP is limited to 5 submissions per hour.

## Development

To modify the server, update the `main.js` file and restart the server.

