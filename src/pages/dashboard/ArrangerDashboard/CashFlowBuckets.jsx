import React from 'react'
import {ResponsiveContainer, BarChart, CartesianGrid, XAxis, Tooltip, YAxis, Legend, Bar} from 'recharts'

const createChartData = (data) => {
  const name = (date) => {
    return new Intl.DateTimeFormat('en-IN', {
      month: 'short', day: 'numeric',
    }).format(date)
  }
  return data.map((item) => ({
    name: name(item.dueDate * 1000),
    invoiceAmount: (item.debtAmount/80) * 100,
    financedAmount: item.debtAmount
  }))
}


function CashFlowBuckets({data}) {
  return (
    <div style={{ width: "100%", height: 350 }}>
      <ResponsiveContainer>
        <BarChart
          data={createChartData(data)}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <XAxis dataKey="name"/>
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="invoiceAmount" fill="#8884d8" />
          <Bar dataKey="financedAmount" fill="#82ca9d" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}


export default CashFlowBuckets