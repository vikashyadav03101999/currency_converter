const Base_URL="https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies";

const lists=document.querySelectorAll(".lists select");
const btn=document.querySelector("button");
const from=document.querySelector(".from select");
const to=document.querySelector(".to select");
const msg=document.querySelector(".change");

for(select of lists){
    for (Currecycode in countryList){
        // console.log(Currecycode, countryList[Currecycode]);
        let newOption=document.createElement("option");
        newOption.innerText=Currecycode;
        newOption.value=Currecycode;
        if(select.name==="from" && Currecycode==="USD"){
            newOption.selected="selected";
        }else if(select.name==="to" && Currecycode==="INR"){
            newOption.selected="selected";
        }
        select.append(newOption);
    }
    select.addEventListener("change",(e)=>{
        addFlag(e.target);
    });
}

const addFlag=(update)=>{
// console.log(update);
let Currecycode=update.value;
let countryCode=countryList[Currecycode]; //US
let newLink=`https://flagsapi.com/${countryCode}/flat/64.png`;
let img=update.parentElement.querySelector("img");
img.src=newLink;
}

btn.addEventListener("click",async(e)=>{
    e.preventDefault();
    let amt=document.querySelector(".amount input");
    let amtval=amt.value;
    // console.log(amtval);
    if(amtval===" " || amtval<1){
        amtval=1;
        amt.value="1";
    }
// console.log(from.value,to.value);
const URL=`${Base_URL}/${from.value.toLowerCase()}/${to.value.toLowerCase()}.json`;
let response=await fetch(URL);
let data=await response.json();
// console.log(data);
let rate=data[to.value.toLowerCase()];
let finalAmt=amtval *rate;
msg.innerText=`${amtval} ${from.value} = ${finalAmt} ${to.value}`;
});