var axios = require('axios');

var id = "YOUR_CLIENT_ID";
var sec = "YOUR_SECRET_ID";
var params = "?client_id=" + id + "&client_secret=" + sec;


/** Hent data. Promise returnerer brukerdata. */

function getProfile(username) {

    return axios.get('https://api.github.com/users/' + username + params)
        .then((user) => {
            /** Dataen formateres før den sendes til sluttbruker
             * Istedefor å få et object "user", får man "user.data"
             * når metoden faktisk blir kalt
             */
            return user.data;
        })

}

// Når du kaller funksjonen, returneres også et promise


function getRepos(username) {
    return axios.get('https://api.github.com/users/' + username + "/repos" + params + "&per_page=100")

}

function getRepos(repos) {

    return repos.data.reduce((count, repo) => {
        return count + repo.stargazers_count;
    }, 0);

}

module.exports = {

    battle: (players) => {

    },



    fetchPopularRepos: (language) => {
        var encodedURI = window.encodeURI('https://api.github.com/search/repositories?q=stars:>1+language:' + language + '&sort=stars&order=desc&type=Repositories');
        return axios.get(encodedURI).then((result) => {
            return result.data.items;
        });
    }
}