import React, { Fragment, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useRouteMatch } from "react-router-dom";
import Api from "../../api";
import { getPokemonItem, getURL } from "../../redux/actions";
import { ToHome } from "../to-home";

import "./style.scss";

const { loadPokemonItem } = new Api();

export const PokemonItem = ({ match }) => {

    const dispatch = useDispatch();
    
    useEffect(() => {
        loadPokemonItem(match.params.id).then(data => {
            dispatch(getPokemonItem(data));
            return data.evolution_chain.url;
        })
        .then(url => dispatch(getURL(url))).catch(console.error());
    }, [match.params.id, dispatch]);

    const pokemon_item = useSelector(state => state.pokemon.pokemon_item);

    return (
        <Fragment>
            <ToHome/>
            <PokemoList pokemon_item={pokemon_item}/>
        </Fragment>
    )
}

function PokemoList ({ pokemon_item }) {
        
        const { id, gender_rate, form_descriptions, genera, names, pokedex_numbers, pokemon, varieties, ...rest } = pokemon_item;
        const match = useRouteMatch('/pokemon-list/:id');

        const renederPokemon = Object.entries(rest).map(([key, value]) => {

                const title = key.split('_').join('\t');

                switch (true) {
                    case (typeof value !== 'boolean' && !value) || (!value.length && Array.isArray(value)):
                        return null;

                    case typeof value === "object" && !Array.isArray(value) && key !== 'evolution_chain':
                        return (
                            <li key={key}>
                                <span>{title}:</span>{value.name}
                            </li>
                        );

                    case key === 'evolution_chain':
                        return <li key={key}><span>{title}:</span><Link to={`/pokemon-list/${match.params.id}/evolution-chain`}>{value.url}</Link></li>

                    case key === 'effect_entries':
                        return (
                            <li key={key}>
                                <span>{title}:</span>{value[1].short_effect}
                            </li>
                        );

                    case key === 'egg_groups':
                        if (value.length > 1) {
                            return (
                                <li key={key}>
                                    <span>{title}:</span>{`${value[0].name}/${value[1].name}`}
                                </li>
                            )
                        }
                        return (
                            <li key={key}>
                                <span>{title}:</span>{value[0].name}
                            </li>
                        );

                    case key === 'flavor_text_entries':
                        return (
                            <li key={key}>
                                <span>{title}:</span>{value[42].flavor_text}
                            </li>
                        );

                    case key === 'pal_park_encounters':
                        return (
                            <li key={key}>
                                <span>{title}:</span>{value[0].area.name}
                            </li>
                        );

                    case typeof value === 'boolean':
                        return <li key={key}><span>{title}:</span>{value ? 'Yes' : 'Not'}</li>

                    case key === 'effect_changes':
                        return (
                            <li key={key}>
                                <br/>
                                <h3><span>{title}:</span></h3>
                                <br/>
                                <span>effect entries:</span>{value[0].effect_entries[1].effect}
                                <br/>
                                <span>version group:</span>{value[0].version_group.name}
                                <br/>
                                {value[1] && <div>
                                    <span>effect entries:</span>{value[1].effect_entries[1].effect}
                                    <br/>
                                    <span>version group:</span>{value[1].version_group.name}
                                </div>}
                            </li>
                        );

                    default:
                        return <li key={key}><span>{title}:</span>{value}</li>
                }
            });
            
    return (
        <ul className={'pokemon-info'}>
            {renederPokemon}
        </ul>
    )
}