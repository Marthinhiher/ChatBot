const messagebar = document.querySelector(".bar-wrapper input");
const sendbtn = document.querySelector(".bar-wrapper button");
const messagebox = document.querySelector(".message-box");
let API_URL = "https://api.openai.com/v1/chat/completions";

sendbtn.onclick = sendMessage;
messagebar.addEventListener("keydown", function(event) {
    if (event.keyCode === 13) {
        event.preventDefault();
        sendMessage();
    }
});

function sendMessage() {
    if (messagebar.value.length > 0) {
        const Typedmessage = messagebar.value;
        messagebar.value = "";
        let message = `<div class="chat message">
                        <img src="image/houseicon.jpg" alt="image">
                        <span>${Typedmessage}</span>
                      </div>`;
        let response = `<div class="chat response">
                            <img src="image/image.png" alt="image">
                            <span>Loading...</span>
                        </div>`;
        messagebox.insertAdjacentHTML("beforeend", message);

        setTimeout(() => {
            messagebox.insertAdjacentHTML("beforeend", response);
            const requestOptions = {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer `
                },
                body: JSON.stringify({
                    "model": "gpt-3.5-turbo",
                    "messages": [{ "role": "user", "content": Typedmessage }]
                })
            };
            fetch(API_URL, requestOptions)
                .then(res => res.json())
                .then(data => {
                    const chatresponse = document.querySelector(".response");
                    chatresponse.innerHTML = data.choices[0].message.content;
                    chatresponse.classList.remove("new");
                })
                .catch((error) => {
                    const chatresponse = document.querySelector(".response");
                    chatresponse.innerHTML = "!Oops, an error occurred. Please try again later.";
                });
        }, 100);
    }
}
