import React, { Component } from 'react'

import styled from 'styled-components'

import ListedPokemon from './components/ListedPokemon'
import DisplayedPokemon from './components/DisplayedPokemon'
import TeamPokemon from './components/TeamPokemon'

import pokemonData from './helpers/pokemonData'


export default class App extends Component {

  state = { selected: 0, team: [] }

  setSelected = idx => () => this.setState({selected: idx})

  addToTeam = idx => () => {
    if (!this.state.team.find(n => n === idx + 1) && this.state.team.length < 6) {
      this.setState({team: [...this.state.team, idx + 1] })
    }
  }

  removeFromTeam = idx => () => {
    this.setState({team: this.state.team.filter(n => n !== idx + 1)})
  }
  
  render() {
      return (
        <Container>
          <PokemonList>
            {pokemonData.map((pokemon, idx) =>
              <ListedPokemon
                key={idx}
                {...pokemon}
                selected={idx === this.state.selected}
                position={ this.state.team.indexOf(idx + 1)}
                clickHandler={this.setSelected(idx)}
              />
            )}
          </PokemonList>
          <PokemonDisplay>
            {pokemonData.map((pokemon, idx) =>
              <DisplayedPokemon
                key={idx}
                {...pokemon}
                selected={idx === this.state.selected}
                clickHandler={this.addToTeam(idx)}
              />
            )}
          </PokemonDisplay>
          <PokemonTeam>
            {pokemonData.map((pokemon, idx) => 
              <TeamPokemon
                key={idx}
                {...pokemon}
                clickHandler={this.removeFromTeam(idx)}
                position={ this.state.team.indexOf(idx + 1) }
              />
            )}
          </PokemonTeam>
        </Container>
      )
  }
}

const Container = styled.div`

  width: 100vw;
  height: 100vh;
  background: rgb(242, 242, 242);

  display: grid;
  grid-template-rows: 1fr 320px;
  grid-template-columns: 320px 1fr;

  background: white;

  & > * {
    background: rgb(240, 240, 240);
    box-shadow: inset 4px 4px 8px 2px #ddd;
    border-radius: 32px;
    margin: 16px;
  }

`

const PokemonList = styled.div`
  grid-row: 1 / 3;
  grid-column: 1 / 2;

  overflow: scroll;
  padding: 24px 0;

`

const PokemonDisplay = styled.div`
  grid-row: 1 / 2;
  grid-column: 2 / 3;
  
  overflow: hidden;
  position: relative;
`

const PokemonTeam = styled.div`
  grid-row: 2 / 3;
  grid-column: 2 / 3;

  overflow: scroll;
  position: relative;
`
