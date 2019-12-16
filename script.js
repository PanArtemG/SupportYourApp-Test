const mainWindow = document.getElementById('body');

const loadBgiPage = () => {
    const settings = {
        delay: 1000,
        firstBgi: 1,
        lastBgi: 4
    };

    let date = +Date.now();
    let valueLastSession = checkLastSession();
    let numImg = +checkBgi();

    if (valueLastSession) {
        const checkValueTime = date - valueLastSession;
        const status = checkValueTime > settings.delay;

        if (status) {
            localStorage.setItem('last_session', date);
            changeBgi(settings.firstBgi, settings.lastBgi)
        } else {
            mainWindow.style.background = `url(img/${numImg}.jpg) no-repeat center center fixed`;
            mainWindow.style.backgroundSize = `cover`;
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
    mainWindow.style.background = `url(img/${numImg}.jpg)  no-repeat center center fixed`;
    mainWindow.style.backgroundSize = `cover`;
    localStorage.setItem('bgi', numImg);
    console.log(`change ${numImg}`);
};

const checkBgi = () => {
    let check;
    let numImg = localStorage.getItem('bgi');

    if (numImg) {
        mainWindow.style.background = `url(img/${numImg}.jpg)  no-repeat center center fixed`;
        mainWindow.style.backgroundSize = `cover`;
        check = numImg
    } else {
        localStorage.setItem('bgi', "4");
        mainWindow.style.background = 'url(img/4.jpg)  no-repeat center center fixed';
        mainWindow.style.backgroundSize = `cover`;
        check = false
    }
    return check
};

const randomNum = (min, max) => {
    min = Math.ceil(min);
    max = Math.floor(max);

    return Math.floor(Math.random() * (max - min + 1)) + min
};

//////////////////////////////////
loadBgiPage();
