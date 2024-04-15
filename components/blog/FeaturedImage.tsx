"use client"
import axios from "axios"
import { useState, useContext } from "react"
import toast from "react-hot-toast"

import Resizer from 'react-image-file-resizer'

import { BlogContext } from "@/app/context/blogContext"

const FeaturedImage = () => {
  const { featuredImage, setFeaturedImage } = useContext(BlogContext)
  const [imagePreview, setImagePreview] = useState("")
  const [uploadingImage, setUploadingImage] = useState<boolean>(false)

  const imageUpload = (file : any) => {
    return new Promise((resolve, reject) => {
        Resizer.imageFileResizer(
            file, 1280, 720, 'JPEG', 100, 0, async (uri) => {
                try {
                    const response = await axios.post(`/api/crud/uploads`, {
                        image : uri
                    })

                    console.log(response)

                    if(response.status != 200) {
                        reject(new Error("Image upload failed"))
                        toast.error("Image upload failed")
                    } else {
                        
                      resolve(response.data.url)
                      setFeaturedImage(response.data.url)
                    }
                } catch (err) {
                    reject(err)
                }
            }, "base64"
        )
    })
  }

  const handleImageUpload = async (e : any) => {
    const selectedImage = e.target.files[0]

    if(selectedImage) {
      const reader = new FileReader()
      reader.onload = (event : any) => {
        setImagePreview(event.target.result)
      }
      reader.readAsDataURL(selectedImage)
      setUploadingImage(true)
    }

    try {
      const imageUrl : any = await imageUpload(selectedImage)
      setUploadingImage(false)
    } catch (err : any) {
      console.log(err)
      setUploadingImage(false)
    }



  }
  return (
    <div>
      {imagePreview && (
        <img src={imagePreview} className="w-[320px] cursor-pointer rounded-md" alt="" />
      )}

      <label className={`p-8 flex`}>
        {uploadingImage ? "Uploading..." : "Upload featured image"}

        {/* <pre className="">{JSON.stringify(featuredImage, null, 4)}</pre> */}

        <input onChange={(e : any) => handleImageUpload(e)} type="file" accept="image/*" hidden />
      </label>

    </div>
  )
}

export default FeaturedImage