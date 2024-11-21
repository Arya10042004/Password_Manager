import React from  'react'
const Navbar = () => {
    return(
        <nav className='bg-slate-800  text-white'>
            <div className="mycontainer flex justify-between
        items-centre px-4 py-5 h-14">
            <div className="Logo font-bold text-white text-2xl">
                
                <span className="text-green-700"> &lt;</span>
               Password
               <span className="text-green-700">OP/&gt;</span>
              
            </div>
            <ul>
                <li className='flex gap-4'>
                    <a className='hover:font-bold' href=''>Home</a>
                    <a className='hover:font-bold' href=''>About</a>
                    <a className='hover:font-bold' href=''>Contact</a>
                    
                </li>
            </ul>
            <button className="text-white font-bold bg-green-600 py-6 px-7 pt-2 rounded-md">
               <span className='font-bold px-4 rounded-full py-2' >GitHub</span> 

            </button>
            </div>

        </nav>
    )
}

export default Navbar