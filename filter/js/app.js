let filterInput = document.getElementById('filterInput');
let addContactButton = document.getElementById('addContact');
let saveContactButton = document.getElementById('saveContact');

addContactButton.addEventListener('click', toggleModal);
filterInput.addEventListener('keyup', filterNames);
saveContactButton.addEventListener('click', addNewContact);

function addNewContact(){
    let name = document.getElementById('contactName').value;
    let email = document.getElementById('contactEmail').value;
    let mobile = document.getElementById('contactMobile').value;
    let form  = document.getElementById('addContacForm');

    emailPatern = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    let contact = {
        name: name,
        email: email,
        mobile: mobile
    }

    if(!name || !email || !mobile){
        alert('All fild must be enterd');
        return false;
    }

    if(!emailPatern.test(String(email).toLocaleLowerCase())){
        alert("Please enter valid email");
        return false;
    }


    if(fetchContacts() === null){
        console.log('prazno');
        let contacts = [];
        contacts.push(contact);
        localStorage.setItem('Contacts', JSON.stringify(contacts));
        form.reset();
        console.log(fetchContacts());
    } else {
        let contacts = fetchContacts();
        contacts.push(contact);
        contacts.sort(sortContacts);
        localStorage.setItem('Contacts', JSON.stringify(contacts));
        console.log(fetchContacts());
    }
}

function sortContacts(a,b){
    let nameA = a.name;
    let nameB = b.name;

    if(nameA > nameB) {
        return 1;
    }
    if(nameA < nameB){
        return -1
    }
    return 0;
}

function setContacts(){
    let contacts = fetchContacts();
    contactsList = document.getElementById('contactsTableList');
    contactsList.innerHTML = "";
    contacts.forEach(element => {
        contactsList.innerHTML+=    '<tr>' +
                                        '<td >'+'<a href="#" class="contactNames">'+ element.name +'</a>'+'</td>' +
                                        '<td>'+'<a href="#">'+ element.email +'</a>'+'</td>' +
                                        '<td>'+'<a href="#">'+ element.mobile +'</a>'+'</td>' +
                                    '</tr>';
    });
}

function fetchContacts(){
    let contacts = localStorage.getItem('Contacts');
    return JSON.parse(contacts);
}

function toggleModal(){
    let modal = document.getElementById('addContactModal');
    modal.classList.toggle('closeModal');
    modal.classList.toggle('openModal');
}

/*function filterNames(e){
    let filterValue = document.getElementById('filterInput').value.toUpperCase();
    console.log(filterValue);

    let tableBody = document.getElementById('contactsTableList');
    console.log(tableBody);
    let tableRow = tableBody.querySelectorAll('tr');
    console.log(tableRow);

    for (let i = 0; i < tableRow.length; i++) {
       // let a = tableRow[i].getElementsByTagName('a.contactNames')[0];
       let td = tableRow[i].childNodes;
       /* if(a.innerHTML.toUpperCase().indexOf(filterValue) > -1){
            tableRow[i].style.display = '';
        } else {
            tableRow[i].style.display = 'none';
        }
    }

}
*/
