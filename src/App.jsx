import { useEffect, useState } from "react"
import { useSelector, useDispatch } from "react-redux"
import { fetchCategories, fetchJoke } from "./JokeSlice"

function App() {
  const [category, setCategory] = useState("")
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(fetchCategories())
  }, [dispatch])

  const joke = useSelector((state) => {
    return (state.joke.joke)
  })
  const categories = useSelector((state) => {
    return (state.joke.categories)
  })
  const error = useSelector((state) => {
    return (state.joke.error)
  })
  const loading = useSelector((state) => {
    return (state.joke.loading)
  })

  const handleChangeCategory = (event) => {
    setCategory(event.target.value)
  }
  const getJoke = () => {
    if (!category.trim()) {
      alert("Please enter any category!")
      return
    }

    dispatch(fetchJoke(category.toLowerCase()))
    setCategory("")
  }

  return (<div className="bg-black text-white h-screen flex justify-center items-center">
    <div className="w-11/12 sm:w-2/3 md:w-1/2 text-center p-3 rounded">
      {loading ? <p className="my-3 text-2xl font-medium">Loading</p> :
        <div>
          <input value={category} onChange={handleChangeCategory} className="p-2 text-xl outline-none text-black w-44 sm:w-48 md:w-52 lg:w-60" type="text" placeholder="Enter joke category" />
          <button onClick={getJoke} className="bg-green-500 p-2 text-xl">Get Joke</button>
          <h1 className="my-3 text-2xl font-medium">{joke}
            {joke && joke !== "No Joke" && joke !== "Error" && joke !== "Loading" ? "😂" : ""}
          </h1>
          {error && <div className="text-red-500 font-medium text-xl">
            <p>{error}</p>
            <h3>Available Categories: {categories.join(", ")}</h3>
          </div>
          }</div>}
    </div>
  </div>)
}

export default App