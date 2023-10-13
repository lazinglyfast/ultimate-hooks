import { useField, useResource } from "./hooks"
import { useEffect } from "react"

const App = () => {
  const content = useField("text")
  const name = useField("text")
  const number = useField("text")

  const [notes, notesService] = useResource("http://localhost:3010/notes")
  const [people, peopleService] = useResource("http://localhost:3010/people")

  useEffect(() => {
    notesService.getAll()
    peopleService.getAll()
  }, [])

  const handleNoteSubmit = (e) => {
    e.preventDefault()
    notesService.create({ content: content.value })
  }

  const handlePeopleSubmit = (e) => {
    e.preventDefault()
    peopleService.create({ name: name.value, number: number.value })
  }

  return (
    <div>
      <h2>notes</h2>
      <form onSubmit={handleNoteSubmit}>
        <input {...content} />
        <button>create</button>
      </form>
      {notes.map(n => <p key={n.id}>{n.content}</p>)}

      <h2>people</h2>
      <form onSubmit={handlePeopleSubmit}>
        <input {...name} />
        <br />
        <input {...number} />
        <button>create</button>
      </form>
      {people.map(n => <p key={n.id}>{n.name} {n.number}</p>)}
    </div>
  )
}

export default App
