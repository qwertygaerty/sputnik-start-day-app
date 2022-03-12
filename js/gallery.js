// eslint-disable-next-line no-undef,no-new
new Vue({
    el: '#gallery',
    data: {
        randomCard: {
            description: null,
            url: null,
            user: null
        },
        isRandomCard: true,
        inputQuery: null,
        collections: null,

    },
    methods: {
        async getRandomCard() {
            const randomCard = 'https://api.unsplash.com/photos/random?client_id=tlzRN1hxSp_9wH-R5d6Ps6CFJWCo8EbXyuL0Xu1fSqg&Accept-Version=v1';
            // eslint-disable-next-line no-undef
            await axios
                .get(randomCard)
                .then((response) => {
                    this.randomCard.description = response.data.description || 'Без Названия';
                    this.randomCard.url = response.data.urls.small;
                    this.randomCard.user = response.data.user.name || 'Без Имени автора';
                })
                .catch((error) => {
                    console.log(error);
                });
        },

        async getSearch(){
            const query = `https://api.unsplash.com/search/collections?client_id=tlzRN1hxSp_9wH-R5d6Ps6CFJWCo8EbXyuL0Xu1fSqg&Accept-Version=v1&query=${this.inputQuery}&per_page=35 `;
            // eslint-disable-next-line no-undef
            await axios
                .get(query)
                .then((response) => {
                    this.isRandomCard = false;
                    this.collections = this.getResults(response.data.results);
                })
                .catch((error) => {
                    console.log(error);
                });
        },

        getResults(results) {
            let res = [];
            for (let i = 0; i < results.length; i++) {
                res.push({
                    title: results[i].title || 'Без Названия',
                    description: results[i].description || 'Без описания',
                    preview_photos: results[i].preview_photos,
                    user:  results[i].user.name,
                });
            }

            return res;
        }
    },

    beforeMount() {
        this.getRandomCard();
    }

});