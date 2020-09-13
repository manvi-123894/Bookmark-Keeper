const bookmarkBtn = document.querySelector(".bookmark-creator-button button");
const modal = document.querySelector(".modal-container");
const crossBtn = document.querySelector(".modal-container .modal .modal-title .fa-times");
const form = document.querySelector("#form");
const formSubmitBtn = document.querySelector(".form-group .add");
const websiteNAme = document.querySelector("#web-name");
const websiteUrl = document.querySelector("#web-url");
const bookmarkInner = document.querySelector(".bookmark-inner");


let bookmarksArray = [];

bookmarkBtn.addEventListener("click",modalViewer);
crossBtn.addEventListener("click",modalHide);
form.addEventListener("submit",storeBookmark);
bookmarkInner.addEventListener("click",function(e){
    if( e.target){
      deleteBookmark(e);
    }
})



function modalViewer(){
    modal.style.display = "flex";
}


function modalHide(){
    modal.style.display = "none";
}

function storeBookmark(e){
    e.preventDefault();

    const webName = websiteNAme.value;
    let webUrl = websiteUrl.value;

    if(!webUrl.includes("https://","http://")){
        webUrl = `https://${webUrl}`;
    }


    let bookmark = {
        name : webName,
        url : webUrl
    }

    bookmarksArray.push(bookmark);
    localStorage.setItem('bookmarks',JSON.stringify(bookmarksArray));
    fetchBookmarks();
    form.reset();
    websiteNAme.focus();
    alert("YAYYYY!! Your Bookmark has been added.☺");
    modalHide();
}

function fetchBookmarks(){

    if(localStorage.getItem("bookmarks")){
        bookmarksArray = JSON.parse(localStorage.getItem("bookmarks"));
    }

    addBookmark();
}



function addBookmark(){
    var arr = bookmarksArray.map(function(bookmark){
        const { name , url} = bookmark;

      return  `<div class="single-bookmark">
                    <div class="cross">
                        <i class="fas fa-times"></i>
                    </div>

                    <div class="item">
                        <a href="${url}">${name}</a>
                    </div>
                </div>`
    });

    arr = arr.join("")
    bookmarkInner.innerHTML = arr;
}

function deleteBookmark(e){
       

       bookmarksArray.forEach(function(bookmark,i){
           if(bookmark.url.includes(e.target.parentElement.parentElement.childNodes[3].childNodes[1].getAttribute('href'))){
               bookmarksArray.splice(i,1);
           }
          
       })

       localStorage.setItem('bookmarks',JSON.stringify(bookmarksArray));
       fetchBookmarks();
}

fetchBookmarks();
