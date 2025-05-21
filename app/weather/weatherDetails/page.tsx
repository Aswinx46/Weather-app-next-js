"use client"

import { motion } from "framer-motion"
import { Cloud, MapPin, Wind, Clock, Thermometer } from "lucide-react"
import { Card } from "@/components/ui/card"
import { notFound } from "next/navigation"
import { WeatherDetailsProps } from "@/types/weatherTypes"
import { useEffect, useState } from "react"



export default function WeatherDetails() {
    // Format the time string
    const [weather, setWeather] = useState<WeatherDetailsProps | null>(null)

    useEffect(() => {
        const weatherString = localStorage.getItem('weather')
        if (weatherString) {
            try {
                const parsedWeather = JSON.parse(weatherString)
                setWeather(parsedWeather)
            } catch (err) {
                console.error("Error parsing weather data from localStorage:", err)
            }
        }
    }, [])
    if(!weather) {
        notFound()
    }
    const formattedTime = new Date(weather.time).toLocaleString("en-US", {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "numeric",
        minute: "numeric",
    })

    // Container animation
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1,
            },
        },
    }

    // Item animation
    const itemVariants = {
        hidden: { y: 20, opacity: 0 },
        visible: {
            y: 0,
            opacity: 1,
            transition: {
                type: "spring",
                stiffness: 100,
            },
        },
    }

    return (
        <motion.div initial="hidden" animate="visible" variants={containerVariants} className="max-w-md mx-auto flex h-screen items-center bg-black">
            <Card className="overflow-hidden bg-black text-white border-gray-800">
                <motion.div variants={itemVariants} className="p-6 bg-gradient-to-br from-gray-900 to-black">
                    <div className="flex items-center justify-between mb-6">
                        <div className="flex items-center">
                            <Cloud className="w-8 h-8 mr-2 text-blue-400" />
                            <h2 className="text-2xl font-bold">Weather Details</h2>
                        </div>
                        <motion.div
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="px-3 py-1 text-xs font-medium rounded-full bg-blue-500/20 text-blue-400"
                        >
                            Live
                        </motion.div>
                    </div>

                    <motion.div variants={itemVariants} className="flex items-center mb-6">
                        <MapPin className="w-5 h-5 mr-2 text-gray-400" />
                        <h3 className="text-xl font-semibold text-white">{weather.location}</h3>
                    </motion.div>

                    <motion.div variants={itemVariants} className="grid grid-cols-2 gap-4 mb-6">
                        <div className="p-4 rounded-lg bg-gray-800/50">
                            <p className="text-sm text-gray-400 mb-1">Latitude</p>
                            <p className="text-lg font-medium">{weather.latitude}°</p>
                        </div>
                        <div className="p-4 rounded-lg bg-gray-800/50">
                            <p className="text-sm text-gray-400 mb-1">Longitude</p>
                            <p className="text-lg font-medium">{weather.longitude}°</p>
                        </div>
                    </motion.div>

                    <motion.div
                        variants={itemVariants}
                        className="flex items-center justify-between p-5 mb-6 rounded-lg bg-gradient-to-r from-blue-900/30 to-purple-900/30 border border-blue-800/30"
                    >
                        <div className="flex items-center">
                            <Thermometer className="w-8 h-8 mr-3 text-red-400" />
                            <div>
                                <p className="text-sm text-gray-400">Temperature</p>
                                <motion.p className="text-3xl font-bold" whileHover={{ scale: 1.1 }}>
                                    {weather.temperature}°C
                                </motion.p>
                            </div>
                        </div>
                        <motion.div
                            initial={{ rotate: 0 }}
                            animate={{ rotate: 360 }}
                            transition={{ duration: 20, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                            className="w-16 h-16 rounded-full bg-gradient-to-br from-orange-500/20 to-red-500/20 flex items-center justify-center"
                        >
                            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-orange-500 to-red-500 flex items-center justify-center text-white font-bold">
                                {weather.temperature}°
                            </div>
                        </motion.div>
                    </motion.div>

                    <motion.div
                        variants={itemVariants}
                        className="flex items-center justify-between p-5 mb-6 rounded-lg bg-gradient-to-r from-teal-900/30 to-blue-900/30 border border-teal-800/30"
                    >
                        <div className="flex items-center">
                            <Wind className="w-7 h-7 mr-3 text-teal-400" />
                            <div>
                                <p className="text-sm text-gray-400">Wind Speed</p>
                                <motion.p className="text-2xl font-bold" whileHover={{ scale: 1.1 }}>
                                    {weather.windspeed} km/h
                                </motion.p>
                            </div>
                        </div>
                        <motion.div
                            animate={{
                                x: [0, 5, -5, 5, 0],
                            }}
                            transition={{
                                duration: 2,
                                repeat: Number.POSITIVE_INFINITY,
                                repeatType: "reverse",
                            }}
                            className="flex space-x-1"
                        >
                            {[1, 2, 3].map((i) => (
                                <div key={i} className={`h-6 w-1 rounded-full bg-teal-400 opacity-${i * 30}`} />
                            ))}
                        </motion.div>
                    </motion.div>

                    <motion.div variants={itemVariants} className="flex items-center p-4 rounded-lg bg-gray-800/50">
                        <Clock className="w-5 h-5 mr-2 text-gray-400" />
                        <div>
                            <p className="text-sm text-gray-400">Last Updated</p>
                            <p className="text-md font-medium">{formattedTime}</p>
                        </div>
                    </motion.div>
                </motion.div>
            </Card>
        </motion.div>
    )
}
