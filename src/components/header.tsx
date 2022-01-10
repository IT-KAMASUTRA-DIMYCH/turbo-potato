import { useEffect } from "react"

type PropsType = {
  tempSearch: string
  searchTerm: string
  fetch_data: (term: string) => void
  setTempSearch: (value: string) => void
  setSearchTerm: (value: string) => void
}

const Header = (props: PropsType) => {
  useEffect(() => {
    props.fetch_data(props.searchTerm)
    // eslint-disable-next-line
  }, [props.searchTerm])

  return (
    <div>
      <input placeholder="search" value={props.tempSearch} onChange={ev => props.setTempSearch(ev.currentTarget.value)} />
      <button onClick={() => {
        props.setSearchTerm(props.tempSearch)
      }}>find</button>
    </div>
  )
}

export default Header