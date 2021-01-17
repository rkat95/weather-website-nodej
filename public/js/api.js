console.log("Client side javascript file is loaded");

const weatherForm = document.querySelector("form");
const searchInput = document.querySelector("input");
const message1 = document.querySelector("#message-1");
const message2 = document.querySelector("#message-2");

weatherForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const location = searchInput.value;

  message1.textContent = "Loading Weather Forecast...";
  message2.textContent = "";

  fetch(`/weather?address=${location}`)
    .then((response) => {
      response.json().then((data) => {
        if (data.error) message1.textContent = data.error;
        else {
          message1.textContent = data.forecast;
          message2.textContent = data.location;
        }
      });
    })
    .catch((err) => {
      console.log("err", err);
    });
});
