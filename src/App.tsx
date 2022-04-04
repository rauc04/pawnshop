import { useState } from 'react'
import './App.css'

function App() {
  const [customerPrice, setCustomerPrice] = useState(0)
  const [pawnPrice, setPawnPrice] = useState(0)
  const [contractValue, setContractValue] = useState(0)
  const [percentCustomer, setPercentCustomer] = useState(0)
  const [chargeValue, setChargeValue] = useState(0)
  const [isOlder, setIsOlder] = useState(false)

  const calculateValue = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    event.preventDefault()

    /**
     * Calculate 20% customer
     */
    const percentCustomerLocal = (20 * customerPrice ) / 100

    /**
     * Calculate difference between `Customer price` and `Pawn price`
     */
    const difference = customerPrice - pawnPrice;
    
    if (difference > percentCustomerLocal) {
      setChargeValue(() => difference.toFixed(2) as unknown as number)
      setIsOlder(true)
      setContractValue(() => pawnPrice.toFixed(2) as unknown as number)
      setPercentCustomer(() => percentCustomerLocal.toFixed(2) as unknown as number)
    } else {
      setPercentCustomer(() => difference.toFixed(2) as unknown as number)
      setChargeValue(() => percentCustomerLocal.toFixed(2) as unknown as number)
      setContractValue(() => (customerPrice - percentCustomerLocal).toFixed(2) as unknown as number)
      setIsOlder(false)
    }
  }

  const clearInput = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    event.preventDefault()

    setPercentCustomer(() => 0)
    setChargeValue(() => 0)
    setContractValue(() => 0)
    setIsOlder(false)
  }

  return (
    <div>
      <h1>Casa de empeño</h1>
      <div className='wrapper'>
        <div className='content-inputs'>
          <div className='input-group'>
            <label className='label'>Precio cliente</label>
            <input type='number' className='input' onChange={ event => setCustomerPrice(Number(event.target.value)) } />
          </div>
          <div className='input-group'>
            <label className='label'>Precio empeño</label>
            <input type='number' className='input' onChange={ event => setPawnPrice(Number(event.target.value)) } />
          </div>
          <div className='buttons-wrapper'>
            {
              contractValue > 0 && 
              <button className='btn btn-default' onClick={ (event) => clearInput(event) }>
                Reiniciar
              </button>
            }
            <button className='btn btn-primary' onClick={ (event) => calculateValue(event) }>
              Calcular
            </button>
          </div>
          
        </div>
        <div className='content-result'>
          <div>
            <span className='new-contract-label'>El nuevo contrato es de:</span>
            <div className='content-price'>
              <span className='sign'>$</span>
              <span className='price'>{ contractValue }</span>
            </div>
          </div>
          <div className='content-detail'>
            <div className='detail-item'>
              <span className='detail-label'>Vas a cobrar</span>
              <span className='detail-value'>${ chargeValue }</span>
            </div>
            <div className='detail-item'>
              <span className='detail-label'>{ isOlder ? 'El 20% es' : 'Menor al 20%' }</span>
              <span className='detail-value'>${ percentCustomer }</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default App
