const Persons = ({ persons, deletePerson }) => {
  return (
    <div className="persons">
      {persons.map(p => (
        <li key={p.id}>
          {p.name} - <span>{p.number}</span> {' '}
          <button className="delete"
            onClick={() => deletePerson(p.id)}>
            Delete
          </button>
        </li>
      ))}
    </div>
  )
}

export default Persons