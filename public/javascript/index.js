console.log('ITS LINKED NOW')

let arrOfattractions = document.querySelectorAll('.fa')
let arrOfSelectedAttractions = []
arrOfattractions.forEach(att => {
    att.addEventListener('click', e => {
        let attId = e.target.id
        arrOfSelectedAttractions.push(attId)
        e.target.style.color = 'red'
        const url = 'http://localhost:8080/attractions'
        const params = {
            id: e.target.id,
            idArr: arrOfSelectedAttractions
        }
        axios.post(url, params)
    })
})