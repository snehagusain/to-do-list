// GitHub Todo List App - JavaScript Implementation
class TodoApp {
  constructor() {
    this.todos = this.loadTodos();
    this.currentFilter = 'all';
    this.editingTodoId = null;
    
    // DOM elements
    this.todoInput = document.getElementById('todoInput');
    this.addTodoBtn = document.getElementById('addTodoBtn');
    this.todoList = document.getElementById('todoList');
    this.emptyState = document.getElementById('emptyState');
    this.themeToggle = document.getElementById('themeToggle');
    this.filterTabs = document.querySelectorAll('.filter-tab');
    
    // Stats elements
    this.totalCount = document.getElementById('totalCount');
    this.activeCount = document.getElementById('activeCount');
    this.completedCount = document.getElementById('completedCount');
    
    this.init();
  }
  
  init() {
    this.setupEventListeners();
    this.setupTheme();
    this.render();
    this.updateStats();
  }
  
  setupEventListeners() {
    // Add todo
    this.addTodoBtn.addEventListener('click', () => this.addTodo());
    this.todoInput.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') {
        this.addTodo();
      }
    });
    
    // Theme toggle
    this.themeToggle.addEventListener('click', () => this.toggleTheme());
    
    // Filter tabs
    this.filterTabs.forEach(tab => {
      tab.addEventListener('click', (e) => {
        const filter = e.currentTarget.dataset.filter;
        this.setFilter(filter);
      });
    });
    
    // Todo list event delegation
    this.todoList.addEventListener('click', (e) => this.handleTodoClick(e));
    this.todoList.addEventListener('keypress', (e) => this.handleTodoKeypress(e));
  }
  
  setupTheme() {
    // Load saved theme or use default dark theme
    const savedTheme = localStorage.getItem('github-todo-theme');
    const initialTheme = savedTheme || 'dark'; // Default to dark theme
    
    this.setTheme(initialTheme);
    
    // Listen for system theme changes (only if no user preference is saved)
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
      if (!localStorage.getItem('github-todo-theme')) {
        this.setTheme(e.matches ? 'dark' : 'light');
      }
    });
  }
  
  toggleTheme() {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';
    this.setTheme(newTheme);
    localStorage.setItem('github-todo-theme', newTheme);
  }
  
  setTheme(theme) {
    if (theme === 'dark') {
      // Remove attribute to use default dark theme
      document.documentElement.removeAttribute('data-theme');
    } else {
      // Set light theme
      document.documentElement.setAttribute('data-theme', 'light');
    }
  }
  
  generateId() {
    return 'todo_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
  }
  
  addTodo() {
    const text = this.todoInput.value.trim();
    if (!text) return;
    
    const todo = {
      id: this.generateId(),
      text: text,
      completed: false,
      createdAt: new Date().toISOString()
    };
    
    this.todos.unshift(todo); // Add to beginning for newest-first order
    this.todoInput.value = '';
    this.saveTodos();
    this.render();
    this.updateStats();
    
    // Add animation
    const todoElement = this.todoList.querySelector(`[data-todo-id="${todo.id}"]`);
    if (todoElement) {
      todoElement.classList.add('slide-in');
    }
  }
  
  deleteTodo(id) {
    this.todos = this.todos.filter(todo => todo.id !== id);
    this.saveTodos();
    this.render();
    this.updateStats();
  }
  
  toggleTodo(id) {
    const todo = this.todos.find(t => t.id === id);
    if (todo) {
      todo.completed = !todo.completed;
      todo.updatedAt = new Date().toISOString();
      this.saveTodos();
      this.render();
      this.updateStats();
    }
  }
  
  editTodo(id) {
    if (this.editingTodoId && this.editingTodoId !== id) {
      this.cancelEdit();
    }
    
    this.editingTodoId = id;
    const todoElement = this.todoList.querySelector(`[data-todo-id="${id}"]`);
    const textElement = todoElement.querySelector('.todo-text');
    const editInput = todoElement.querySelector('.todo-edit-input');
    
    textElement.classList.add('editing');
    editInput.classList.add('editing');
    editInput.value = textElement.textContent;
    editInput.focus();
    editInput.select();
  }
  
  saveEdit(id) {
    const todoElement = this.todoList.querySelector(`[data-todo-id="${id}"]`);
    const editInput = todoElement.querySelector('.todo-edit-input');
    const newText = editInput.value.trim();
    
    if (!newText) {
      this.cancelEdit();
      return;
    }
    
    const todo = this.todos.find(t => t.id === id);
    if (todo) {
      todo.text = newText;
      todo.updatedAt = new Date().toISOString();
      this.saveTodos();
    }
    
    this.editingTodoId = null;
    this.render();
    this.updateStats();
  }
  
  cancelEdit() {
    if (!this.editingTodoId) return;
    
    const todoElement = this.todoList.querySelector(`[data-todo-id="${this.editingTodoId}"]`);
    const textElement = todoElement.querySelector('.todo-text');
    const editInput = todoElement.querySelector('.todo-edit-input');
    
    textElement.classList.remove('editing');
    editInput.classList.remove('editing');
    
    this.editingTodoId = null;
  }
  
  setFilter(filter) {
    this.currentFilter = filter;
    
    // Update active tab
    this.filterTabs.forEach(tab => {
      tab.classList.toggle('active', tab.dataset.filter === filter);
    });
    
    this.render();
  }
  
  getFilteredTodos() {
    switch (this.currentFilter) {
      case 'active':
        return this.todos.filter(todo => !todo.completed);
      case 'completed':
        return this.todos.filter(todo => todo.completed);
      default:
        return this.todos;
    }
  }
  
  handleTodoClick(e) {
    const todoItem = e.target.closest('.todo-item');
    if (!todoItem) return;
    
    const todoId = todoItem.dataset.todoId;
    
    if (e.target.classList.contains('todo-checkbox')) {
      this.toggleTodo(todoId);
    } else if (e.target.classList.contains('delete')) {
      this.deleteTodo(todoId);
    } else if (e.target.classList.contains('edit')) {
      this.editTodo(todoId);
    } else if (e.target.classList.contains('save')) {
      this.saveEdit(todoId);
    } else if (e.target.classList.contains('cancel')) {
      this.cancelEdit();
    }
  }
  
  handleTodoKeypress(e) {
    if (e.target.classList.contains('todo-edit-input')) {
      const todoId = e.target.closest('.todo-item').dataset.todoId;
      
      if (e.key === 'Enter') {
        this.saveEdit(todoId);
      } else if (e.key === 'Escape') {
        this.cancelEdit();
      }
    }
  }
  
  createTodoElement(todo) {
    const isEditing = this.editingTodoId === todo.id;
    
    return `
      <li class="todo-item ${todo.completed ? 'completed' : ''}" data-todo-id="${todo.id}">
        <div class="todo-checkbox ${todo.completed ? 'checked' : ''}" role="checkbox" 
             aria-checked="${todo.completed}" tabindex="0"></div>
        <span class="todo-text ${isEditing ? 'editing' : ''}">${this.escapeHtml(todo.text)}</span>
        <input type="text" class="todo-edit-input ${isEditing ? 'editing' : ''}" 
               value="${this.escapeHtml(todo.text)}">
        <div class="todo-actions">
          ${isEditing ? `
            <button class="todo-action save" title="Save">Save</button>
            <button class="todo-action cancel" title="Cancel">Cancel</button>
          ` : `
            <button class="todo-action edit" title="Edit">Edit</button>
            <button class="todo-action delete" title="Delete">Delete</button>
          `}
        </div>
      </li>
    `;
  }
  
  render() {
    const filteredTodos = this.getFilteredTodos();
    
    if (filteredTodos.length === 0) {
      this.todoList.innerHTML = '';
      this.emptyState.classList.remove('hidden');
      
      // Update empty state message based on filter
      const emptyMessages = {
        all: 'No todos yet',
        active: 'No active todos',
        completed: 'No completed todos'
      };
      
      const emptyDescriptions = {
        all: 'Add your first todo above to get started!',
        active: 'All your todos are completed! 🎉',
        completed: 'Complete some todos to see them here.'
      };
      
      this.emptyState.querySelector('h3').textContent = emptyMessages[this.currentFilter];
      this.emptyState.querySelector('p').textContent = emptyDescriptions[this.currentFilter];
    } else {
      this.emptyState.classList.add('hidden');
      this.todoList.innerHTML = filteredTodos
        .map(todo => this.createTodoElement(todo))
        .join('');
    }
  }
  
  updateStats() {
    const total = this.todos.length;
    const active = this.todos.filter(todo => !todo.completed).length;
    const completed = total - active;
    
    this.totalCount.textContent = total;
    this.activeCount.textContent = active;
    this.completedCount.textContent = completed;
  }
  
  escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
  }
  
  loadTodos() {
    try {
      const saved = localStorage.getItem('github-todos');
      return saved ? JSON.parse(saved) : this.getDefaultTodos();
    } catch (error) {
      console.error('Error loading todos:', error);
      return this.getDefaultTodos();
    }
  }
  
  saveTodos() {
    try {
      localStorage.setItem('github-todos', JSON.stringify(this.todos));
    } catch (error) {
      console.error('Error saving todos:', error);
    }
  }
  
  getDefaultTodos() {
    return [
      {
        id: this.generateId(),
        text: 'Welcome to GitHub Todo! 👋',
        completed: false,
        createdAt: new Date().toISOString()
      },
      {
        id: this.generateId(),
        text: 'Click the checkbox to mark todos as complete',
        completed: true,
        createdAt: new Date().toISOString()
      },
      {
        id: this.generateId(),
        text: 'Try the theme toggle in the top right',
        completed: false,
        createdAt: new Date().toISOString()
      }
    ];
  }
  
  // Public API for potential extensions
  getAllTodos() {
    return [...this.todos];
  }
  
  getTodoById(id) {
    return this.todos.find(todo => todo.id === id);
  }
  
  clearCompleted() {
    this.todos = this.todos.filter(todo => !todo.completed);
    this.saveTodos();
    this.render();
    this.updateStats();
  }
  
  markAllComplete() {
    const hasIncomplete = this.todos.some(todo => !todo.completed);
    this.todos.forEach(todo => {
      todo.completed = hasIncomplete;
      todo.updatedAt = new Date().toISOString();
    });
    this.saveTodos();
    this.render();
    this.updateStats();
  }
}

// Initialize the app when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  window.todoApp = new TodoApp();
});

// Keyboard shortcuts
document.addEventListener('keydown', (e) => {
  // Ctrl/Cmd + N to focus new todo input
  if ((e.ctrlKey || e.metaKey) && e.key === 'n') {
    e.preventDefault();
    document.getElementById('todoInput').focus();
  }
  
  // Escape to cancel editing
  if (e.key === 'Escape' && window.todoApp) {
    window.todoApp.cancelEdit();
  }
});

// Add service worker registration for offline support (optional)
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    // Note: You would need to create a service worker file for this to work
    // navigator.serviceWorker.register('/sw.js');
  });
}

// Export for testing or external use
if (typeof module !== 'undefined' && module.exports) {
  module.exports = TodoApp;
}