import { prisma } from "../lib/db/prisma"
import {
  BADGES,
  HeadlineDetails,
  contactContent,
  details,
  lines,
  portfolioProjectList,
  skillGroups,
  timeline,
  stats,
  education,
} from "../lib/portfolio-data"

async function main() {
  await seedProfile()
  await seedContactContent()
  await seedAboutLines()
  await seedHeadline()
  await seedBadges()
  await seedProjects()
  await seedSkills()
  await seedTimeline()
  await seedEducation()
  await seedStats()
  await seedSocialLinks()
}

async function seedProfile() {
  const existing = await prisma.portfolioProfile.findFirst()
  const data = {
    code: details.code ?? null,
    name: details.name ?? null,
    location: details.location ?? null,
    locationType: details.locationType ?? null,
    website: details.website ?? null,
    role: details.role ?? null,
    github: details.github ?? null,
    linkedin: details.linkedin ?? null,
    email: details.email ?? null,
    x: details.x ?? null,
    phone: details.phone ?? null,
    status: details.status ?? null,
    statusLocation: details.statusLocation ?? null,
    imageLink: details.imageLink ?? null,
    resume: details.resume ?? null,
    buyMeACoffee: details.buyMeACoffee ?? null,
  }

  if (!existing) {
    await prisma.portfolioProfile.create({ data })
    return
  }

  await prisma.portfolioProfile.update({ where: { id: existing.id }, data })
}

async function seedContactContent() {
  const existing = await prisma.contactContent.findFirst()
  const data = {
    topHead: contactContent.topHead ?? null,
    subHead: contactContent.subHead ?? null,
  }

  if (!existing) {
    await prisma.contactContent.create({ data })
    return
  }

  await prisma.contactContent.update({ where: { id: existing.id }, data })
}

async function seedAboutLines() {
  const count = await prisma.aboutLine.count()
  if (count > 0) return

  const data = lines.map((content, index) => ({
    lineOrder: index + 1,
    content,
  }))

  await prisma.aboutLine.createMany({ data })
}

async function seedHeadline() {
  const existing = await prisma.headline.findFirst({ include: { tags: true } })
  const data = {
    headline: HeadlineDetails.headline,
  }

  if (!existing) {
    await prisma.headline.create({
      data: {
        ...data,
        tags: {
          create: HeadlineDetails.tags.map((tag) => ({ tag })),
        },
      },
    })
    return
  }

  await prisma.headline.update({
    where: { id: existing.id },
    data: {
      ...data,
      tags: {
        deleteMany: {},
        create: HeadlineDetails.tags.map((tag) => ({ tag })),
      },
    },
  })
}

async function seedBadges() {
  const count = await prisma.badge.count()
  if (count > 0) return

  await prisma.badge.createMany({
    data: BADGES.map((b) => ({
      label: b.label,
      sub: b.sub,
      icon: b.icon?.name ?? null,
    })),
  })
}

async function seedProjects() {
  for (const p of portfolioProjectList) {
    await prisma.project.upsert({
      where: { slug: p.slug },
      create: {
        priorityIndex: p.priorityIndex,
        slug: p.slug,
        title: p.title,
        subtitle: p.subtitle,
        category: p.category,
        year: p.year,
        image: p.image,
        role: p.role,
        longDescription: p.longDescription,
        liveUrl: p.liveUrl ?? null,
        repoUrl: p.repoUrl ?? null,
        tags: {
          create: p.tags.map((tag) => ({ tag })),
        },
      },
      update: {
        priorityIndex: p.priorityIndex,
        title: p.title,
        subtitle: p.subtitle,
        category: p.category,
        year: p.year,
        image: p.image,
        role: p.role,
        longDescription: p.longDescription,
        liveUrl: p.liveUrl ?? null,
        repoUrl: p.repoUrl ?? null,
        tags: {
          deleteMany: {},
          create: p.tags.map((tag) => ({ tag })),
        },
      },
    })
  }
}

async function seedSkills() {
  const groupCount = await prisma.skillGroup.count()
  if (groupCount > 0) return

  for (const group of skillGroups) {
    const createdGroup = await prisma.skillGroup.create({
      data: {
        label: group.label,
        skills: {
          create: group.items.map((s) => ({
            name: s.name,
            level: s.level,
            note: s.note ?? null,
          })),
        },
      },
    })

    // Ensure relation is materialized (no-op but keeps intent explicit)
    void createdGroup
  }
}

async function seedTimeline() {
  const count = await prisma.timelineItem.count()
  if (count > 0) return

  await prisma.timelineItem.createMany({
    data: timeline.map((t) => ({
      year: t.year,
      title: t.title,
      org: t.org,
      description: t.description,
      side: t.side,
    })),
  })
}

async function seedEducation() {
  const count = await prisma.education.count()
  if (count > 0) return

  for (const e of education) {
    await prisma.education.create({
      data: {
        degree: e.degree,
        institution: e.institution,
        location: e.location,
        period: e.period,
        description: e.description,
        achievements: {
          create: e.achievements.map((achievement) => ({ achievement })),
        },
      },
    })
  }
}

async function seedStats() {
  const count = await prisma.stat.count()
  if (count > 0) return

  await prisma.stat.createMany({
    data: stats.map((s) => ({
      value: s.value,
      label: s.label,
    })),
  })
}

async function seedSocialLinks() {
  const count = await prisma.socialLink.count()
  if (count > 0) return

  const data = [
    {
      label: "GitHub",
      handle: "@dariogeorge21",
      href: details.github,
      icon: "Github",
    },
    {
      label: "LinkedIn",
      handle: "in/dariogeorge21",
      href: details.linkedin,
      icon: "Linkedin",
    },
    {
      label: "X",
      handle: "@dariogeorge21",
      href: details.x,
      icon: "Twitter",
    },
    {
      label: "Email",
      handle: details.email,
      href: details.email ? `mailto:${details.email}` : null,
      icon: "Mail",
    },
  ].filter((s) => !!s.href)

  await prisma.socialLink.createMany({
    data: data.map((s) => ({
      label: s.label,
      handle: s.handle,
      href: s.href!,
      icon: s.icon,
    })),
  })
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (error) => {
    console.error(error)
    await prisma.$disconnect()
    process.exit(1)
  })
