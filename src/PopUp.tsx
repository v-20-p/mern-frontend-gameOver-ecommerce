
import React,{useState} from 'react'



function PopUp({nameBtn,className ,span=false,children}:{nameBtn:any,children:React.ReactNode,className?:string,span?:boolean}) {
  const [show, setShow] = useState(false)
  const handleOpenClick=()=>{
    setShow(true)

  }
  const handleCloseClick=()=>{
    setShow(false)

  }

  return (

<>
{span ? <span  className={className} onClick={handleOpenClick} style={{cursor:"pointer"}}>{nameBtn}</span>:<button type='button' className={className} onClick={handleOpenClick} style={{cursor:"pointer"}}>{nameBtn}</button>}

{show && 
<div className='pop-up' >
  <div className='pop-up'  onClick={handleCloseClick}></div>
  <div className='pop-up-content'>
    {children}
  </div>
</div>}

</>
  )
}

export default PopUp