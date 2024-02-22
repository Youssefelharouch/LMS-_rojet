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
import { ImageIcon, Pencil, PlusCircle } from 'lucide-react';
import axios from 'axios';
import toast from 'react-hot-toast';
import { cn } from '@/lib/utils';
import { Textarea } from '@/components/ui/textarea';
import { Course } from '@prisma/client';
import Image from 'next/image';
import { FileUpload } from '@/components/file-upload';

type ImageFormProps = {
  initialData: Course,
  courseId: string
}

const formSchema = z.object({
  imageUrl: z.string().min(1, {
    message: "Image is required",
  })
})

const ImageForm = ({ initialData, courseId }: ImageFormProps) => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      imageUrl: initialData?.imageUrl || ""
    }
  })
  const { isSubmitting, isValid } = form.formState
  const [isEditing, setIsEditing] = useState(false);
  const toggleEdit = () => setIsEditing((current) => !current);
  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      axios.patch(`/api/courses/${courseId}`, values);
      toast.success("Course updated");
    } catch (error) {
      console.log(error)
      toast.error("Something went wrong");

    }
  }

  return (
    <div className="mt-6 border bg-slate-100 rounded-md p-4">
      <div className="font-medium flex items-center justify-between">
        Course image
        <Button onClick={toggleEdit} variant="ghost">
          {isEditing && (
            <>Cancel</>
          )} {!isEditing && initialData.imageUrl && (
            <>
              <Pencil className="h-4 w-4 mr-2" />
              Edit Image
            </>
          )}
          {
            !isEditing && !initialData.imageUrl && (
              <>
              <PlusCircle className='w-4 h-4 mr-2' />
                Add an image 
              </>

            )
          }
          {
            !isEditing && initialData.imageUrl && (
              <>
                Change picture
              </>
            )
          }
        </Button>
      </div>
      {!isEditing && (
        !initialData.imageUrl ? (
          <div className='flex items-center justify-center h-60 bg-slate-200 rounded-md'>
            <ImageIcon className='h-10 W-10 text-slate-500 ' />
          </div>
        ):(
          <div className='relative aspect-video mt-2 '>
            <Image
            alt='Upload'
            fill
            className='object-cover rounded-md'
            src={initialData.imageUrl}
            />
          </div>
        )
     
      )}
      {isEditing && (
        <div>
          <FileUpload
          endpoint='courseImage'
          onChange={(url)=> {
            if(url) onSubmit({imageUrl: url})
          }}
          />
          <div className='text-xs text-muted-foreground mt-4  '>
            16:9 aspect recommended 
          </div>
        </div>
      )}
    </div>
  )
}

export default ImageForm
