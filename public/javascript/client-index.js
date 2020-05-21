
console.log('ITS LINKED NOW')

let arrOfattractions = document.querySelectorAll('.fa')
let arrOfSelectedAttractions = []

arrOfattractions.forEach(att => {
    att.addEventListener('click', e =>{
        // let attId = e.target.id
        // arrOfSelectedAttractions.push(attId)
        e.target.style.color = 'red'

        console.log(e.target.dataset.object);

        const url = '/attractions'
        const params = {
            attraction: e.target.dataset.object
        }

        axios.post(url,params)
        // axios({
        //     method: 'post',
        //     url: url,
        //     data: e.target.dataset.object
        // })
    })
})