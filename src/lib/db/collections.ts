import { prisma } from "@/lib/prisma";

export type CollectionType = {
  name: string;
  icon: string | null;
  color: string | null;
};

export type DashboardCollection = {
  id: string;
  name: string;
  description: string | null;
  isFavorite: boolean;
  itemCount: number;
  dominantColor: string | null;
  types: CollectionType[];
};

export async function getCollectionsForDashboard(userId: string): Promise<DashboardCollection[]> {
  const collections = await prisma.collection.findMany({
    where: { userId },
    include: {
      items: {
        include: { type: true },
      },
    },
    orderBy: { updatedAt: "desc" },
    take: 6,
  });

  return collections.map((col) => {
    const typeCounts = new Map<
      string,
      { type: CollectionType; count: number }
    >();

    for (const item of col.items) {
      const existing = typeCounts.get(item.typeId);
      if (existing) {
        existing.count++;
      } else {
        typeCounts.set(item.typeId, {
          type: { name: item.type.name, icon: item.type.icon, color: item.type.color },
          count: 1,
        });
      }
    }

    const sorted = [...typeCounts.values()].sort((a, b) => b.count - a.count);

    return {
      id: col.id,
      name: col.name,
      description: col.description,
      isFavorite: col.isFavorite,
      itemCount: col.items.length,
      dominantColor: sorted[0]?.type.color ?? null,
      types: sorted.map(({ type }) => type),
    };
  });
}
