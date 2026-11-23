const Filter = ({ onChange, value, placeholder }) => {
  return (
    <div>
      Filter Shown With: <input onChange={onChange} value={value} placeholder={placeholder} />
    </div>
  )
}

export default Filter