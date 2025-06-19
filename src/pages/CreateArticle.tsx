import { BlogEditor } from "../components/Editor/BlogEditor"
import { useSite } from "../contexts/SiteContext"
import { useNavigate } from "react-router-dom"
import { useEffect } from "react"
import { PenTool, ArrowLeft } from "lucide-react"

const mockSave = async (article: any) => {
  console.log("Saving article:", article)
  await new Promise((resolve) => setTimeout(resolve, 1000))
  if (Math.random() < 0.1) {
    throw new Error("Save failed")
  }
}

const mockPublish = async (article: any, options: any) => {
  console.log("Publishing article:", article, "with options:", options)

  await new Promise((resolve) => setTimeout(resolve, 1500))
}

export default function CreateArticle() {
  const { site, setSite } = useSite()
  const navigate = useNavigate()

  // Redirect newsletter users to appropriate creation page
  useEffect(() => {
    if (site === "newsletter") {
      navigate("/newsletter/create")
    }
  }, [site, navigate])

  // Show message for newsletter users (in case they land here directly)
  if (site === "newsletter") {
    return (
      <div className="min-h-screen bg-white dark:bg-gray-950 flex items-center justify-center">
        <div className="max-w-md mx-auto text-center px-6">
          <div className="w-16 h-16 bg-gradient-to-br from-primary-500 to-primary-600 rounded-full flex items-center justify-center mx-auto mb-6">
            <PenTool className="w-8 h-8 text-white" />
          </div>
          
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            Newsletter Creation
          </h1>
          
          <p className="text-gray-600 dark:text-gray-400 mb-8 leading-relaxed">
            You're currently in the Newsletter section. To create newsletters, please use the newsletter creation tools.
          </p>
          
          <div className="space-y-4">
            <button
              onClick={() => navigate("/newsletter/create")}
              className="w-full bg-primary-600 hover:bg-primary-700 text-white px-6 py-3 rounded-lg transition-colors duration-200 font-medium"
            >
              Create Newsletter
            </button>
            
            <button
              onClick={() => {
                setSite("blog")
                navigate("/create")
              }}
              className="w-full border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 px-6 py-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors duration-200 font-medium flex items-center justify-center space-x-2"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Switch to Blog & Create Article</span>
            </button>
          </div>
        </div>
      </div>
    )
  }

  // Show blog editor only for blog users
  return (
    <BlogEditor
      onSave={mockSave}
      onPublish={mockPublish}
      initialArticle={{
        title: "",
        subtitle: "",
        content: "",
        isDraft: true,
      }}
    />
  )
}
