import axios from 'axios';

export const state = () => ({
  repos: [],
  currentRepo: [],
  languagesOfRepo: [],
  contributorsOfRepo: []
});

export const mutations = {
  setState(state, { name, value }) {
    return (state[name] = value);
  },

  setLangs(state, { name, value }) {
    return (state[name] = Object.keys(value));
  },

  setContributors(state, { name, value }) {
    return (state[name] = value.slice(0, 10));
  },
};

export const actions = {
  fetchRepos(state, {page, perPage, inputText}) {
    if (inputText) {
      return axios.get(`https://api.github.com/search/repositories?q=${inputText}+in%3Aname&sort=stars&order=desc&page=${page ? page : 1}&per_page=${perPage ? perPage : 10}`).then(response => {
        return state.commit('setState', {
          name: 'repos',
          value: response.data,
        });
      });
  } else {
      return axios.get(`https://api.github.com/search/repositories?q=stars:>0&sort=stars&order=desc&page=${page ? page : 1}&per_page=${perPage ? perPage : 10}`).then(response => {
      return state.commit('setState', {
        name: 'repos',
        value: response.data,
      });
    });
  }
},

  fetchCurrentRepo(state, fullName) {
    return axios.get(`https://api.github.com/repos/${fullName}`).then(response => {
      return state.commit('setState', {
        name: 'currentRepo',
        value: response.data,
      });
    });
  },

  fetchCurrentRepoLangs(state, fullName) {
    return axios.get(`https://api.github.com/repos/${fullName}/languages`).then(response => {
      return state.commit('setLangs', {
        name: 'languagesOfRepo',
        value: response.data,
      });
    });
  },

  fetchCurrentRepoContributors(state, fullName) {
    return axios.get(`https://api.github.com/repos/${fullName}/contributors`).then(response => {
      return state.commit('setContributors', {
        name: 'contributorsOfRepo',
        value: response.data,
      });
    });
  },

  fetchSearchResults(state, {inputText, page, perPage}) {
    return axios.get(`https://api.github.com/search/repositories?q=${inputText}+in%3Aname&sort=stars&order=desc&page=${page ? page : 1}&per_page=${perPage ? perPage : 10}`).then(response => {
      return state.commit('setState', {
        name: 'repos',
        value: response.data,
      });
    });
  },

};


export const getters = {
  getRepos(state) {
    return state.repos;
  },

  getCurrentRepo(state) {
    return state.currentRepo;
  },

  getLangs(state) {
    return state.languagesOfRepo;
  },

  getContributors(state) {
    return state.contributorsOfRepo;
  },
};
