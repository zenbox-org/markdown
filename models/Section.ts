import { isEqualByD } from 'libs/utils/lodash'
import { adjust, nail } from 'libs/utils/string'
import { getDuplicatesRefinement } from 'libs/utils/zod'
import { z } from 'zod'

export const SectionSchema = z.object({
  title: z.string().min(1),
  content: z.string().min(1),
}).describe('Section')

export const SectionsSchema = z.array(SectionSchema)
  .superRefine(getDuplicatesRefinement('Section', parseSectionUid))

export const SectionUidSchema = SectionSchema.pick({
  title: true,
})

export type Section = z.infer<typeof SectionSchema>

export type SectionUid = z.infer<typeof SectionUidSchema>

export function parseSection(section: Section): Section {
  return SectionSchema.parse(section)
}

export function parseSections(sections: Section[]): Section[] {
  return SectionsSchema.parse(sections)
}

export function parseSectionUid(sectionUid: SectionUid): SectionUid {
  return SectionUidSchema.parse(sectionUid)
}

export const isEqualSection = (a: Section) => (b: Section) => isEqualByD(a, b, parseSectionUid)

export const renderSectionMD = (level = 3) => (section: Section) => nail(`
  ${'#'.repeat(level)} ${section.title}
  
  ${adjust(section.content)}
`)

export const renderSectionsMD = (level = 3) => (sections: Section[]) => {
  return sections.map(renderSectionMD(level)).join('\n\n')
}

export const renderDescSectionsMD = renderSectionsMD(4)
