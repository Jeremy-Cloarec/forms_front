import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:1337/api',
    headers: {
        Authorization: `Bearer d08dd558cebed11423ceb80030e6f9a585de2fd855e4fa6a13ed87d104fff2125251748c4ba4c6429ce6f91914e87537d70fea17d08f4be62447490231c048927effdec40a1b8dd7546964225100f7f614935d5d6bb5ceb9facadaa64083ba5b1b14cd78916406dbe1d316cf786f929ab4557b42b67b23ea913fe6909b90c08c`
    }
});

export default api;
