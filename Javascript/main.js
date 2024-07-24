const api = "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";
let inp = document.getElementById("inp");
let imgs = document.querySelector(".imgs");
let btn = document.getElementById("onC");

function getUser() {
    const responsedata = {
        method: 'POST',
        body: JSON.stringify({
            prompt: `${inp.value}`,
            n: 4,
            size: "256x256",
        }),
        headers: {
            Accept: 'application/json',
            Authorization: `Bearer ${process.env.REACT_APP_API_KEY}`,
            'Content-Type': 'application/json',
        },
    }
    return fetch('https://api.openai.com/v1/images/generations', responsedata )
        .then(response => {
            if (!response.ok) {
                throw new Error(`Error! status: ${response.status}`);
            }

            return response.json();
        })
        .catch(error => {
            console.log('error: ', error);
        });
}
btn.addEventListener("click", () => {
    getUser().then(data => {
        imgs.innerHTML = '';
        data.data.forEach(pic => {
            imgs.innerHTML += `<div><img src="${pic.url}" alt=""></div>`
        });
    });
})

