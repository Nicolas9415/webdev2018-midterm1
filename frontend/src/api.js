const HOSTNAME = 'https://blooming-caverns-47026.herokuapp.com/';
const FOLLOWERS_ENDPOINT = '/viz';
const USER_ENDPOINT = '/users/queried';
const FOLLOWER_MAP = {};

class Api {

    static getFollowersOfUser(user) {
        if (FOLLOWER_MAP[user]) {
            return Promise.resolve(FOLLOWER_MAP[user]);
        }
        return fetch(HOSTNAME + FOLLOWERS_ENDPOINT + '/' + user, {
            method: 'POST',
            headers: {
                'Accept': 'application/json'
            }
        }).then(res => res.json())
          .then(followers => {
              if (followers.length === 0) {
                  return [];
              }
              return followers.data.map(follower => {
                  return {
                      id: follower.id,
                      user: follower.login,
                      pic: follower.avatar_url
                  }
              });
          })
          .then(followers => {
              FOLLOWER_MAP[user] = followers;
              return followers;
          });
    }

    static getFrequentlySearched() {
        return fetch(HOSTNAME + USER_ENDPOINT, {
            method: 'GET',
            headers: {
                'Accept': 'application/json'
            }
        }).then(res => res.json());
    }

    static increaseUserSearchCount(user) {
        return fetch(HOSTNAME + USER_ENDPOINT + '/' + user, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
        }).then(res => res.json());
    }
}

export default Api;
