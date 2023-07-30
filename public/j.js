var socket = io();
var typing = document.querySelector(".typing");
var inp = document.querySelector(".bar input");
var btn = document.querySelector(".bar button");
var msg = document.querySelector(".msg");
var ask = document.querySelector(".ask");
var askname = document.querySelector(".ask input");
var askbtn = document.querySelector(".ask button");
var pop = document.querySelector(".pop");
let uname;
document.querySelector(".pop img").src = 'https://api.qrserver.com/v1/create-qr-code/?size=150x150&data='+window.location.href;

askbtn.onclick=()=>{
    if(askname.value == ""){
        document.querySelector(".ask p").textContent = 'Please your sure name!';
    }else{
        let yetdate = new Date();
        let joindate = yetdate.getHours()+':'+yetdate.getMinutes()+','+yetdate.getDate()+'.'+yetdate.getMonth()+'.'+yetdate.getFullYear();
        uname = askname.value;
        socket.emit('join',{
            name: askname.value,
            date: joindate
        })
        ask.remove();
    }
}

//join
socket.on('join',(data)=>{
    msg.innerHTML += `<div class="joined"><p title="Joined at ${data.date}">${data.name}</p> was joined</div>`;
})

btn.onclick=()=>{
    let yetdate = new Date();
    let now = yetdate.getHours()+':'+yetdate.getMinutes()+','+yetdate.getDate()+'.'+yetdate.getMonth()+'.'+yetdate.getFullYear();
    socket.emit('msg',{
        sender:uname,
        time:now,
        text:inp.value
    })
    inp.value = '';
}

socket.on('msg',(data)=>{
    if(data.sender == uname){
        msg.innerHTML += `<div class="text out">
        <div class="letter" title="Send from ${data.sender} at ${data.time}">
            <p>${data.text}</p>
            <div class="er">
                <span>${data.time}</span>
            </div>
        </div>
    </div>`;
    }else{
        msg.innerHTML += `<div class="text in">
        <div class="letter">
            <p>${data.text}</p>
            <div class="er">
                <h5>${data.sender}</h5>
                <span>${data.time}</span>
            </div>
        </div>
    </div>`;
    }
})

inp.onkeyup=()=>{
    socket.emit('typing',uname)
}

socket.on('typing',(data)=>{
    typing.innerHTML = data+" is typing...";
    typing.style.top = '51px';
    setTimeout(()=>{
        typing.style.top = "-23px";
        typing.innerHTML = "";  
    },2000)
})

function invite(){
    navigator.share({
        title:"Hey..Let's chat with our friends in O2K group chat.",
        url:window.location.href
    })
}
function qr(){
    pop.style.display = 'flex';
}
function closepop(){
    pop.style.display = 'none';
}