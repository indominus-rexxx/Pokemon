import axios from "axios";

export default class Api {
    static loadPokemon = async () => {
        const response = await axios.get('https://pokeapi.co/api/v2/generation/1/').then(response => response.data.pokemon_species).catch(error => console.log(error));
        return response;
    };

    loadPokemonItem = async id => {
        try {
            const [ability, species] = await Promise.all([
                axios.get(`https://pokeapi.co/api/v2/ability/${id}/`).then(response => response.data),
                axios.get(`https://pokeapi.co/api/v2/pokemon-species/${id}/`).then(response => response.data)
            ])
            return {
                ...ability,
                ...species
            }
        } catch (error) {
            throw new Error(error);
        }
    };

    loadEvolutionChain = async url => {
        const response = await axios.get(url)
            .then(response => response.data)
                 .catch(error => console.log(error))
        return response;
    }
};