
const form = document.querySelector('form')
const input = document.querySelector('input')
const msgs1 = document.querySelector('#msg1')
const msgs2 = document.querySelector('#msg2')




form.addEventListener('submit',(events)=>{

    events.preventDefault()

    const location = input.value
    msgs1.textContent = 'Loading.......'
    msgs2.textContent = ''

    fetch('http://localhost:3000/weather?address='+encodeURIComponent(location)).then((response)=>{

    response.json().then((data)=>{
        if(data.error){
            msgs1.textContent = data.error
        }
    else{

        msgs1.textContent = 'Location :'+data.location
        msgs2.textContent = data.forcast


    }

    console.log(data);
    
})

})




})