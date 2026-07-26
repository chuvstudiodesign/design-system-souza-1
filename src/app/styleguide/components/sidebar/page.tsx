"use client";

import {
  BriefcaseIcon,
  CalendarIcon,
  FileTextIcon,
  HomeIcon,
  SettingsIcon,
  UsersIcon,
} from "lucide-react";

import {
  A11yNotes,
  ComponentPage,
  Demo,
  KeyboardTable,
  PropsTable,
  Usage,
} from "@/components/styleguide/component-page";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarInset,
  SidebarMenu,
  SidebarMenuBadge,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarSeparator,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { BrandSymbol } from "@/components/brand/logo";

const nav = [
  { title: "Painel", icon: HomeIcon, badge: null },
  { title: "Processos", icon: BriefcaseIcon, badge: "12" },
  { title: "Clientes", icon: UsersIcon, badge: null },
  { title: "Agenda", icon: CalendarIcon, badge: "3" },
  { title: "Documentos", icon: FileTextIcon, badge: null },
];

export default function SidebarPage() {
  return (
    <ComponentPage
      title="Sidebar"
      category="Layout"
      description="Sistema completo de navegação lateral: provider com estado persistido em cookie, colapso para ícones, versão mobile em Sheet e atalho ⌘/Ctrl + B."
      install="npx shadcn@latest add sidebar"
      importCode={`import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarInset,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar"`}
    >
      <Demo
        title="Layout completo"
        description="Provider + Sidebar + SidebarInset. Use o gatilho para colapsar."
        contentClassName="flex-col items-stretch p-0"
        code={`<SidebarProvider>
  <Sidebar collapsible="icon">
    <SidebarHeader>…</SidebarHeader>
    <SidebarContent>
      <SidebarGroup>
        <SidebarGroupLabel>Navegação</SidebarGroupLabel>
        <SidebarGroupContent>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton isActive tooltip="Painel">
                <HomeIcon /> <span>Painel</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarGroupContent>
      </SidebarGroup>
    </SidebarContent>
  </Sidebar>
  <SidebarInset>
    <SidebarTrigger />
    …
  </SidebarInset>
</SidebarProvider>`}
      >
        <div className="h-[26rem] w-full overflow-hidden rounded-xl border border-border">
          <SidebarProvider className="min-h-full">
            <Sidebar collapsible="icon" className="absolute">
              <SidebarHeader>
                <div className="flex items-center gap-2 px-2 py-1">
                  <BrandSymbol size={24} />
                  <span className="font-display text-xs tracking-[0.12em] group-data-[collapsible=icon]:hidden">
                    SOUZA &amp; SOUZA
                  </span>
                </div>
              </SidebarHeader>
              <SidebarContent>
                <SidebarGroup>
                  <SidebarGroupLabel>Navegação</SidebarGroupLabel>
                  <SidebarGroupContent>
                    <SidebarMenu>
                      {nav.map((item, index) => (
                        <SidebarMenuItem key={item.title}>
                          <SidebarMenuButton
                            isActive={index === 0}
                            tooltip={item.title}
                          >
                            <item.icon />
                            <span>{item.title}</span>
                          </SidebarMenuButton>
                          {item.badge ? (
                            <SidebarMenuBadge>{item.badge}</SidebarMenuBadge>
                          ) : null}
                        </SidebarMenuItem>
                      ))}
                    </SidebarMenu>
                  </SidebarGroupContent>
                </SidebarGroup>
                <SidebarSeparator />
                <SidebarGroup>
                  <SidebarGroupLabel>Sistema</SidebarGroupLabel>
                  <SidebarGroupContent>
                    <SidebarMenu>
                      <SidebarMenuItem>
                        <SidebarMenuButton tooltip="Configurações">
                          <SettingsIcon />
                          <span>Configurações</span>
                        </SidebarMenuButton>
                      </SidebarMenuItem>
                    </SidebarMenu>
                  </SidebarGroupContent>
                </SidebarGroup>
              </SidebarContent>
              <SidebarFooter>
                <span className="px-2 text-[11px] text-muted-foreground group-data-[collapsible=icon]:hidden">
                  v1.0 · design system
                </span>
              </SidebarFooter>
            </Sidebar>
            <SidebarInset className="bg-background">
              <header className="flex h-12 items-center gap-2 border-b border-border px-4">
                <SidebarTrigger />
                <span className="text-sm font-medium">Painel</span>
              </header>
              <div className="p-4 text-sm text-muted-foreground">
                Conteúdo principal. Clique no gatilho para colapsar a barra em
                ícones, ou use ⌘/Ctrl + B.
              </div>
            </SidebarInset>
          </SidebarProvider>
        </div>
      </Demo>

      <Usage
        title="Variantes"
        description="variant altera a moldura; collapsible define o comportamento ao recolher."
        code={`<Sidebar variant="sidebar" />   // padrão, encostada na borda
<Sidebar variant="floating" />  // cartão flutuante com sombra
<Sidebar variant="inset" />     // conteúdo em inset arredondado

<Sidebar collapsible="offcanvas" /> // desliza para fora (padrão)
<Sidebar collapsible="icon" />      // reduz para faixa de ícones
<Sidebar collapsible="none" />      // sempre visível

<Sidebar side="left" /> | <Sidebar side="right" />`}
      />

      <Usage
        title="Uso"
        code={`// app/layout.tsx
<SidebarProvider defaultOpen>
  <AppSidebar />
  <SidebarInset>{children}</SidebarInset>
</SidebarProvider>

// dentro de qualquer componente
const { state, toggleSidebar, isMobile } = useSidebar()`}
      />

      <PropsTable
        title="Props principais"
        rows={[
          {
            prop: "SidebarProvider · defaultOpen",
            type: "boolean",
            default: "true",
            description:
              "Estado inicial; a preferência é persistida em cookie entre visitas.",
          },
          {
            prop: "SidebarProvider · open / onOpenChange",
            type: "boolean / (open: boolean) => void",
            description: "Controle externo do estado.",
          },
          {
            prop: "Sidebar · side",
            type: '"left" | "right"',
            default: '"left"',
            description: "Lado de ancoragem.",
          },
          {
            prop: "Sidebar · variant",
            type: '"sidebar" | "floating" | "inset"',
            default: '"sidebar"',
            description: "Moldura visual.",
          },
          {
            prop: "Sidebar · collapsible",
            type: '"offcanvas" | "icon" | "none"',
            default: '"offcanvas"',
            description: "Comportamento ao recolher.",
          },
          {
            prop: "SidebarMenuButton · isActive / tooltip",
            type: "boolean / string",
            description:
              "Marca o item atual e define o tooltip exibido no modo ícone.",
          },
          {
            prop: "useSidebar()",
            type: "hook",
            description:
              "Expõe state, open, setOpen, toggleSidebar, isMobile e openMobile.",
          },
        ]}
      />

      <KeyboardTable
        rows={[
          { keys: "⌘ / Ctrl + B", description: "Abre e fecha a barra lateral." },
          { keys: "Tab", description: "Navega entre os itens do menu." },
          { keys: "Enter / Space", description: "Ativa o item focado." },
          { keys: "Esc", description: "Fecha a versão mobile (Sheet)." },
        ]}
      />

      <A11yNotes
        items={[
          "No mobile a barra vira um Sheet com role=dialog e foco preso.",
          "SidebarMenuButton renderiza <button> (ou <a> com asChild) — use asChild com Link para navegação real.",
          "Marque o item atual com isActive e, em links, também com aria-current='page'.",
          "No modo ícone os rótulos ficam ocultos visualmente, mas continuam no DOM para leitores de tela; o tooltip complementa usuários de mouse.",
          "O gatilho possui rótulo em sr-only e responde ao atalho de teclado global.",
        ]}
      />
    </ComponentPage>
  );
}
