const weatherform = document.querySelector('form')
const search = document.querySelector('input')
const message1 = document.querySelector('#message-1')
const message2 = document.querySelector('#message-2')
weatherform.addEventListener('submit', (e) => {
    e.preventDefault()
    message1.textContent = 'Loading...'
    message2.textContent = ""
    fetch('http://localhost:3000/weather?address=' + search.value).then((response) => {
        response.json().then((data) => {
            if (data.error) {
                console.log(data.error)
                message1.textContent = data.error

            }
            else {
                message1.textContent = data.Location
                message2.textContent = data.data
                console.log(data.Location)
                console.log(data.data)
            }

        })
    })
})

