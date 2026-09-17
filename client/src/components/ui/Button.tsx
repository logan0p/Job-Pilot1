import { motion } from "framer-motion";

type Props={
children:React.ReactNode;
onClick?:()=>void;
type?:"button"|"submit";
}

const Button=({children,onClick,type="button"}:Props)=>{

return(

<motion.button

whileHover={{scale:1.05}}

whileTap={{scale:.96}}

type={type}

onClick={onClick}

className="px-6 py-3 rounded-2xl font-semibold bg-violet-600 hover:bg-violet-500 transition shadow-xl"

>

{children}

</motion.button>

)

}

export default Button;