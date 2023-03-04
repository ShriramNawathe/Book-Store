let infoMHIS = JSON.parse(localStorage.getItem("histroy") || "[]");
let infoMSER = JSON.parse(localStorage.getItem("searched") || "[]");
let hisBtn = document.getElementById("hisBtn");
function triSER() {
  let sIP = document.getElementById("sIP").value;
  let str = sIP.split(" ");
  let dateAndTime = abtTime();
  console.log(sIP, str);
  if (sIP != "") {
    let items = {
      text: sIP,
      time: dateAndTime,
    };
    infoMHIS.push(items);
    localStorage.setItem("histroy", JSON.stringify(infoMHIS));
    let url =
      "https://www.googleapis.com/books/v1/volumes?q=" + str[0] + str[1];

    fetch(url, {
      method: "GET",
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        // let dataitems = data;
        infoMSER.push(data);
        localStorage.setItem("searched", JSON.stringify(infoMSER));
        infoData1(data);
      })
      .catch((error) => console.log(error));
  } else {
    alert("Error:Please Fill Book or Author Name in search Box!!");
  }
}
// fetching date and time from localStorage
function abtTime() {
  var date = new Date();
  var day = date.getDate();
var month = date.getMonth();
  var year = date.getFullYear();
  var hour = date.getHours();
  var minutes = date.getMinutes();

  var dateandtime = `${day}/${month + 1}/${year} at ${hour + 1}:${
    minutes + 1
  }`;

  return dateandtime;
}
// get from api and show and display info of books
function infoData1(e) {
  let opTT2 = document.getElementById("opTT2");
  var sIP= document.getElementById("sIP").value;
  let opTT1= document.getElementById("opTT1");
  let sOp1 = document.getElementById("sOp1");
  opTT2.innerHTML = ""
  opTT1.style.display = "block";
  hisBtn.style.visibility = "visible";
  sOp1.innerHTML = sIP;
  for (let i = 0; i < e.items.length; i++) {
    let item = `
            <div class="container">
            <img src="${e.items[i].volumeInfo.imageLinks.smallThumbnail}" alt="img">
            <div>Title: ${e.items[i].volumeInfo.title}</div>
            <div>Author: ${e.items[i].volumeInfo.authors}</div>
            <div>PageCount: ${e.items[i].pageCount}</div>
            <div>Publisher: ${e.items[i].volumeInfo.publisher}</div>
            
            <div><button class="btn2">Buy Now</button></div>
        </div>`;

    opTT2.innerHTML += item;
  }
}
function clMainO(){
  window.location.href = "./infoSheet.html";
}


