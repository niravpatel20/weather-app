console.log('Client side javascript file');


const form = document.querySelector('form');
const search = document.querySelector('input');
const result = document.querySelector('.result');

form.addEventListener('submit', (e)=>{
    e.preventDefault();
    
    const location = search.value;
    result.innerHTML = 'Loading...';

    fetch('http://localhost:3000/weather?address='+location).then((response)=>{
    response.json().then((data) => {
        if(data.error){
            result.innerHTML = data.error;
        }
        else{
            result.innerHTML = data.location + '<br><br>' + data.forecast;
        }
    })
})


})