
type Props ={count:number}

export default function Home(props:Props) {
  return (
    <h1 className="text-violet-500" >Hello world {props.count}</h1>
  )
}


export const getServerSideProps = async ()=>{
  const response =  await fetch('http://localhost:3333/pools/count');
  const data = await response.json();
  return {
    props:{
      count:data.count
    }
  }
}