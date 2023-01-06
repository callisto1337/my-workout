import { WorkoutExercise, ExerciseCategory } from 'types';

export function getCategories(
  exercises: WorkoutExercise[] = []
): ExerciseCategory[] {
  const result: Set<ExerciseCategory> = new Set();

  exercises?.forEach(({ category }) => result.add(category));

  return Array.from(result);
}
