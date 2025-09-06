import { ecommerceGrowthCase } from './ecommerce-growth'
import { localSeoCase } from './local-seo'
import { saasStartupCase } from './saas-startup'

export const cases = [
  ecommerceGrowthCase,
  localSeoCase,
  saasStartupCase,
]

export const featuredCases = cases.filter(c => c.featured)

export const getCaseById = (id: string) => {
  return cases.find(c => c.id === id)
}

export const getCasesByCategory = (category: string) => {
  return cases.filter(c => c.category === category)
}

export type CaseStudy = typeof ecommerceGrowthCase