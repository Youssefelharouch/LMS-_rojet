import { cva } from "class-variance-authority";



const backgroundVariants = cva(
    'rounded-full flex items-center justify-center',
    {
        variants :{
            variant : {
                default : 'bg-sky-100',
                success : 'bg-emerald-100'
            },
            iconVariant : {
                default : 'bg-sky-700',
                success : 'bg-emerald-700'


            },
            size :{
                default : 'p-2',
                sm : 'p-1'

            },
            defaultVariants :{
                variant:'default',
                size:'default '
            }
        }
    }
   
)