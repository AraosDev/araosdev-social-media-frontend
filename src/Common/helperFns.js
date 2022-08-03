export const unixTimeToReadableFormat = (unixTime) => {
    const date = new Date(unixTime*1000);
    const months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
    let formattedDate = `${date.getDate()} ${months[date.getMonth()]} ${date.getFullYear()} ${date.getHours()}:${date.getMinutes()}`;

    return formattedDate;
}