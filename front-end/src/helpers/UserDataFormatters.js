export function birthdayFormatter(date) {
    const birthdayDate = new Date(date);
    const formattedBirthday = birthdayDate.toLocaleDateString('en-US', { 
        month: 'short', 
        day: 'numeric' 
    });

    return formattedBirthday;
}

export function  DateSortHelper(inDate, currDate) {
        
    const currMonth = currDate.getMonth();
    const inMonth = inDate.getMonth();

    let monthDiff = 0;
    
    if (inMonth == currMonth) {
        const currDay = currDate.getDate();
        const inDay  = inDate.getDate();
        if (inDay < currDay) {
            monthDiff = 12
        }
    } else if (inMonth >= currMonth) {
        monthDiff = inMonth - currMonth;
    } else {
        monthDiff = (12 - currMonth + inMonth)
    }
    
    return monthDiff;
}