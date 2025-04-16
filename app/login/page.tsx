"use client"

import axios from "axios"
import { useRouter } from "next/navigation"
import { ChangeEvent, useState } from "react"
import Cookies from "js-cookie"

function Login() {
    const [user, setUser] = useState({ email: "", password: "" })
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState("")
    const router = useRouter()

    const handleLogin = (e: ChangeEvent<HTMLInputElement>) => {
        const { value, name } = e.target
        setUser({ ...user, [name]: value })
    }

    const handleSubmit = async () => {
        setLoading(true)
        setError("")

        try {
            const { data } = await axios.post("https://api.escuelajs.co/api/v1/auth/login", user)

            if (data.access_token) {
                Cookies.set("access_token", data.access_token, { expires: 7 })
                router.push("/dashboard")
            }
        } catch (err) {
            setError(`Login failed. Please check your credentials. ${err}`)
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className='flexCenter flex-col gap-4 my-72 border border-orange-600 rounded-lg w-1/3 mx-auto p-4'>
            <h1 className='bold-32'>Login</h1>
            {error && <p className="text-red-500">{error}</p>}
            <input
                onChange={handleLogin}
                value={user.email}
                className='focus:outline-orange-600 w-full md:w-auto p-2 rounded-lg border border-orange-400'
                type="email"
                name="email"
                placeholder="john@mail.com"
                required />
            <input
                onChange={handleLogin}
                value={user.password}
                className='focus:outline-orange-600 w-full md:w-auto p-2 rounded-lg border border-orange-400'
                type="password"
                name="password"
                placeholder="changeme"
                required />
            <button
                onClick={handleSubmit}
                disabled={loading}
                className={`bg-orange-600 text-white w-full md:w-auto rounded-lg px-4 py-2 ${loading && "opacity-50 cursor-not-allowed"}`}>
                {loading ? "Logging in..." : "Login"}
            </button>
        </div>
    )
}

export default Login
