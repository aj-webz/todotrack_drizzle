import { KanbanBoard } from '@/lib/components/Kanban'
import { CreateTodoSheet } from '@/lib/components/TodoSheet'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_pathLessLayout/manage')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <section className='flex flex-col p-10 min-h-screen'>
      <h1 className='text-4xl font-bold'>Manage Your Task</h1>
      <div className='flex w-full p-2 justify-end mb-5'>
        <CreateTodoSheet />
      </div>
      <div className='w-auto'>
        <KanbanBoard />
      </div>
    </section>
  )
}
