const prettyDate = (dateString) => {
    const dateObj = new Date(dateString);
    const options = { weekday: 'short', day: 'numeric', month: 'short', year: 'numeric' };
    const formattedDate = dateObj.toLocaleString('en-US', options);
    return formattedDate;
};

const toISO = (dateString) => {
    const dateObj = new Date(dateString);
    const year = dateObj.getUTCFullYear();
    const month = (dateObj.getUTCMonth() + 1).toString().padStart(2, '0');
    const day = dateObj.getUTCDate().toString().padStart(2, '0');
    const formattedDate = `${year}-${month}-${day}`;
    return formattedDate;
};

module.exports = { prettyDate, toISO };
