import { create } from 'zustand'
import type { FileId } from '@/content/files'

export type SidebarView = 'explorer' | 'search'

// Pestaña que queda activa al cerrar `cerrada`: la vecina de la derecha o, si no hay, la de la izquierda
export function activeAfterClosing(
  pestanas: readonly FileId[],
  cerrada: FileId,
  activa: FileId | null,
): FileId | null {
  if (activa !== cerrada) return activa
  const indice = pestanas.indexOf(cerrada)
  const restantes = pestanas.filter((id) => id !== cerrada)
  return restantes[indice] ?? restantes[indice - 1] ?? null
}

interface WorkspaceState {
  tabs: FileId[]
  activeId: FileId | null
  sidebarVisible: boolean
  sidebarView: SidebarView
  openFile: (id: FileId) => void
  closeTab: (id: FileId) => void
  closeAllTabs: () => void
  nextTab: () => void
  prevTab: () => void
  toggleSidebar: () => void
  // Muestra una vista en la barra lateral; si ya era la visible, oculta la barra
  showSidebarView: (vista: SidebarView) => void
}

// Las pestañas NO se recuerdan al recargar: siempre arranca solo con home.tsx
export const useWorkspaceStore = create<WorkspaceState>((set, get) => ({
  tabs: ['home'],
  activeId: 'home',
  sidebarVisible: true,
  sidebarView: 'explorer',

  openFile: (id) =>
    set((estado) => ({
      tabs: estado.tabs.includes(id) ? estado.tabs : [...estado.tabs, id],
      activeId: id,
    })),

  closeTab: (id) =>
    set((estado) => ({
      tabs: estado.tabs.filter((pestana) => pestana !== id),
      activeId: activeAfterClosing(estado.tabs, id, estado.activeId),
    })),

  closeAllTabs: () => set({ tabs: [], activeId: null }),

  nextTab: () => moverPestana(get, set, 1),
  prevTab: () => moverPestana(get, set, -1),

  toggleSidebar: () => set((estado) => ({ sidebarVisible: !estado.sidebarVisible })),

  showSidebarView: (vista) =>
    set((estado) =>
      estado.sidebarVisible && estado.sidebarView === vista
        ? { sidebarVisible: false }
        : { sidebarVisible: true, sidebarView: vista },
    ),
}))

// Activa la pestaña anterior o siguiente, dando la vuelta en los extremos
function moverPestana(
  get: () => WorkspaceState,
  set: (parcial: Partial<WorkspaceState>) => void,
  paso: 1 | -1,
): void {
  const { tabs, activeId } = get()
  if (tabs.length === 0) return
  const actual = activeId ? tabs.indexOf(activeId) : -1
  const destino = tabs[(actual + paso + tabs.length) % tabs.length]
  if (destino) set({ activeId: destino })
}
