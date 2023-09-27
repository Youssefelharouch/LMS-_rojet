
import { UserButton } from "@clerk/nextjs"

export default function Home() {
  return (
    <div>
      <p>This is a protected Page</p>
      <UserButton afterSignOutUrl="/"/>
    </div>
  )
}
