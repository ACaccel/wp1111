let number = 0;

const getNumber = () => {
    return number;
}

const genNumber = () => {
    number = Math.floor(Math.random() * 100);
    return number;
}

export { getNumber, genNumber }