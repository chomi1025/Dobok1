import HiringLayout from "@/app/community/components/hiringLayout";
import SeekingLayout from "@/app/community/components/seekingLayout";
import { Post } from "@prisma/client";

interface Props {
  post: Post;
}

export default async function EditJobClientPage({ post }: Props) {
  return (
    <div>
      {post.jobType === "HIRING" ? (
        <HiringLayout post={post} />
      ) : (
        <SeekingLayout post={post} />
      )}
    </div>
  );
}
