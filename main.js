let rendered = 0;
let testNumber = 1;
let TEST = document.getElementById('TEST');
function makePost(imgSrc,titleText,messageText){
    let messages = document.getElementById('messages');
    let date = new Date();
    let mainMessage = document.createElement('div');
        mainMessage.classList.add("message");
        let img = document.createElement('img');
            img.classList.add("imgDiv")
            img.src = imgSrc.toString();
            mainMessage.appendChild(img);
        let textDiv = document.createElement('div');
            textDiv.classList.add('text');
            let author = document.createElement('div');
                author.innerText = "author - "+ `${date.getDate()}/${date.getMonth()+1}/${date.getFullYear()}`;
                author.classList.add('author');
                textDiv.appendChild(author);
            let title = document.createElement('h1');
                title.innerText = `${titleText}`
                textDiv.appendChild(title);
            let para = document.createElement('p');
                para.innerText = `${messageText}`
                textDiv.appendChild(para);
        mainMessage.appendChild(textDiv);
    messages.appendChild(mainMessage);
    TEST.style.order = rendered +2;
testNumber++;
rendered++;
return mainMessage;
}
function testPostList(amount){
    for(i=1;i<=amount;i++){
        makePost("https://plus.unsplash.com/premium_photo-1669218057891-c79da315d253?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8YW1hemluZyUyMHBpY3R1cmV8ZW58MHx8MHx8fDA%3D",testNumber,testNumber);
    }
    return true
}
const handleScroll = (entries,observer)=>{
    entries.forEach(entry => {
        if(entry.isIntersecting){
            testPostList(30);
        }
    });
}
const observer = new IntersectionObserver(handleScroll)
observer.observe(TEST);