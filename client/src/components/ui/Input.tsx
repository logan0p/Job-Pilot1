type Props={

placeholder:string;

type?:string;

}

const Input=({placeholder,type="text"}:Props)=>{

return(

<input

type={type}

placeholder={placeholder}

className="w-full rounded-2xl bg-white/5 border border-white/10 p-4 outline-none focus:border-violet-500 transition"

/>

)

}

export default Input;