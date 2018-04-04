document.getElementById('myForm').addEventListener('submit', saveBookmark);

function saveBookmark(e){

    e.preventDefault();
    let siteName = document.getElementById('siteName').value;
    let siteUrl = document.getElementById('siteUrl').value;
    let form = document.getElementById('myForm');

    var pattern = /(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/;

    if(!siteName || !siteUrl){
        alert('Please fill the fields');
        return false;
    }

    if(!pattern.test(siteUrl)){
        alert('Input valid url');
        form.reset();
        return false;
    }

    let bookmark = {
        siteName : siteName,
        siteUrl: siteUrl
    }

    if(fatchBookmarks() === null){
        let bookmarks = [];
        bookmarks.push(bookmark);
        localStorage.setItem('Bookmarks', JSON.stringify(bookmarks) );
        setBookmark();
        form.reset();
    } else {
        //let bookmarks = fatchBookmarks();
        let bookmarks = fatchBookmarks();
        bookmarks.push(bookmark);
        localStorage.setItem('Bookmarks', JSON.stringify(bookmarks) );
        setBookmark();
        form.reset();
    }

}

function fatchBookmarks() {
    bookmarks = localStorage.getItem('Bookmarks');
    return JSON.parse(bookmarks);
}

function deleteBookmark(bookmark){
    bookmarks = fatchBookmarks();
    bookmarks = bookmarks.filter(el=> (el.siteUrl == bookmark) ? false : true);
    localStorage.setItem('Bookmarks', JSON.stringify(bookmarks) );
    setBookmark();
}

function setBookmark(){
    bookmarksDiv = document.getElementById("bookmarks");
    bookmarks = fatchBookmarks();

    bookmarksDiv.innerHTML = "";

    bookmarks.forEach(element => {
        bookmarksDiv.innerHTML +=  '<div class="card">' +
                                        '<div class="card-body">' +
                                            '<h5 class="card-title">'+ element.siteName +'</h5>' +
                                            '<a href="'+ element.siteUrl +'" class="btn btn-outline-info" target="_blank">Visit</a>' +
                                            '<a href="#" onclick="deleteBookmark(\''+ element.siteUrl +'\')" id="siteDelete" class="btn btn-outline-danger">Delete</a>' +
                                        '</div>' +
                                    '</div>'
    });
}