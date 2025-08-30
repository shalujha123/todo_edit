import React, { useState } from 'react';

const App = () => {
  const [val, setVal] = useState('');
  const [items, setItems] = useState([]);
  const [editId, setEditId] = useState(null);

  function handleAdd() {
    if (val.trim() === '') {
      alert('Input should not be empty');
      return;
    }

    if (editId) {
      setItems((prev) =>
        prev.map((item) =>
          item.id === editId ? { ...item, name: val.trim() } : item
        )
      );
      setEditId(null);
    } else {
      const newItem = { id: Date.now(), name: val.trim() };
      setItems((prev) => [...prev, newItem]);
    }
    setVal('');
  }

  function handleDel(id) {
    const delItem = items.filter((item) => item.id !== id);
    setItems(delItem);
  }

  function handleEdit(id) {
    const editItem = items.find((item) => item.id === id);
    setVal(editItem.name);
    setEditId(id);
  }

  return (
    <div>
      <h2>Todo-List</h2>
      <input type="text" value={val} onChange={(e) => setVal(e.target.value)} />
      <button onClick={handleAdd}>{editId ? 'Update' : 'Add'}</button>

      <ul>
        {items.map((item) => (
          <li key={item.id}>
            {item.name}
            <button onClick={() => handleDel(item.id)}>Delete</button>
            <button onClick={() => handleEdit(item.id)}>Edit</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;
