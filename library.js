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

let library = [];

addButton.addEventListener('click', () => {
    library.push(addBookToLibrary(formTitle.value, formAuthor.value, formPages.value, formRead.checked));
    formTitle.value = '';
    formAuthor.value = '';
    formPages.value = '';
    formRead.checked = false;
    const dialogue  = document.getElementById('form-dialogue');
    dialogue.close();
});

/* -----------------------------------------------/
testButton.addEventListener('click', () => {
    console.log(viewLibrary());
});
 ------------------------------------------------- */
document.addEventListener('click', (event) => {
    const clicked = event.target.closest('.book')
    if(!clicked && !event.target.closest('#book-info')) resetBookInfo();
});

bookshelf.addEventListener('click', (event) => {
    const clickedBook = event.target.closest('.book');
    if(!clickedBook) return;

    const targetID = clickedBook.id;
    const targetBook = library.find(book => book.id === targetID);
    if (targetBook) updateInfoCard(targetBook);
    
});

function Book(title, author, pages, read, id) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
    this.id = id;
}

function setupLibrary(){
    library.push(addBookToLibrary('Infinite Jest', 'David Foster Wallace', 1079, false));
    library.push(addBookToLibrary('The Lathe of Heaven', 'Ursula K LeGuin', 192, true));
    library.push(addBookToLibrary('The Scarlet Letter', 'Nathaniel Hawthorne', 272, true));
    return library;
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

function updateShelf(Book) {
    const targetDiv = document.getElementById(Book.id);
    if(targetDiv.classList.contains('read')) {
        targetDiv.classList.remove('read');
        targetDiv.classList.add('unread');
    } else {
        targetDiv.classList.remove('unread');
        targetDiv.classList.add('read');
    }
}

function updateInfoCard(Book) {
    bookInfo.innerText = '';
    const title = document.createElement('p');
    const author = document.createElement('p');
    const pages = document.createElement('p');
    const deleteButton = document.createElement('button');
    const changeRead = document.createElement('button');
    const buttonContainer = document.createElement('div')
    buttonContainer.classList.add('button-container');

    if (Book.read) {
        changeRead.textContent = 'Change to unread';
    } else {
        changeRead.textContent = 'Change to read';
    }
    title.textContent = Book.title;
    author.textContent = `By: ${Book.author}`;
    pages.textContent = `${Book.pages} pages`;
    deleteButton.classList.add('delete-button');
    deleteButton.textContent = 'Delete';

    buttonContainer.append(deleteButton, changeRead)
    bookInfo.append(title, author, pages, buttonContainer);

    


    changeRead.addEventListener('click', () => {
            changeReadStatus(Book);
            updateInfoCard(Book);
            updateShelf(Book);
        });

    deleteButton.addEventListener('click', () => {
        removeFromLibrary(Book.id);
        const child = document.getElementById(Book.id);
        bookshelf.removeChild(child);
        bookInfo.innerText = 'Fill out the form and submit books to add them to the library.';
    });
}

function resetBookInfo() {
    bookInfo.innerHTML = `
        <p>Click the plus button to add books to the library.</p>
        <p>Click on a book's cover to view information about it.</p>
           ` 
}

function viewLibrary() {
    return library;
}

function changeReadStatus(Book) {
    Book.read = !Book.read;
    return Book;
}

function removeFromLibrary(targetID) {
    library = library.filter(book => book.id !== targetID);
}

console.log(setupLibrary());