let formulaBar=document.querySelector(".formula-input");
for(let i=0;i<colSel.length;i++){
    colSel[i].addEventListener("blur",function(){
        let data=colSel[i].innerText;
        let add=address.value;
        let{rid,cid}= getridcidfromaddress(add);
        let cellObj=sheetDB[rid][cid];
        if(cellObj.value==data){
            return;
        }
        if(cellObj.formula){
            removeFormula();
            formulaBar.value="";
        }
        sheetDB[rid][cid].value=data;
        updateChildren(cellObj);
    })
}

formulaBar.addEventListener("keydown",function(e){
    if(e.key=="Enter" && !formulaBar.value){
         removeFormula();
        //  formulaBar.value="";
         
    }
    if(e.key == "Enter" && formulaBar.value){
         let cFormula=formulaBar.value;
         let add=address.value;
         let {rid,cid}=getridcidfromaddress(add);
         let cellObj=sheetDB[rid][cid];
        //  if(cFormula!=cellObj.formula ){
        //      removeFormula();
        //  }
        let value=evaluateFormula(cFormula);
        setCell(value,cFormula);
        setParentCHArray(cFormula,add);
        
    }
})

function removeFormula(){
    let add=address.value;
    let {rid,cid}=getridcidfromaddress(add);
    let cellObj=sheetDB[rid][cid];
    let formula=cellObj.formula;
    let formulaToken=formula.split(" ");
    for(let i=0;i<formulaToken.length;i++){
        let ch=formulaToken[i];
        if(ch.charCodeAt(0)>=65 && ch.charCodeAt(0)<=90){
            let {rid,cid}=getridcidfromaddress(ch);
            let childrens=sheetDB[rid][cid].children;
            let temp=[];
            for(let i=0;i<childrens.length;i++){
                if(childrens[i]!=add){
                    temp.push(childrens[i]);
                }
            }
            sheetDB[rid][cid].children=temp;
        }
    }
    cellObj.formula="";

}
function setCell(value,formula){
    let cell=findUICellElement();
    cell.innerText=value;
    let add=address.value;
    let {rid,cid}=getridcidfromaddress(add);
    sheetDB[rid][cid].value=value;
    sheetDB[rid][cid].formula=formula;
}
function evaluateFormula(formula){
    let formulaTokens=formula.split(" ");
    for(let i=0;i<formulaTokens.length;i++){
        if(formulaTokens[i].charCodeAt(0)>=65 && formulaTokens[i].charCodeAt(0)<=90){
            let{rid,cid}=getridcidfromaddress(formulaTokens[i]);
            let obj=sheetDB[rid][cid];
            let val=obj.value;
            if(val==""){
                val=0;
            }
            formulaTokens[i]=val;
        }
    }
    formula=formulaTokens.join(" ");
    let res=eval(formula);
    return res;
}
function setParentCHArray(formula, chAddress){
    let formulaTokens=formula.split(" ");
    for(let i=0;i<formulaTokens.length;i++){
        let ascii=formulaTokens[i].charCodeAt(0);
        if(ascii>=65 && ascii<=90){
            let{rid,cid}=getridcidfromaddress(formulaTokens[i]);
            let obj=sheetDB[rid][cid];
            obj.children.push(chAddress);
        }
    }
}

function updateChildren(cellObject) {
    let childrens=cellObject.children;
    for(let i=0;i<childrens.length;i++){
        let add=childrens[i];
        let {rid,cid}=getridcidfromaddress(add);
        let form=sheetDB[rid][cid].formula;
        SetChildrenCell(form,rid,cid); 
        updateChildren(sheetDB[rid][cid]);
    } 


}
function findUICellElementFromAdd(add){
    let cellObj=getridcidfromaddress(add);
    let rid=cellObj.rid;
    let cid=cellObj.cid;
    let cellSel=document.querySelector(`.cols[rowid="${rid}"][colid="${cid}"]`);
    return cellSel; 

}

function SetChildrenCell(formula, rid, cid) {
    let newrs=evaluateFormula(formula);
    sheetDB[rid][cid].value=newrs;
    let cellS=document.querySelector(`.cols[colid="${cid}"][rowid="${rid}"]`);
    cellS.innerText=newrs;
}