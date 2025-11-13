
import ImageUpload from '@/app/components/imageUpload'


const page = () => {
  return (
    <div  className="min-h-screen bg-linear-to-b from-green-50 via-green-100 to-green-200 text-green-900 flex flex-col items-center justify-center">
      <ImageUpload />
      <br /> <br />
 
      {/* <Camera />a */}
    </div>
  )
}

export default page