export const handleTime = (date: Date) => {
    date = new Date(date);
    let result = ""
    if (date.getHours() < 10) {
        result += "0"
    }
    result += date.getHours() + ":"
    if ((date.getMinutes()) < 10) {
        result += "0"
    }
    result += (date.getMinutes())
    return result
}