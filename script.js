let myLibrary = [];


function Book(title,author,pages,read){
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;

    this.info = function (){
        return `${title} by ${author}, ${pages} pages, Status: ${read}`;
    }
}

function addBookToLibrary() {
    const title = document.getElementById("title-value").value;
    const author = document.getElementById("author-value").value;
    const pages = document.getElementById("pages-value").value;
    const read_status = document.querySelector('input[name="read-not_read"]:checked').value;
    const newBook = new Book(title,author,pages,read_status);
    myLibrary.push(newBook);
    displayBook(newBook);
}

function createBookCard(book) {
    const bookCard = document.createElement("div");
    bookCard.classList.add('book-card');
    bookCard.setAttribute("data-index", myLibrary.indexOf(book));

    const textContainer = document.createElement("div");
    textContainer.classList.add('book-info');
    textContainer.innerHTML = book.title + '<br> By : ' + book.author + '<br> Pages:' + book.pages + '<br>Read status:' + book.read;
    

    const deleteButton = document.createElement("button");
    deleteButton.innerHTML =  '&#10060';
    deleteButton.addEventListener("click", function(){
        const book_index = bookCard.getAttribute("data-index");
        myLibrary.splice(book_index,1);
        const book_cards = document.querySelectorAll("div[data-index]");
        let i = 0;
        book_cards.forEach(bookCard => {
            bookCard.setAttribute("data-index", i);
            i += 1;
        });
        displayLibrary();
    });

    const readButton = document.createElement("button");
    readButton.classList.add('read-button');
    readButton.textContent = "Finished Reading";
    readButton.addEventListener("click", function() {
        const book_index = bookCard.getAttribute("data-index");
        myLibrary[book_index].read = !myLibrary[book_index].read;
        displayLibrary();
    });

    bookCard.append(deleteButton);
    bookCard.append(textContainer);
    bookCard.append(readButton);
    return bookCard;
}

function displayBook(book) {
    const book_display = document.getElementById("book-display");
    book_display.append(createBookCard(book));
}

function displayLibrary() {
    const book_display = document.getElementById("book-display");
    while (book_display.firstChild) {
        book_display.removeChild(book_display.lastChild);
     }
    for (let i = 0; i < myLibrary.length; i++){
        displayBook(myLibrary[i]);
    }
}

window.onload = function () {
    document.getElementById('submit-button').addEventListener("click", function() {
        addBookToLibrary();
        document.getElementById("myModal").style.display = 'none';
    });
    myLibrary.push(new Book("Harry Potter and the Chamber of Secrets","J.K Rowling", 251, true));
    myLibrary.push(new Book("The Fellowship of the Ring","J.R.R Tolkien", 479, false));
    myLibrary.push(new Book("1984", "George Orwell",328, true));
    displayLibrary();
}


