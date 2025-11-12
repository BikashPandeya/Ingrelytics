// "use client"

// import type React from "react"
// import { useState, useRef, useCallback, useEffect } from "react"
// import Webcam from "react-webcam"
// import { X, CameraIcon, RotateCcw } from "lucide-react"

// interface CameraProps {
//   onCapture: (imageSrc: string | null) => void
//   onClose: () => void
//   onPermissionDenied: () => void
// }

// const Camera: React.FC<CameraProps> = ({ onCapture, onClose, onPermissionDenied }) => {
//   const [isCaptured, setIsCaptured] = useState(false)
//   const [isLoading, setIsLoading] = useState(true)
//   const webcamRef = useRef<Webcam>(null)
//   const [imgSrc, setImgSrc] = useState<string | null>(null)

//   useEffect(() => {
//     const checkPermissions = async () => {
//       try {
//         const stream = await navigator.mediaDevices.getUserMedia({ video: true })
//         stream.getTracks().forEach((track) => track.stop())
//       } catch (err) {
//         onPermissionDenied()
//       }
//     }

//     checkPermissions()
//   }, [onPermissionDenied])

//   const handleUserMedia = () => {
//     setIsLoading(false)
//   }

//   const capture = useCallback(() => {
//     const imageSrc = webcamRef.current?.getScreenshot()
//     if (imageSrc) {
//       setImgSrc(imageSrc)
//       setIsCaptured(true)
//       onCapture(imageSrc)
//     }
//   }, [onCapture])

//   const retake = () => {
//     setImgSrc(null)
//     setIsCaptured(false)
//     onCapture(null)
//   }

//   return (
//     <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-[10000]">
//       <div className="bg-white rounded-lg shadow-lg overflow-hidden">
//         <div className="relative">
//           {isLoading && (
//             <div className="absolute inset-0 flex items-center justify-center bg-gray-200">
//               <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
//             </div>
//           )}
//           {!isCaptured ? (
//             <Webcam
//               audio={false}
//               ref={webcamRef}
//               screenshotFormat="image/jpeg"
//               onUserMedia={handleUserMedia}
//               className={`w-full h-auto ${isLoading ? "invisible" : "visible"}`}
//             />
//           ) : (
//             <img src={imgSrc || ""} alt="captured" className="w-full h-auto" />
//           )}
//           <button onClick={onClose} className="absolute top-2 right-2 text-white hover:text-gray-200 transition-colors">
//             <X size={24} />
//           </button>
//         </div>
//         <div className="p-4 flex justify-center space-x-4">
//           {!isCaptured ? (
//             <button
//               onClick={capture}
//               disabled={isLoading}
//               className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-full flex items-center disabled:opacity-50 disabled:cursor-not-allowed"
//             >
//               <CameraIcon size={20} className="mr-2" />
//               Take Photo
//             </button>
//           ) : (
//             <>
//               <button
//                 onClick={retake}
//                 className="bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-2 px-4 rounded-full flex items-center"
//               >
//                 <RotateCcw size={20} className="mr-2" />
//                 Retake
//               </button>
//               <button
//                 onClick={onClose}
//                 className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded-full"
//               >
//                 Close
//               </button>
//             </>
//           )}
//         </div>
//       </div>
//     </div>
//   )
// }

// export default Camera

