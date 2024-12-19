// 定義常量在函式外
const apiKey = '9ee35667700b352215c8b64ba9b51970';
const geoApiBaseUrl = 'https://api.openweathermap.org/geo/1.0/direct';

function getlonANDlat(city){
    // 1. 使用 Geocoding API 查詢緯度和經度
    const geoApiUrl = `${geoApiBaseUrl}?q=${city}&limit=1&appid=${apiKey}`;
    console.log(geoApiUrl);
    return fetch(geoApiUrl)
   .then(response => response.json())
   .then(locationData => {
     console.log(locationData[0].lat);
     console.log(locationData[0].lon);
     const lat = locationData[0].lat;
     const lon = locationData[0].lon;
     return { lat, lon }; // 返回一個物件
 });
}

function showweatherDetails(event) {
    event.preventDefault();

   // 獲取輸入的城市名稱
   const city = document.getElementById('city').value;
   getlonANDlat(city)
   .then( ({ lat, lon }) => {
       // 使用 Weather API 查詢天氣
       const apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}`;
       console.log(apiUrl);
       return fetch(apiUrl);
    })
    .then(response => response.json())
    .then(data => {
        console.log('Parsed JSON:', data); // 在這裡檢查 JSON 資料
        const weatherInfo = document.getElementById('weatherInfo');
        weatherInfo.innerHTML = `<h2>Weather in ${data.name}</h2>
                                <p>Temperature: ${data.main.temp} &#8451;</p>
                              <p>Weather: ${data.weather[0].description}</p>`;
   
    })
    .catch(error => {
        console.error('Error fetching weather:', error);
        const weatherInfo = document.getElementById('weatherInfo');
        weatherInfo.innerHTML = `<p>Failed to fetch weather. Please try again.</p>`;
    })
}

// 為表單添加提交事件監聽器
document.getElementById('weatherForm').addEventListener('submit', showweatherDetails);
