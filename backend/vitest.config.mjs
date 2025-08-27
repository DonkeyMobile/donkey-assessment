import { defineConfig } from 'vitest/config';
export default defineConfig({
    test: {
        environment: 'node',
        include: ['src/**/*.test.ts'],
        reporters: ['default'],
        coverage: {
            provider: 'v8',
            reporter: ['text', 'html'],
            reportsDirectory: 'coverage',
        },
    },
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidml0ZXN0LmNvbmZpZy5tanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJ2aXRlc3QuY29uZmlnLm10cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBRTdDLGVBQWUsWUFBWSxDQUFDO0lBQ3hCLElBQUksRUFBRTtRQUNGLFdBQVcsRUFBRSxNQUFNO1FBQ25CLE9BQU8sRUFBRSxDQUFDLGtCQUFrQixDQUFDO1FBQzdCLFNBQVMsRUFBRSxDQUFDLFNBQVMsQ0FBQztRQUN0QixRQUFRLEVBQUU7WUFDTixRQUFRLEVBQUUsSUFBSTtZQUNkLFFBQVEsRUFBRSxDQUFDLE1BQU0sRUFBRSxNQUFNLENBQUM7WUFDMUIsZ0JBQWdCLEVBQUUsVUFBVTtTQUMvQjtLQUNKO0NBQ0osQ0FBQyxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgZGVmaW5lQ29uZmlnIH0gZnJvbSAndml0ZXN0L2NvbmZpZyc7XG5cbmV4cG9ydCBkZWZhdWx0IGRlZmluZUNvbmZpZyh7XG4gICAgdGVzdDoge1xuICAgICAgICBlbnZpcm9ubWVudDogJ25vZGUnLFxuICAgICAgICBpbmNsdWRlOiBbJ3NyYy8qKi8qLnRlc3QudHMnXSxcbiAgICAgICAgcmVwb3J0ZXJzOiBbJ2RlZmF1bHQnXSxcbiAgICAgICAgY292ZXJhZ2U6IHtcbiAgICAgICAgICAgIHByb3ZpZGVyOiAndjgnLFxuICAgICAgICAgICAgcmVwb3J0ZXI6IFsndGV4dCcsICdodG1sJ10sXG4gICAgICAgICAgICByZXBvcnRzRGlyZWN0b3J5OiAnY292ZXJhZ2UnLFxuICAgICAgICB9LFxuICAgIH0sXG59KTsiXX0=