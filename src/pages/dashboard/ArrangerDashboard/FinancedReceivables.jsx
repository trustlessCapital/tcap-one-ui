import { useEffect, useState } from 'react'

function FinancedReceivables({data, currencyFormat}) {
  const [response, setResponse] = useState({
    data: null,
    error: null,
    loading: false,
  });

  useEffect(() => {
    const latestFinancedReceivables = data.filter((_, idx) => idx < 3)
    const requests = latestFinancedReceivables
      .map((item) => fetch(process.env.REACT_APP_BASE_URL + '/api/user/accountbyaddress/' + item.borrowerAddress).then((res) => res.json()))
    Promise
      .allSettled(requests)
      .then((res) => {
        const result = [];
        res.forEach((item, idx) => {
          if (item.status === "fulfilled") {
            result.push({
              email: item.value.email,
              name: `${item.value.firstName} ${item.value.lastName}`,
              debtAmount: currencyFormat(latestFinancedReceivables[idx].debtAmount) || null
            })
          }
        })
        setResponse((prev) => ({
          ...prev,
          loading: false,
          error: null,
          data: result,
        }))
      })
  }, [])

  return (
    <div>
      {response.data && response.data.map((item, index) => (
        <div
          style={{
            display: 'flex',
            gap: 15,
          }}
          key={index}
        >
          <span style={{
            flex: 1
          }}>
            {item.name}
          </span>
          <span style={{
            flex: 1
          }}>
            {item.debtAmount}
          </span>
        </div>
      ))}
    </div>
  )
}

export default FinancedReceivables