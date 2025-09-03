# GitHub Todo List 📝

A simple, elegant todo list application inspired by GitHub's design system. Built with vanilla HTML, CSS, and JavaScript for maximum compatibility and performance.

![GitHub Todo List Screenshot](https://img.shields.io/badge/Built%20with-Vanilla%20JS-yellow)
![License](https://img.shields.io/badge/License-MIT-green)
![Responsive](https://img.shields.io/badge/Responsive-Yes-blue)

## ✨ Features

- **GitHub-inspired Design**: Clean, modern interface following GitHub's design patterns
- **Dark/Light Theme**: Automatic system theme detection with manual toggle
- **Full CRUD Operations**: Create, read, update, and delete todos
- **Smart Filtering**: View all, active, or completed todos
- **Inline Editing**: Edit todos directly in the list
- **Persistent Storage**: Todos are saved in your browser's local storage
- **Responsive Design**: Works perfectly on desktop, tablet, and mobile
- **Keyboard Shortcuts**: Use `Ctrl/Cmd + N` to quickly add new todos
- **Accessibility**: Full keyboard navigation and screen reader support
- **Real-time Stats**: Track your progress with live counters

## 🚀 Quick Start

### Option 1: Direct Use
1. Clone or download this repository
2. Open `index.html` in your web browser
3. Start managing your todos!

### Option 2: Local Development Server
```bash
# Install dependencies (optional)
npm install

# Start development server
npm run dev
# or
npm start
```

## 🎯 Usage

### Adding Todos
- Type your task in the input field
- Click "Add Todo" or press `Enter`
- Your new todo appears at the top of the list

### Managing Todos
- **Complete**: Click the checkbox to mark as done
- **Edit**: Click "Edit" button or hover and click edit icon
- **Delete**: Click "Delete" button to remove permanently
- **Filter**: Use "All", "Active", or "Completed" tabs to filter your view

### Keyboard Shortcuts
- `Ctrl/Cmd + N`: Focus the new todo input
- `Enter`: Save when editing a todo
- `Escape`: Cancel editing mode

### Theme Toggle
- Click the sun/moon icon in the top right to toggle themes
- The app automatically detects your system's theme preference
- Your theme choice is remembered between sessions

## 🏗️ Project Structure

```
github-todo-list/
├── index.html          # Main HTML structure
├── styles.css          # GitHub-inspired styling
├── script.js           # Application logic
├── package.json        # Project configuration
└── README.md          # This file
```

## 🎨 Design System

This app follows GitHub's design principles:

- **Colors**: Uses GitHub's official color palette for both light and dark themes
- **Typography**: System fonts with GitHub's font stack
- **Components**: Buttons, inputs, and layouts that match GitHub's interface
- **Icons**: Simple, consistent iconography
- **Spacing**: GitHub's spacing scale for consistent layouts

## 💾 Data Storage

Todos are stored locally in your browser using `localStorage`. This means:
- ✅ Your todos persist between browser sessions
- ✅ No server or account required
- ✅ Complete privacy - data never leaves your device
- ⚠️ Clearing browser data will remove your todos
- ⚠️ Todos are not synced between different browsers/devices

## 🌐 Browser Support

Works in all modern browsers:
- Chrome 60+
- Firefox 60+
- Safari 12+
- Edge 79+

## 🛠️ Customization

### Adding New Themes
Edit the CSS custom properties in `styles.css`:
```css
:root {
  --color-canvas-default: #your-color;
  --color-accent-fg: #your-accent;
  /* ... other variables */
}
```

### Extending Functionality
The `TodoApp` class provides a clean API:
```javascript
// Access the app instance
const app = window.todoApp;

// Get all todos
const todos = app.getAllTodos();

// Clear completed todos
app.clearCompleted();

// Mark all as complete
app.markAllComplete();
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature-name`
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📝 License

This project is licensed under the MIT License - see below for details:

```
MIT License

Copyright (c) 2024 GitHub Todo List

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
```

## 🎉 Acknowledgments

- Inspired by [GitHub](https://github.com)'s excellent design system
- Built with modern web standards
- Icons adapted from GitHub's Octicons

---

**Happy todo listing! 🚀**