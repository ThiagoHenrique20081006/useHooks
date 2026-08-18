import React, { useState, useEffect } from 'react'
import { HashRouter as Router, Routes, Route, Link } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css'

function App() {
  const Cadastro = () => {
    const [tarefas, setTarefas] = useState([])
    const [texto, setTexto] = useState('')

    // Carregar tarefas do localStorage
    useEffect(() => {
      const salvas = localStorage.getItem('tarefas')

      if (salvas) {
        setTarefas(JSON.parse(salvas))
      }
    }, [])

    // Salvar tarefas no localStorage
    useEffect(() => {
      localStorage.setItem('tarefas', JSON.stringify(tarefas))
    }, [tarefas])

    const adicionar = (e) => {
      e.preventDefault()

      if (!texto.trim()) return

      setTarefas([...tarefas, texto.trim()])
      setTexto('')
    }

    const remover = (index) => {
      setTarefas(tarefas.filter((_, i) => i !== index))
    }

    return (
      <div className="min-vh-100 bg-dark text-light py-5">
        <div className="container">

          {/* Cabeçalho */}
          <div className="text-center mb-5">
            <h1 className="fw-bold display-5">
              <span className="text-primary"></span> Gerenciador de Tarefas
            </h1>

            <p className="text-secondary fs-5">
              Organize suas tarefas de forma simples e eficiente
            </p>
          </div>

          <div className="row justify-content-center">
            <div className="col-12 col-md-10 col-lg-8">

              {/* Card principal */}
              <div className="card bg-black border-secondary shadow-lg">
                <div className="card-body p-4">

                  {/* Formulário */}
                  <form onSubmit={adicionar} className="mb-4">
                    <div className="input-group input-group-lg">

                      <input
                        type="text"
                        className="form-control bg-dark text-light border-secondary"
                        placeholder="Digite uma nova tarefa..."
                        value={texto}
                        onChange={(e) => setTexto(e.target.value)}
                      />

                      <button
                        type="submit"
                        className="btn btn-primary px-4 fw-semibold"
                      >
                        + Adicionar
                      </button>

                    </div>
                  </form>

                  {/* Contador */}
                  <div className="d-flex justify-content-between align-items-center mb-3">
                    <h5 className="mb-0">
                      Minhas tarefas
                    </h5>

                    <span className="badge bg-primary rounded-pill">
                      {tarefas.length}
                    </span>
                  </div>

                  {/* Lista */}
                  {tarefas.length === 0 ? (
                    <div className="text-center py-5">
                      <div className="fs-1 mb-3"></div>

                      <h5 className="text-secondary">
                        Nenhuma tarefa cadastrada
                      </h5>

                      <p className="text-secondary mb-0">
                        Adicione sua primeira tarefa acima.
                      </p>
                    </div>
                  ) : (
                    <div className="list-group">

                      {tarefas.map((item, index) => (
                        <div
                          key={index}
                          className="
                            list-group-item
                            list-group-item-action
                            bg-dark
                            text-light
                            border-secondary
                            d-flex
                            justify-content-between
                            align-items-center
                            mb-2
                            rounded
                          "
                        >

                          <div className="d-flex align-items-center gap-3">
                            <span className="text-primary fs-5">
                              ●
                            </span>

                            <span className="fw-medium">
                              {item}
                            </span>
                          </div>

                          <button
                            onClick={() => remover(index)}
                            className="btn btn-outline-danger btn-sm"
                          >
                            Remover
                          </button>

                        </div>
                      ))}

                    </div>
                  )}

                </div>
              </div>

              {/* Rodapé */}
              <div className="text-center mt-4">
                <small className="text-secondary">
                  Suas tarefas são salvas automaticamente no navegador.
                </small>
              </div>

            </div>
          </div>
        </div>
      </div>
    )
  }

  return <Cadastro />
}

export default App