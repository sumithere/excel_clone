let leftCol=document.querySelector(".left_col");
let topRow=document.querySelector(".top_row");
let gridSel=document.querySelector(".grid");
let boldBtn=document.querySelector(".bold");
let italicBtn=document.querySelector(".italic");
let underlineBtn=document.querySelector(".underline");
let address=document.querySelector(".address-input");
let rows=100;
let cols=26;
for(let i=0;i<rows;i++){
    let colBox=document.createElement("div");
    colBox.innerText=i+1;
    colBox.setAttribute("class","box");
    leftCol.appendChild(colBox);
}
for(let i=0;i<26;i++){
    let rowBox=document.createElement("div");
    rowBox.setAttribute("class","cells");
    rowBox.innerText=String.fromCharCode(i+65);
    topRow.appendChild(rowBox);
}
for(let i=0;i<100;i++){
    let row=document.createElement("div");
    row.setAttribute("class","rows");

    for(let j=0;j<26;j++){
        let col=document.createElement("div");
        col.setAttribute("class","cols");
        col.setAttribute("colid",j);
        col.setAttribute("rowid",i);
        col.setAttribute("contenteditable", "true");
        
        row.appendChild(col);
    }
    gridSel.appendChild(row);
}

let allSheets=[];
let sheetDB;
function createSheet(){
    let newDB=[];
    for(let i=0;i<rows;i++){
    let row=[];
        for(let j=0;j<cols;j++){
        let obj={
            bold:"normal",
            italic:"normal",
            underline:"none",
            hAlign:"center",
            fontFamily:"sans-serif",
            fontSize:"16",
            color:"black",
            bColor:"none",
            value:"",
            formula:"",
            children:[]
        }
        let sel=document.querySelector(`.cols[rowid="${i}"][colid="${j}"]`);
        sel.innerText="";
        sel.style.fontWeight="normal";
        sel.style.fontStyle="normal";
        sel.style.textDecoration="none";
        row.push(obj);
    }
    newDB.push(row);
}
allSheets.push(newDB);
boldBtn.classList.remove("active-btn");
italicBtn.classList.remove("active-btn");
underlineBtn.classList.remove("active-btn");

}
fun();
let colSel=document.querySelectorAll(".cols");

for(let i=0;i<colSel.length;i++){
    colSel[i].addEventListener("click",function(){
        let rowid=colSel[i].getAttribute("rowid");
        let colid=colSel[i].getAttribute("colid");
        rid=Number(rowid);
        cid=Number(colid);
        let str=`${String.fromCharCode(cid+65)}${rid+1}`;
        address.value=str;
        // let obj={"rowid":rowid,"colid":colid};
        let cellObject=sheetDB[rid][cid];
        if(cellObject.formula==""){
            formulaBar.value="";
        }
        else{
            formulaBar.value=cellObject.formula;
        }
        if(cellObject.bold=="normal"){
            boldBtn.classList.remove("active-btn");
        }
        else{
            boldBtn.classList.add("active-btn");
        }
        if(cellObject.italic=="normal"){
            italicBtn.classList.remove("active-btn");
        }
        else{
            italicBtn.classList.add("active-btn");
        }
        if(cellObject.underline=="none"){
            underlineBtn.classList.remove("active-btn");
        }
        else{
            underlineBtn.classList.add("active-btn");
        }

    })
}
boldBtn.addEventListener("click",function(){
    let uiCellElement=findUICellElement();
    let rid=uiCellElement.getAttribute("rowid");
    let cid=uiCellElement.getAttribute("colid");
    let obj=sheetDB[rid][cid];
    if(obj.bold=="normal"){
        obj.bold="bold";
        uiCellElement.style.fontWeight="bold";
        boldBtn.classList.add("active-btn");
    }
    else{
        obj.bold="normal";
        uiCellElement.style.fontWeight="normal";
        boldBtn.classList.remove("active-btn");
    }

    


})
italicBtn.addEventListener("click",function(){
    let uiCellElement=findUICellElement();
    // console.log(uiCellElement);
    let rid=uiCellElement.getAttribute("rowid");
    let cid=uiCellElement.getAttribute("colid");
    let obj=sheetDB[rid][cid];
    if(obj.italic=="normal"){
        obj.italic="italic";
        uiCellElement.style.fontStyle="italic";
        italicBtn.classList.add("active-btn");
    }
    else{
        obj.italic="normal";
        uiCellElement.style.fontStyle="normal";
        italicBtn.classList.remove("active-btn");
    }
   

})
underlineBtn.addEventListener("click",function(){
    let uiCellElement=findUICellElement();
    let rid=uiCellElement.getAttribute("rowid");
    let cid=uiCellElement.getAttribute("colid");
    let obj=sheetDB[rid][cid];
    if(obj.underline=="none"){
        obj.underline="underline";
        uiCellElement.style.textDecoration = "underline";
        underlineBtn.classList.add("active-btn");
    }
    else{
        obj.underline="none";
        uiCellElement.style.textDecoration = "none";
        underlineBtn.classList.remove("active-btn");
    }
    
})
function findUICellElement(){
    let add=address.value;
    let cellObj=getridcidfromaddress(add);
    let rid=cellObj.rid;
    let cid=cellObj.cid;
    let cellSel=document.querySelector(`.cols[rowid="${rid}"][colid="${cid}"]`);
    return cellSel; 

}

function getridcidfromaddress(address){
    let cid=address.charCodeAt(0);
    let rid=address.slice(1);
    rid=Number(rid)-1;
    cid=Number(cid)-65;
    return {"rid":rid,"cid":cid}; 

}


