import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:1337/api',
    headers: {
        Authorization: `Bearer 35a0130f98b1a7538a3e4ec5567b227c0718fe9c709778b23801af14727912d469cdaee8b86ca7b14807e65a9cf637171cca47c85b4f6f762e887dbc8b61942e6f6b2e3924d3befd5effeef234c2ec3846538072e6e25350dbb74cebca1ea1e953ac11b69c50ef1b30a02988b5359a9384199abf0670b65d342bccf8d7c92dcd`
    }
});

export default api;
