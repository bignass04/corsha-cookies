import React, { useEffect, useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import './Home.scss'

type CookieDropdown = {
  label: string
  value: string
}

type CookieList = {
  chocolate: number
  shortbread: number
  macaroon: number
}

type FieldValues = {
  cookieType: string
  cookieQuantity: string
}

const HomePage = (): React.ReactElement => {
  const [isLoading, setIsLoading] = useState(false)
  const [allCookies, setAllCookies] = useState<CookieDropdown[]>([])
  const [masterOrder, setMasterOrder] = useState<any>({
    chocolate: 0,
    shortbread: 0,
    macaroon: 0,
  })

  const { register, handleSubmit } = useForm()

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://api.mnasser.com/cookies')
        const data = await response.json()
        setIsLoading(false)
        setAllCookies(data)
      } catch (e) {
        console.error(e)
      }
    }
    setIsLoading(true)
    fetchData()
  }, [])

  const addToOrder: SubmitHandler<FieldValues> = ({ cookieType, cookieQuantity }): void => {
    const currentCookieQty = masterOrder[cookieType]
    setMasterOrder({
      ...masterOrder,
      [cookieType]: currentCookieQty + (+cookieQuantity)
    })
  }

  const removeFromOrder: SubmitHandler<FieldValues> = ({ cookieType }): void => {
    setMasterOrder({
      ...masterOrder,
      [cookieType]: 0
    })
  }

  return (
    <main>
      {isLoading
        ? (
          <div>Loading...</div>
        )
        : (
          <>
            <form>
              <div className="field-wrapper">
                <label>
                  Choose Cookies
                  <select {...register('cookieType')}>
                    {allCookies.map(({ label, value }) => (
                      <option key={value} value={value}>{label}</option>
                    ))}
                  </select>
                </label>
                <label>
                  Quantity
                  <select {...register('cookieQuantity')}>
                    {[1, 2, 3, 4, 5].map(num => (
                      <option key={num} value={num}>{num}</option>
                    ))}
                  </select>
                </label>
              </div>
              <div className="button-wrapper">
                <button onClick={handleSubmit(addToOrder)}>Add Cookies</button>
                <button className="second-button" onClick={handleSubmit(removeFromOrder)}>Remove Cookies</button>
              </div>
            </form>
            <section className="cookie-display">
              <div>
                <span>Chocolate Chip:</span>
                <span data-testid="chocolateChip">{masterOrder.chocolate}</span>
              </div>
              <div>
                <span>Shortbread:</span>
                <span data-testid="shortbread">{masterOrder.shortbread}</span>
              </div>
              <div>
                <span>Macaroon:</span>
                <span data-testid="macaroon">{masterOrder.macaroon}</span>
              </div>
            </section>
          </>
        )}
    </main>
  )
}

export default HomePage
