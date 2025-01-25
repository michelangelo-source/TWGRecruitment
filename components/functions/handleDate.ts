export const handleDate = (date: Date) => {
    date = new Date(date);
    let result = ""
    if (date.getDate() < 10) {
        result += "0"
    }
    result += date.getDate() + "."
    if ((date.getMonth()+1) < 10) {
        result += "0"
    }
    result += (date.getMonth()+1) + "." + date.getFullYear();
    return result
}