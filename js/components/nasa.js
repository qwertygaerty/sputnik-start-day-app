const Nasa = {
    name: 'nasa',
    data() {
        return {
            nasaContent: {
                title: null,
                url: null,
                explanation: null,
            },
        };
    },

    async mounted() {
        const nasa = 'https://api.nasa.gov/planetary/apod?api_key=ZrdWFCny3gCPoPy3rxao7DjaXJGzYMxaHbMuB1cF';

        // eslint-disable-next-line no-undef
        await axios
            .get(nasa)
            .then((response) => {
                this.nasaContent.title = response.data.title;
                this.nasaContent.url = response.data.url;
                this.nasaContent.explanation = response.data.explanation;
            })
            .catch((error) => {
                console.log(error);
            });
    },

    template: `
     <div class="nasa">
        <h2 class="nasa__heading">Информация полученная Nasa</h2>
        <div class="nasa__container">

            <div class="nasa__item">

                <div class="nasa__title">{{nasaContent.title}}</div>
                <img :src="nasaContent.url" alt="Mostly sunny">
                <div class="nasa__text">{{nasaContent.explanation}}</div>

            </div>


        </div>
    </div>
    
    `,
};

export default Nasa;
