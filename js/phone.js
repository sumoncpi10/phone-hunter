


const searchPhones= () =>{
    const searchField=document.getElementById('input-search');
    const searchText=searchField.value;

    console.log(searchText);
    searchField.value="";
    const url=`https://openapi.programming-hero.com/api/phones?search=${searchText}`;
    searchField.value="";
    fetch(url)
    .then(res => res.json())
    .then(data => displaySearchResult(data.data));
}

const displaySearchResult = phones=>{
    // console.log(phones);
    const searchResult=document.getElementById('search-result');
    phones.forEach(phone => {
        console.log(phone);
        const div=document.createElement('div');
        div.classList.add('col');
        div.innerHTML=
        `
        <div class="card">
         <img src="${phone.image}" class="card-img-top" alt="...">
        <div class="card-body">
          <h5 class="card-title">Card ${phone.phone_name}</h5>
          <p class="card-text">This is a longer card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
        </div>
      </div>
        `;
        searchResult.appendChild(div);
   });
}