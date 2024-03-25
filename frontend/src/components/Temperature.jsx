import React from 'react'
import GaugeComponent from 'react-gauge-component'

function Temperature(props) {
  return (
    <div className='border md:col-span-2 flex justify-center rounded shadow-sm relative'>
      <span className='absolute bottom-2  text-lg font-medium'>Temperature</span>
      <GaugeComponent
        className='w-72 pb-4 md:pb-0 md:w-56'
        value={props.value}
        type="radial"
        labels={{
          tickLabels: {
            type: "inner",
            ticks: [
              { value: 20 },
              { value: 40 },
              { value: 60 },
              { value: 80 },
              { value: 100 }
            ]
          }
        }}
        arc={{
          colorArray: ['#e0e7ff','#4f46e5'],
          subArcs: [{limit: 10}, {limit: 30}, {}, {}, {}],
          padding: 0.02,
          width: 0.2
        }}
        pointer={{
          elastic: true,
          animationDelay: 0
        }}
        
      />
    </div>
  )
}

export default Temperature