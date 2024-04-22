## Chess

Welcome to the Chess Repository! This platform allows users to sign up, create new matches, get connected to existing matches, and play real-time chess games.

## Installation

To get started, follow these steps:

1. Clone this repository to your local machine:
```bash
git clone https://github.com/code100x/chess.git
```

2. Navigate to the project directory:
```bash
cd chess
```

3. Install dependencies:
```bash
npm install
```

These commands install all the necessary dependencies required to run both the frontend and backend of the Chess Platform.

## Usage

Before running your code you need to add the required environment variables:
use the `.env.example`

- We have 3 places where you need to add your credentials

`apps/backend`
```bash
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
GITHUB_CLIENT_ID=your_github_client_id
GITHUB_CLIENT_SECRET=your_github_client_secret

ALLOWED_HOSTS="http://localhost:5173,https://example.com"

AUTH_REDIRECT_URL="http://localhost:5173/game/random"
```

`apps/frontend`
```bash
VITE_APP_WS_URL="ws://localhost:8080"
VITE_APP_BACKEND_URL="http://localhost:3000"
```

`packages/db`
```bash
DATABASE_URL="postgresql://postgres:mysecretpassword@localhost:5432/postgres"
```

For frontend:
```bash
cd apps/frontend/
npm run dev
```

For backend:
```bash
cd apps/backend/
npm run dev
```


After starting the servers, open your browser and go to [http://localhost:5173](http://localhost:5173) to access the Chess Platform.

## Architecture

![image](https://github.com/pantharshit007/chess/assets/97608579/e20f120c-be47-4ed2-9457-fe366174d4a0)


Scalable Architecture for the Future:
where user can be distributed across multiple servers and to broadcast matched we can use PUB-SUB 
![image](https://github.com/pantharshit007/chess/assets/97608579/f7377474-b32e-48f7-935b-fbb9c7ecc622)



## Tech Stack

The Chess Platform uses the following technologies:

- React for Frontend
- Node.js for Backend
- TypeScript as the language
- Separate WebSocket servers for handling real-time games
- Redis for storing all moves of a game in a queue

## Deployment

The Chess Platform is deployed and accessible at [chess.100xdevs.com](http://chess.100xdevs.com/).

## Contributing

Contributions are welcome! Please follow the contribution guidelines to contribute to this project.
