const formElement = document.querySelector('form');

formElement.addEventListener('submit' , (e) => {
    const inputValue = document.querySelector('#location').value;

    e.preventDefault();
    if (!inputValue){
        document.querySelector(('#search-result')).innerHTML = "please enter a location!";
        document.querySelector(('#search-result')).classList.remove('success');
        document.querySelector(('#search-result')).classList.add('error');
    }else{
        fetch(`http://localhost:3000/weather?location=${inputValue}`).then(result => {
            result.json().then(parsedResult => {
                if(parsedResult.error){
                    document.querySelector(('#search-result')).innerHTML = parsedResult.error;
                    document.querySelector(('#search-result')).classList.remove('success');
                    document.querySelector(('#search-result')).classList.add('error');
                }else {
                    console.log(parsedResult)
                    document.querySelector(('#search-result')).innerHTML = `${parsedResult.location} ( ${parsedResult.weatherDescription} ) - it is ${parsedResult.temperature} degree, however it feels ${parsedResult.feelslike} degree out there!`;
                    document.querySelector(('#search-result')).classList.remove('error');
                    document.querySelector(('#search-result')).classList.add('success');
                }
            })
        })
    }
})