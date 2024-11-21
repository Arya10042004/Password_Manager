import React, { useRef, useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';

const Manager = () => {
    const passwordRef = useRef();
    const [form, setForm] = useState({ site: "", username: "", password: "" });
    const [passwordArray, setPasswordArray] = useState([]);

    useEffect(() => {
        const passwords = localStorage.getItem("passwords");
        if (passwords) {
            setPasswordArray(JSON.parse(passwords));
        }
    }, []);

    const copyText = (text) => {
        navigator.clipboard.writeText(text).then(() => {
            alert("Copied to clipboard!");
        }).catch(err => {
            console.error("Failed to copy text: ", err);
        });
    };

    const showPassword = () => {
        passwordRef.current.type = 
            passwordRef.current.type === 'password' ? 'text' : 'password';
    };

    const savePassword = () => {
        
        setPasswordArray([...passwordArray, {...form,id: uuidv4()}]);
        localStorage.setItem('passwords', JSON.stringify([...passwordArray, {...form,id: uuidv4()}]));
        
        console.log([...passwordArray, form]);
        setForm({ site: "", username: "", password: "" }); // Reset form
    };
    const deletePassword = (id) => {
        console.log("Deleting password with id", id);

        let c=confirm("Do you really want to delete this password?")
        if(c){
        setForm({ site: "", username: "", password: "" }); // Reset form
        setPasswordArray(passwordArray.filter(item=>item.id!==id));
        localStorage.setItem('passwords', JSON.stringify(passwordArray.filter(item=>item.id!==id)));
        }}
        ;
    const editPassword = (id) => {
        console.log("Editing password with id", id);
        setForm(passwordArray.filter(i=>i.id===id)[0]); // Reset form
        setPasswordArray(passwordArray.filter(item=>item.id!==id));

        
    };
    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    return (
        <>
            <div className="absolute inset-0 -z-10 h-full w-full bg-white bg-[linear-gradient(to_right,#00ff001a_1px,transparent_1px),linear-gradient(to_bottom,#00ff001a_1px,transparent_1px)] bg-[size:14px_24px]">
                <div className="absolute left-0 right-0 top-0 -z-10 m-auto h-[310px] w-[310px] rounded-full bg-green-400 opacity-20 blur-[100px]"></div>
            </div>

            <div>
                <h1 className="text-4xl font-bold text-center">
                    <span className="text-green-700">&lt;</span>
                    <span>Password</span>
                    <span className="text-green-700">OP/&gt;</span>
                </h1>
                <p className="text-green-900 text-lg text-center">Your Own Password Manager</p>

                <div className="text-black flex flex-col p-4 gap-8 items-center">
                    <input
                        value={form.site}
                        onChange={handleChange}
                        placeholder="Enter Website URL"
                        className="rounded-full border border-green-500 w-full p-4 py-1"
                        type="text"
                        name="site"
                        id=""
                    />
                    <div className="flex w-full justify-between gap-8">
                        <input
                            value={form.username}
                            onChange={handleChange}
                            placeholder="Enter Username"
                            className="rounded-full border border-green-500 w-full p-4 py-1"
                            type="text"
                            name="username"
                            id=""
                        />
                        <div className="relative">
                            <input
                                ref={passwordRef}
                                value={form.password}
                                onChange={handleChange}
                                placeholder="Enter Password"
                                className="rounded-full border border-green-500 w-full p-4 py-1"
                                type="password"
                                name="password"
                                id=""
                            />
                            <span className="absolute right-2 top-1 cursor-pointer" onClick={showPassword}>
                               show
                            </span>
                        </div>
                    </div>

                    <button
                        onClick={savePassword}
                        className="flex justify-center items-center bg-green-500 rounded-full px-4 py-2 w-fit hover:bg-green-600 gap-4 border border-green-900 border-2"
                    >
                        <lord-icon
                            src="https://cdn.lordicon.com/jgnvfzqg.json"
                            trigger="hover"
                            
                            style={{ width: '30px', height: '30px' }}
                        ></lord-icon>
                        Add Password
                    </button>
                </div>
                <div className="passwords">
                    <h2 className="text-center text-2xl font-bold py-4">Your Passwords</h2>
                    {passwordArray.length === 0 ? (
                        <div className="text-center">No passwords to show</div>
                    ) : (
                        <table className="table-auto w-full rounded-md overflow-hidden">
                            <thead className="bg-green-800 text-white">
                                <tr>
                                    <th className="py-2">SITE</th>
                                    <th className="py-2">USERNAME</th>
                                    <th className="py-2">PASSWORD</th>
                                    <th className="py-2">ACTIONS</th>
                                </tr>
                            </thead>
                            <tbody className="bg-green-100">
                                {passwordArray.map((item, index) => (
                                    <tr key={index}>
                                        <td className="py-2 text-center w-32 border border-white">
                                            <a href={item.site} target="_blank" rel="noopener noreferrer">
                                                {item.site}
                                            </a>
                                            <div onClick={() => copyText(item.site)} className="cursor-pointer">
                                                <lord-icon
                                                    src="https://cdn.lordicon.com/xkmjbjuw.json"
                                                    trigger="hover"
                                                   
                                                    style={{ width: '25px', height: '25px' }}
                                                ></lord-icon>
                                            </div>
                                        </td>
                                        <td className="py-2 text-center w-32 border border-white">
                                            {item.username}
                                            <div onClick={() => copyText(item.username)} className="cursor-pointer">
                                                <lord-icon
                                                    src="https://cdn.lordicon.com/xkmjbjuw.json"
                                                    trigger="hover"
                                                    
                                                    style={{ width: '25px', height: '25px' }}
                                                ></lord-icon>
                                            </div>
                                        </td>
                                        <td className="py-2 text-center w-32 border border-white">
                                            {item.password}
                                            <div onClick={() => copyText(item.password)} className="cursor-pointer">
                                                <lord-icon
                                                    src="https://cdn.lordicon.com/xkmjbjuw.json"
                                                    trigger="hover"
                                                    
                                                    style={{ width: '25px', height: '25px' }}
                                                ></lord-icon>
                                            </div>
                                        </td>
                                        <td className="py-2 text-center w-32 border border-white">
                                            <span className='mx-2 cursor-pointer' onClick={() =>{editPassword(item.id)}}>
                                                <lord-icon
    src="https://cdn.lordicon.com/wkvacbiw.json"
    trigger="hover"
    >
</lord-icon></span>
<span className='mx-2 cursor-pointer' onClick={() =>{deletePassword(item.id)}}>
    <lord-icon
    src="https://cdn.lordicon.com/skkahier.json"
    trigger="hover"
    >
</lord-icon></span>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    )}
                </div>
            </div>
        </>
    );
};

export default Manager;
