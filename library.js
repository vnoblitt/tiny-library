const addButton = document.getElementById('add-book');
/* See the comment on on addForm.innerHTML -------------
const addForm = document.getElementById('add-form'); */

const formTitle = document.getElementById('form-title');
const formAuthor = document.getElementById('form-author');
const formPages = document.getElementById('form-pages');
const formRead = document.getElementById('form-read');

const bookInfo = document.getElementById('book-info');
// Delete this later --------------
const testButton = document.getElementById('overwrite');
// --------------------------------
const bookshelf = document.getElementById('bookshelf');
const bookOne = document.getElementById('book-one');
const bookTwo = document.getElementById('book-two');
const bookThree = document.getElementById('book-three');

const library = [];

addButton.addEventListener('click', () => {
    library.push(addBookToLibrary(formTitle.value, formAuthor.value, formPages.value, formRead.checked));
    formTitle.value = '';
    formAuthor.value = '';
    formPages.value = '';
    formRead.checked = false;
});

/* -----------------------------------------------
testButton.addEventListener('click', () => {
    bookInfo.innerText = 'test';
});
-------------------------------------------------*/
bookshelf.addEventListener('click', () => {
    if (event.target && event.target.matches('.book')) {
        const targetID = event.target.id;
        const targetBook = library.find(book => book.id === targetID);
        updateInfoCard(targetBook);
    }
});

function Book(title, author, pages, read, id) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
    this.id = id;
}

function addBookToLibrary(title, author, pages, read) {
    const id =  crypto.randomUUID();
    const newBook = new Book(title, author, pages, read, id);
    addBookToShelf(newBook);
    return newBook;
}

function addBookToShelf(Book) {
    const newBook = document.createElement('div');
    newBook.classList.add('book');
    newBook.id = Book.id;
    if (Book.read) {
        newBook.classList.add('read');
    } else {
        newBook.classList.add('unread');
    }

    const newTitle = document.createElement('div');
    const newAuthor = document.createElement('div');
    newTitle.classList.add('title');
    newAuthor.classList.add('author');
    newTitle.textContent = Book.title;
    newAuthor.textContent = Book.author;
    newBook.append(newTitle, newAuthor);
    console.log(newBook);
    bookshelf.append(newBook);
}

function updateInfoCard(Book) {
    bookInfo.innerText = '';
    const title = document.createElement('p');
    const author = document.createElement('p');
    const pages = document.createElement('p');
    title.textContent = Book.title;
    author.textContent = `By: ${Book.author}`;
    pages.textContent = `${Book.pages} pages`;
    bookInfo.append(title, author, pages);
}

function viewLibrary() {
    return library;
}
