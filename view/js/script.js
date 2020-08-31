fetch("https://jsondata.okiba.me/v1/json/Pkpgt200830020757")
.then(response => response.json())
.then(jsonData => console.log(jsonData));