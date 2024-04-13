import AuthorHeader from "@/components/nav/AuthorHeader"


const AuthorLayout : React.FC<any> = ({ children }) => {
  return (
    <>
    <AuthorHeader />
    {children}
    </>
  )
}

export default AuthorLayout