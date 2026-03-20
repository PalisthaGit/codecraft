import { notFound } from "next/navigation";
import type { Metadata } from "next";
import {
  lessons,
  getLessonBySlug,
  getPrevLesson,
  getNextLesson,
} from "@/lib/lessons";
import TutorialContent from "@/components/tutorial/TutorialContent";
import TutorialNavigation from "@/components/tutorial/TutorialNavigation";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return lessons.map((lesson) => ({ slug: lesson.slug }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const lesson = getLessonBySlug(slug);
  if (!lesson) return {};
  return {
    title: `${lesson.title} — CodingBanana`,
    description: lesson.description,
  };
}

export default async function TutorialPage({ params }: PageProps) {
  const { slug } = await params;
  const lesson = getLessonBySlug(slug);

  if (!lesson) notFound();

  const prev = getPrevLesson(slug);
  const next = getNextLesson(slug);

  return (
    <div className="max-w-3xl mx-auto">
      <TutorialContent lesson={lesson} />
      <TutorialNavigation prev={prev} next={next} />
    </div>
  );
}
