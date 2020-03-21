import axios from 'axios';

export default class SwapiService {

  _baseUrl = 'https://swapi.co/api/';
  _baseImgUrl = 'https://starwars-visualguide.com/assets/img/';
  apiData = {
    people: {
      url: 'people/',
      imgUrl: 'characters/',
      method: this._transformPerson
    },
    starships: {
      url: 'starships/',
      imgUrl: 'starships/',
      method: this._transformStarship
    },
    planets: {
      url: 'planets/',
      imgUrl: 'planets/',
      method: this._transformPlanet
    }
  };

  _catchId = (url) => {
    const pattern = /\/(\d+)\/$/;
    return url.match(pattern)[1];
  };

  _transformPerson(item) {
    const id = this._catchId(item.url);
    const img = this._baseImgUrl + this.apiData.people.imgUrl + id + '.jpg';
    return {
      id,
      name: item.name,
      img,
      height: item.height,
      hairColor: item.hair_color,
      eyeColor: item.eye_color
    }
  };

  _transformStarship(item) {
    const id = this._catchId(item.url);
    const img = this._baseImgUrl + this.apiData.starships.imgUrl + id + '.jpg';
    return {
      id,
      name: item.name,
      img,
      model: item.model,
      length: item.length,
      passengers: item.passengers
    }
  };

  _transformPlanet(item) {
    const id = this._catchId(item.url);
    const img = this._baseImgUrl + this.apiData.planets.imgUrl + id + '.jpg';
    return {
      id,
      name: item.name,
      img,
      climate: item.climate,
      diameter: item.diameter,
      population: item.population
    }
  };

  fetchData = async (data) => {
    const { url, method } = data;
    const fetchUrl = this._baseUrl + url;
    const result = await axios.get(fetchUrl);
    return result.data.results.map((item) => method.call(this, item));
  };

}