//DOM
const container = document.querySelector('#gridcontainer');
const addBookButton = document.querySelector('#newBookButton');
const inputTitle = document.querySelector('#title');
const inputAuthor = document.querySelector('#author');
const inputPages = document.querySelector('#pages');
const inputRead = document.querySelector('#read');
const addFormButton = document.querySelector('#addForm');
const formDiv = document.querySelector('#newbook');

//Starting point.
let myLibrary = [];
let initialRender = false;
formDiv.style.display = 'none'; //Set display to none in order to toggle between none and block, otherwise it doesn't work.


//Book constructor.
function Book(title, author, pages, read, rendered){
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
    this.toggleRead = function(){ this.read = !this.read; } //function to toggle between read and not read.
    this.rendered = rendered; //true-false value if a book is rendered on screen. Used in the render function.
}

//Show the form.
function showForm(){
    if (formDiv.style.display === 'none') { formDiv.style.display = 'block'; }
    if (addFormButton.style.display === 'block') { addFormButton.style.display = 'none'; }
}
addFormButton.addEventListener('click', showForm);


//Push book to array.
function addBookToLibrary(book){
    myLibrary.push(book);
}

//Resets the form.
function resetForm(){
        inputTitle.value = '';
        inputAuthor.value = '';
        inputPages.value = '';
        inputRead.checked = false;
        formDiv.style.display = 'none';
}


//(newbook) Form logic
const createNewBook = () => {
    let success;
    
    if ((inputTitle.value == null || inputTitle.value == "") || (inputAuthor.value == null || inputAuthor.value == "") || (inputPages.value == null || inputPages.value == "") || (isNaN(inputPages.value))){ 
        if(isNaN(inputPages.value)) { inputPages.value = 'Enter a number of pages.'; }
        alert("Make sure you fill in everything (correctly)!");
        success = false;
    }
    else {
        let readBook = false;
        if (inputRead.checked) { readBook = true; } else { readBook = false; }
        
        addBookToLibrary(new Book(
            inputTitle.value,
            inputAuthor.value,
            inputPages.value,
            readBook,
            false) //rendered is false.
        );
        
        render(myLibrary);
        success = true;
    }
    
    if (success === true) {
        resetForm();
    }
}
addBookButton.addEventListener('click', createNewBook);

//Main function for rendering the cards.
function render(array){
    for(var i = array.length-1; i>=0; i--){
        if(array[i].rendered == false) { //Books that are already rendered get skipped.
            const div = document.createElement('div');
            div.dataset.id = i;
            div.classList.add('cards');
            div.textContent = `Book: ${array[i].title}\n`;
            div.textContent += `Author: ${array[i].author}\n`;
            div.textContent += `Pages: ${array[i].pages} pages\n`;
            
            let changeReadStatusButton = document.createElement('button');
            if(array[i].read == true) { changeReadStatusButton.textContent = 'Read: Yes.'; }
            else { changeReadStatusButton.textContent = 'Read: No.'; }
            changeReadStatusButton.classList.add('readbutton');
            changeReadStatusButton.dataset.id = i;
            changeReadStatusButton.addEventListener('click', toggleRead);
            function toggleRead(){
                let i = this.getAttribute('data-id');
                let book = myLibrary[i];
                book.toggleRead();

                if(book.read == true) { this.textContent = 'Read: Yes.';}
                else { this.textContent = 'Read: No.'; }
            }
            div.appendChild(changeReadStatusButton);
            
            let removeBook = document.createElement('button');
            removeBook.textContent = 'Remove Book';
            removeBook.classList.add('removebutton');
            removeBook.dataset.id = i;
            removeBook.addEventListener('click', deleteBook);
            function deleteBook(){
                let i = this.getAttribute('data-id');
                container.removeChild(div);
                myLibrary.splice(i, 1);
                
            }
            div.appendChild(removeBook);
            
            if (initialRender == false) { container.appendChild(div); } //The first render (the starting books).
            else { container.insertBefore(div, container.children[2]); } //Every other book render "pushes" the other divs forward and puts the new book on children 2 (actually children 1 because the form disappears).
            
            array[i].rendered = true;
        }
    }
    initialRender = true;
}

//The starting books
addBookToLibrary(new Book('The Power of Now', 'Eckhart Tolle', 220, true, false));
addBookToLibrary(new Book('How To Be a Badass', 'Jen Sincero', 689, false, false));
addBookToLibrary(new Book('The Subtle Art of Not Giving A F*ck', 'Mark Manson', 589, true, false));
addBookToLibrary(new Book('Millionaire Success Habits', 'Dean Graziosi', 589, false, false));
addBookToLibrary(new Book('Think & Grow Rich', 'Napoleon Hill', 589, false, false));
render(myLibrary);