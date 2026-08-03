export interface NavItem {
  name: string;
  href: string;
}

export interface NavSection {
  title: string;
  items: NavItem[];
}

const component = (name: string, slug: string): NavItem => ({
  name,
  href: `/styleguide/components/${slug}`,
});

export const navigation: NavSection[] = [
  {
    title: "Fundação",
    items: [
      { name: "Design Tokens", href: "/styleguide" },
      { name: "Logotipo", href: "/styleguide/foundation/logotipo" },
      { name: "Cores", href: "/styleguide/foundation/cores" },
      { name: "Tipografia", href: "/styleguide/foundation/tipografia" },
    ],
  },
  {
    title: "New",
    items: [
      component("Attachment", "attachment"),
      component("Bubble", "bubble"),
      component("Liquid Glass", "liquid-glass"),
      component("Marker", "marker"),
      component("Message", "message"),
      component("Message Scroller", "message-scroller"),
    ],
  },
  {
    title: "Inputs & Forms",
    items: [
      component("Button", "button"),
      component("Checkbox", "checkbox"),
      component("Combobox", "combobox"),
      component("Date Picker", "date-picker"),
      component("Field", "field"),
      component("Form", "form"),
      component("Input", "input"),
      component("Input OTP", "input-otp"),
      component("Label", "label"),
      component("Radio Group", "radio-group"),
      component("Select", "select"),
      component("Slider", "slider"),
      component("Switch", "switch"),
      component("Textarea", "textarea"),
      component("Toggle", "toggle"),
      component("Toggle Group", "toggle-group"),
    ],
  },
  {
    title: "Layout",
    items: [
      component("Accordion", "accordion"),
      component("Aspect Ratio", "aspect-ratio"),
      component("Card", "card"),
      component("Carousel", "carousel"),
      component("Collapsible", "collapsible"),
      component("Resizable", "resizable"),
      component("Scroll Area", "scroll-area"),
      component("Separator", "separator"),
      component("Sheet", "sheet"),
      component("Sidebar", "sidebar"),
      component("Skeleton", "skeleton"),
    ],
  },
  {
    title: "Navigation",
    items: [
      component("Breadcrumb", "breadcrumb"),
      component("Command", "command"),
      component("Context Menu", "context-menu"),
      component("Dropdown Menu", "dropdown-menu"),
      component("Menubar", "menubar"),
      component("Navigation Menu", "navigation-menu"),
      component("Pagination", "pagination"),
      component("Tabs", "tabs"),
    ],
  },
  {
    title: "Overlay",
    items: [
      component("Alert Dialog", "alert-dialog"),
      component("Dialog", "dialog"),
      component("Drawer", "drawer"),
      component("Hover Card", "hover-card"),
      component("Popover", "popover"),
      component("Tooltip", "tooltip"),
    ],
  },
  {
    title: "Feedback",
    items: [
      component("Alert", "alert"),
      component("Badge", "badge"),
      component("Progress", "progress"),
      component("Sonner", "sonner"),
      component("Toast", "toast"),
    ],
  },
  {
    title: "Data Display",
    items: [
      component("Avatar", "avatar"),
      component("Calendar", "calendar"),
      component("Chart", "chart"),
      component("Data Table", "data-table"),
      component("Table", "table"),
    ],
  },
  {
    title: "Utilities",
    items: [component("Typography", "typography")],
  },
  {
    title: "AI",
    items: [component("Chat", "chat")],
  },
];
