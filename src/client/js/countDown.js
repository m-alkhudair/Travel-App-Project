//To target the date input field
const tripDate = document.getElementById('trip-date');

// Create a new date instance dynamically with JS
const today = () => {
	let d = new Date();
    let newDate = d.getFullYear()+ '-'+(d.getMonth()+1)+'-'+ d.getDate();

	return newDate;
}

// To prevent selection of passed dates
tripDate.setAttribute('min', today());

// To return the number of days left
const countDown = (date)=> {
    let tripDateT = new Date(date? date: tripDate.value).getTime();
    let todayT = new Date(today()).getTime();
    const daysLeft = Math.floor((tripDateT - todayT)/(1000*60*60*24));

    return daysLeft;
}

export {countDown}
export {today}