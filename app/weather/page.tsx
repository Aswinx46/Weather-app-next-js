"use client"

import { useState } from "react"
import axios from 'axios'
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"
import LoadingPage from "./loading"
import { toast } from "react-toastify"

export default function FindWeather() {
    const router = useRouter()
    const [location, setLocation] = useState<string>('')
    const [loading, setLoading] = useState(false)


    function validateLocationName(name: string) {
        // Trim whitespace from start and end
        if (!name || name.trim() === "") {
            return { valid: false, error: "Location name cannot be empty." };
        }

        // Regex explanation:
        // ^[a-zA-Z\s'-]+$ means:
        // - start to end only letters (a-zA-Z), spaces (\s), apostrophes ('), and hyphens (-)
        // - no digits or other special chars allowed
        const regex = /^[a-zA-Z\s'-]+$/;

        if (!regex.test(name)) {
            return { valid: false, error: "Location name can only contain letters, spaces, hyphens, and apostrophes." };
        }

        return { valid: true, error: null };
    }

    const handleSearch = async () => {
        const validateName = validateLocationName(location)
        if (!validateName.valid) {
            toast.error(validateName.error)
            return
        }
        setLoading(true)
        try {

            const response = await axios.get('/api/weather', {
                params: {
                    location
                }
            })
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