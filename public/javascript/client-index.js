console.log('ITS LINKED NOW')

let arrOfattractions = document.querySelectorAll('.fa')
let arrOfSelectedAttractions = []
arrOfattractions.forEach(att => {
    att.addEventListener('click', e => {
        let attId = e.target.id
        arrOfSelectedAttractions.push(attId)
        e.target.classList.remove('fa-star-o');
        e.target.classList.add('fa-star');
        // const url = 'http://localhost:8080/attractions'
        // const params = {
        //     id: e.target.id,
        //     idArr: arrOfSelectedAttractions
        // }
        // axios.post(url, params)

        // V2 => this passes the event target attraction to the server
        
        console.log(e.target.dataset.object);

        const url = '/attractions'
        const params = {
            attraction: e.target.dataset.object
        }

        axios.post(url,params)

    })
})