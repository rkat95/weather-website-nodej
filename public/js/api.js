console.log("Client side javascript file is loaded");

const weatherForm = document.querySelector("form");
const searchInput = document.querySelector("input");
const message1 = document.querySelector("#message-1");
const message2 = document.querySelector("#message-2");
const message4 = document.querySelector("#message-4");

weatherForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const location = searchInput.value;

  message1.textContent = "Loading Weather Forecast...";
  message2.textContent = "";
  message4.textContent = "";

  fetch(`/weather?address=${location}`)
    .then((response) => {
      response.json().then((data) => {
        if (data.error) message1.textContent = data.error;
        else {
          message1.textContent = data.forecast;
          message2.textContent = `Location: ${data.location}`;
          message4.textContent = `Temperature: ${data.temperature} degrees, Feels like: ${data.feelslike} degrees`;
        }
      });
    })
    .catch((err) => {
      console.log("err", err);
    });
});
