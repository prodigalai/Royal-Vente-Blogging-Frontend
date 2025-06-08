"use client"

import type React from "react"
import { useState, useRef, useCallback, useEffect } from "react"
import { Bold, Italic, List, ListOrdered, Quote, Type, Plus, Image, Minus } from "lucide-react"

interface RichTextEditorProps {
  content: string
  onChange: (content: string) => void
  placeholder?: string
}

interface ToolbarProps {
  onFormat: (command: string, value?: string) => void
  position: { top: number; left: number }
  isVisible: boolean
}

const FloatingToolbar: React.FC<ToolbarProps> = ({ onFormat, position, isVisible }) => {
  if (!isVisible) return null

  const tools = [
    { command: "bold", icon: Bold, title: "Bold (Ctrl+B)" },
    { command: "italic", icon: Italic, title: "Italic (Ctrl+I)" },
    { command: "heading", icon: Type, title: "Heading" },
    { command: "quote", icon: Quote, title: "Quote" },
    { command: "unordered-list", icon: List, title: "Bullet List" },
    { command: "ordered-list", icon: ListOrdered, title: "Numbered List" },
  ]

  return (
    <div
      className="absolute z-50 bg-gray-900 text-white rounded-xl shadow-2xl px-3 py-2 flex items-center space-x-1 animate-in fade-in-0 zoom-in-95 duration-300 backdrop-blur-sm"
      style={{
        top: position.top - 55,
        left: position.left,
        transform: "translateX(-50%)",
      }}
    >
      {tools.map((tool) => {
        const IconComponent = tool.icon
        return (
          <button
            key={tool.command}
            onClick={() => onFormat(tool.command)}
            className="p-2.5 hover:bg-gray-700 rounded-lg transition-all duration-200 hover:scale-105 active:scale-95"
            title={tool.title}
          >
            <IconComponent size={16} />
          </button>
        )
      })}
    </div>
  )
}

interface UnifiedInsertMenuProps {
  onInsert: (type: string) => void
  position: { top: number; left: number }
  isVisible: boolean
  onHide: () => void
}

const UnifiedInsertMenu: React.FC<UnifiedInsertMenuProps> = ({ onInsert, position, isVisible, onHide }) => {
  const [isExpanded, setIsExpanded] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const menuRef = useRef<HTMLDivElement>(null)

  const options = [
    { type: "heading", icon: Type, label: "Heading" },
    { type: "image", icon: Image, label: "Image" },
    { type: "quote", icon: Quote, label: "Quote" },
    { type: "list", icon: List, label: "List" },
    { type: "ordered-list", icon: ListOrdered, label: "Numbers" },
    { type: "divider", icon: Minus, label: "Divider" },
  ]

  const handleInsert = (type: string) => {
    if (type === "image") {
      fileInputRef.current?.click()
    } else {
      onInsert(type)
      setIsExpanded(false)
      onHide()
    }
  }

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (e) => {
        const imageUrl = e.target?.result as string
        onInsert(`image:${imageUrl}`)
      }
      reader.readAsDataURL(file)
    }
    setIsExpanded(false)
    onHide()
    if (fileInputRef.current) {
      fileInputRef.current.value = ""
    }
  }

  // Handle clicking outside to close menu
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (isExpanded && menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsExpanded(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [isExpanded])

  // Reset expanded state when visibility changes
  useEffect(() => {
    if (!isVisible) {
      setIsExpanded(false)
    }
  }, [isVisible])

  if (!isVisible) return null

  return (
    <>
      <input 
        ref={fileInputRef} 
        type="file" 
        accept="image/*" 
        onChange={handleImageUpload} 
        className="hidden" 
      />
      <div 
        ref={menuRef}
        className="absolute z-40" 
        style={{ top: position.top, left: position.left }}
      >
        <div className="flex items-center">
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="flex items-center justify-center w-9 h-9 bg-white hover:bg-gray-50 border border-gray-200 rounded-full transition-all duration-300 shadow-lg hover:shadow-xl hover:border-gray-300 hover:scale-105 active:scale-95 backdrop-blur-sm"
            title="Insert content"
          >
            <Plus
              size={18}
              className={`text-gray-600 transition-all duration-300 ${isExpanded ? "rotate-45 scale-110" : ""}`}
            />
          </button>

          {isExpanded && (
            <div className="ml-4 bg-white/95 backdrop-blur-md border border-gray-200/50 rounded-2xl shadow-2xl p-2 animate-in slide-in-from-left-5 fade-in-0 duration-300">
              <div className="flex items-center space-x-1">
                {options.map((option, index) => {
                  const IconComponent = option.icon
                  return (
                    <button
                      key={option.type}
                      onClick={() => handleInsert(option.type)}
                      className="group flex flex-col items-center justify-center p-3 hover:bg-gray-100/80 rounded-xl transition-all duration-200 hover:scale-105 active:scale-95 min-w-[60px]"
                      title={option.label}
                      style={{
                        animationDelay: `${index * 50}ms`,
                      }}
                    >
                      <IconComponent 
                        size={20} 
                        className="text-gray-600 group-hover:text-gray-800 transition-colors duration-200 mb-1" 
                      />
                      <span className="text-xs font-medium text-gray-500 group-hover:text-gray-700 transition-colors duration-200">
                        {option.label}
                      </span>
                    </button>
                  )
                })}
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  )
}

export const RichTextEditor: React.FC<RichTextEditorProps> = ({
  content,
  onChange,
  placeholder = "Tell your story...",
}) => {
  const editorRef = useRef<HTMLDivElement>(null)
  const [toolbarPosition, setToolbarPosition] = useState({ top: 0, left: 0 })
  const [isToolbarVisible, setIsToolbarVisible] = useState(false)
  const [insertPosition, setInsertPosition] = useState({ top: 0, left: 0 })
  const [isInsertVisible, setIsInsertVisible] = useState(false)
  const [currentLine, setCurrentLine] = useState<HTMLElement | null>(null)

  // Initialize content and ensure proper structure
  useEffect(() => {
    if (editorRef.current) {
      if (!content || content.trim() === "") {
        editorRef.current.innerHTML = "<p><br></p>"
      } else if (content !== editorRef.current.innerHTML) {
        editorRef.current.innerHTML = content
      }
    }
  }, [])

  // Ensure editor always has at least one paragraph
  const ensureEditorStructure = useCallback(() => {
    if (!editorRef.current) return

    // If editor is completely empty, add a paragraph
    if (editorRef.current.children.length === 0 || editorRef.current.innerHTML.trim() === '') {
      editorRef.current.innerHTML = "<p><br></p>"
    }

    // If editor only contains text nodes, wrap them in a paragraph
    const hasOnlyTextNodes = Array.from(editorRef.current.childNodes).every(
      node => node.nodeType === Node.TEXT_NODE || (node.nodeType === Node.ELEMENT_NODE && node.nodeName === 'BR')
    )

    if (hasOnlyTextNodes && editorRef.current.childNodes.length > 0) {
      const p = document.createElement('p')
      while (editorRef.current.firstChild) {
        p.appendChild(editorRef.current.firstChild)
      }
      if (p.innerHTML.trim() === '') {
        p.innerHTML = '<br>'
      }
      editorRef.current.appendChild(p)
    }
  }, [])

  const handleInput = useCallback(() => {
    if (editorRef.current) {
      ensureEditorStructure()
      const newContent = editorRef.current.innerHTML
      if (newContent !== content) {
        onChange(newContent)
      }
    }
  }, [content, onChange, ensureEditorStructure])

  const handleSelection = useCallback(() => {
    const selection = window.getSelection()
    if (selection && selection.toString().length > 0) {
      const range = selection.getRangeAt(0)
      const rect = range.getBoundingClientRect()
      const editorRect = editorRef.current?.getBoundingClientRect()

      if (editorRect) {
        setToolbarPosition({
          top: rect.top - editorRect.top,
          left: rect.left - editorRect.left + rect.width / 2,
        })
        setIsToolbarVisible(true)
      }
    } else {
      setIsToolbarVisible(false)
    }
  }, [])

  const isEmptyLine = (element: HTMLElement): boolean => {
    if (!element) return false
    
    const text = element.textContent?.trim() || ''
    const innerHTML = element.innerHTML.trim()
    
    return text === '' || innerHTML === '<br>' || innerHTML === ''
  }

  const getLineElement = (element: HTMLElement | null): HTMLElement | null => {
    if (!element || !editorRef.current) return null
    
    // Find the closest block-level element that represents a line
    let current = element
    while (current && current !== editorRef.current) {
      const tagName = current.tagName?.toLowerCase()
      if (['p', 'div', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'blockquote', 'li'].includes(tagName)) {
        return current
      }
      current = current.parentElement as HTMLElement
    }
    
    // If we reach here, try to find the first paragraph in the editor
    const firstP = editorRef.current.querySelector('p')
    return firstP as HTMLElement || null
  }

  const handleCursorPosition = useCallback(() => {
    if (!editorRef.current) {
      setIsInsertVisible(false)
      return
    }

    ensureEditorStructure()

    const selection = window.getSelection()
    if (!selection || selection.rangeCount === 0) {
      setIsInsertVisible(false)
      return
    }

    const range = selection.getRangeAt(0)
    const container = range.startContainer
    const element = container.nodeType === Node.TEXT_NODE 
      ? container.parentElement 
      : (container as HTMLElement)
    
    if (!element || !editorRef.current.contains(element)) {
      setIsInsertVisible(false)
      return
    }

    const lineElement = getLineElement(element)
    if (!lineElement) {
      setIsInsertVisible(false)
      return
    }

    const rect = editorRef.current.getBoundingClientRect()
    const elementRect = lineElement.getBoundingClientRect()
    
    // Check if the current line is empty and cursor is at the beginning
    if (isEmptyLine(lineElement) && range.startOffset === 0) {
      const top = elementRect.top - rect.top + elementRect.height / 2 - 18
      setInsertPosition({
        top: Math.max(0, top),
        left: -45,
      })
      setCurrentLine(lineElement)
      setIsInsertVisible(true)
    } else {
      setIsInsertVisible(false)
      setCurrentLine(null)
    }
  }, [ensureEditorStructure])

  // Listen for selection changes and cursor movement
  useEffect(() => {
    const handleSelectionChange = () => {
      setTimeout(() => {
        handleSelection()
        handleCursorPosition()
      }, 10)
    }

    document.addEventListener('selectionchange', handleSelectionChange)
    return () => document.removeEventListener('selectionchange', handleSelectionChange)
  }, [handleSelection, handleCursorPosition])

  const formatText = useCallback(
    (command: string) => {
      const selection = window.getSelection()
      if (!selection || selection.rangeCount === 0) return

      const range = selection.getRangeAt(0)
      const selectedText = range.toString()

      if (!selectedText) return

      let element: HTMLElement

      switch (command) {
        case "bold":
          element = document.createElement("strong")
          break
        case "italic":
          element = document.createElement("em")
          break
        case "heading":
          element = document.createElement("h2")
          element.className = "text-2xl font-bold mt-6 mb-3"
          break
        case "quote":
          element = document.createElement("blockquote")
          element.className = "border-l-4 border-green-500 pl-6 py-2 my-4 italic text-gray-700"
          break
        case "unordered-list":
          document.execCommand("insertUnorderedList")
          handleInput()
          return
        case "ordered-list":
          document.execCommand("insertOrderedList")
          handleInput()
          return
        default:
          return
      }

      element.textContent = selectedText
      range.deleteContents()
      range.insertNode(element)

      selection.removeAllRanges()
      setIsToolbarVisible(false)
      handleInput()
    },
    [handleInput],
  )

  const insertContent = useCallback(
    (type: string) => {
      if (!editorRef.current) return

      ensureEditorStructure()

      // If no currentLine, try to get the current line based on cursor position
      let targetLine = currentLine
      if (!targetLine) {
        const selection = window.getSelection()
        if (selection && selection.rangeCount > 0) {
          const range = selection.getRangeAt(0)
          const container = range.startContainer
          const element = container.nodeType === Node.TEXT_NODE 
            ? container.parentElement 
            : (container as HTMLElement)
          targetLine = getLineElement(element)
        }
      }

      // If still no target line, use the first paragraph or create one
      if (!targetLine) {
        targetLine = editorRef.current.querySelector('p') as HTMLElement
        if (!targetLine) {
          const newP = document.createElement('p')
          newP.innerHTML = '<br>'
          editorRef.current.appendChild(newP)
          targetLine = newP
        }
      }

      let element: HTMLElement
      let imageUrl = ""

      if (type.startsWith("image:")) {
        imageUrl = type.substring(6)
        type = "image"
      }

      switch (type) {
        case "heading":
          element = document.createElement("h2")
          element.className = "text-2xl font-bold mt-6 mb-3"
          element.contentEditable = "true"
          element.textContent = "New heading"
          break

        case "image":
          element = document.createElement("div")
          element.className = "my-4"
          element.innerHTML = `<img src="${imageUrl}" alt="Uploaded image" class="w-full h-auto rounded-lg shadow-sm" />`
          break

        case "quote":
          element = document.createElement("blockquote")
          element.className = "border-l-4 border-green-500 pl-6 py-2 my-4 italic text-gray-700"
          element.contentEditable = "true"
          element.textContent = "Add your quote here..."
          break

        case "list":
          element = document.createElement("ul")
          element.className = "list-disc pl-6 my-3"
          element.innerHTML = '<li contenteditable="true" class="mb-1">First item</li>'
          break

        case "ordered-list":
          element = document.createElement("ol")
          element.className = "list-decimal pl-6 my-3"
          element.innerHTML = '<li contenteditable="true" class="mb-1">First item</li>'
          break

        case "divider":
          element = document.createElement("hr")
          element.className = "my-6 border-gray-300"
          break

        default:
          return
      }

      try {
        // Replace the current empty line with the new element
        targetLine.parentNode?.replaceChild(element, targetLine)

        // For image and divider, add a new paragraph after
        if (type === "image" || type === "divider") {
          const newP = document.createElement("p")
          newP.innerHTML = "<br>"
          newP.contentEditable = "true"
          element.parentNode?.insertBefore(newP, element.nextSibling)
        }

        // Focus the new element if it's editable
        if (element.contentEditable === "true") {
          setTimeout(() => {
            element.focus()
            const range = document.createRange()
            const sel = window.getSelection()
            range.selectNodeContents(element)
            range.collapse(false)
            sel?.removeAllRanges()
            sel?.addRange(range)
          }, 100)
        } else if (type === "image" || type === "divider") {
          // Focus the paragraph after image/divider
          const nextP = element.nextSibling as HTMLElement
          if (nextP) {
            setTimeout(() => {
              nextP.focus()
              const range = document.createRange()
              const sel = window.getSelection()
              range.setStart(nextP, 0)
              range.collapse(true)
              sel?.removeAllRanges()
              sel?.addRange(range)
            }, 100)
          }
        }
      } catch (error) {
        console.error('Error inserting content:', error)
      }

      setIsInsertVisible(false)
      setCurrentLine(null)
      handleInput()
    },
    [currentLine, handleInput, ensureEditorStructure],
  )

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      // Handle keyboard shortcuts
      if (e.ctrlKey || e.metaKey) {
        switch (e.key) {
          case "b":
            e.preventDefault()
            formatText("bold")
            break
          case "i":
            e.preventDefault()
            formatText("italic")
            break
        }
      }

      if (e.key === "Enter" && !e.shiftKey) {
        const selection = window.getSelection()
        if (selection && selection.rangeCount > 0) {
          const range = selection.getRangeAt(0)
          const container = range.startContainer
          const element = container.nodeType === Node.TEXT_NODE ? container.parentElement : (container as HTMLElement)

          if (element) {
            const blockElement = element.closest('h1, h2, h3, h4, h5, h6, blockquote')
            if (blockElement) {
              e.preventDefault()
              const newP = document.createElement("p")
              newP.innerHTML = "<br>"
              newP.contentEditable = "true"
              blockElement.parentNode?.insertBefore(newP, blockElement.nextSibling)

              setTimeout(() => {
                newP.focus()
                const newRange = document.createRange()
                const sel = window.getSelection()
                newRange.setStart(newP, 0)
                newRange.collapse(true)
                sel?.removeAllRanges()
                sel?.addRange(newRange)
              }, 50)

              handleInput()
            }
          }
        }
      }

      // Handle backspace at the beginning of special elements to convert to paragraph
      if (e.key === "Backspace") {
        const selection = window.getSelection()
        if (selection && selection.rangeCount > 0) {
          const range = selection.getRangeAt(0)
          if (range.startOffset === 0) {
            const container = range.startContainer
            const element = container.nodeType === Node.TEXT_NODE ? container.parentElement : (container as HTMLElement)
            
            if (element) {
              const blockElement = element.closest('h1, h2, h3, h4, h5, h6, blockquote')
              if (blockElement && blockElement.textContent?.trim()) {
                e.preventDefault()
                const newP = document.createElement("p")
                newP.textContent = blockElement.textContent
                newP.contentEditable = "true"
                blockElement.parentNode?.replaceChild(newP, blockElement)
                
                setTimeout(() => {
                  newP.focus()
                  const newRange = document.createRange()
                  const sel = window.getSelection()
                  newRange.setStart(newP, 0)
                  newRange.collapse(true)
                  sel?.removeAllRanges()
                  sel?.addRange(newRange)
                }, 50)

                handleInput()
              }
            }
          }
        }
      }
    },
    [formatText, handleInput],
  )

  return (
    <div className="relative w-full">
      <FloatingToolbar 
        onFormat={formatText} 
        position={toolbarPosition} 
        isVisible={isToolbarVisible} 
      />

      <UnifiedInsertMenu
        onInsert={insertContent}
        position={insertPosition}
        isVisible={isInsertVisible}
        onHide={() => {
          setIsInsertVisible(false)
          setCurrentLine(null)
        }}
      />

      <div
        ref={editorRef}
        contentEditable
        onInput={handleInput}
        onMouseUp={handleSelection}
        onKeyUp={handleCursorPosition}
        onKeyDown={handleKeyDown}
        onClick={handleCursorPosition}
        onFocus={handleCursorPosition}
        className="min-h-[400px] relative transition-all duration-200"
        style={{
          fontSize: "21px",
          lineHeight: "1.58",
          color: "#292929",
          fontFamily: 'ui-serif, Georgia, Cambria, "Times New Roman", Times, serif',
          paddingLeft: "50px",
          paddingRight: "20px",
          paddingTop: "20px",
          paddingBottom: "20px",
          outline: "none",
        }}
        suppressContentEditableWarning={true}
      />

      {(!content || content === "<p><br></p>" || content.trim() === "") && (
        <div
          className="absolute pointer-events-none text-gray-400 italic transition-opacity duration-300"
          style={{
            top: "20px",
            left: "50px",
            fontSize: "21px",
            lineHeight: "1.58",
            fontFamily: 'ui-serif, Georgia, Cambria, "Times New Roman", Times, serif',
          }}
        >
          {placeholder}
        </div>
      )}
    </div>
  )
}