import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import Api from "../../api";
import * as actions from "../../redux/actions";
import { FilterItems } from "../filter-items";

import './style.scss';

class PokemonList extends Component {

    state = {
        filter_pokemon: []
    }

    componentDidMount() {
        Api.loadPokemon().then(data => this.props.getPokemon(data)).catch(er => console.log(er))
    }

    componentDidUpdate(prevProps) {
        if (prevProps.pokemon !== this.props.pokemon) {
            this.setState({ filter_pokemon: this.props.pokemon })
        }
    }

    onSearch = keyword => {
        const { pokemon } = this.props;
        if (keyword.lenght === 0) {
            this.setState({ filter_pokemon: pokemon })
        }
            this.setState({ filter_pokemon: pokemon.filter(pokemon => {
                return pokemon.name.toLowerCase().indexOf(keyword.toLowerCase()) > -1})
        });
    }

    render() {
        const { history } = this.props;
        const { filter_pokemon } = this.state;
        return (
            <Fragment>
                <ul className={'pokemon-list'}>
                    {filter_pokemon.slice(0, 20).map(pokemon => {
                        const id = pokemon.url.slice(0,-1).match(/\d+$/ig).toString();
                        return (
                            <li key={id} onClick={() => history.push(`/pokemon-list/${id}`)}>
                                {this.renderPokemon(pokemon)}
                            </li>
                        )
                    })}
                </ul>
                <FilterItems onSearch={this.onSearch}/>
            </Fragment>
        )
    }

    renderPokemon = pokemon => (
    <div className={'pokemon-list-item'}>
        <span>{ pokemon.name }</span>
        <img src={`http://placeimg.com/150/150/${pokemon.name}`} alt='None'/>
    </div>)
}

const mapStateToProps = ({ pokemon }) => {
    return pokemon
}

export default connect(mapStateToProps, actions)(PokemonList);