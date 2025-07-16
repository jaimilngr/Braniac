export const Avatar = ({ name }: { name: string }) => {
  return (
    <div className='Avatar text-center rounded-circle p-2  text-white mx-auto' style={{backgroundColor: '#c75b5b'}}>
        <span className="fs-5">{name[0].toUpperCase()}</span>
    </div>
  )
}
