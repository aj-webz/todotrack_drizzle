import { DashboardStats } from '@/lib/components/dashboards/DashboardStats';
import { TodoStatusChart } from '@/lib/components/dashboards/TodoCharts';
import { TodoProgress } from '@/lib/components/dashboards/TodoProgress';
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_pathLessLayout/dashboard')({
  component: RouteComponent,
})

function RouteComponent() {
   return (
    <div className="space-y-8 p-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">
          Dashboard
        </h1>
        <p className="text-muted-foreground">
          Overview of your work
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-1">
        <DashboardStats />
        <TodoProgress />
        <TodoStatusChart/>
      </div>
    </div>
  );
}
