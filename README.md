
# 📝 Todo App

A simple Todo List application built with **HTML**, **Bootstrap**, and **Vanilla JavaScript (ES6)**, with API integration using `fetch`. It allows you to:

- View Todos (with pagination)
- Search by task name
- Filter by date (From/To)
- Add new todos
- Handle API errors and show loading states

---

## 🚀 Features

- ✅ View todos (paginated)
- ✅ Search tasks by name
- ✅ Filter by creation date (from-to)
- ✅ Add new todo (POST to Dummy API)
- ✅ Show loading state while fetching
- ✅ Handle fetch/post errors
- ✅ Reset filters button
- ✅ Bootstrap-styled alerts and pagination

---

## 🛠 Tech Stack

- HTML5
- CSS3 (Bootstrap 5)
- JavaScript (ES6)
- [DummyJSON API](https://dummyjson.com)

---

## 📦 Folder Structure

```
/to-do-app
├── index.html
├── style.css
├── script.js
```

---

## 📡 API

- **GET Todos**: `https://dummyjson.com/todos`
- **POST New Todo**: `https://dummyjson.com/todos/add`

Note: This is a dummy API, so new todos are not stored after reload.

---


## 💡 Notes

- Date filters use simulated creation dates (`createdAt`) since the Dummy API doesn't provide them.
- Pagination is handled on the client-side for simplicity.
- Alerts and UI are styled using Bootstrap 5.

---

## 📷 Preview

Application is deployed through netlify and you and preview it on LINK - https://celadon-kelpie-dccfc9.netlify.app/

---

## 👨‍💻 Author

Created by **[Your Name]**

Feel free to contribute or suggest improvements!
