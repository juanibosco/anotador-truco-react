import { useState, useEffect, useRef } from 'react';
import confetti from 'canvas-confetti';
import './App.css';

function App() {
  const [puntosNosotros, setPuntosNosotros] = useState(() => {
    const saved = localStorage.getItem('puntosNosotros');
    return saved !== null ? JSON.parse(saved) : 0;
  });

  const [puntosEllos, setPuntosEllos] = useState(() => {
    const saved = localStorage.getItem('puntosEllos');
    return saved !== null ? JSON.parse(saved) : 0;
  });

  const [ganador, setGanador] = useState(() => {
    const saved = localStorage.getItem('ganador');
    return saved !== null ? saved : null;
  });

  const [showModal, setShowModal] = useState(false); // Controlar la visibilidad del modal
  const debounceRef = useRef(false);

  useEffect(() => {
    localStorage.setItem('puntosNosotros', JSON.stringify(puntosNosotros));
  }, [puntosNosotros]);

  useEffect(() => {
    localStorage.setItem('puntosEllos', JSON.stringify(puntosEllos));
  }, [puntosEllos]);

  useEffect(() => {
    if (ganador) {
      localStorage.setItem('ganador', ganador);
      confetti();
    } else {
      localStorage.removeItem('ganador');
    }
  }, [ganador]);

  const handlePuntosChange = (equipo, puntos) => {
    if (ganador || debounceRef.current) return;

    debounceRef.current = true;

    if (equipo === 'nosotros') {
      setPuntosNosotros(prev => {
        const newPuntos = prev + puntos;
        return newPuntos >= 0 ? newPuntos : 0;
      });
    } else {
      setPuntosEllos(prev => {
        const newPuntos = prev + puntos;
        return newPuntos >= 0 ? newPuntos : 0;
      });
    }

    setTimeout(() => {
      debounceRef.current = false;
    }, 200);
  };

  useEffect(() => {
    if (puntosNosotros >= 30) {
      setGanador('Nosotros');
    } else if (puntosEllos >= 30) {
      setGanador('Ellos');
    }
  }, [puntosNosotros, puntosEllos]);

  const renderCerillas = (puntos) => {
    const puntosActuales = puntos > 15 ? puntos - 15 : puntos;
    const totalGroups = Math.floor(puntosActuales / 5);
    const remainingCerillas = puntosActuales % 5;

    const cerillas = [];

    for (let i = 0; i < totalGroups; i++) {
      cerillas.push(
        <div className="cerilla-group" key={`group-${i}`}>
          <div className="cerilla cerilla1"></div>
          <div className="cerilla cerilla2"></div>
          <div className="cerilla cerilla3"></div>
          <div className="cerilla cerilla4"></div>
          <div className="cerilla cerilla5"></div>
        </div>
      );
    }

    cerillas.push(
      <div className="cerilla-group" key="remaining">
        {remainingCerillas >= 1 && <div className="cerilla cerilla1"></div>}
        {remainingCerillas >= 2 && <div className="cerilla cerilla2"></div>}
        {remainingCerillas >= 3 && <div className="cerilla cerilla3"></div>}
        {remainingCerillas >= 4 && <div className="cerilla cerilla4"></div>}
        {remainingCerillas === 5 && <div className="cerilla cerilla5"></div>}
      </div>
    );

    return cerillas;
  };

  const getTitulo = (puntos) => {
    return puntos < 15 ? "MALAS" : "BUENAS";
  };

  const getTituloClass = (puntos) => {
    return puntos < 15 ? "malas" : "buenas";
  };

  const reiniciarPartida = () => {
    setPuntosNosotros(0);
    setPuntosEllos(0);
    setGanador(null);
    localStorage.removeItem('puntosNosotros');
    localStorage.removeItem('puntosEllos');
    localStorage.removeItem('ganador');
    setShowModal(false); // Cerrar el modal después de reiniciar
  };

  return (
    <>
      <section><h2>Anotador de Truco</h2><hr /></section>
      <section>
        {ganador && <h3>{ganador} ganaron!</h3>}
        <div className="row">
          <div className="col">
            <h4>Nosotros</h4>
            <div className={getTituloClass(puntosNosotros)}>
              {getTitulo(puntosNosotros)}
            </div>
            <div>Total: {puntosNosotros}</div>
            <div className="board">
              {renderCerillas(puntosNosotros)}
            </div>
          </div>
          <div className="col">
            <h4>Ellos</h4>
            <div className={getTituloClass(puntosEllos)}>
              {getTitulo(puntosEllos)}
            </div>
            <div>Total: {puntosEllos}</div>
            <div className="board">
              {renderCerillas(puntosEllos)}
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col">
            <button 
              onClick={() => handlePuntosChange('nosotros', 1)} 
              disabled={ganador}
            >
              ➕
            </button>
            <button 
              onClick={() => handlePuntosChange('nosotros', -1)} 
              disabled={puntosNosotros === 0 || ganador}
            >
              ➖
            </button>
          </div>
          <div className="col">
            <button 
              onClick={() => handlePuntosChange('ellos', 1)} 
              disabled={ganador}
            >
              ➕
            </button>
            <button 
              onClick={() => handlePuntosChange('ellos', -1)} 
              disabled={puntosEllos === 0 || ganador}
            >
              ➖
            </button>
          </div>
        </div>
        <div style={{ marginTop: '20px', textAlign: 'center' }}>
          <button onClick={() => setShowModal(true)}>
            {ganador ? "Nueva Partida" : "Reiniciar Partida"}
          </button>
        </div>
      </section>

      {showModal && (
        <div className="modal-overlay">
          <div className="modal">
            <p>¿Estás seguro de que deseas reiniciar la partida?</p>
            <button onClick={reiniciarPartida}>Confirmar</button>
            <button onClick={() => setShowModal(false)}>Cancelar</button>
          </div>
        </div>
      )}

      <footer className="footer">
        <p>👨🏻‍💻 <a target='_blank' href="https://instagram.com/juanibosco">Juani Bosco</a></p>
      </footer>
    </>
  );
}

export default App;
