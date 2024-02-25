"use client"
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import * as z from 'zod'

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { useState } from 'react';
import { PlusCircle } from 'lucide-react';
import axios from 'axios';
import toast from 'react-hot-toast';
import { cn } from '@/lib/utils';
import { Chapter, Course } from '@prisma/client';
import { useRouter } from 'next/navigation';
import { Input } from '@/components/ui/input';

type ChaptersFormProps = {
  initialData: Course & {chapters : Chapter[]}
  courseId: string
}

const formSchema = z.object({
  title: z.string().min(1)
})

export const ChaptersForm = ({ initialData, courseId }: ChaptersFormProps) => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: ""
    }

  })
  const router = useRouter();
  const { isSubmitting, isValid } = form.formState
  const [isCreating, setIsCreating] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);
  const toggleCreating = () => setIsCreating((current) => !current);
  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      await axios.post(`/api/courses/${courseId}/chapters`, values);
      toast.success("Chapter Created");
      toggleCreating();
      router.refresh();

    } catch (error) {
      console.log(error)
      toast.error("Something went wrong");

    }
  }

  return (
    <div className="mt-6 border bg-slate-100 rounded-md p-4">
      <div className="font-medium flex items-center justify-between">
        Course Chapter
        <Button onClick={toggleCreating} variant="ghost">
          {isCreating ? (
            <>Cancel</>
          ) : (
            <>
              <PlusCircle className="h-4 w-4 mr-2" />
              Add a Chapter
            </>
          )}
        </Button>
      </div>
     
      {isCreating && (
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-4 mt-4"
          >
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      disabled={isSubmitting}
                      placeholder="e.g. 'Introduction to the Course ...'"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
              <Button
                disabled={!isValid || isSubmitting}
                type="submit"
              >
                Create
              </Button>
          </form>
        </Form>
      )}
      {!isCreating && (
        <div className={cn("text-sm mt-2",!initialData.chapters.length && "text-slate-500 italic")}>
         { !initialData.chapters.length && "No chapters found"}
        {/* { TO DO :  ADD LIST OF CHAPTERS  } */}
        </div>
      )}
        {!isCreating && (
        <p className='text-xs text-muted-foreground mt-4 '>
          Drag and Drop to reorder the chapters 
        </p>
      )}
    </div>
  )
}

