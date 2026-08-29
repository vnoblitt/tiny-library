const addButton = document.getElementById('add-book');
const addForm = document.getElementById('add-form');

// Delete this later --------------
const testButton = document.getElementById('overwrite');
// --------------------------------
 
const bookOne = document.getElementById('book-one');
const bookTwo = document.getElementById('book-two');
const bookThree = document.getElementById('book-three');
const bookFour = document.getElementById('book-four');
const bookFive = document.getElementById('book-five');

const tempBook = {
    title: '',
    author: '',
}

addButton.addEventListener('click', () => {
    addForm.innerHTML = `
        <div class="title">
            <label for="form-title">Title</label>
            <input id="form-title" name="form-title" type="text"/>
        </div>
        <div class="author">
            <label for="form-author">Author</label>
            <input id="form-author" name="form-author" type="text"/>
        </div>
        <button type="button" id="submit-book">Submit</button>
    `

    const submitBook = document.getElementById('submit-book');
    const formTitle = document.getElementById('form-title');
    const formAuthor = document.getElementById('form-author');

    submitBook.addEventListener('click', () => {
        tempBook.title = formTitle.textContent;
        tempBook.author = formAuthor.textContent;

        addForm.innerHTML = ``;
    });
});

testButton.addEventListener('click', () => {
    editBook(bookOne, tempBook.title, tempBook.author);
});


function editBook(book, title, author) {
    
    const lines = book.innerText.split('\n');
    lines[0] = title;
    lines[1] = author;
    /*for(let i=0; i<lines.length; i++){
        console.log(lines[i]);
    }*/
    return book;
}

function testTemp() {
    console.log(tempBook);
}

console.log(editBook(bookOne, 0, 0));