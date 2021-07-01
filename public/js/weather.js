const weatherForm = document.querySelector("form");
const searchInput = document.querySelector("input");
const p1 = document.getElementById("p1");
const p2 = document.getElementById("p2");

weatherForm.addEventListener("submit", (event) => {
    event.preventDefault();
    p1.innerHTML = "Loading...";
    p2.innerHTML = "";
    const location = searchInput.value;

    fetch("/weather?address=" + location)
        .then((response) => {
            response.json()
                .then((data) => {
                    if (data.error != null) {
                        return p1.innerHTML = data.error + " Try another search.";
                    }
                    p1.innerHTML = data.response.location;
                    p2.innerHTML = data.response.description;
                })
        })
})

