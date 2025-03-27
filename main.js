let rendered = 0;
let bottom = document.getElementById('bottomDetect');
let lastRenderedPos;
var jsonData;

async function getJsonData() {
    jsonData = await fetch('./DATAwImg.json').then(response => {
        if(!response.ok){
            console.error("Response NOT ok")
        }
        return response.json();
    }).then(data =>{
        jsonData = data;
        makePost();
        return data;
    })
}
function makePost(){
    if(jsonData == null){
        throw new Error("jsonData is null");
    }
    let messages = document.getElementById('messages');
    let date = new Date();
    let mainMessage = document.createElement('div');
        mainMessage.classList.add("message");
        let img = document.createElement('img');
            img.classList.add("imgDiv")
            img.src = `${jsonData[rendered].img}`
            mainMessage.appendChild(img);
        let textDiv = document.createElement('div');
            textDiv.classList.add('text');
            let author = document.createElement('div');
                author.innerText = `${jsonData[rendered].author} - `+ `${date.getDate()}/${date.getMonth()+1}/${date.getFullYear()}`;
                author.classList.add('author');
                textDiv.appendChild(author);
            let title = document.createElement('h1');
                title.innerText = `${jsonData[rendered].Title}`
                textDiv.appendChild(title);
            let para = document.createElement('p');
                para.innerText = `${jsonData[rendered].message}`
                textDiv.appendChild(para);
        mainMessage.appendChild(textDiv);
    messages.appendChild(mainMessage);
    bottom.style.order = rendered +2;
lastRenderedPos = getAbsolutePosition(mainMessage);
rendered++;
return mainMessage;
}
function testPostList(amount){
    for(i=1;i<=amount;i++){
        getJsonData();
    }
    return true
}
const handleScroll = (entries,observer)=>{
    entries.forEach(entry => {
        if(entry.isIntersecting){
            if(lastRenderedPos){
                scroll(0,lastRenderedPos);
            }
            testPostList(30);
        }
    });
}
function getAbsolutePosition(element) {
    const rect = element.getBoundingClientRect();
    return rect.bottom + window.scrollY
}

const observer = new IntersectionObserver(handleScroll)
observer.observe(bottom);