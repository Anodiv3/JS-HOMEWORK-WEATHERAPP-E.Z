// свитч темы, заглушка
document.querySelector('.toggleTheme').addEventListener('click', function() {
    const currentTheme = document.body.className;
    const imgWindDirection = document.querySelector(".imgWindDirection");
    const btnToggle = document.querySelector(".toggleTheme");
    const containerForEverything = document.querySelector(".containerForEverything");
    const containerForMainInfo = document.querySelector(".containerForMainInfo");
    const citySelector = document.querySelector(".city-selector");
    const cityName = document.querySelector(".city-name")

    if (currentTheme === 'light-theme') {
        document.body.className = 'dark-theme';
        containerForEverything.style.border = '5px white solid';
        containerForMainInfo.style.borderBottom = '2px white solid';
        imgWindDirection.style.fill = 'white';
        imgWindDirection.style.transition = 'all 1s ease';
        btnToggle.style.color = '#e6e6e6';
        citySelector.style.color = "rgb(216 195 180)";
        cityName.style.border = '2px white solid'
    } else {
        document.body.className = 'light-theme';
        containerForEverything.style.border = '5px #6abfde solid'
        containerForMainInfo.style.borderBottom = '2px #6abfde solid';
        imgWindDirection.style.fill = 'black';
        imgWindDirection.style.transition = 'all 1s ease'
        btnToggle.style.color = '#5191a9'
        citySelector.style.color = "#5191a9";
        cityName.style.border = '2px #6abfde solid'
    }
});