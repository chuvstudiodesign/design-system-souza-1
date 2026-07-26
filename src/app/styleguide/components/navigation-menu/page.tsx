"use client";

import Link from "next/link";

import {
  A11yNotes,
  ComponentPage,
  Demo,
  KeyboardTable,
  PropsTable,
  Usage,
} from "@/components/styleguide/component-page";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";

const areas = [
  {
    title: "Direito empresarial",
    href: "/styleguide",
    description: "Societário, contratos, compliance e operações de M&A.",
  },
  {
    title: "Direito trabalhista",
    href: "/styleguide",
    description: "Contencioso, acordos e auditoria de passivos.",
  },
  {
    title: "Direito civil",
    href: "/styleguide",
    description: "Família, sucessões e responsabilidade civil.",
  },
  {
    title: "Direito tributário",
    href: "/styleguide",
    description: "Planejamento, defesas administrativas e judiciais.",
  },
];

export default function NavigationMenuPage() {
  return (
    <ComponentPage
      title="Navigation Menu"
      category="Navigation"
      description="Menu de navegação principal do site, com painéis suspensos para agrupar links. Diferente do Dropdown Menu, os itens são links reais — correto para navegação entre páginas."
      install="npx shadcn@latest add navigation-menu"
      importCode={`import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu"`}
    >
      <Demo
        title="Com painel suspenso"
        contentClassName="flex-col items-start"
        code={`<NavigationMenu>
  <NavigationMenuList>
    <NavigationMenuItem>
      <NavigationMenuTrigger>Áreas</NavigationMenuTrigger>
      <NavigationMenuContent>
        <ul className="grid w-[420px] gap-2 p-3 md:grid-cols-2">
          <li>
            <NavigationMenuLink asChild>
              <Link href="/empresarial">
                <div className="font-medium">Direito empresarial</div>
                <p className="text-muted-foreground">Societário e contratos.</p>
              </Link>
            </NavigationMenuLink>
          </li>
        </ul>
      </NavigationMenuContent>
    </NavigationMenuItem>
  </NavigationMenuList>
</NavigationMenu>`}
      >
        <NavigationMenu>
          <NavigationMenuList>
            <NavigationMenuItem>
              <NavigationMenuTrigger>Áreas de atuação</NavigationMenuTrigger>
              <NavigationMenuContent>
                <ul className="grid w-[420px] gap-2 p-3 md:grid-cols-2">
                  {areas.map((area) => (
                    <li key={area.title}>
                      <NavigationMenuLink asChild>
                        <Link href={area.href}>
                          <div className="text-sm font-medium">
                            {area.title}
                          </div>
                          <p className="text-xs text-muted-foreground">
                            {area.description}
                          </p>
                        </Link>
                      </NavigationMenuLink>
                    </li>
                  ))}
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>

            <NavigationMenuItem>
              <NavigationMenuTrigger>O escritório</NavigationMenuTrigger>
              <NavigationMenuContent>
                <ul className="grid w-[320px] gap-2 p-3">
                  {["História", "Equipe", "Publicações", "Trabalhe conosco"].map(
                    (item) => (
                      <li key={item}>
                        <NavigationMenuLink asChild>
                          <Link href="/styleguide">
                            <div className="text-sm font-medium">{item}</div>
                          </Link>
                        </NavigationMenuLink>
                      </li>
                    )
                  )}
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>

            <NavigationMenuItem>
              <NavigationMenuLink
                asChild
                className={navigationMenuTriggerStyle()}
              >
                <Link href="/styleguide">Contato</Link>
              </NavigationMenuLink>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
      </Demo>

      <Demo
        title="Sem viewport"
        description="viewport={false} renderiza cada painel ancorado ao próprio item, sem o painel compartilhado animado."
        contentClassName="flex-col items-start"
        code={`<NavigationMenu viewport={false}>…</NavigationMenu>`}
      >
        <NavigationMenu viewport={false}>
          <NavigationMenuList>
            <NavigationMenuItem>
              <NavigationMenuTrigger>Serviços</NavigationMenuTrigger>
              <NavigationMenuContent>
                <ul className="grid w-[240px] gap-1 p-2">
                  {["Consultoria", "Contencioso", "Auditoria"].map((item) => (
                    <li key={item}>
                      <NavigationMenuLink asChild>
                        <Link href="/styleguide">
                          <span className="text-sm">{item}</span>
                        </Link>
                      </NavigationMenuLink>
                    </li>
                  ))}
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuLink
                asChild
                className={navigationMenuTriggerStyle()}
              >
                <Link href="/styleguide">Blog</Link>
              </NavigationMenuLink>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
      </Demo>

      <Demo
        title="Somente links"
        description="Sem painéis: barra horizontal simples de navegação."
        contentClassName="flex-col items-start"
        code={`<NavigationMenuItem>
  <NavigationMenuLink asChild className={navigationMenuTriggerStyle()}>
    <Link href="/sobre">Sobre</Link>
  </NavigationMenuLink>
</NavigationMenuItem>`}
      >
        <NavigationMenu>
          <NavigationMenuList>
            {["Início", "Sobre", "Áreas", "Contato"].map((item) => (
              <NavigationMenuItem key={item}>
                <NavigationMenuLink
                  asChild
                  className={navigationMenuTriggerStyle()}
                >
                  <Link href="/styleguide">{item}</Link>
                </NavigationMenuLink>
              </NavigationMenuItem>
            ))}
          </NavigationMenuList>
        </NavigationMenu>
      </Demo>

      <Usage
        code={`import Link from "next/link"
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu"

export function SiteNav() {
  return (
    <NavigationMenu>
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuLink asChild className={navigationMenuTriggerStyle()}>
            <Link href="/areas">Áreas</Link>
          </NavigationMenuLink>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  )
}`}
      />

      <PropsTable
        rows={[
          {
            prop: "NavigationMenu · viewport",
            type: "boolean",
            default: "true",
            description:
              "Usa um painel compartilhado animado; false ancora cada painel ao seu item.",
          },
          {
            prop: "NavigationMenu · value / onValueChange",
            type: "string / (value: string) => void",
            description: "Controle de qual painel está aberto.",
          },
          {
            prop: "NavigationMenu · delayDuration / skipDelayDuration",
            type: "number",
            description: "Tempo de hover para abrir e para reabrir rapidamente.",
          },
          {
            prop: "NavigationMenuLink · asChild",
            type: "boolean",
            description: "Necessário para usar next/link.",
          },
          {
            prop: "NavigationMenuLink · active",
            type: "boolean",
            description: "Marca o link atual (aplica data-active).",
          },
          {
            prop: "navigationMenuTriggerStyle()",
            type: "() => string",
            description:
              "Classe utilitária para dar aparência de gatilho a links soltos.",
          },
        ]}
      />

      <KeyboardTable
        rows={[
          { keys: "Tab", description: "Percorre gatilhos e links." },
          { keys: "Enter / Space", description: "Abre o painel do gatilho focado." },
          { keys: "↓", description: "Move o foco para dentro do painel aberto." },
          { keys: "← / →", description: "Alterna entre itens do menu." },
          { keys: "Esc", description: "Fecha o painel." },
        ]}
      />

      <A11yNotes
        items={[
          "Renderiza <nav> com aria-label — o conteúdo é uma lista de links reais, indexável e abrível em nova aba.",
          "Sempre use NavigationMenuLink asChild com next/link: não substitua links por onClick.",
          "Marque a rota atual com active + aria-current='page'.",
          "Painéis abrem no hover e também no teclado; nada depende exclusivamente do mouse.",
          "Em telas pequenas, troque por um Sheet com a mesma lista de links.",
        ]}
      />
    </ComponentPage>
  );
}
