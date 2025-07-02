const API_URL = 'https://dummyjson.com/todos';
const todosPerPage = 5;
let todos = [];
let currentPage = 1;

const todoList = document.getElementById('todoList');
const pagination = document.getElementById('pagination');
const loading = document.getElementById('loading');
const searchInput = document.getElementById('searchInput');
const fromDate = document.getElementById('fromDate');
const toDate = document.getElementById('toDate');
const resetFilters = document.getElementById('resetFilters');

async function fetchTodos() {
  try {
    loading.style.display = 'block';
    const response = await fetch(`${API_URL}`);
    if (!response.ok) throw new Error('Failed to fetch todos');
    const data = await response.json();
    todos = data.todos.map(todo => ({
      ...todo,
      createdAt: new Date(Date.now() - Math.random() * 1e10) // creating random date for todos
    }));
    renderTodos();
  } catch (error) {
    alert('Error: ' + error.message);
  } finally {
    loading.style.display = 'none';
  }
}

function renderTodos() {
  const filtered = applyFilters();
  const paginated = paginate(filtered, currentPage);
  todoList.innerHTML = '';
  paginated.forEach(todo => {
    const li = document.createElement('li');
    li.className = 'list-group-item';
    li.textContent = `${todo.todo} (Created: ${todo.createdAt.toLocaleDateString()})`;
    todoList.appendChild(li);
  });
  renderPagination(filtered.length);
}

function applyFilters() {
  const query = searchInput.value.toLowerCase();
  const from = fromDate.value ? new Date(fromDate.value) : null;
  const to = toDate.value ? new Date(toDate.value) : null;

  return todos.filter(todo => {
    const matchText = todo.todo.toLowerCase().includes(query);
    const created = new Date(todo.createdAt);
    const matchFrom = from ? created >= from : true;
    const matchTo = to ? created <= to : true;
    return matchText && matchFrom && matchTo;
  });
}

function paginate(items, page) {
  const start = (page - 1) * todosPerPage;
  return items.slice(start, start + todosPerPage);
}

function renderPagination(totalItems) {
  const totalPages = Math.ceil(totalItems / todosPerPage);
  pagination.innerHTML = '';

  for (let i = 1; i <= totalPages; i++) {
    const li = document.createElement('li');
    li.className = 'page-item' + (i === currentPage ? ' active' : '');
    li.innerHTML = `<a class="page-link" href="#">${i}</a>`;
    li.addEventListener('click', e => {
      e.preventDefault();
      currentPage = i;
      renderTodos();
    });
    pagination.appendChild(li);
  }
}

document.getElementById('addTodoForm').addEventListener('submit', async (e) => {
  e.preventDefault();
  const todoText = document.getElementById('todoInput').value.trim();
  if (!todoText) return;

  try {
    loading.style.display = 'block';
    const response = await fetch(API_URL + '/add', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ todo: todoText, completed: false, userId: 1 })
    });

    if (!response.ok) throw new Error('Failed to add todo');

    const newTodo = await response.json();
    newTodo.createdAt = new Date();
    todos.unshift(newTodo);
    document.getElementById('todoInput').value = '';
    currentPage = 1;
    renderTodos();
  } catch (error) {
    alert('Error: ' + error.message);
  } finally {
    loading.style.display = 'none';
  }
});

[searchInput, fromDate, toDate].forEach(input => {
  input.addEventListener('input', () => {
    currentPage = 1;
    renderTodos();
  });
});

resetFilters.addEventListener('click', () => {
  searchInput.value = '';
  fromDate.value = '';
  toDate.value = '';
  currentPage = 1;
  renderTodos();
});

fetchTodos();

function showDateAlert(message) {
  const alertBox = document.getElementById('dateAlert');
  alertBox.textContent = message;
  alertBox.classList.remove('d-none');
  
  setTimeout(() => {
    alertBox.classList.add('d-none');
  }, 3000);
}



toDate.addEventListener('change', () => {
  const from = new Date(fromDate.value);
  const to = new Date(toDate.value);

  if (fromDate.value && to < from) {
    showDateAlert('To Date cannot be earlier than From Date');
    toDate.value = '';
  }
});

fromDate.addEventListener('change', () => {
  const from = new Date(fromDate.value);
  const to = new Date(toDate.value);

  if (toDate.value && to < from) {
    showDateAlert('From Date cannot be after To Date.');
    fromDate.value = '';
  }
  
});

