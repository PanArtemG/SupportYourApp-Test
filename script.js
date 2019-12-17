const mainWindow = document.getElementById('body');

const settings = {
    delayMs: 28800000,
    firstBgi: 1,
    lastBgi: 4
};

const loadBgiPage = () => {
    let date = +Date.now();
    let valueLastSession = checkLastSession();
    let numImg = +checkBgi();

    if (valueLastSession) {
        const checkValueTime = date - valueLastSession;
        const status = checkValueTime > settings.delayMs;

        if (status) {
            localStorage.setItem('last_session', date);
            changeBgi(settings.firstBgi, settings.lastBgi)
        } else {
            applyBgi(numImg);
        }

    } else {
        localStorage.setItem('last_session', date)
    }
};
/////////////////////////////////
const checkLastSession = () => {
    return localStorage.getItem('last_session')
};

const changeBgi = (min, max) => {
    const numImg = randomNum(min, max);
    applyBgi(numImg);
    localStorage.setItem('bgi', numImg);
};

const checkBgi = () => {
    let check;
    let numImg = localStorage.getItem('bgi');

    if (numImg) {
        applyBgi(numImg);
        check = numImg
    } else {
        localStorage.setItem('bgi', "1");
        applyBgi(settings.firstBgi);
    }
    return check
};

const applyBgi = (numImg) => {
    mainWindow.style.background = `url(img/${numImg}.jpg) no-repeat center center fixed`;
    mainWindow.style.backgroundSize = `cover`;
};

const randomNum = (min, max) => {
    min = Math.ceil(min);
    max = Math.floor(max);

    return Math.floor(Math.random() * (max - min + 1)) + min
};

//////////////////////////////////
document.addEventListener("DOMContentLoaded", loadBgiPage);
