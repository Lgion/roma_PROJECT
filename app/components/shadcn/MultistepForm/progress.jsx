"use client"

import * as React from "react"
import { Button } from "../ui/button"
import { cn } from "@/lib/utils"

const Progress = React.forwardRef(({ className, value, totalSteps, currentStep, onPrevious, onNext, ...props }, ref) => {
  const steps = Array.from({ length: totalSteps }, (_, i) => i + 1)

  return (
    <div className={cn("flex items-center justify-between w-full", className)} ref={ref} {...props}>
      <Button onClick={onPrevious} disabled={currentStep === 1} variant="outline" size="icon">
        &lt;
      </Button>
      <div className="flex-1 mx-4 h-12 bg-gray-200 rounded-full overflow-hidden flex items-center">
        {steps.map((step) => (
          <div
            key={step}
            className={cn(
              "flex-1 h-full flex items-center justify-center text-lg font-bold transition-colors",
              step <= currentStep ? "bg-blue-500 text-white" : "bg-gray-200 text-gray-500"
            )}
          >
            {step}
          </div>
        ))}
      </div>
      <Button onClick={onNext} disabled={currentStep === totalSteps} variant="outline" size="icon">
        &gt;
      </Button>
    </div>
  )
})

Progress.displayName = "Progress"

export { Progress }
