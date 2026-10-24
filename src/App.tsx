import { ActivityBar } from '@/components/ActivityBar'
import { EditorArea } from '@/components/EditorArea'
import { MenuBar } from '@/components/MenuBar'
import { Sidebar } from '@/components/Sidebar'
import { StatusBar } from '@/components/StatusBar'
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
        <EditorArea />
      </div>
      <StatusBar />
    </div>
  )
}
