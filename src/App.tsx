import { ActivityBar } from '@/components/ActivityBar'
import { MenuBar } from '@/components/MenuBar'
import { Sidebar } from '@/components/Sidebar'
import { TitleBar } from '@/components/TitleBar'
import { useWorkspaceStore } from '@/store/workspace'

export default function App() {
  const sidebarVisible = useWorkspaceStore((estado) => estado.sidebarVisible)

  return (
    <div className="flex h-dvh flex-col bg-bg text-fg">
      <header>
        <TitleBar />
        <MenuBar />
      </header>
      <div className="flex min-h-0 flex-1">
        <ActivityBar />
        {sidebarVisible && <Sidebar />}
        <main className="min-w-0 flex-1 overflow-auto p-8">
          <h1 className="font-display text-display">
            Iker <span className="text-surname">Santos</span>
          </h1>
        </main>
      </div>
    </div>
  )
}
