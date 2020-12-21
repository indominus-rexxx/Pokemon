import * as action_types from "../action-types";

export const getPokemon = pokemon => {
    return {
        type: action_types.GET_POKEMON,
        payload: pokemon
    }
}

export const getPokemonItem = pokemon_item => {
    return {
        type: action_types.GET_POKEMON_ITEM,
        payload: pokemon_item
    }
}

export const getEvolutionChain = evolution_chain => {
    return {
        type: action_types.GET_EVOLUTION_CHAIN,
        payload: evolution_chain
    }
}

export const getURL = url => {
    return {
        type: action_types.GET_URL,
        payload: url
    }
}