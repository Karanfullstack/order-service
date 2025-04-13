export const validateDates = (couponDate: Date) => {
    const now = new Date();

    const options: Intl.DateTimeFormatOptions = {
        timeZone: 'Europe/Warsaw',
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
    };
    const coupon_date = new Date(couponDate.toLocaleString('en-CA', options));
    const currentDate = new Date(now.toLocaleString('en-CA', options));
    if (coupon_date >= currentDate) return true;
    return false;
};

export const convertIntoIso = (payoload: Date) => {
    const data = payoload.toString();
    const [day, month, year] = data.split('-');
    const date = `${year}-${month}-${day}`;
    const finalDate = new Date(date);
    return finalDate;
};
