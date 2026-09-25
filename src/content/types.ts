/**
 * Content model for the roadmap. Every trackable item (a focus point, a
 * practice task, a milestone line) carries a stable `id` — progress is keyed
 * by these ids, so editing copy never orphans a user's saved progress.
 */

export type Price = 'free' | string

export interface Resource {
  id: string
  name: string
  price: Price
  url: string
  /** One line on why this resource, in this list, over the alternatives. */
  note: string
}

export interface ChecklistItem {
  id: string
  label: string
}

export interface PracticeTask {
  id: string
  summary: string
}

export interface PriceTier {
  id: string
  label: string
  cost: string
  contents: string
}

export interface BomLine {
  part: string
  cost: string
}

export interface Bom {
  id: string
  label: string
  totalCost: string
  lines: BomLine[]
}

export interface DecisionOption {
  option: string
  detail: string
}

export interface Callout {
  id: string
  kind: 'tip' | 'warning' | 'gap'
  title: string
  body: string
}

export interface Subsection {
  id: string
  title: string
  intro?: string
  resources?: Resource[]
  focusPoints?: ChecklistItem[]
  practiceTask?: PracticeTask
  priceTiers?: PriceTier[]
  boms?: Bom[]
  decisionFramework?: { title: string; options: DecisionOption[] }
  callouts?: Callout[]
  /** Free-form paragraphs for content that doesn't fit the shapes above. */
  notes?: string[]
}

export interface Milestone {
  id: string
  label: string
}

export interface Month {
  id: string
  number: number
  slug: string
  title: string
  goal: string
  framing: string
  subsections: Subsection[]
  milestones: Milestone[]
}

export interface Specialism {
  id: string
  name: string
}

export interface JobRequirement {
  id: string
  label: string
}

export interface IntroContent {
  whyRobotics: string[]
  specialisms: Specialism[]
  jobRequirements: JobRequirement[]
  commitment: string
}

export interface Direction {
  id: string
  number: number
  name: string
  bestFor: string
  focus: string[]
  detail: string
}

export interface PortfolioContent {
  highSignal: string[]
  redFlags: string[]
  readmeChecklist: ChecklistItem[]
  practiceTask: PracticeTask
  interview: {
    topics: string[]
    goodCompanyExpect: string[]
    practiceTask: PracticeTask
    glassdoorNote: string
  }
}

export interface PayRange {
  id: string
  label: string
  value: string
  source: string
}

export interface OutlookContent {
  headline: string
  capitalStats: string[]
  hiringReality: string[]
  pay: PayRange[]
  freelance: string[]
  entryPoints: string[]
  takeaways: { id: string; title: string; body: string }[]
}
