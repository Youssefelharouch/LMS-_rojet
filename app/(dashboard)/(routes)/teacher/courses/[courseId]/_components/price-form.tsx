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
import { Pencil } from 'lucide-react';
import axios from 'axios';
import toast from 'react-hot-toast';
import { cn } from '@/lib/utils';
import { Textarea } from '@/components/ui/textarea';
import { Course } from '@prisma/client';
import { useRouter } from 'next/navigation';
import { Input } from '@/components/ui/input';
import { formatPrice } from '@/lib/format';

type PriceFormProps = {
  initialData: Course
  courseId: string
}

const formSchema = z.object({
 price: z.coerce.number(),
})

const PriceForm = ({ initialData, courseId }: PriceFormProps) => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      price: initialData?.price || undefined
    }
    
  })
  const router = useRouter();
  const { isSubmitting, isValid } = form.formState
  const [isEditing, setIsEditing] = useState(false);
  const toggleEdit = () => setIsEditing((current) => !current);
  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      axios.patch(`/api/courses/${courseId}`, values);
      toast.success("Description updated");
      toggleEdit();
      router.refresh();

    } catch (error) {
      console.log(error)
      toast.error("Something went wrong");

    }
  }

  return (
    <div className="mt-6 border bg-slate-100 rounded-md p-4">
      <div className="font-medium flex items-center justify-between">
        Course Price
        <Button onClick={toggleEdit} variant="ghost">
          {isEditing ? (
            <>Cancel</>
          ) : (
            <>
              <Pencil className="h-4 w-4 mr-2" />
              Edit price
            </>
          )}
        </Button>
      </div>
      {!isEditing && (
        <p className={cn("text-sm mt-2", !initialData.price && "text-slate-500 italic")}>
          {initialData?.price !== null ? formatPrice(initialData?.price) : "No price provided"}
        </p>
      )}
      {isEditing && (
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-4 mt-4"
          >
            <FormField
              control={form.control}
              name="price"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      disabled={isSubmitting}
                      placeholder="set your price for your course'"
                      type='number'
                      step="0.01"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex items-center gap-x-2">
              <Button
                disabled={!isValid || isSubmitting}
                type="submit"
              >
                Save
              </Button>
            </div>
          </form>
        </Form>
      )}
    </div>
  )
}

export default PriceForm
