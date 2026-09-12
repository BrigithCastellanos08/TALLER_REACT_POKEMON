import { useEffect, useRef, useState } from 'react'
import './App.css'
import { usePokemon } from './context/PokemonContext'

function App() {
  const { pokemon, loading, error } = usePokemon()
  const [query, setQuery] = useState('')
  const [selectedPokemon, setSelectedPokemon] = useState('')
  const [activeIndex, setActiveIndex] = useState(0)
  const inputRef = useRef<HTMLInputElement>(null)

  const suggestions = query.trim()
    ? pokemon.filter(({ name }) => name.startsWith(query.trim().toLowerCase())).slice(0, 8)
    : []

  useEffect(() => setActiveIndex(0), [query])

  function choosePokemon(name: string) {
    setQuery(name)
    setSelectedPokemon(name)
    setActiveIndex(0)
  }

  function handleKeyDown(event: KeyboardEvent<HTMLInputElement>) {
    if (!suggestions.length) return
    if (event.key === 'ArrowDown') {
      event.preventDefault()
      setActiveIndex((index) => (index + 1) % suggestions.length)
    } else if (event.key === 'ArrowUp') {
      event.preventDefault()
      setActiveIndex((index) => (index - 1 + suggestions.length) % suggestions.length)
    } else if (event.key === 'Enter') {
      event.preventDefault()
      choosePokemon(suggestions[activeIndex].name)
    } else if (event.key === 'Escape') {
      setQuery('')
    }
  }

  return (
    <main className="search-page">
      <div className="brand-mark">PK</div>
      <p className="eyebrow">Pokedex / explorador</p>
      <h1>Encuentra tu Pokemon</h1>
      <p className="intro">Escribe un nombre para ver sugerencias al instante.</p>

      <div className="search-shell">
        <label htmlFor="pokemon-search">Buscar Pokemon</label>
        <div className="input-wrap">
          <span aria-hidden="true" className="search-icon">/</span>
          <input
            ref={inputRef}
            id="pokemon-search"
            type="search"
            value={query}
            placeholder="Ej. pikachu"
            autoComplete="off"
            role="combobox"
            aria-autocomplete="list"
            aria-expanded={suggestions.length > 0}
            aria-controls="pokemon-suggestions"
            aria-activedescendant={suggestions[activeIndex] ? `suggestion-${activeIndex}` : undefined}
            onChange={(event) => {
              setQuery(event.target.value)
              setSelectedPokemon('')
            }}
            onKeyDown={handleKeyDown}
          />
          {query && (
            <button type="button" className="clear-button" onClick={() => { setQuery(''); inputRef.current?.focus() }} aria-label="Limpiar busqueda">x</button>
          )}
        </div>

        {suggestions.length > 0 && (
          <ul id="pokemon-suggestions" className="suggestions" role="listbox">
            {suggestions.map(({ name }, index) => (
              <li key={name}>
                <button
                  id={`suggestion-${index}`}
                  type="button"
                  role="option"
                  aria-selected={index === activeIndex}
                  className={index === activeIndex ? 'active' : ''}
                  onMouseDown={(event) => event.preventDefault()}
                  onClick={() => choosePokemon(name)}
                >
                  <span>{name}</span><span className="arrow">-&gt;</span>
                </button>
              </li>
            ))}
          </ul>
        )}
        {loading && <p className="status">Cargando Pokemon...</p>}
        {error && <p className="status error">{error}</p>}
        {!loading && query && !suggestions.length && <p className="status">No encontramos coincidencias.</p>}
      </div>

      {selectedPokemon && <p className="selected">Seleccionado: <strong>{selectedPokemon}</strong></p>}
      <p className="keyboard-hint">Usa las flechas para navegar <span>Enter</span> para elegir</p>
    </main>
  )
}

export default App
