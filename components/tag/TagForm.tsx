"use client";
import { useEffect, useState, useContext } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useSession } from "next-auth/react";
import { BlogContext } from "@/app/context/blogContext";


const TagForm = () => {
  let { selectedTags, setSelectedTags } = useContext(BlogContext)

  const { data } = useSession()


  const [name, setName] = useState("");

  const [tags, setTags] = useState([]);

  const [search, setSearch] = useState<string>("");

  const handleSearch = (e: any) => {
    e.preventDefault();
    console.log("search => ");
  };

  const handleTag = async (e: any) => {
    e.preventDefault();
    try {
      const response = await axios.post(`/api/crud/tag`, {
        name: name,
        slug: name,
      });
      if (response.status == 200) {
        tagsList();
        toast.success(`${response.data.name} เพิ่มแท็กสำเร็จ`);
        setName("");
      }
    } catch (err: any) {
      console.log(err.message);
      setName("");
      toast.error("เพิ่มแท็กไม่สำเร็จ");
    }
  };

  const tagsList = async () => {
    try {
      const response = await axios.get(`/api/tags`);

      if (response.status == 200) {
        setTags(response.data);
      }
    } catch (err: any) {
      console.log(err.message);
    }
  };

  const handleSelectedTag = (tag : any) => {
    if(selectedTags.some((t : any) => t._id == tag._id)) {
        toast.error("Tag is already selected")
        return;
    }
    if(selectedTags.length >= 5) {
      toast.error("You can only select 5 tags")
      return;
    }

    setSelectedTags([tag, ...selectedTags])
  }

  const handleTagRemove = (tag : any) => {
    
    setSelectedTags(selectedTags.filter((t : any) => t._id != tag._id))
  }

  const handleTagDelete = async (_id : number) => {
    try {
      const response = await axios.delete(`/api/crud/tag/${_id}`)
      if(response.status == 200) {
        const updateSelectedTags = selectedTags.filter((tag : any) => tag._id !== _id)
        setSelectedTags(updateSelectedTags)
        tagsList()
        setName("")
        toast.success(`${response.data} tag is deleted`)
      }
    } catch (err : any) {
      console.log(err.response.data.error)
      toast.error(err.response.data.error)
    }
  }

  useEffect(() => {
    tagsList();
  }, []);

  return (
    <>
      <div className="grid grid-cols-2 gap-2">
        <div className="">
          <form onSubmit={handleSearch}>
            <input
              type="search"
              value={search}
              onChange={(e: any) => setSearch(e.target.value)}
              className="w-full h-24 rounded-md p-4 text-black"
              placeholder="Filter tags"
            />
          </form>
        </div>

        <div>
          <form onSubmit={handleTag}>
            <input
              type="text"
              onChange={(e: any) => setName(e.target.value)}
              value={name}
              className="w-full h-24 rounded-md p-4 text-black"
              placeholder="Create tag"
            />
          </form>
        </div>
      </div>

      <div>
        {selectedTags?.length > 0 && (<p className="">Selected tags</p>)}

        <div>
          {selectedTags?.map((tag : any, index : number) => (
            <button onClick={() => handleTagRemove(tag)} className="border-2 w-24 border-blue-600 hover:bg-blue-500 m-3 rounded-md" key={index}>{tag.name}</button>
          ))}
        </div>
        <p>Tags</p>
        <div className="grid grid-cols-12 gap-2 mt-2 custom-scrollbar">
          
          {tags.filter((t : any) => t?.name.toLowerCase()?.includes(search.toLowerCase())).map((tag: any, index) => (
            <>
            <div className="flex flex-col justify-center">

            {tag?.postedBy === data?.user?._id && (
              <button className="bg-red-500 w-6 rounded-xd" onClick={() => handleTagDelete(tag._id)}>X</button>
            )}

            <button key={index}
              className="border-2 rounded-lg hover:bg-slate-500"

              onClick={() => handleSelectedTag(tag)}
            >
              {tag.name}
            </button>

            </div>


            </>
          ))}
        </div>
      </div>
    </>
  );
};

export default TagForm;
