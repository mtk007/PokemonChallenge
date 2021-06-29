import React, { Component } from 'react'
import './PokeFetch.css';
class PokeFetch extends Component {
  constructor(props) {
    super(props)
    this.state = {
      pokemonId: '',
      pokeInfo: '',
      pokeSprite: '',
      pokeName: '',
      pokeShadow: ''
    }
  }
  fetchPokemon() {
    let min = Math.ceil(1);
    let max = Math.floor(152);
    let pokeNum = Math.floor(Math.random() * (max - min) + min);
    fetch(`https://pokeapi.co/api/v2/pokemon/${pokeNum}`, {
      method: 'GET'
    }).then(res => res.json())
      .then(res => {
        this.setState({
          pokemonId: res.id,
          pokeInfo: res,
          pokeSprite: '',
          pokeName: "Who's that Pokemon?!",
          pokeShadow: res.sprites.front_default,
        })
      })
      .catch((err) => console.log(err))
    }
  componentDidMount() {
    setTimeout(() => {
      fetch(`https://pokeapi.co/api/v2/pokemon/${this.state.pokemonId}`, {
        method: 'GET'
      }).then(res => res.json())
        .then(res => {
          this.setState({
            pokeSprite: res.sprites.front_default,
            pokeName: res.species.name,
            pokeShadow: '',})
        })
        .catch((err) => console.log(err))
    }, 10000)
  }
  render() {
    return (
      <div className={'wrapper'}>
        <button className={'start'} onClick={() => this.fetchPokemon()}>Start!</button>
        <h1 className={'timer'} >10</h1>
        <div className={'pokeWrap'}>
          <img className={'pokeShadow'} src={this.state.pokeShadow} />
          <img className={'pokeImg'} src ={this.state.pokeSprite} />
          <h1 className={'pokeName'}>{this.state.pokeName}</h1>
        </div>
      </div>
    )
  }
}
export default PokeFetch;