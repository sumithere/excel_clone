let addSheet=document.querySelector(".add_sheets_btn-cointainer");
let idx=1;
addSheet.addEventListener("click",function(){
    let sheetCointainer=document.createElement("div");
    sheetCointainer.innerHTML=`<div class="sheet" idx="${idx}">Sheet${idx}</div>`;
    idx++;
})