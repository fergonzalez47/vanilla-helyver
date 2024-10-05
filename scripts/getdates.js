
document.addEventListener("DOMContentLoaded", function () {
    const displayYear = document.getElementById("currentYear");
    const displayLastModified = document.getElementById("lastModified");

    const date = new Date();

    displayYear.innerText = "";
    displayYear.innerText = date.getFullYear();

    displayLastModified.innerText = "";
    displayLastModified.innerHTML = formatDate(date);
});


function formatDate(date) {
    const pad = (num) => (num < 10 ? '0' + num : num);
    const day = pad(date.getDate());
    const month = pad(date.getMonth() + 1);
    const year = pad(date.getFullYear() % 100);
    const hour = pad(date.getHours());
    const minute = pad(date.getMinutes());
    const second = pad(date.getSeconds());


    const fullDate = `${year}/${month}/${day} ${hour}:${minute}:${second}`;
    return fullDate;
}