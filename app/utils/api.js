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

function getStarCount(repos) {

    return repos.data.reduce((count, repo) => {
        return count + repo.stargazers_count;
    }, 0);
}

function calculateScore(profile, repos) {

    var followers = profile.followers;
    var totalStars = getStarCount(repos);

    return (followers * 3) + totalStars;

}

function handleError(error) {
    console.warn(error);
    return null;
}

function getUserData(player) {
    return axios.all([
        getProfile(player),
        getRepos(player)
    ]).then((data) => {
        var profile = data[0];
        var repos = data[1];

        return {
            profile: profiel,
            score: calculateScore(profile, repos)
        }

    })
}

function sortPlayer(players) {

    return players.sort((a, b) => {
        return b.score - a.score;
    })

}




module.exports = {


    battle: (players) => {
        return axios.all(players.map(getUserData))
            .then(sortPlayers)
            .catch(handleError)
    },

    fetchPopularRepos: (language) => {
        var encodedURI = window.encodeURI('https://api.github.com/search/repositories?q=stars:>1+language:' + language + '&sort=stars&order=desc&type=Repositories');
        return axios.get(encodedURI).then((result) => {
            return result.data.items;
        });
    }
}