//  Book Construcor
function Book(title, author, isbn){
    this.title = title;
    this.author = author;
    this.isbn = isbn
}

// Ui Constructor
function UI(){}

UI.prototype.addBookToList = function(book){
    const list = document.getElementById('book-list');
    // create tr element
    const row = document.createElement('tr');
    // Inert cols
    row.innerHTML = `
        <td>${book.title}</td>
        <td>${book.author}</td>
        <td>${book.isbn}</td>
        <td><a href="#" class="delete">X</a></td>
        `;
    list.appendChild(row);
}

UI.prototype.showAlert = function(msg, className){
    const div = document.createElement('div');
    const container = document.querySelector('.container');
    const form = document.querySelector('#book-form');
    div.className = `alert ${className}`;
    div.appendChild(document.createTextNode(msg));
    container.insertBefore(div, form);

    // Time out after 3s
    setTimeout(function(){
        document.querySelector('.alert').remove();
    }, 3000)
}

UI.prototype.clearFields = function(){
    document.getElementById('title').value = '';
    document.getElementById('author').value = '';
    document.getElementById('isbn').value = '';
}

UI.prototype.deleteBook = function(target){
    if(target.className === 'delete'){
        target.parentElement.parentElement.remove();
    }
}

document.getElementById('book-form').addEventListener('submit', function(e){
    // Get form values
    const title = document.getElementById('title').value;
    const author = document.getElementById('author').value;
    const isbn = document.getElementById('isbn').value;
    
    //Instance of book object
    const book = new Book(title, author, isbn);

    //Instane of UI
    const ui = new UI();

    if(title === '' || author === '' || isbn === ''){
        // Error alert
        ui.showAlert('Please fill all fields', 'error');
    } else {
        ui.addBookToList(book);
        ui.showAlert('Book added!', 'success');
        ui.clearFields();
        
    }
    

    e.preventDefault();
});

// Event listener for delete
document.getElementById('book-list').addEventListener('click', function(e){
    const ui = new UI();

    ui.deleteBook(e.target)

    ui.showAlert('Book deletet', 'success');
    e.preventDefault();
})