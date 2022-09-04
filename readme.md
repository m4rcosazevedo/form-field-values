# How to use

```ts
function App() {
  const { values, setFieldValue } = useForm<User>()

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.currentTarget
    setFieldValue(name, value)
  }

  const handleSubmit = () {
    console.log(values)
  }

  return (
    <>
      <div className="form-group">
        <label htmlFor="email">Email</label>
        <input type="email" name="email" id="email" onChange={handleChange} />
      </div>

      <div className="form-group">
        <label htmlFor="password">Email</label>
        <input type="password" name="password" id="password" onChange={handleChange} />
      </div>

      <button onClick={handleSubmit}>Enviar</button>
    </>
  )
}

export default withForm(App)
```
