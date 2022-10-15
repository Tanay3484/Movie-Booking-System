const fetch = require("node-fetch");
// const fetchPopularMovies = fetch("https://api.themoviedb.org/3/movie/popular?api_key=fef4b81643a544afd0e28b879f6d637c&language=en-US&page=1")
// fetchPopularMovies.then(response => response.json()).then(data => console.log(data));

const movie_data = async () => {
    const response = await fetch(
        'https://api.themoviedb.org/3/movie/popular?'+ new URLSearchParams({api_key:'fef4b81643a544afd0e28b879f6d637c',language:'en-US',page:1}) ,
        {
            method: 'GET'
        }
    );
    const data = await response.json()
    return data;
}
