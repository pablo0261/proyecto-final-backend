const add30Days = (stringDate) => {
    const date = new Date(stringDate);

    date.setDate(date.getDate() + 30);
    const year = date.getFullYear();
    const month = ('0' + (date.getMonth() + 1)).slice(-2);
    const day = ('0' + date.getDate()).slice(-2);

    const newDate = year + '-' + month + '-' + day;

    return newDate;

}

module.exports = { add30Days };