"use client"

import { motion } from "framer-motion"
import { Cloud, CloudRain, CloudSnow, CloudLightning } from "lucide-react"

export default function LoadingPage() {
    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black">
            <div className="relative flex flex-col items-center">
                {/* Animated gradient background */}
                <motion.div
                    className="absolute inset-0 -z-10 rounded-full opacity-20 blur-3xl"
                    animate={{
                        background: [
                            "radial-gradient(circle, rgba(25,33,52,1) 0%, rgba(13,17,23,1) 100%)",
                            "radial-gradient(circle, rgba(37,38,74,1) 0%, rgba(13,17,23,1) 100%)",
                            "radial-gradient(circle, rgba(43,44,83,1) 0%, rgba(13,17,23,1) 100%)",
                            "radial-gradient(circle, rgba(25,33,52,1) 0%, rgba(13,17,23,1) 100%)",
                        ],
                    }}
                    transition={{ duration: 5, repeat: Number.POSITIVE_INFINITY, repeatType: "reverse" }}
                />

                {/* Weather icons animation */}
                <div className="relative h-32 w-32 mb-8">
                    <motion.div
                        className="absolute inset-0 flex items-center justify-center"
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: [0, 1, 0], scale: [0.8, 1, 0.8] }}
                        transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY, delay: 0 }}
                    >
                        <Cloud className="h-20 w-20 text-blue-400" />
                    </motion.div>

                    <motion.div
                        className="absolute inset-0 flex items-center justify-center"
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: [0, 1, 0], scale: [0.8, 1, 0.8] }}
                        transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY, delay: 1 }}
                    >
                        <CloudRain className="h-20 w-20 text-blue-300" />
                    </motion.div>

                    <motion.div
                        className="absolute inset-0 flex items-center justify-center"
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: [0, 1, 0], scale: [0.8, 1, 0.8] }}
                        transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY, delay: 2 }}
                    >
                        <CloudSnow className="h-20 w-20 text-cyan-300" />
                    </motion.div>

                    <motion.div
                        className="absolute inset-0 flex items-center justify-center"
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: [0, 1, 0], scale: [0.8, 1, 0.8] }}
                        transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY, delay: 3 }}
                    >
                        <CloudLightning className="h-20 w-20 text-yellow-300" />
                    </motion.div>
                </div>

                {/* Loading text */}
                <motion.h2
                    className="text-2xl font-bold text-white mb-6"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5 }}
                >
                    Loading Weather Data
                </motion.h2>

                {/* Loading dots */}
                <div className="flex space-x-3">
                    {[0, 1, 2].map((dot) => (
                        <motion.div
                            key={dot}
                            className="h-3 w-3 rounded-full bg-blue-400"
                            initial={{ opacity: 0.3 }}
                            animate={{ opacity: [0.3, 1, 0.3] }}
                            transition={{
                                duration: 1.5,
                                repeat: Number.POSITIVE_INFINITY,
                                delay: dot * 0.3,
                                ease: "easeInOut",
                            }}
                        />
                    ))}
                </div>

                {/* Circular progress */}
                <div className="mt-8 relative h-16 w-16">
                    <motion.div
                        className="absolute inset-0 rounded-full border-4 border-gray-700"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.5 }}
                    />
                    <motion.div
                        className="absolute inset-0 rounded-full border-4 border-transparent border-t-blue-400"
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                    />
                </div>

                {/* Pulse effect */}
                <div className="absolute inset-0 flex items-center justify-center">
                    {[1, 2, 3].map((ring) => (
                        <motion.div
                            key={ring}
                            className="absolute rounded-full border border-blue-400/20"
                            initial={{ width: 100, height: 100, opacity: 0 }}
                            animate={{
                                width: [100, 200],
                                height: [100, 200],
                                opacity: [0, 0.5, 0],
                            }}
                            transition={{
                                duration: 4,
                                repeat: Number.POSITIVE_INFINITY,
                                delay: ring * 0.8,
                                ease: "easeOut",
                            }}
                        />
                    ))}
                </div>
            </div>
        </div>
    )
}
