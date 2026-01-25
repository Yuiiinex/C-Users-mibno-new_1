import { prisma } from './prisma'

export async function getSiteSettings() {
  try {
    const settings = await prisma.siteSettings.findMany()
    const settingsMap: Record<string, string> = {}
    
    settings.forEach(setting => {
      settingsMap[setting.key] = setting.value
    })

    return {
      heroTitle: settingsMap['hero_title'] || 'Step Into Style',
      heroSubtitle: settingsMap['hero_subtitle'] || 'Discover our premium collection',
      promotionBanner: settingsMap['promotion_banner'] || null,
      aboutText: settingsMap['about_text'] || '',
      contactEmail: settingsMap['contact_email'] || '',
      contactPhone: settingsMap['contact_phone'] || '',
      contactAddress: settingsMap['contact_address'] || '',
      logo: settingsMap['logo'] || '/logo.png',
      primaryColor: settingsMap['primary_color'] || '#0ea5e9',
    }
  } catch (error) {
    // Return defaults if database is not initialized
    return {
      heroTitle: 'Step Into Style',
      heroSubtitle: 'Discover our premium collection',
      promotionBanner: null,
      aboutText: '',
      contactEmail: '',
      contactPhone: '',
      contactAddress: '',
      logo: '/logo.png',
      primaryColor: '#0ea5e9',
    }
  }
}

