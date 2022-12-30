import { WorkoutExercise } from './WorkoutExercise';

export interface WorkoutPlan {
  name: string;
  exercises?: WorkoutExercise[];
}
