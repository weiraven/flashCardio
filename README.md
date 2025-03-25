
# 📚 flashCardio

flashCardio is a responsive, interactive, and beautifully designed flashcard web application built using React and Vite, designed specifically for practicing vocabulary and concepts.

## 🚀 Features

- **Dynamic Flashcards**: Engage with interactive flashcards that flip smoothly, showing words/concepts and their pairings.
- **Unsplash Integration**: Background images automatically fetched from Unsplash to visually represent each term.
- **Vocabulary Categories**: Cards organized under clear categories (currently featuring "Vocabulario español").
- **Interactive Quiz**: Submit your guess, get immediate feedback, and track your current and best streaks.
- **Shuffle & Navigation**: Easily shuffle cards, move forward and backward, or reset your session.
- **Responsive Design**: Looks great on any device, ensuring a smooth learning experience wherever you are.

## 🖥️ Tech Stack

- **Frontend**: React, Vite
- **CSS**: Custom CSS for responsive and interactive animations
- **API**: Unsplash API for dynamic image retrieval

## 📸 Image Attribution

All images fetched dynamically via [Unsplash](https://unsplash.com). Each displayed image includes proper attribution linking to the photographer’s Unsplash profile.

## 🛠️ Installation & Usage

### Clone Repository

```bash
git clone https://github.com/weiraven/flashCardio.git
cd flashcardio
```

### Install Dependencies

```bash
npm install
```

### Setup Unsplash API Key

Create a `.env` file in your root directory with:

```env
VITE_UNSPLASH_ACCESS_KEY=your_unsplash_access_key_here
```

(Get your key from [Unsplash Developers](https://unsplash.com/developers))

### Run Development Server

```bash
npm run dev
```

Open your browser at `http://localhost:5173`.

### Build for Production

```bash
npm run build
```

## 📁 Project Structure

```
flashcardio/
├── public/
│   ├── images/
│   |   └── flashCardio_icon.png
├── src/
│   ├── components/
│   │   └── Flashcard.jsx
│   ├── App.jsx
│   ├── App.css
│   ├── flashcarddata.json
│   └── main.jsx
├── .env-sample
├── .gitignore
├── index.html
├── package.json
└── README.md
```

## Video Walkthrough

Here's a walkthrough flashCardio:

<img src='https://github.com/weiraven/flashCardio/blob/main/public/images/flashCardio-demo.gif' title='Video Walkthrough' width='800' alt='Video Walkthrough' />

GIF created with [ScreenToGif](https://www.screentogif.com/) for Windows

## 🤝 Contributing

Contributions, suggestions, and improvements are always welcome! Please open an issue or submit a pull request.

## License

    Copyright [2025] [Raven Wei]

    Licensed under the Apache License, Version 2.0 (the "License");
    you may not use this file except in compliance with the License.
    You may obtain a copy of the License at

        http://www.apache.org/licenses/LICENSE-2.0

    Unless required by applicable law or agreed to in writing, software
    distributed under the License is distributed on an "AS IS" BASIS,
    WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
    See the License for the specific language governing permissions and
    limitations under the License.
