import {useEffect, useState} from 'react'
import {Typography, CircularProgress}  from '@material-ui/core';
import {ResponsiveContainer, PieChart, Pie, Tooltip, Legend } from 'recharts'

function EntityOnboarding({userData}) {
  const [response, setResponse] = useState({
    data: null,
    error: null,
    loading: false,
  });


  const fetchDetails = (email) => {
    setResponse((prev) => ({
      ...prev,
      loading: true,
      error: null,
      data: null,
    }))

    fetch(process.env.REACT_APP_BASE_URL + '/v1/cr/arranger/' + email)
      .then(response => response.json())
      .then((response) => {
        setResponse((prev) => ({
          ...prev,
          loading: false,
          error: null,
          data: response,
        }))
      })
      .catch(error => {
        setResponse((prev) => ({
          ...prev,
          loading: false,
          data: null,
          error: error,
        }))
      });
  }

  useEffect(() => {
    fetchDetails(userData.email)
  }, [])

  const responseData = response.data?.reduce((total, item) => {
    if (item.status === 'active') {
      return {
        ...total,
        active: {
          ...total.active,
          value: (total.active.value || 0) + 1 
        }
      }
    }
    return {
      ...total,
      pending: {
        ...total.pending,
        value: (total.pending.value || 0) + 1
      }
    }
  },{
    active: {
      "name": "active",
      "value": 0
    },
    pending: {
      "name": "pending",
      "value": 0
    },
  })

  return (
    <div>
      <Typography variant="h5" component="p">
        Entity Onboarding
      </Typography>
      {response.loading && (<CircularProgress color="inherit" />)}
      {response.data && (
        <PieChart width={300} height={300}>
          <Tooltip />
          <Legend />
          <Pie data={[responseData.active]} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={50} fill="#8884d8" />
          <Pie data={[responseData.pending]} dataKey="value" nameKey="name" cx="50%" cy="50%" innerRadius={60} outerRadius={80} fill="#82ca9d" />
        </PieChart>
      )}
    </div>

  )
}

export default EntityOnboarding