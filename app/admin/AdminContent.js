'use client';

import { useState, useEffect } from 'react'
import Link from 'next/link'

export default function AdminContent({ initialData }) {
  const [data, setData] = useState(initialData)
  const [selectedModel, setSelectedModel] = useState(null)
  const [formData, setFormData] = useState({})
  const [action, setAction] = useState(null)

  useEffect(() => {
    const interval = setInterval(fetchData, 5000)
    return () => clearInterval(interval)
  }, [])

  const fetchData = async () => {
    const response = await fetch('/api/admin')
    const newData = await response.json()
    setData(newData)
  }

  const handleAction = async (model, action, id = null) => {
    setSelectedModel(model)
    setAction(action)
    if (action === 'create') {
      setFormData({})
    } else if (action === 'update' && id) {
      const item = data[model].find(item => item.id === id)
      setFormData(item)
    }
  }

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const url = `/api/${selectedModel}${action === 'update' ? `?id=${formData.id}` : ''}`
    const method = action === 'create' ? 'POST' : 'PUT'
    
    await fetch(url, {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData)
    })
    
    fetchData()
    setSelectedModel(null)
    setAction(null)
    setFormData({})
  }

  const handleDelete = async (model, id) => {
    await fetch(`/api/${model}?id=${id}`, { method: 'DELETE' })
    fetchData()
  }

  const modelColors = {
    users: 'bg-blue-100 hover:bg-blue-200',
    drivers: 'bg-green-100 hover:bg-green-200',
    vehicles: 'bg-yellow-100 hover:bg-yellow-200',
    orders: 'bg-purple-100 hover:bg-purple-200'
  };

  const cardColors = {
    users: 'border-blue-300 hover:border-blue-400 hover:shadow-blue-200',
    drivers: 'border-green-300 hover:border-green-400 hover:shadow-green-200',
    vehicles: 'border-yellow-300 hover:border-yellow-400 hover:shadow-yellow-200',
    orders: 'border-purple-300 hover:border-purple-400 hover:shadow-purple-200'
  };

  const renderCard = (item, modelName) => (
    <div key={item.id} className={`bg-white border-2 rounded-lg p-4 mb-4 transition-all duration-300 ${cardColors[modelName]} hover:shadow-lg active:shadow-inner`}>
      <div className="flex justify-between items-start mb-2">
        <h3 className="text-lg font-semibold">{item.name || item.email || `${item.make} ${item.model}` || 'Item'}</h3>
        <div className="space-x-2">
          <button
            onClick={() => handleAction(modelName, 'update', item.id)}
            className="bg-yellow-500 hover:bg-yellow-600 text-white px-2 py-1 rounded text-sm transition duration-300"
          >
            Modifier
          </button>
          <button
            onClick={() => handleDelete(modelName, item.id)}
            className="bg-red-500 hover:bg-red-600 text-white px-2 py-1 rounded text-sm transition duration-300"
          >
            Supprimer
          </button>
        </div>
      </div>
      <div className="text-sm text-gray-600">
        {Object.entries(item).map(([key, value]) => (
          key !== 'id' && (
            <p key={key}><span className="font-medium">{key}:</span> {JSON.stringify(value)}</p>
          )
        ))}
      </div>
    </div>
  )

  const renderForm = () => {
    if (!selectedModel || !action) return null

    return (
      <form onSubmit={handleSubmit} className="mt-4 p-6 bg-white shadow-md rounded-lg">
        <h3 className="text-xl font-bold mb-4">{action === 'create' ? 'Créer' : 'Modifier'} {selectedModel}</h3>
        {Object.keys(data[selectedModel][0] || {}).map(key => (
          key !== 'id' && (
            <div key={key} className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">{key}</label>
              <input
                type="text"
                name={key}
                value={formData[key] || ''}
                onChange={handleInputChange}
                className="border rounded-md p-2 w-full focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
          )
        ))}
        <button type="submit" className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md transition duration-300">
          {action === 'create' ? 'Créer' : 'Mettre à jour'}
        </button>
      </form>
    )
  }

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <Link href="/">home</Link>
      <h1 className="text-3xl font-bold mb-8 text-center">Page d'administration</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {Object.entries(data).map(([modelName, items]) => (
          <div key={modelName} className={`rounded-lg overflow-hidden shadow-lg ${modelColors[modelName]} transition-all duration-300`}>
            <div className="px-4 py-3 flex justify-between items-center">
              <h2 className="text-xl font-semibold">{modelName}</h2>
              <button
                onClick={() => handleAction(modelName, 'create')}
                className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded-md text-sm transition duration-300"
              >
                Créer
              </button>
            </div>
            <div className="p-4 space-y-4 max-h-96 overflow-y-auto">
              {items.map((item) => renderCard(item, modelName))}
            </div>
          </div>
        ))}
      </div>
      {renderForm()}
    </div>
  )
}