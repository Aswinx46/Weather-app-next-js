"use client"

import { useState } from "react"
import axios from 'axios'
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"
import LoadingPage from "./loading"
export default function FindWeather() {
    const router = useRouter()
    const [location, setLocation] = useState<string>('')
    const [loading, setLoading] = useState(false)
    const handleSearch = async () => {
        setLoading(true)
        try {
            const response = await axios.get('/api/weather', {
                params: {
                    location
                }
            })
            console.log(response.data)
            localStorage.setItem('weather', JSON.stringify(response.data))
            router.push('/weather/weatherDetails')
        } catch (error) {
            console.log('error while finding the weather', error)
        } finally {
            setLoading(false)
        }
    }
    if (loading) return <LoadingPage />

    return (<>
        <div className="bg-gradient-to-br from-gray-900 to-black h-screen flex items-center justify-center px-4">
            <div className="bg-gray-800 p-8 rounded-2xl shadow-lg w-full max-w-md">
                <h1 className="text-white text-2xl font-bold mb-6 text-center">Find Weather</h1>

                <input
                    type="text"
                    placeholder="Enter a location"
                    className="w-full px-4 py-2 mb-4 rounded-lg border border-gray-700 bg-gray-900 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setLocation(e.target.value)}
                />

                <Button
                    onClick={handleSearch}
                    className="w-full py-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition duration-200"
                >
                    SEARCH
                </Button>
            </div>
        </div>
    </>)
}