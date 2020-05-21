let cartCount = document.querySelector('.index__navbar_cart_count');
let cartDisplay = document.querySelector('.index__navbar_cart');

if (cartCount.textContent == "") {
    cartDisplay.style.display = "none"
}





let arrOfattractions = document.querySelectorAll('.fa')
let arrOfSelectedAttractions = []
arrOfattractions.forEach(att => {
    att.addEventListener('click', e => {
        let attId = e.target.id
        arrOfSelectedAttractions.push(attId)
        e.target.classList.remove('fa-star-o');
        e.target.classList.add('fa-star');

        // V2 => this passes the event target attraction to the server
        
        console.log(e.target.dataset.object);

        const url = '/attractions'
        const params = {
            attraction: e.target.dataset.object
        }

        axios.post(url,params).then(response => {
            console.log(response.data.length);
            cartDisplay.style.display = "inline"
            cartCount.textContent = response.data.length;
        })
    })
})