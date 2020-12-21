import { GET_EVOLUTION_CHAIN, GET_POKEMON, GET_POKEMON_ITEM, GET_URL } from '../action-types';

const init_state = {
    pokemon: [],
    pokemon_item: {},
    evolution_chain: {},
    url: ''
}

export default function(state = init_state, action) {
    switch (action.type) {
        case GET_POKEMON:
            return {
                ...state,
                pokemon: action.payload
            };
        case GET_POKEMON_ITEM:
            return {
                ...state,
                pokemon_item: action.payload
            }
        case GET_EVOLUTION_CHAIN:
            return {
                ...state,
                evolution_chain: action.payload
            }
        case GET_URL:
            return {
                ...state,
                url: action.payload
            }
    
        default:
            return state;
    }
}