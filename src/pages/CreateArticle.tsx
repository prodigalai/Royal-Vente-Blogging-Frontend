import { BlogEditor } from "../components/Editor/BlogEditor"

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

export default function Home() {
  return (
    <main className="min-h-screen bg-gray-50 dark:bg-gray-900 p-4">
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
    </main>
  )
}
