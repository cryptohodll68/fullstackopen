const Course = (props) => {
  const courses = props.courses
  
  return (
  <div>
    
    {courses.map( course => {
     return( <div>
        <h1>{course.name}</h1>
        {console.log('courses:', course.name)}
      <ul>
        {course.parts.map( part => <li key = {part.id}> {part.name}: {part.exercises}</li>)}
        <li>Total: {course.parts.map( part => part.exercises).reduce((accumulator, currentValue) => accumulator + currentValue, 0)}</li>
      </ul>
      </div>
     )
    })
    }
    </div>)
}

export default Course