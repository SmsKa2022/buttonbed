console.log('work')


const $cartWr = document.querySelector('[data-cart]')
const $total= document.querySelector('[data-total]')
$cartWr.addEventListener('click', async (e) => {
    if (e.target.dataset.action) {
        //console.log(e.target)
        const parent = e.target.closest('[data-id]')
        const response = await fetch(`/cart/${parent.dataset.id}`, {
            method: "PATCH",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                action: e.target.dataset.action
            })
        })

        if (response.status === 200) {
            const dataFromServer = await response.json()
            const $count = parent.querySelector('[data-count]')
            $count.innerText  = dataFromServer.count
            $total.innerText = dataFromServer.total

            //console.log(result)
        }
    }

       //console.log(parent)
   })

