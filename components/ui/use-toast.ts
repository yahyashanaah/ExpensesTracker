// Placeholder for useToast
// You might want to implement a proper toast system later
export const useToast = () => {
    return {
      toast: ({ title, description, variant }: { title: string; description: string; variant?: string }) => {
        console.log(`Toast: ${title} - ${description} (${variant || "default"})`)
      },
    }
  }
  
  