interface CourseIdPageProps {
    params: {
        courseId: string;
    };
}

function CourseIdPage({ params }: CourseIdPageProps ) {
    return (
        <div>
            Course Id Page params : {params.courseId}
        </div>
    )
}

export default CourseIdPage
