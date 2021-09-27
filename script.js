let addSheet=document.querySelector(".add_sheets_btn-cointainer");
let sheetsContainer = document.querySelector(".sheets-list");
let sheetsList=document.querySelectorAll(".sheet");

let sheet1=sheetsList[0];
sheet1.classList.add("active");
sheet1.addEventListener("click",colorChange);

let fun=function(){
    createSheet();
    sheetDB=allSheets[0];
}

addSheet.addEventListener("click",function(){
   
    let sheetsList=document.querySelectorAll(".sheet");
    let lastSheet=sheetsList[sheetsList.length-1];
    let idx=lastSheet.getAttribute("idx");
    idx=Number(idx);
    let newSheet=document.createElement("div");
    newSheet.setAttribute("class","sheet");
    newSheet.setAttribute("idx",idx+1);
    newSheet.innerText=`Sheet${idx+2}`
    sheetsContainer.appendChild(newSheet);

    for(let i=0;i<sheetsList.length;i++){
        sheetsList[i].classList.remove("active");
    }
    newSheet.classList.add("active");
    createSheet();
    sheetDB=allSheets[idx+1];
    setUI();


    newSheet.addEventListener("click",colorChange)


}) 
function colorChange(e){
     let newSheet=e.currentTarget;  
     let idx=newSheet.getAttribute("idx");
    let sheetsList=document.querySelectorAll(".sheet");
    for(let i=0;i<sheetsList.length;i++){
        sheetsList[i].classList.remove("active");
    }
    newSheet.classList.add("active");
    sheetDB=allSheets[idx];
    setUI();
}
function setUI(){
    for(let i=0;i<100;i++){
        for(let j=0;j<26;j++){
            let sel=document.querySelector(`.cols[rowid="${i}"][colid="${j}"]`);
            sel.innerText=sheetDB[i][j].value;
            sel.style.fontWeight=sheetDB[i][j].bold;
            sel.style.fontStyle=sheetDB[i][j].italic;
            sel.style.textDecoration=sheetDB[i][j].underline;
        }
    }
    boldBtn.classList.remove("active-btn");
    italicBtn.classList.remove("active-btn");
    underlineBtn.classList.remove("active-btn");
}

