import Axios from "axios"

console.log('ITS LINKED NOW')

let arrOfattractions = document.querySelectorAll('.fa')
let arrOfSelectedAttractions = []
arrOfattractions.forEach(att => {
    att.addEventListener('click', e =>{
        let attId = e.target.id
        arrOfSelectedAttractions.push(attId)
        e.target.style.color = 'red'
        const url = 'http://localhost:8080/stars/selected'
        const params = {
            id:e.target.id, 
        }
        Axios.post(url,params).then(res =>{
            let starCounter = res.length
        })
    })
})