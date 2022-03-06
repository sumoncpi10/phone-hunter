


const searchPhones= () =>{
    const searchField=document.getElementById('input-search');
    const searchText=searchField.value;

    console.log(searchText);
    searchField.value="";
    const url=`https://openapi.programming-hero.com/api/phones?search=${searchText}`;
    searchField.value="";
    fetch(url)
    .then(res => res.json())
    .then(data => displaySearchResult(data));
    // .then(data => console.log(data));
}

const displaySearchResult = phones=>{
    console.log(phones);
    const searchResult=document.getElementById('search-result');
    if(phones.status){
        
        phones.data.forEach(phone => {
            console.log(phone);
            const div=document.createElement('div');
            div.classList.add('col');
            div.innerHTML=
            `
            <div class="card" onclick=phoneDetail("${phone.slug}")>
                <img src="${phone.image}" class="card-img-top" alt="...">
                <div class="card-body">
                <h5 class="card-title text-center">Card ${phone.phone_name}</h5>
                </div>
            </div>
            `;
                searchResult.appendChild(div);
        });
    }
    else{
        alert("No phone Found!!");
    }
}

const phoneDetail= phone =>{
    console.log(phone);
    // console.log(phone);
   
    const url=`https://openapi.programming-hero.com/api/phone/${phone}`;
    fetch(url)
    .then(res => res.json())
    .then(data => phoneDetails(data.data));
}
const phoneDetails= phndtl=>{
    console.log(phndtl);
    const detail=document.getElementById('phone-detail');
    detail.innerText="";
   
        const div=document.createElement('div');
        div.classList.add('col');
        div.innerHTML=
        `
        <div class="card mb-3">
        <img src="${phndtl.image}" class="card-img-top" alt="...">
        <div class="card-body">
          <h5 class="card-title">${phndtl.name}</h5>
          <p class="card-text"><small class="text-muted">${phndtl.releaseDate}</small></p>

          <h6 class="card-title">storage: ${phndtl.mainFeatures.storage}</h6>
          <h6 class="card-title">chipSet: ${phndtl.mainFeatures.chipSet}</h6>
          <h6 class="card-title">displaySize:${phndtl.mainFeatures.displaySize}</h6>
          <h6 class="card-title">memory:${phndtl.mainFeatures.memory}</h6>
          <p class="card-text"></p>
          
        </div>
      </div>
        `;
            detail.appendChild(div);
   
}