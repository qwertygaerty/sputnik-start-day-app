import Nasa from './components/nasa.js';
// eslint-disable-next-line no-undef,no-new
new Vue({
    el: '#app',
    data: {
        city: 'Томск',
        state: 'Томская область',
        today: new Date().toLocaleString('ru', {
            hour: '2-digit',
            minute: '2-digit',
            year: 'numeric',
            month: 'long',
            day: 'numeric',
        }),
        cords: {
            lon: null,
            lat: null,
        },
        main: {},
        hourly: [],
        daily: [],
        temp_max: null,
        temp_min: null,
        refCount: 0,
        country: null,
    },
    methods: {
        async getCoords() {
            const coords = `https://api.openweathermap.org/geo/1.0/direct?q=${this.city}&appid=54b5f11039f5546975e7028ae4a4a043&lang=ru`;
            // eslint-disable-next-line no-undef
            await axios
                .get(coords)
                .then((response) => {
                    if (!response) return;
                    this.city = response.data[0].name;
                    this.state = response.data[0].state;
                    this.cords.lat = response.data[0].lat;
                    this.cords.lon = response.data[0].lon;
                    this.country = response.data[0].country;
                    this.getWeather();
                })
                .catch(() => {
                    this.city = 'Tomsk';
                    alert('Город не существует: ');
                    this.getCity();
                });
        },
        async getWeather() {
            const weatherToday = `https://api.openweathermap.org/data/2.5/onecall?lat=${this.cords.lat}&lon=${this.cords.lon}&appid=54b5f11039f5546975e7028ae4a4a043&lang=ru`;
            // eslint-disable-next-line no-undef
            await axios
                .get(weatherToday)
                .then((response) => {
                    this.main = response.data.current;
                    this.main.sunrise = this.getDateUnix(this.main.sunrise);
                    this.main.sunset = this.getDateUnix(this.main.sunset);

                    this.hourly = response.data.hourly.filter((_, i) => i % 2 === 0);

                    this.hourly.length = 7;
                    this.daily = response.data.daily;

                    this.hourly.forEach((el) => {
                        // eslint-disable-next-line no-param-reassign
                        el.image = `http://openweathermap.org/img/wn/${el.weather[0].icon}@2x.png`;
                    });

                    this.main.image = `http://openweathermap.org/img/wn/${this.main.weather[0].icon}@2x.png`;
                    this.getMinMax();
                })
                .catch((error) => {
                    console.log(error);
                });
        },
        async getMinMax() {
            const minMaxTemp = `https://api.openweathermap.org/data/2.5/weather?lat=${this.cords.lat}&lon=${this.cords.lon}&appid=54b5f11039f5546975e7028ae4a4a043&lang=ru`;
            // eslint-disable-next-line no-undef
            await axios
                .get(minMaxTemp)
                .then((response) => {
                    this.temp_max = Number(response.data.main.temp_max);
                    this.temp_min = Number(response.data.main.temp_min);
                })
                .catch((error) => {
                    console.log(error);
                });
        },
        async getCityAndState() {
            const Temp = `https://api.openweathermap.org/data/2.5/weather?lat=${this.cords.lat}&lon=${this.cords.lon}&appid=54b5f11039f5546975e7028ae4a4a043&lang=ru`;
            // eslint-disable-next-line no-undef
            await axios
                .get(Temp)
                .then((response) => {
                    this.city = response.data.name;
                    this.getCoords();
                })
                .catch((error) => {
                    console.log(error);
                });
        },
        getDateUnix(el) {
            return new Date(el * 1000).toLocaleString('ru', {
                hour: '2-digit',
                minute: '2-digit',
            });
        },
        getWeekDay(date) {
            const days = ['Вс', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб'];

            return days[date.getDay()];
        },
        getTheme() {
            this.main.dt = new Date(this.main.dt * 1000).toLocaleString('ru', {
                hour: '2-digit',
            });
            if (this.main.dt > 16 || (this.main.dt < 6 && this.main.dt > 16)) {
                const body = document.getElementsByTagName('body')[0];
                body.classList.add('dark');
            }
        },
        getCity() {
            this.isGetCity = true;
        },
    },
    beforeMount() {
        this.getCoords();
    },

    components: {
        'nasa-component': Nasa,
    },
});
