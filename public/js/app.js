
fetch('http://puzzle.mead.io/puzzle').then((response)=>{
    response.json().then((data)=>{
        console.log(data)
    })
})



const weatherform = document.querySelector('form')
const search = document.querySelector('input')
const messageOne= document.querySelector('#message-1')
const messageTwo= document.querySelector('#message-2')


weatherform.addEventListener('submit',(event)=>{
    //prevent default allows the browser not to refresh and clear the form
    event.preventDefault()
    const location= search.value
   
    fetch('/weather?address='+location).then((response)=>{
    response.json().then((data)=>{
        if(data.error){
            //console.log(data.error)
            messageOne.textContent= data.error
        }else{
            messageOne.textContent= data.location
            messageTwo.textContent= data.forecast
           // console.log(data.location)
            //console.log(data.forecast)
        }
        
    })
})
    console.log(location)
})