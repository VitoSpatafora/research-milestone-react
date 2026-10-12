import { useState } from 'react'

const starterItems = [
  { id: 1, title: 'Autumn campaign launch', category: 'Marketing', description: 'A short announcement outlining the new seasonal collection.', published: true },
  { id: 2, title: 'How to set up your profile', category: 'Help Center', description: 'A practical guide for new members joining the platform.', published: false },
]

function App() {
  const [items, setItems] = useState(starterItems)
  const [form, setForm] = useState({ title: '', category: '', description: '' })
  const [query, setQuery] = useState('')
  const [visibility, setVisibility] = useState('all')

  const displayedItems = items.filter((item) => {
    const matchesQuery = `${item.title} ${item.category} ${item.description}`.toLowerCase().includes(query.toLowerCase())
    const matchesVisibility = visibility === 'all' || (visibility === 'published' ? item.published : !item.published)
    return matchesQuery && matchesVisibility
  })

  function handleSubmit(event) {
    event.preventDefault()
    if (!form.title.trim() || !form.category.trim() || !form.description.trim()) return
    setItems((current) => [{ id: Date.now(), ...form, title: form.title.trim(), category: form.category.trim(), description: form.description.trim(), published: false }, ...current])
    setForm({ title: '', category: '', description: '' })
  }

  function updateField(event) {
    setForm({ ...form, [event.target.name]: event.target.value })
  }

  function togglePublished(id) {
    setItems((current) => current.map((item) => item.id === id ? { ...item, published: !item.published } : item))
  }

  return (
    <main className="app-shell">
      <header className="page-header">
        <div><span className="eyebrow">Content operations</span><h1>ContentBoard</h1><p>Draft, organize, and publish your team’s best work.</p></div>
        <div className="header-count">{items.length} items</div>
      </header>

      <section className="panel composer" aria-labelledby="new-content-heading">
        <div><span className="section-kicker">New item</span><h2 id="new-content-heading">Create content</h2></div>
        <form onSubmit={handleSubmit}>
          <label>Title<input name="title" value={form.title} onChange={updateField} placeholder="e.g. October product update" /></label>
          <label>Category<input name="category" value={form.category} onChange={updateField} placeholder="e.g. Product news" /></label>
          <label className="wide">Description<textarea name="description" value={form.description} onChange={updateField} placeholder="Give readers a quick overview…" rows="3" /></label>
          <button type="submit">Add content item <span>→</span></button>
        </form>
      </section>

      <section className="content-section" aria-labelledby="content-heading">
        <div className="section-heading"><div><span className="section-kicker">Library</span><h2 id="content-heading">Your content</h2></div><span className="muted">{displayedItems.length} of {items.length} entries</span></div>
        <div className="filters" aria-label="Content filters"><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search content…" aria-label="Search content" /><div className="filter-tabs">{['all', 'published', 'draft'].map((option) => <button key={option} className={visibility === option ? 'filter active' : 'filter'} onClick={() => setVisibility(option)}>{option === 'all' ? 'All' : option[0].toUpperCase() + option.slice(1)}</button>)}</div></div>
        <div className="item-list">
          {displayedItems.map((item) => <article className="content-card" key={item.id}><div className="card-copy"><span className="category">{item.category}</span><h3>{item.title}</h3><p>{item.description}</p></div><div className="card-actions"><span className={item.published ? 'status published' : 'status'}>{item.published ? 'Published' : 'Draft'}</span><button className="text-button" onClick={() => togglePublished(item.id)}>{item.published ? 'Unpublish' : 'Publish'}</button></div></article>)}
          {!displayedItems.length && <div className="empty-state">No items match these filters. Try a different search or status.</div>}
        </div>
      </section>
    </main>
  )
}

export default App
