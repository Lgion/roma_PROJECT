"use client"

import * as React from "react"
import { Button } from "../ui/button"
import { cn } from "/lib/utils"

const Progress = React.forwardRef(({ className, value, totalSteps, currentStep, onPrevious, onNext, onSubmit, ...props }, ref) => {
  return (
    <div className={cn("flex items-center justify-between w-full", className)} ref={ref} {...props}>
      <Button onClick={onPrevious} disabled={currentStep === 1} variant="outline" size="icon" className="posabs mr-2">
        &lt;
      </Button>
      <div className="flex-1 h-12 bg-gray-200 rounded-full overflow-hidden flex items-center">
        <div
          className="h-full bg-blue-500 text-white flex items-center justify-start pl-4 text-lg font-bold transition-all"
          style={{ width: `${(currentStep / totalSteps) * 100}%` }}
        >
          Étape {currentStep}/{totalSteps}
        </div>
      </div>
      <Button onClick={onNext} disabled={currentStep === totalSteps} variant="outline" size="icon" className="posabs right mx-2">
        &gt;
      </Button>
      <Button onClick={onSubmit} disabled={currentStep !== totalSteps} variant="default" className="posabs validate ml-auto">
        Valider
      </Button>
    </div>
  )
})

Progress.displayName = "Progress"

export { Progress }
