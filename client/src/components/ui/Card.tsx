type Props={

children:React.ReactNode

}

const Card=({children}:Props)=>{

return(

<div

className="backdrop-blur-xl border border-white/10 rounded-3xl bg-white/5 shadow-2xl p-8"

>

{children}

</div>

)

}

export default Card;