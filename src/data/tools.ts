export type Price = 'Free' | 'Free plan' | 'Paid' | 'Open source';

export interface Tool {
  name: string;
  url: string;
  category: string;
  description: string;
  price: Price;
}

export const categories = [
  { id: 'prototyping', label: 'Design & prototyping', icon: '✏️' },
  { id: 'design-systems', label: 'Design systems', icon: '🧩' },
  { id: 'testing', label: 'User testing', icon: '🧪' },
  { id: 'research', label: 'Research & interviews', icon: '🎙️' },
  { id: 'surveys', label: 'Surveys & forms', icon: '📋' },
  { id: 'whiteboard', label: 'Whiteboards & flows', icon: '🗺️' },
  { id: 'accessibility', label: 'Accessibility', icon: '♿' },
  { id: 'color', label: 'Color', icon: '🎨' },
  { id: 'type', label: 'Typography', icon: '🔤' },
  { id: 'icons', label: 'Icons', icon: '⭐' },
  { id: 'assets', label: 'Images & illustrations', icon: '🖼️' },
  { id: 'inspiration', label: 'Inspiration', icon: '💡' },
  { id: 'handoff', label: 'Handoff & build', icon: '🚀' },
  { id: 'learn', label: 'Learn UX', icon: '📚' },
] as const;

export const tools: Tool[] = [
  // Design & prototyping
  { name: 'Figma', url: 'https://www.figma.com', category: 'prototyping', price: 'Free plan', description: 'The industry-standard tool for UI design, prototyping and team collaboration in the browser.' },
  { name: 'Penpot', url: 'https://penpot.app', category: 'prototyping', price: 'Open source', description: 'Open-source design and prototyping tool built on web standards (SVG, CSS). Self-hostable.' },
  { name: 'Sketch', url: 'https://www.sketch.com', category: 'prototyping', price: 'Paid', description: 'Native Mac design tool with symbols, prototyping and a large plugin ecosystem.' },
  { name: 'Framer', url: 'https://www.framer.com', category: 'prototyping', price: 'Free plan', description: 'Design interactive sites and high-fidelity prototypes, then publish them live.' },
  { name: 'ProtoPie', url: 'https://www.protopie.io', category: 'prototyping', price: 'Free plan', description: 'Advanced interactive prototypes with sensors, variables and conditions. No code.' },
  { name: 'Axure RP', url: 'https://www.axure.com', category: 'prototyping', price: 'Paid', description: 'Complex, logic-driven prototypes and detailed specs for enterprise UX.' },
  { name: 'Lunacy', url: 'https://icons8.com/lunacy', category: 'prototyping', price: 'Free', description: 'Free desktop design tool that opens .sketch files and includes built-in assets.' },
  { name: 'Origami Studio', url: 'https://origami.design', category: 'prototyping', price: 'Free', description: 'Meta’s free tool for designing and testing native-feeling mobile interactions.' },
  { name: 'Rive', url: 'https://rive.app', category: 'prototyping', price: 'Free plan', description: 'Design interactive animations that run in apps, games and websites.' },

  // Design systems
  { name: 'Storybook', url: 'https://storybook.js.org', category: 'design-systems', price: 'Open source', description: 'Build, document and test UI components in isolation; the home of most coded design systems.' },
  { name: 'Tokens Studio', url: 'https://tokens.studio', category: 'design-systems', price: 'Free plan', description: 'Manage design tokens in Figma and sync them with code through Git.' },
  { name: 'Style Dictionary', url: 'https://styledictionary.com', category: 'design-systems', price: 'Open source', description: 'Turn one set of design tokens into CSS, iOS, Android and JS variables.' },
  { name: 'zeroheight', url: 'https://zeroheight.com', category: 'design-systems', price: 'Free plan', description: 'Documentation sites for design systems, synced with Figma and Storybook.' },
  { name: 'Supernova', url: 'https://www.supernova.io', category: 'design-systems', price: 'Free plan', description: 'Design system platform for docs, tokens and code generation.' },
  { name: 'Material Design 3', url: 'https://m3.material.io', category: 'design-systems', price: 'Free', description: 'Google’s design system: guidelines, components, color and motion.' },
  { name: 'Apple Human Interface Guidelines', url: 'https://developer.apple.com/design/human-interface-guidelines', category: 'design-systems', price: 'Free', description: 'Apple’s guidance for designing iOS, macOS, watchOS and visionOS apps.' },
  { name: 'Carbon Design System', url: 'https://carbondesignsystem.com', category: 'design-systems', price: 'Open source', description: 'IBM’s open-source design system, with great docs on tokens, grids and accessibility.' },
  { name: 'Polaris', url: 'https://polaris.shopify.com', category: 'design-systems', price: 'Free', description: 'Shopify’s design system; excellent content and voice guidelines.' },
  { name: 'GOV.UK Design System', url: 'https://design-system.service.gov.uk', category: 'design-systems', price: 'Free', description: 'Heavily researched, accessible patterns for forms and services.' },
  { name: 'Fluent 2', url: 'https://fluent2.microsoft.design', category: 'design-systems', price: 'Free', description: 'Microsoft’s cross-platform design system.' },
  { name: 'The Component Gallery', url: 'https://component.gallery', category: 'design-systems', price: 'Free', description: 'See how dozens of design systems name and build the same component.' },
  { name: 'shadcn/ui', url: 'https://ui.shadcn.com', category: 'design-systems', price: 'Open source', description: 'Copy-paste React components built on Radix and Tailwind; a popular base for new systems.' },

  // User testing
  { name: 'Maze', url: 'https://maze.co', category: 'testing', price: 'Free plan', description: 'Unmoderated usability tests on Figma prototypes, with heatmaps and success rates.' },
  { name: 'Lyssna', url: 'https://www.lyssna.com', category: 'testing', price: 'Free plan', description: 'Five-second tests, first-click tests, preference tests and surveys. Formerly UsabilityHub.' },
  { name: 'UserTesting', url: 'https://www.usertesting.com', category: 'testing', price: 'Paid', description: 'Video-based usability testing with a large participant panel.' },
  { name: 'Lookback', url: 'https://www.lookback.com', category: 'testing', price: 'Paid', description: 'Run and record live, moderated user sessions on any device.' },
  { name: 'Optimal Workshop', url: 'https://www.optimalworkshop.com', category: 'testing', price: 'Free plan', description: 'Card sorting, tree testing and first-click testing for information architecture.' },
  { name: 'Useberry', url: 'https://www.useberry.com', category: 'testing', price: 'Free plan', description: 'Prototype testing with user flows, heatmaps and session recordings.' },
  { name: 'Hotjar', url: 'https://www.hotjar.com', category: 'testing', price: 'Free plan', description: 'Heatmaps, session recordings and on-site feedback for live websites.' },
  { name: 'Microsoft Clarity', url: 'https://clarity.microsoft.com', category: 'testing', price: 'Free', description: 'Completely free heatmaps and session recordings for your live site.' },

  // Research & interviews
  { name: 'Dovetail', url: 'https://dovetail.com', category: 'research', price: 'Free plan', description: 'Store interviews, tag transcripts and turn findings into shareable insights.' },
  { name: 'Condens', url: 'https://condens.io', category: 'research', price: 'Paid', description: 'Research repository for analysing and sharing user research.' },
  { name: 'User Interviews', url: 'https://www.userinterviews.com', category: 'research', price: 'Free plan', description: 'Recruit research participants and manage your own panel.' },
  { name: 'Great Question', url: 'https://greatquestion.co', category: 'research', price: 'Paid', description: 'All-in-one research platform: recruiting, scheduling, interviews and a repository.' },
  { name: 'Respondent', url: 'https://www.respondent.io', category: 'research', price: 'Paid', description: 'Recruit B2B and professional participants for interviews.' },
  { name: 'Otter.ai', url: 'https://otter.ai', category: 'research', price: 'Free plan', description: 'Automatic transcription and notes for interview calls.' },

  // Surveys
  { name: 'Tally', url: 'https://tally.so', category: 'surveys', price: 'Free plan', description: 'Generous free form and survey builder that works like a doc.' },
  { name: 'Typeform', url: 'https://www.typeform.com', category: 'surveys', price: 'Free plan', description: 'Conversational one-question-at-a-time surveys with high completion rates.' },
  { name: 'Google Forms', url: 'https://forms.google.com', category: 'surveys', price: 'Free', description: 'Simple, free surveys with results straight into Google Sheets.' },

  // Whiteboard
  { name: 'FigJam', url: 'https://www.figma.com/figjam', category: 'whiteboard', price: 'Free plan', description: 'Figma’s whiteboard for workshops, affinity mapping and user flows.' },
  { name: 'Miro', url: 'https://miro.com', category: 'whiteboard', price: 'Free plan', description: 'Online whiteboard with templates for journey maps, personas and workshops.' },
  { name: 'Whimsical', url: 'https://whimsical.com', category: 'whiteboard', price: 'Free plan', description: 'Fast flowcharts, wireframes and mind maps.' },
  { name: 'Excalidraw', url: 'https://excalidraw.com', category: 'whiteboard', price: 'Open source', description: 'Hand-drawn style whiteboard for quick sketches and diagrams. No sign-up.' },
  { name: 'tldraw', url: 'https://www.tldraw.com', category: 'whiteboard', price: 'Free', description: 'Instant, free collaborative whiteboard in the browser.' },

  // Accessibility
  { name: 'WebAIM Contrast Checker', url: 'https://webaim.org/resources/contrastchecker/', category: 'accessibility', price: 'Free', description: 'Check text and background colours against WCAG contrast rules.' },
  { name: 'Stark', url: 'https://www.getstark.co', category: 'accessibility', price: 'Free plan', description: 'Accessibility checks inside Figma: contrast, vision simulation, focus order.' },
  { name: 'axe DevTools', url: 'https://www.deque.com/axe/devtools/', category: 'accessibility', price: 'Free plan', description: 'Browser extension that finds accessibility issues on live pages.' },
  { name: 'WAVE', url: 'https://wave.webaim.org', category: 'accessibility', price: 'Free', description: 'Visual accessibility report for any web page.' },
  { name: 'Who Can Use', url: 'https://www.whocanuse.com', category: 'accessibility', price: 'Free', description: 'Shows which people (by vision type) can read a colour combination.' },
  { name: 'WCAG Quick Reference', url: 'https://www.w3.org/WAI/WCAG22/quickref/', category: 'accessibility', price: 'Free', description: 'The official, filterable checklist of WCAG 2.2 success criteria.' },

  // Color
  { name: 'Coolors', url: 'https://coolors.co', category: 'color', price: 'Free plan', description: 'Generate, lock and tweak colour palettes in seconds.' },
  { name: 'Adobe Color', url: 'https://color.adobe.com', category: 'color', price: 'Free', description: 'Colour wheel, harmony rules and palette extraction from images.' },
  { name: 'Realtime Colors', url: 'https://www.realtimecolors.com', category: 'color', price: 'Free', description: 'Preview a palette and fonts on a real website layout instantly.' },
  { name: 'Leonardo', url: 'https://leonardocolor.io', category: 'color', price: 'Open source', description: 'Adobe’s tool for building accessible colour scales based on contrast.' },
  { name: 'Huemint', url: 'https://huemint.com', category: 'color', price: 'Free', description: 'AI-generated colour palettes previewed on brand and UI mockups.' },

  // Typography
  { name: 'Google Fonts', url: 'https://fonts.google.com', category: 'type', price: 'Free', description: 'Huge library of free, open-licence web fonts.' },
  { name: 'Fontshare', url: 'https://www.fontshare.com', category: 'type', price: 'Free', description: 'High-quality free fonts from Indian Type Foundry.' },
  { name: 'Typescale', url: 'https://typescale.com', category: 'type', price: 'Free', description: 'Preview modular type scales with real fonts.' },
  { name: 'Fontjoy', url: 'https://fontjoy.com', category: 'type', price: 'Free', description: 'Generate font pairings with machine learning.' },
  { name: 'Typewolf', url: 'https://www.typewolf.com', category: 'type', price: 'Free', description: 'Font recommendations and real-world type inspiration.' },

  // Icons
  { name: 'Phosphor Icons', url: 'https://phosphoricons.com', category: 'icons', price: 'Open source', description: 'Flexible icon family with six weights.' },
  { name: 'Lucide', url: 'https://lucide.dev', category: 'icons', price: 'Open source', description: 'Clean, consistent open-source icon set with a Figma plugin.' },
  { name: 'Heroicons', url: 'https://heroicons.com', category: 'icons', price: 'Open source', description: 'Hand-crafted SVG icons from the makers of Tailwind CSS.' },
  { name: 'Material Symbols', url: 'https://fonts.google.com/icons', category: 'icons', price: 'Free', description: 'Google’s variable icon font with thousands of symbols.' },
  { name: 'Tabler Icons', url: 'https://tabler.io/icons', category: 'icons', price: 'Open source', description: 'Thousands of free, pixel-perfect stroke icons.' },
  { name: 'Iconoir', url: 'https://iconoir.com', category: 'icons', price: 'Open source', description: 'Large, free open-source icon library.' },

  // Assets
  { name: 'Unsplash', url: 'https://unsplash.com', category: 'assets', price: 'Free', description: 'Free high-resolution photos for mockups and products.' },
  { name: 'Pexels', url: 'https://www.pexels.com', category: 'assets', price: 'Free', description: 'Free stock photos and videos.' },
  { name: 'unDraw', url: 'https://undraw.co', category: 'assets', price: 'Free', description: 'Open-licence SVG illustrations with a customisable colour.' },
  { name: 'Blush', url: 'https://blush.design', category: 'assets', price: 'Free plan', description: 'Mix-and-match illustrations from many artists.' },

  // Inspiration
  { name: 'Mobbin', url: 'https://mobbin.com', category: 'inspiration', price: 'Free plan', description: 'Searchable library of real app screens and user flows.' },
  { name: 'Page Flows', url: 'https://pageflows.com', category: 'inspiration', price: 'Paid', description: 'Recorded user flows (onboarding, checkout and more) from real products.' },
  { name: 'Refero', url: 'https://refero.design', category: 'inspiration', price: 'Free plan', description: 'Design references from real web and mobile apps, searchable by pattern.' },
  { name: 'Dribbble', url: 'https://dribbble.com', category: 'inspiration', price: 'Free', description: 'Visual design shots from designers worldwide.' },
  { name: 'Behance', url: 'https://www.behance.net', category: 'inspiration', price: 'Free', description: 'Full case studies and portfolios.' },
  { name: 'Godly', url: 'https://godly.website', category: 'inspiration', price: 'Free', description: 'Curated, animated website inspiration.' },
  { name: 'Land-book', url: 'https://land-book.com', category: 'inspiration', price: 'Free plan', description: 'Gallery of landing pages, sorted by style and industry.' },

  // Handoff
  { name: 'Zeplin', url: 'https://zeplin.io', category: 'handoff', price: 'Free plan', description: 'Organised specs, assets and style guides for developers.' },
  { name: 'Anima', url: 'https://www.animaapp.com', category: 'handoff', price: 'Free plan', description: 'Convert Figma designs into React, Vue or HTML code.' },
  { name: 'Webflow', url: 'https://webflow.com', category: 'handoff', price: 'Free plan', description: 'Build production websites visually without writing code.' },

  // Learn
  { name: 'Laws of UX', url: 'https://lawsofux.com', category: 'learn', price: 'Free', description: 'The key psychology principles behind good interfaces, beautifully explained.' },
  { name: 'Nielsen Norman Group', url: 'https://www.nngroup.com/articles/', category: 'learn', price: 'Free', description: 'Evidence-based UX research articles and guidelines.' },
  { name: 'Interaction Design Foundation', url: 'https://www.interaction-design.org', category: 'learn', price: 'Paid', description: 'Online UX courses and a large free literature library.' },
  { name: 'Growth.Design', url: 'https://growth.design/case-studies', category: 'learn', price: 'Free', description: 'Comic-style UX case studies on psychology and product decisions.' },
  { name: 'A11y Project', url: 'https://www.a11yproject.com', category: 'learn', price: 'Free', description: 'Community-driven guide to making accessible products.' },
  { name: 'Smashing Magazine', url: 'https://www.smashingmagazine.com', category: 'learn', price: 'Free', description: 'In-depth articles on UX, UI and front-end.' },
];

/** Stable id for votes and favourites, e.g. "Microsoft Clarity" → "microsoft-clarity". */
export const toolId = (t: Pick<Tool, 'name'>) => t.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
