import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, withRouter } from "react-router-dom";
import Api from "../../api";
import { getEvolutionChain } from "../../redux/actions";
import { ToHome } from "../to-home";

import "./style.scss";

const { loadEvolutionChain } = new Api();

const EvolutionChain = ({ match }) => {

    const url = useSelector(state => state.pokemon.url);

    const dispatch = useDispatch();

    useEffect(() => {
        loadEvolutionChain(url).then(data => dispatch(getEvolutionChain(data))).catch(er => console.log(er));
    }, [dispatch, match.params.id, url]);

    const evolution_chain = useSelector(state => state.pokemon.evolution_chain);
    const pokemon_name = useSelector(state => state.pokemon.pokemon_item.name);
    
    return (
        <div className={'evolution-chain'}>
            <ToHome/>
            <GoToBack id={match.params.id}/>
            {evolution_chain.chain ? <ul>
                {evolution_chain.chain.evolves_to[0].evolution_details[0].min_level && <li><span>min level:</span>{evolution_chain.chain.evolves_to[0].evolution_details[0].min_level}</li>}
                <li><span>needs overworld rain:</span>{evolution_chain.chain.evolves_to[0].evolution_details[0].needs_overworld_rain ? 'Yes' : 'Not'}</li>
                <li><span>species:</span>{evolution_chain.chain.evolves_to[0].species.name}</li>
                <li><span>trigger:</span>{evolution_chain.chain.evolves_to[0].evolution_details[0].trigger.name}</li>
                <li><span>turn upside down:</span>{evolution_chain.chain.evolves_to[0].evolution_details[0].turn_upside_down ? 'Yes' : 'Not'}</li>
            </ul> : null}
            <img src={`http://placeimg.com/950/950/${pokemon_name}`} alt='None'/>
        </div>
    )
}

const GoToBack = props => {
    return (
        <Link className={'go-to'} to={`/pokemon-list/${props.id}`}>
            Go To Back
        </Link>
    )
}

export default withRouter(EvolutionChain);