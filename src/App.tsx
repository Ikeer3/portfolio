import { MenuBar } from '@/components/MenuBar'
import { TitleBar } from '@/components/TitleBar'

export default function App() {
  return (
    <div className="flex h-dvh flex-col bg-bg text-fg">
      <header>
        <TitleBar />
        <MenuBar />
      </header>
      <main className="min-h-0 flex-1 overflow-auto p-8">
        <h1 className="font-display text-display">
          Iker <span className="text-surname">Santos</span>
        </h1>
      </main>
    </div>
  )
}
