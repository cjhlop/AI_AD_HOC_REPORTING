"use client"

import * as React from 'react'

interface Dataset {
  id: string
  name: string
  description: string
}

interface SlashCommandMenuProps {
  datasets: Dataset[]
  onSelect: (command: string) => void
}

export function SlashCommandMenu({
  datasets,
  onSelect,
}: SlashCommandMenuProps) {
  return (
    <div className="absolute bottom-full mb-2 w-full max-w-md rounded-md border bg-background shadow-lg z-10">
      <div className="p-2">
        <p className="text-xs text-muted-foreground px-2 pb-1 font-semibold">
          DATASETS
        </p>
        <ul>
          {datasets.map(dataset => (
            <li key={dataset.id}>
              <button
                className="w-full text-left px-2 py-1.5 rounded-md hover:bg-accent flex flex-col"
                onClick={() => onSelect(dataset.id)}
              >
                <span className="font-medium text-sm">{dataset.name}</span>
                <span className="text-xs text-muted-foreground">
                  {dataset.description}
                </span>
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}