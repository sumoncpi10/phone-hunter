


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
    const searchResultdtl=document.getElementById('phone-detail');
    searchResult.innerHTML="";
    searchResultdtl.innerHTML="";
    document.getElementById('btn-show').style.display='none';
    if(phones.status){
        let i=1;
        phones.data.forEach(phone => {
            
            
            console.log(phone);
            const div=document.createElement('div');
            div.classList.add('col');
            div.innerHTML=
            `
            <div class="card" >
                <img src="${phone.image}" class="card-img-top" alt="...">
                <div class="card-body">
                <h5 class="card-title ">${phone.phone_name}</h5>
                <p class="card-text">Brand: ${phone.brand}</p>
                <a href="#" class="btn btn-primary" onclick=phoneDetail("${phone.slug}")>Details</a>
                </div>
            </div>
            `;
            if(i<21){
                searchResult.appendChild(div);
            }
            if(i==21){
                document.getElementById('btn-show').style.display='block';
              
            }

            i++;
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
        let releaseDate;
        if(phndtl.releaseDate){
            releaseDate=phndtl.releaseDate;
        }
        else{
            releaseDate="No Release Date Found";
        }
        let sensorshow;
        let i=0;
        phndtl.mainFeatures.sensors.forEach(sensor => {
            if(i==0){
                sensorshow=sensor;
            }else{
                sensorshow=sensorshow+', '+sensor;
            }
            
            i++;
            // console.log(sensorshow);
        });
        div.innerHTML=
        `
        <div class="card mb-3">
        <img src="${phndtl.image}" class="card-img-top" alt="...">
        <div class="card-body">
          <h5 class="card-title">${phndtl.name}</h5>
          <p class="card-text"><small class="text-muted">${releaseDate}</small></p>

          <h6 class="card-title">Brand: ${phndtl.brand}</h6>
          <h6 class="card-title">storage: ${phndtl.mainFeatures.storage}</h6>
          <h6 class="card-title">chipSet: ${phndtl.mainFeatures.chipSet}</h6>
          <h6 class="card-title">displaySize: ${phndtl.mainFeatures.displaySize}</h6>
          <h6 class="card-title">memory: ${phndtl.mainFeatures.memory}</h6>
          <h6 class="card-text">Sensors:</h6>
          <p class="card-text"> ${sensorshow}</p>
          <h6 class="card-text">Others: </h6>
          <p class="card-text">Bluetooth: ${phndtl.others.Bluetooth} + ", GPS: " ${phndtl.others.GPS + ", NFC: "} ${phndtl.others.NFC} + ", Radio: "${phndtl.others.Radio} + ", USB: " ${phndtl.others.USB} + ", WLAN: "${phndtl.others.WLAN}</p>
          
        </div>
      </div>
        `;
            detail.appendChild(div);
   
}