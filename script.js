const myLibrary = [];

function Book(title, author, pages, read) {
  this.id = crypto.randomUUID();
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
}

function addBookToLibrary(title, author, pages, read) {
  const newBook = new Book(title, author, pages, read);
  myLibrary.push(newBook);
  displayBooks();
}

addBookToLibrary("The Hobbit", "J.R.R. Tolkien", "295 pages", false);
addBookToLibrary("Harry Potter", "J.K. Rowling", "305 pages", true);
addBookToLibrary("1984", "George Orwell", "328 pages", true);

function displayBooks() {
  const container = document.getElementById("book-container");
  container.innerHTML = "";

  myLibrary.forEach((book) => {
    const card = document.createElement("div");
    card.className = "book-card";
    card.innerHTML = `
        <h3>${book.title}</h3>
        <p>Author: ${book.author}</p>
        <p>Pages: ${book.pages}</p>
        <p>Status: ${book.read ? "Read" : "Not Read"}</p>
        <button onclick="toggleReadStatus('${book.id}')">
          ${book.read ? "Mark Unread" : "Mark Read"}
        </button>
        <button onclick="removeBook('${book.id}')">Remove</button>
      `;
    container.appendChild(card);
  });
}

function toggleReadStatus(id) {
  const book = myLibrary.find((book) => book.id === id);
  book.read = !book.read;
  displayBooks();
}

function removeBook(id) {
  const index = myLibrary.findIndex((book) => book.id === id);
  myLibrary.splice(index, 1);
  displayBooks();
}

document.getElementById("new-book-btn").addEventListener("click", () => {
  document.getElementById("modal-backdrop").classList.remove("hidden");
  document.getElementById("book-modal").classList.remove("hidden");
});

document.getElementById("modal-cancel").addEventListener("click", closeModal);

document.getElementById("modal-form").addEventListener("submit", (e) => {
  e.preventDefault();

  const title = document.getElementById("modal-title").value;
  const author = document.getElementById("modal-author").value;
  const pages = document.getElementById("modal-pages").value;
  const read = document.getElementById("modal-read").checked;

  if (title && pages && author) {
    addBookToLibrary(title, author, pages, read);
    closeModal();
    document.getElementById("modal-form").reset();
  }
});

function closeModal() {
  document.getElementById("modal-backdrop").classList.add("hidden");
  document.getElementById("book-modal").classList.add("hidden");
}
