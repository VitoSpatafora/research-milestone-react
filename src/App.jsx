import React, { useEffect, useState } from 'react'

const starterItems = [
  { id: 1, title: 'Autumn campaign launch', category: 'Marketing', description: 'A short announcement outlining the new seasonal collection.', published: true },
  { id: 2, title: 'How to set up your profile', category: 'Help Center', description: 'A practical guide for new members joining the platform.', published: false },
]

function App() {
  const [items, setItems] = useState(() => {
    try {
      const savedItems = JSON.parse(localStorage.getItem('contentboard-items'))
      return Array.isArray(savedItems) ? savedItems : starterItems
    } catch {
      return starterItems
    }
  })
  const [form, setForm] = useState({ title: '', category: '', description: '' })
  const [editingId, setEditingId] = useState(null)
  const [query, setQuery] = useState('')
  const [visibility, setVisibility] = useState('all')

  const displayedItems = items.filter((item) => {
    const matchesQuery = `${item.title} ${item.category} ${item.description}`.toLowerCase().includes(query.toLowerCase())
    const matchesVisibility = visibility === 'all' || (visibility === 'published' ? item.published : !item.published)
    return matchesQuery && matchesVisibility
  })
  const publishedCount = items.filter((item) => item.published).length
  const draftCount = items.length - publishedCount

  useEffect(() => {
    try { localStorage.setItem('contentboard-items', JSON.stringify(items)) } catch { /* Storage can be unavailable in private browsing. */ }
  }, [items])

  function handleSubmit(event) {
    event.preventDefault()
    if (!form.title.trim() || !form.category.trim() || !form.description.trim()) return
    if (editingId) {
      setItems((current) => current.map((item) => item.id === editingId ? { ...item, ...form, title: form.title.trim(), category: form.category.trim(), description: form.description.trim() } : item))
    } else {
      setItems((current) => [{ id: Date.now(), ...form, title: form.title.trim(), category: form.category.trim(), description: form.description.trim(), published: false }, ...current])
    }
    setForm({ title: '', category: '', description: '' })
    setEditingId(null)
  }

  function updateField(event) {
    setForm({ ...form, [event.target.name]: event.target.value })
  }

  function togglePublished(id) {
    setItems((current) => current.map((item) => item.id === id ? { ...item, published: !item.published } : item))
  }

  function startEditing(item) {
    setForm({ title: item.title, category: item.category, description: item.description })
    setEditingId(item.id)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  function deleteItem(id) {
    setItems((current) => current.filter((item) => item.id !== id))
    if (editingId === id) { setEditingId(null); setForm({ title: '', category: '', description: '' }) }
  }

  return (
    <main className="app-shell">
      <header className="page-header">
        <div><span className="eyebrow">Content operations</span><h1>ContentBoard</h1><p>Draft, organize, and publish your team’s best work.</p></div>
        <div className="header-count">{items.length} items</div>
      </header>

      <section className="stats" aria-label="Content statistics">
        <div className="stat-card"><span>Total items</span><strong>{items.length}</strong><small>in your library</small></div>
        <div className="stat-card"><span>Published</span><strong>{publishedCount}</strong><small>live and visible</small></div>
        <div className="stat-card"><span>Drafts</span><strong>{draftCount}</strong><small>still in progress</small></div>
      </section>

      <section className="panel composer" aria-labelledby="new-content-heading">
        <div><span className="section-kicker">{editingId ? 'Editing item' : 'New item'}</span><h2 id="new-content-heading">{editingId ? 'Update content' : 'Create content'}</h2></div>
        <form onSubmit={handleSubmit}>
          <label>Title<input name="title" value={form.title} onChange={updateField} placeholder="e.g. October product update" /></label>
          <label>Category<input name="category" value={form.category} onChange={updateField} placeholder="e.g. Product news" /></label>
          <label className="wide">Description<textarea name="description" value={form.description} onChange={updateField} placeholder="Give readers a quick overview…" rows="3" /></label>
          <div className="form-actions"><button type="submit">{editingId ? 'Save changes' : 'Add content item'} <span>→</span></button>{editingId && <button type="button" className="cancel-button" onClick={() => { setEditingId(null); setForm({ title: '', category: '', description: '' }) }}>Cancel</button>}</div>
        </form>
      </section>

      <section className="content-section" aria-labelledby="content-heading">
        <div className="section-heading"><div><span className="section-kicker">Library</span><h2 id="content-heading">Your content</h2></div><span className="muted">{displayedItems.length} of {items.length} entries</span></div>
        <div className="filters" aria-label="Content filters"><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search content…" aria-label="Search content" /><div className="filter-tabs">{['all', 'published', 'draft'].map((option) => <button key={option} className={visibility === option ? 'filter active' : 'filter'} onClick={() => setVisibility(option)}>{option === 'all' ? 'All' : option[0].toUpperCase() + option.slice(1)}</button>)}</div></div>
        <div className="item-list">
          {displayedItems.map((item) => <article className="content-card" key={item.id}><div className="card-copy"><span className="category">{item.category}</span><h3>{item.title}</h3><p>{item.description}</p></div><div className="card-actions"><span className={item.published ? 'status published' : 'status'}>{item.published ? 'Published' : 'Draft'}</span><div className="row-actions"><button className="text-button" onClick={() => togglePublished(item.id)}>{item.published ? 'Unpublish' : 'Publish'}</button><button className="text-button" onClick={() => startEditing(item)}>Edit</button><button className="text-button danger" onClick={() => deleteItem(item.id)}>Delete</button></div></div></article>)}
          {!displayedItems.length && <div className="empty-state">No items match these filters. Try a different search or status.</div>}
        </div>
      </section>
    </main>
  )
}

export default App
