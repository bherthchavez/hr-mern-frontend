/* eslint-disable jsx-a11y/anchor-is-valid */

import { useRef, useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

import { useDispatch } from 'react-redux'
import { setCredentials } from './authSlice'
import { useLoginMutation } from './authApiSlice'

import usePersist from '../../hooks/usePersist'

const Login = () => {

    const userRef = useRef()
    const errRef = useRef()
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [errMsg, setErrMsg] = useState('')
    const [persist, setPersist] = usePersist()

    const navigate = useNavigate()
    const dispatch = useDispatch()

    const [login, { isLoading }] = useLoginMutation()


    useEffect(() => {
        userRef.current.focus()
    }, [])

    useEffect(() => {
        setErrMsg('');
    }, [username, password])


    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const { accessToken } = await login({ username, password }).unwrap()
            dispatch(setCredentials({ accessToken }))
            setUsername('')
            setPassword('')
            navigate('/dash')
        } catch (err) {
            if (!err.status) {
                setErrMsg('No Server Response');
            } else if (err.status === 400) {
                setErrMsg('Missing Username or Password');
            } else if (err.status === 401) {
                setErrMsg('Unauthorized');
            } else {
                setErrMsg(err.data?.message);
            }
            errRef.current.focus();
        }
    }

    const handleUserInput = (e) => setUsername(e.target.value)
    const handlePwdInput = (e) => setPassword(e.target.value)
    const handleToggle = () => setPersist(prev => !prev)

    const errClass = errMsg ? "errmsg" : "offscreen"

    if (isLoading) return <p>Loading...</p>


    const content = (
        <main className="w-full h-screen flex flex-col items-center justify-center px-4 bg-white dark:bg-slate-900">
            <div className="max-w-sm w-full text-gray-600">
                <div className="text-center">
                    {/* <img src="https://floatui.com/logo.svg" width={150} className="mx-auto" alt="logo"/> */}
                    <div className="mt-5 space-y-2">
                        <h3 className="text-gray-800 dark:text-gray-300 text-2xl font-bold sm:text-3xl ">Log in to your account</h3>
                        <p ref={errRef} className={errClass} aria-live="assertive">{errMsg}</p>
                    </div>
                </div>
                <form
                    onSubmit={handleSubmit}
                    className="mt-8 space-y-5"
                >
                    <div>
                        <label htmlFor="username" className="font-medium dark:text-gray-400">
                            Email
                        </label>
                        <input

                            className="w-full mt-2 px-3 py-2  text-gray-500 dark:text-gray-300 bg-transparent outline-none border border-gray-300 dark:border-gray-800 focus:border-slate-500 shadow-sm focus:shadow-lg rounded-lg"
                            type="text"
                            id="username"
                            ref={userRef}
                            value={username}
                            onChange={handleUserInput}
                            autoComplete="off"
                            required

                        />
                    </div>
                    <div>
                        <label htmlFor="password" className="font-medium dark:text-gray-400 " >
                            Password
                        </label>
                        <input
                            type="password"
                            id="password"
                            onChange={handlePwdInput}
                            value={password}
                            required

                            className="w-full mt-2 px-3 py-2  text-gray-500 dark:text-gray-300 bg-transparent outline-none border border-gray-300 dark:border-gray-800 focus:border-slate-500 shadow-sm focus:shadow-lg rounded-lg"
                        />
                    </div>
                    <div className='pb-3'>
                    <input
                            type="checkbox"
                            className="accent-slate-800"
                            id="persist"
                            onChange={handleToggle}
                            checked={persist}
                        />
                    <label htmlFor="persist" className="pl-2">
                      
                        Trust This Device
                    </label>

                    </div>
                    
                    
                        <button
                            className="w-full px-4 py-2 text-white font-medium bg-slate-600 hover:bg-slate-700 active:bg-slate-800 rounded-lg duration-150"
                        >
                            Sign in

                        </button>

                       

                </form>
            </div>
        </main>
    )
    return content
}

export default Login