"use client"

import { useEffect, useRef, useState } from "react"
import { AnimatePresence, motion } from "framer-motion"
import { useRouter } from "next/navigation"
import { X } from "lucide-react"

interface PinModalProps {
  isOpen: boolean
  onClose: () => void
}

const CORRECT_PIN = "1234" // Change this to your desired PIN

export function PinModal({ isOpen, onClose }: PinModalProps) {
  const [pin, setPin] = useState("")
  const [tries, setTries] = useState(3)
  const [error, setError] = useState("")
  const [isLocked, setIsLocked] = useState(false)
  const inputRefs = useRef<(HTMLInputElement | null)[]>([])
  const router = useRouter()

  const handlePinChange = (index: number, value: string) => {
    if (!/^\d*$/.test(value)) return // Only allow digits
    if (value.length > 1) return // Only single digit at a time

    const newPin = [...pin.split("")]
    newPin[index] = value

    setPin(newPin.join(""))
    setError("")

    // Auto-focus next input
    if (value && index < 3) {
      inputRefs.current[index + 1]?.focus()
    }
  }

  const validatePin = () => {
    if (pin.length !== 4) return

    if (pin === CORRECT_PIN) {
      handleCorrectPin()
    } else {
      handleWrongPin()
    }
  }

  const handleCorrectPin = () => {
    setError("")
    setPin("")
    // Small delay for visual feedback before redirect
    setTimeout(() => {
      router.push("/workspace")
      onClose()
    }, 500)
  }

  const handleWrongPin = () => {
    const newTries = tries - 1
    setTries(newTries)
    setPin("")
    setError("Incorrect PIN")

    if (newTries === 0) {
      setIsLocked(true)
      setError("Too many attempts. Access denied.")
      setTimeout(() => {
        onClose()
        setTries(3)
        setIsLocked(false)
        setPin("")
        setError("")
      }, 3000)
    } else {
      // Clear error after 1.5 seconds
      setTimeout(() => {
        setError("")
      }, 1500)
    }

    // Vibrate all inputs for visual feedback
    inputRefs.current.forEach((ref) => {
      ref?.classList.add("animate-shake")
      setTimeout(() => ref?.classList.remove("animate-shake"), 500)
    })
  }

  const handleKeyDown = (
    index: number,
    e: React.KeyboardEvent<HTMLInputElement>,
  ) => {
    if (e.key === "Enter") {
      e.preventDefault()
      validatePin()
    } else if (e.key === "Backspace") {
      e.preventDefault()
      const newPin = [...pin.split("")]
      if (newPin[index]) {
        newPin[index] = ""
        setPin(newPin.join(""))
      } else if (index > 0) {
        inputRefs.current[index - 1]?.focus()
      }
    } else if (e.key === "ArrowLeft" && index > 0) {
      e.preventDefault()
      inputRefs.current[index - 1]?.focus()
    } else if (e.key === "ArrowRight" && index < 3) {
      e.preventDefault()
      inputRefs.current[index + 1]?.focus()
    }
  }

  useEffect(() => {
    if (isOpen) {
      inputRefs.current[0]?.focus()
      setPin("")
      setError("")
    }
  }, [isOpen])

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          key="pin-modal-backdrop"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 backdrop-blur-sm"
          onClick={onClose}
        >
          <motion.div
            initial={{
              opacity: 0,
              scale: 0.9,
              rotateX: 20,
              y: 20,
            }}
            animate={{
              opacity: 1,
              scale: 1,
              rotateX: 0,
              y: 0,
            }}
            exit={{
              opacity: 0,
              scale: 0.9,
              rotateX: 20,
              y: 20,
            }}
            transition={{
              duration: 0.5,
              ease: [0.22, 1, 0.36, 1],
            }}
            style={{
              perspective: "1200px",
            }}
            className="relative w-[90%] max-w-sm"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Glowing background effect */}
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-neon/20 via-transparent to-neon/10 blur-xl" />

            {/* Modal container */}
            <div className="relative overflow-hidden rounded-2xl border border-border/40 bg-surface/95 p-8 backdrop-blur-xl">
              {/* Close button */}
              <button
                onClick={onClose}
                disabled={isLocked}
                className="absolute right-4 top-4 inline-flex h-8 w-8 items-center justify-center rounded-full border border-border/40 text-muted-foreground transition-all hover:border-neon/60 hover:text-foreground disabled:cursor-not-allowed"
              >
                <X size={16} />
              </button>

              {/* Content */}
              <div className="space-y-6 text-center">
                {/* Title */}
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1, duration: 0.4 }}
                >
                  <h2 className="font-display text-2xl font-semibold tracking-tight">
                    Access Workspace
                  </h2>
                  <p className="mt-2 text-sm text-muted-foreground">
                    Enter your 4-digit PIN to continue
                  </p>
                </motion.div>

                {/* PIN Input Fields */}
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2, duration: 0.4 }}
                  className="flex justify-center gap-3"
                >
                  {[0, 1, 2, 3].map((index) => (
                    <motion.input
                      key={index}
                      ref={(el) => {
                        inputRefs.current[index] = el
                      }}
                      type="text"
                      inputMode="numeric"
                      maxLength={1}
                      value={pin[index] || ""}
                      onChange={(e) => handlePinChange(index, e.target.value)}
                      onKeyDown={(e) => handleKeyDown(index, e)}
                      disabled={isLocked}
                      whileFocus={{
                        scale: 1.1,
                        boxShadow: "0 0 20px rgba(0,217,255,0.5)",
                      }}
                      className={[
                        "h-14 w-14 rounded-lg border-2 bg-background text-center text-2xl font-semibold tracking-widest transition-all",
                        error
                          ? "border-red-500/70 text-red-500"
                          : pin[index]
                            ? "border-neon/60 text-neon"
                            : "border-border/60 text-foreground",
                        "placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:text-muted-foreground",
                      ].join(" ")}
                      placeholder="•"
                    />
                  ))}
                </motion.div>

                {/* Error Message */}
                <AnimatePresence>
                  {error && (
                    <motion.p
                      initial={{ opacity: 0, y: -5 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -5 }}
                      transition={{ duration: 0.3 }}
                      className={
                        error.includes("Incorrect")
                          ? "text-sm text-red-500"
                          : "text-sm text-red-600/90"
                      }
                    >
                      {error}
                    </motion.p>
                  )}
                </AnimatePresence>

                {/* Tries Indicator */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.3, duration: 0.4 }}
                  className="flex items-center justify-center gap-1"
                >
                  {[...Array(3)].map((_, i) => (
                    <motion.div
                      key={i}
                      animate={{
                        scale: i < tries ? 1 : 0.7,
                        opacity: i < tries ? 1 : 0.4,
                      }}
                      transition={{ duration: 0.3 }}
                      className={[
                        "h-2 w-2 rounded-full",
                        i < tries
                          ? "bg-neon"
                          : "bg-red-500/50",
                      ].join(" ")}
                    />
                  ))}
                  <span className="ml-2 text-xs text-muted-foreground">
                    {tries} {tries === 1 ? "try" : "tries"} remaining
                  </span>
                </motion.div>

                {/* Info text */}
                <p className="text-xs text-muted-foreground">
                  {isLocked
                    ? "Access temporarily denied"
                    : "Enter PIN • Press Enter to submit"}
                </p>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
