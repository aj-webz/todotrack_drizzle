import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import type { Todo } from "@repo/shared"
import { format } from "date-fns"

interface AddedListProps {
  todos: Todo[]
}

export default function TodoList({ todos }: AddedListProps) {
  if (todos.length === 0) return null

  return (
    <Card className="bg-white border border-neutral-200">
      <CardHeader>
        <CardTitle className="text-base font-semibold text-neutral-900">
          Recently Added
        </CardTitle>
      </CardHeader>

      <CardContent className="space-y-3 overflow-y-auto max-h-72 scroll-smooth p-5">
        {todos.map((todo) => (
          <div
            key={todo.id}
            className="flex items-center justify-between rounded-md border px-4 py-3"
          >
            <div className="flex-1">
              <p className="font-medium text-neutral-900">
                {todo.title}
              </p>
            </div>
            <div className="w-40 text-sm text-neutral-500 text-right">
              {format(new Date(todo.created), "dd MMM yyyy")}
            </div>
            <div className="w-28 text-right">
              <Badge
                variant={todo.status === "completed" ? "ghost" : "default"} className="p-2"
              >
                {todo.status}
              </Badge>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  )
}
