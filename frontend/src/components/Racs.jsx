import React from 'react'
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS } from "chart.js/auto";



function Racs(props) {
  
  // const [Hrac1 , setHrac1] = useState(0)
  // const [Hrac2 , setHrac2] = useState(0)
  // useEffect(()=>{
  //     switch(props.rac1){
  //       case 0 : setHrac1(0)
  //       break;
  //       case 1 : setHrac1("3.6rem")
  //       break;
  //       case 2 : setHrac1("7.2rem")
  //       break;
  //       default : setHrac1(0)
  //     }
  // },[props.rac1])

  // useEffect(()=>{
  //     switch(props.rac2){
  //       case 0 : setHrac2(0)
  //       break;
  //       case 1 : setHrac2("3.6rem")
  //       break;
  //       case 2 : setHrac2("7.2rem")
  //       break;
  //       default : setHrac2(0)
  //     }
  // },[props.rac2])


    const data = {
        labels: ['Rac1', 'Rac2',],
        datasets: [
          {
            label: "Racs",
            data: [100,50],
            backgroundColor: [
              "#4f46e5",
              "#ecf0f1",
              "#50AF95",
              "#f3ba2f",
              "#2a71d0",
            ],
            borderColor: "black",
            borderWidth: 1,
            barThickness: 80
          },
        ],
    };


  return (
    <div className='border rounded shadow-sm md:col-span-2 flex justify-center items-center'>
            <Bar data={data} />
    </div>
  )
}

export default Racs