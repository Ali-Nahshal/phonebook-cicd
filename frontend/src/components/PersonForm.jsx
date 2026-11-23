const PersonForm = ({ onSubmit, onNameChange, nameValue, onNumberChange, numberValue }) => {
  return (
    <>
      <form onSubmit={onSubmit}>
        <div>
          Name: <input onChange={onNameChange} value={nameValue} />
        </div>
        <div>
          Number: <input onChange={onNumberChange} value={numberValue} />
        </div>
        <br />
        <button className="save">Add</button>
      </form>
    </>
  )
}

export default PersonForm