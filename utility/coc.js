const axios = require('axios'),
    baseURL = "https://api.clashofclans.com/v1/";

axios.interceptors.response.use(response => response, error => error);

module.exports = class {

    constructor(token) {
        this._token = token;
        this._get = async (endpoint) => {
            return await axios.get(baseURL + endpoint, {
                headers: {
                    Authorization: `Bearer ${this._token}`
                }
            });
        }
    }

    async getClanWarLog(clanTag) {
        return await this._get(`clans/${encodeURIComponent(clanTag)}/warlog`);
    }

    async getClanCurrentWar(clanTag) {
        return await this._get(`clans/${encodeURIComponent(clanTag)}/currentwar`);
    }

    async getClan(clanTag) {
        return await this._get(`clans/${encodeURIComponent(clanTag)}`);
    }

    async getClanMember(clanTag) {
        return await this._get(`clans/${encodeURIComponent(clanTag)}/members`);
    }

    async getPlayer(playerTag) {
        return await this._get(`players/${encodeURIComponent(playerTag)}`);
    }

    async getLocationClanRanking(locationID) {
        return await this._get(`locations/${encodeURIComponent(locationID)}/rankings/clans`);
    }

    async getLocationPlayerRanking(locationID) {
        return await this._get(`locations/${encodeURIComponent(locationID)}/players/players`);
    }

    async getLocationClanVersusRanking(locationID) {
        return await this._get(`locations/${encodeURIComponent(locationID)}/rankings/clans-versus`);
    }

    async getLocationPlayerVersusRanking(locationID) {
        return await this._get(`locations/${encodeURIComponent(locationID)}/players/players-versus`);
    }

    async getGoldPass() {
        return await this._get("goldpass/seasons/current");
    }

}
