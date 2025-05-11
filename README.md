# 🎥 Cineflix

Cineflix is a web application for searching, exploring, and managing movies. It allows users to search for films, view details, add favorites and rate them.

## Features

- **Movie search**: Search for movies using the OMDB API
- **Movie details**: View detailed information about movies
- **Favourites**: Add movies to favorites and manage them
- **Ratings**: Rate movies from 1 to 5 stars
- **Responsive interface**: Optimized design for mobile and desktop devices

## 🛠️ Tech Stack

- **Frontend**: Next.js 15, React, TypeScript
- **Styling**: Tailwind CSS, shadcn/ui
- **API**: OMDb API

## 🚀 Installation

### 1. Clone the repo

```bash
git clone https://github.com/SamueleFranzese02/cineflix.git
cd cineflix
```

### 2. Install the dependencies

```bash
npm install
# or
yarn install
```

### 3. Set env variable

Create `.env.local` file in the root directory with the following variable:

```
# OMDB API
NEXT_PUBLIC_OMDB_API_KEY=your_omdb_api_key
```

### 4. Run dev server

```bash
npm run dev
# or
yarn dev
```

The application will be available at [http://localhost:3000](http://localhost:3000).

## 🔑 Configuration API

### OMDb API

1. Visit [OMDb API](https://www.omdbapi.com/apikey.aspx) to get the free API key
2. Insert the key into the `.env.local` file as `NEXT_PUBLIC_OMDB_API_KEY`

## 📄 License
This project is licensed under the MIT License.
