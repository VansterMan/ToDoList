import React, { useState } from 'react';
import { Plus, Check, Trash2 } from 'lucide-react';

export default function App() {
  const [todos, setTodos] = useState([]);
  const [inputValue, setInputValue] = useState('');

  const addTodo = () => {
    if (inputValue.trim()) {
      const newTodo = {
        id: Date.now(),
        text: inputValue,
        completed: false
      };
      setTodos([newTodo, ...todos]);
      setInputValue('');
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      addTodo();
    }
  };

  const toggleTodo = (id) => {
    setTodos(todos.map(todo =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ));
  };

  const deleteTodo = (id) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  const activeTodos = todos.filter(t => !t.completed).length;
  const completedTodos = todos.filter(t => t.completed).length;

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(to bottom, #0f172a 0%, #1e293b 100%)',
      fontFamily: '"DM Sans", system-ui, sans-serif',
      padding: '0',
      margin: '0'
    }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;700&family=Righteous&display=swap');
        
        * {
          box-sizing: border-box;
          margin: 0;
          padding: 0;
        }

        @keyframes slideIn {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .todo-item {
          animation: slideIn 0.3s ease-out;
        }

        input:focus {
          outline: none;
        }
      `}</style>

      {/* Header */}
      <div style={{
        background: 'linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%)',
        padding: '32px 20px 40px',
        position: 'relative',
        overflow: 'hidden'
      }}>
        <div style={{
          position: 'absolute',
          top: '-50px',
          right: '-50px',
          width: '200px',
          height: '200px',
          background: 'rgba(255, 255, 255, 0.1)',
          borderRadius: '50%',
          filter: 'blur(40px)'
        }} />
        
        <div style={{
          maxWidth: '600px',
          margin: '0 auto',
          position: 'relative',
          zIndex: 1
        }}>
          <h1 style={{
            fontSize: '36px',
            fontWeight: '700',
            fontFamily: '"Righteous", cursive',
            color: 'white',
            marginBottom: '8px',
            letterSpacing: '0.5px'
          }}>
            Tasks
          </h1>
          <p style={{
            color: 'rgba(255, 255, 255, 0.9)',
            fontSize: '15px',
            fontWeight: '500'
          }}>
            {activeTodos} active · {completedTodos} completed
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div style={{
        maxWidth: '600px',
        margin: '-20px auto 0',
        padding: '0 20px 40px',
        position: 'relative'
      }}>
        {/* Add Todo Form */}
        <div style={{
          background: 'white',
          borderRadius: '16px',
          padding: '20px',
          boxShadow: '0 10px 40px rgba(0, 0, 0, 0.15)',
          marginBottom: '24px',
          display: 'flex',
          gap: '12px'
        }}>
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Add a new task..."
            style={{
              flex: 1,
              border: 'none',
              fontSize: '16px',
              padding: '12px 16px',
              background: '#f1f5f9',
              borderRadius: '12px',
              fontWeight: '500',
              color: '#1e293b'
            }}
          />
          <button
            onClick={addTodo}
            style={{
              background: inputValue.trim() 
                ? 'linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%)'
                : '#cbd5e1',
              border: 'none',
              borderRadius: '12px',
              padding: '12px 20px',
              color: 'white',
              cursor: inputValue.trim() ? 'pointer' : 'not-allowed',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              fontWeight: '600',
              fontSize: '15px',
              boxShadow: inputValue.trim() ? '0 4px 12px rgba(59, 130, 246, 0.4)' : 'none'
            }}
          >
            <Plus size={20} />
            Add
          </button>
        </div>

        {/* Todo List */}
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '12px'
        }}>
          {todos.length === 0 ? (
            <div style={{
              background: 'rgba(255, 255, 255, 0.05)',
              borderRadius: '16px',
              padding: '60px 20px',
              textAlign: 'center',
              border: '2px dashed rgba(255, 255, 255, 0.1)'
            }}>
              <div style={{
                fontSize: '48px',
                marginBottom: '16px',
                opacity: 0.3
              }}>
                📝
              </div>
              <p style={{
                color: 'rgba(255, 255, 255, 0.6)',
                fontSize: '16px',
                fontWeight: '500'
              }}>
                No tasks yet. Add one to get started!
              </p>
            </div>
          ) : (
            todos.map((todo, index) => (
              <div
                key={todo.id}
                className="todo-item"
                style={{
                  background: 'white',
                  borderRadius: '16px',
                  padding: '16px 20px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '16px',
                  boxShadow: '0 2px 8px rgba(0, 0, 0, 0.08)',
                  opacity: todo.completed ? 0.6 : 1
                }}
              >
                {/* Checkbox */}
                <button
                  onClick={() => toggleTodo(todo.id)}
                  style={{
                    width: '28px',
                    height: '28px',
                    borderRadius: '50%',
                    border: todo.completed ? 'none' : '2.5px solid #cbd5e1',
                    background: todo.completed 
                      ? 'linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%)'
                      : 'white',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0,
                    padding: 0
                  }}
                >
                  {todo.completed && <Check size={16} color="white" strokeWidth={3} />}
                </button>

                {/* Todo Text */}
                <div style={{ flex: 1, minWidth: 0 }}>
                  <p style={{
                    fontSize: '16px',
                    fontWeight: '500',
                    color: '#1e293b',
                    textDecoration: todo.completed ? 'line-through' : 'none',
                    wordWrap: 'break-word'
                  }}>
                    {todo.text}
                  </p>
                </div>

                {/* Delete Button */}
                <button
                  onClick={() => deleteTodo(todo.id)}
                  style={{
                    background: 'transparent',
                    border: 'none',
                    color: '#ef4444',
                    cursor: 'pointer',
                    padding: '8px',
                    borderRadius: '8px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0
                  }}
                >
                  <Trash2 size={20} />
                </button>
              </div>
            ))
          )}
        </div>

        {/* Footer Stats */}
        {todos.length > 0 && (
          <div style={{
            marginTop: '32px',
            padding: '20px',
            background: 'rgba(255, 255, 255, 0.05)',
            borderRadius: '16px',
            display: 'flex',
            justifyContent: 'space-around',
            gap: '20px'
          }}>
            <div style={{ textAlign: 'center' }}>
              <div style={{
                fontSize: '28px',
                fontWeight: '700',
                color: '#3b82f6',
                marginBottom: '4px'
              }}>
                {activeTodos}
              </div>
              <div style={{
                fontSize: '13px',
                color: 'rgba(255, 255, 255, 0.6)',
                fontWeight: '500',
                textTransform: 'uppercase',
                letterSpacing: '0.5px'
              }}>
                Active
              </div>
            </div>
            <div style={{ textAlign: 'center' }}>
              <div style={{
                fontSize: '28px',
                fontWeight: '700',
                color: '#8b5cf6',
                marginBottom: '4px'
              }}>
                {completedTodos}
              </div>
              <div style={{
                fontSize: '13px',
                color: 'rgba(255, 255, 255, 0.6)',
                fontWeight: '500',
                textTransform: 'uppercase',
                letterSpacing: '0.5px'
              }}>
                Done
              </div>
            </div>
            <div style={{ textAlign: 'center' }}>
              <div style={{
                fontSize: '28px',
                fontWeight: '700',
                color: '#10b981',
                marginBottom: '4px'
              }}>
                {todos.length}
              </div>
              <div style={{
                fontSize: '13px',
                color: 'rgba(255, 255, 255, 0.6)',
                fontWeight: '500',
                textTransform: 'uppercase',
                letterSpacing: '0.5px'
              }}>
                Total
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
